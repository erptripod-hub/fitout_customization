import frappe
from datetime import datetime, timedelta

@frappe.whitelist()
def get_dashboard_data(year=None, salesperson=None):
    if not year:
        year = str(datetime.now().year)

    filters = {"status": ["!=", "Do Not Contact"]}
    if salesperson:
        filters["lead_owner"] = salesperson

    leads = frappe.get_all("Lead", filters=filters, fields=[
        "name", "lead_owner", "status", "source", "company_name", "lead_name", "creation",
        "custom_lead_status", "custom_ghost_status", "custom_estimated_value",
        "custom_project_type", "custom_scope", "custom_quarter", "custom_customer_type",
        "custom_probability", "custom_expected_close_date", "custom_last_contact_date",
        "custom_estimated_margin_pct", "custom_city"
    ])

    today = datetime.today().date()
    in_30 = today + timedelta(days=30)
    in_60 = today + timedelta(days=60)
    in_90 = today + timedelta(days=90)

    total = len(leads)
    pipeline_value = sum(l.custom_estimated_value or 0 for l in leads)
    qualified = len([l for l in leads if l.custom_lead_status == "Qualified"])
    converted = len([l for l in leads if l.custom_lead_status == "Converted to Opportunity"])
    lost = len([l for l in leads if l.custom_lead_status in ["Lost", "Not Interested"]])
    active = len([l for l in leads if l.custom_ghost_status == "Active"])
    stale = len([l for l in leads if l.custom_ghost_status == "Stale"])
    ghost = len([l for l in leads if l.custom_ghost_status == "Ghost"])

    # Weighted pipeline = value x probability
    weighted_pipeline = sum(
        (l.custom_estimated_value or 0) * ((l.custom_probability or 0) / 100)
        for l in leads
    )

    # Total margin value
    total_margin = sum(
        (l.custom_estimated_value or 0) * ((l.custom_estimated_margin_pct or 0) / 100)
        for l in leads
    )

    # 90-day forward view
    next_30 = {"count": 0, "value": 0}
    next_60 = {"count": 0, "value": 0}
    next_90 = {"count": 0, "value": 0}
    for l in leads:
        cd = l.custom_expected_close_date
        if cd:
            if isinstance(cd, str):
                try:
                    cd = datetime.strptime(cd, "%Y-%m-%d").date()
                except:
                    continue
            val = l.custom_estimated_value or 0
            if today <= cd <= in_30:
                next_30["count"] += 1
                next_30["value"] += val
            elif today <= cd <= in_60:
                next_60["count"] += 1
                next_60["value"] += val
            elif today <= cd <= in_90:
                next_90["count"] += 1
                next_90["value"] += val

    # Stage counts for funnel
    stage_counts = {}
    for l in leads:
        s = l.custom_lead_status or "New"
        stage_counts[s] = stage_counts.get(s, 0) + 1

    by_source = {}
    by_type = {}
    by_scope = {}
    by_ctype = {}
    by_city = {}
    quarters = {"Q1": 0, "Q2": 0, "Q3": 0, "Q4": 0}
    quarter_value = {"Q1": 0, "Q2": 0, "Q3": 0, "Q4": 0}
    owner_data = {}

    for l in leads:
        src = l.source or "Unknown"
        by_source[src] = by_source.get(src, 0) + 1

        t = l.custom_project_type or "Unknown"
        by_type[t] = by_type.get(t, 0) + 1

        sc = l.custom_scope or "Unknown"
        by_scope[sc] = by_scope.get(sc, 0) + 1

        ct = l.custom_customer_type or "Unknown"
        by_ctype[ct] = by_ctype.get(ct, 0) + 1

        cy = l.custom_city or "Unknown"
        by_city[cy] = by_city.get(cy, 0) + 1

        q = l.custom_quarter
        if q in quarters:
            quarters[q] += 1
            quarter_value[q] += l.custom_estimated_value or 0

        o = l.lead_owner or "Unassigned"
        if o not in owner_data:
            owner_data[o] = {"name": o, "total": 0, "qualified": 0, "converted": 0,
                             "value": 0, "weighted": 0, "margin": 0}
        owner_data[o]["total"] += 1
        if l.custom_lead_status == "Qualified":
            owner_data[o]["qualified"] += 1
        if l.custom_lead_status == "Converted to Opportunity":
            owner_data[o]["converted"] += 1
        val = l.custom_estimated_value or 0
        prob = (l.custom_probability or 0) / 100
        mgn = (l.custom_estimated_margin_pct or 0) / 100
        owner_data[o]["value"] += val
        owner_data[o]["weighted"] += val * prob
        owner_data[o]["margin"] += val * mgn

    targets = frappe.get_all("BD Target", filters={"year": year}, fields=[
        "sales_person", "annual_target", "q1_target", "q2_target", "q3_target", "q4_target"
    ])

    ghost_leads = frappe.get_all("Lead",
        filters={"custom_ghost_status": ["in", ["Ghost", "Stale"]]},
        fields=["name", "company_name", "lead_name", "lead_owner",
                "custom_lead_status", "custom_ghost_status", "custom_estimated_value"],
        limit=5
    )

    return {
        "total": total,
        "pipeline_value": pipeline_value,
        "weighted_pipeline": weighted_pipeline,
        "total_margin": total_margin,
        "qualified": qualified,
        "converted": converted,
        "lost": lost,
        "active": active,
        "stale": stale,
        "ghost": ghost,
        "stage_counts": stage_counts,
        "by_source": by_source,
        "by_type": by_type,
        "by_scope": by_scope,
        "by_ctype": by_ctype,
        "by_city": by_city,
        "quarters": quarters,
        "quarter_value": quarter_value,
        "owner_data": list(owner_data.values()),
        "targets": targets,
        "ghost_leads": ghost_leads,
        "forward_30": next_30,
        "forward_60": next_60,
        "forward_90": next_90,
        "year": year
    }
