import frappe

@frappe.whitelist()
def get_dashboard_data(year=None, salesperson=None):
    if not year:
        from datetime import datetime
        year = str(datetime.now().year)

    filters = {"status": ["!=", "Do Not Contact"]}
    if salesperson:
        filters["lead_owner"] = salesperson

    leads = frappe.get_all("Lead", filters=filters, fields=[
        "name", "lead_owner", "status", "source", "company_name", "lead_name",
        "custom_lead_status", "custom_ghost_status", "custom_estimated_value",
        "custom_project_type", "custom_scope", "custom_quarter", "custom_customer_type"
    ])

    total = len(leads)
    pipeline_value = sum(l.custom_estimated_value or 0 for l in leads)
    qualified = len([l for l in leads if l.custom_lead_status == "Qualified"])
    converted = len([l for l in leads if l.custom_lead_status == "Converted to Opportunity"])
    lost = len([l for l in leads if l.custom_lead_status in ["Lost", "Not Interested"]])

    active = len([l for l in leads if l.custom_ghost_status == "Active"])
    stale = len([l for l in leads if l.custom_ghost_status == "Stale"])
    ghost = len([l for l in leads if l.custom_ghost_status == "Ghost"])

    by_status = {}
    by_owner = {}
    by_source = {}
    by_type = {}
    by_scope = {}
    by_ctype = {}
    quarters = {"Q1": 0, "Q2": 0, "Q3": 0, "Q4": 0}
    quarter_value = {"Q1": 0, "Q2": 0, "Q3": 0, "Q4": 0}
    owner_data = {}

    for l in leads:
        s = l.custom_lead_status or l.status or "Unknown"
        by_status[s] = by_status.get(s, 0) + 1

        src = l.source or "Unknown"
        by_source[src] = by_source.get(src, 0) + 1

        t = l.custom_project_type or "Unknown"
        by_type[t] = by_type.get(t, 0) + 1

        sc = l.custom_scope or "Unknown"
        by_scope[sc] = by_scope.get(sc, 0) + 1

        ct = l.custom_customer_type or "Unknown"
        by_ctype[ct] = by_ctype.get(ct, 0) + 1

        q = l.custom_quarter
        if q in quarters:
            quarters[q] += 1
            quarter_value[q] += l.custom_estimated_value or 0

        o = l.lead_owner or "Unassigned"
        by_owner[o] = by_owner.get(o, 0) + 1
        if o not in owner_data:
            owner_data[o] = {"name": o, "total": 0, "qualified": 0, "converted": 0, "value": 0}
        owner_data[o]["total"] += 1
        if l.custom_lead_status == "Qualified":
            owner_data[o]["qualified"] += 1
        if l.custom_lead_status == "Converted to Opportunity":
            owner_data[o]["converted"] += 1
        owner_data[o]["value"] += l.custom_estimated_value or 0

    targets = frappe.get_all("BD Target", filters={"year": year}, fields=[
        "sales_person", "annual_target", "q1_target", "q2_target", "q3_target", "q4_target"
    ])

    ghost_leads = frappe.get_all("Lead", filters={"custom_ghost_status": ["in", ["Ghost", "Stale"]]}, fields=[
        "name", "company_name", "lead_name", "lead_owner", "custom_lead_status", "custom_ghost_status"
    ], limit=5)

    return {
        "total": total,
        "pipeline_value": pipeline_value,
        "qualified": qualified,
        "converted": converted,
        "lost": lost,
        "active": active,
        "stale": stale,
        "ghost": ghost,
        "by_status": by_status,
        "by_owner": by_owner,
        "by_source": by_source,
        "by_type": by_type,
        "by_scope": by_scope,
        "by_ctype": by_ctype,
        "quarters": quarters,
        "quarter_value": quarter_value,
        "owner_data": list(owner_data.values()),
        "targets": targets,
        "ghost_leads": ghost_leads,
        "year": year
    }
