import frappe

@frappe.whitelist()
def get_dashboard_data(year=None, salesperson=None):
    if not year:
        from datetime import datetime
        year = str(datetime.now().year)

    filters = {"custom_quarter": ["!=", ""], "status": ["!=", "Do Not Contact"]}
    if salesperson:
        filters["lead_owner"] = salesperson

    leads = frappe.get_all("Lead", filters=filters, fields=[
        "name", "lead_owner", "custom_lead_status", "custom_ghost_status",
        "custom_estimated_value", "custom_project_type", "custom_scope",
        "custom_quarter", "custom_customer_type", "source", "creation",
        "company_name", "lead_name"
    ])

    # Summary counts
    total = len(leads)
    qualified = len([l for l in leads if l.custom_lead_status == "Qualified"])
    converted = len([l for l in leads if l.custom_lead_status == "Converted to Opportunity"])
    lost = len([l for l in leads if l.custom_lead_status in ["Lost", "Not Interested"]])
    pipeline_value = sum(l.custom_estimated_value or 0 for l in leads)

    # Ghost status breakdown
    active = len([l for l in leads if l.custom_ghost_status == "Active"])
    stale = len([l for l in leads if l.custom_ghost_status == "Stale"])
    ghost = len([l for l in leads if l.custom_ghost_status == "Ghost"])

    # By salesperson
    owners = {}
    for l in leads:
        owner = l.lead_owner or "Unassigned"
        if owner not in owners:
            owners[owner] = {"name": owner, "total": 0, "qualified": 0, "converted": 0, "value": 0}
        owners[owner]["total"] += 1
        if l.custom_lead_status == "Qualified":
            owners[owner]["qualified"] += 1
        if l.custom_lead_status == "Converted to Opportunity":
            owners[owner]["converted"] += 1
        owners[owner]["value"] += l.custom_estimated_value or 0

    # By quarter
    quarters = {"Q1": 0, "Q2": 0, "Q3": 0, "Q4": 0}
    quarter_value = {"Q1": 0, "Q2": 0, "Q3": 0, "Q4": 0}
    for l in leads:
        q = l.custom_quarter
        if q in quarters:
            quarters[q] += 1
            quarter_value[q] += l.custom_estimated_value or 0

    # By project type
    by_type = {}
    for l in leads:
        t = l.custom_project_type or "Other"
        by_type[t] = by_type.get(t, 0) + 1

    # By scope
    by_scope = {}
    for l in leads:
        s = l.custom_scope or "Other"
        by_scope[s] = by_scope.get(s, 0) + 1

    # By source
    by_source = {}
    for l in leads:
        src = l.source or "Other"
        by_source[src] = by_source.get(src, 0) + 1

    # By customer type
    by_ctype = {}
    for l in leads:
        ct = l.custom_customer_type or "Unknown"
        by_ctype[ct] = by_ctype.get(ct, 0) + 1

    # BD Targets
    targets = frappe.get_all("BD Target", filters={"year": year}, fields=[
        "sales_person", "annual_target", "q1_target", "q2_target", "q3_target", "q4_target"
    ])

    # Ghost leads detail
    ghost_leads = [l for l in leads if l.custom_ghost_status in ["Ghost", "Stale"]]

    return {
        "summary": {
            "total": total,
            "qualified": qualified,
            "converted": converted,
            "lost": lost,
            "pipeline_value": pipeline_value
        },
        "health": {"active": active, "stale": stale, "ghost": ghost},
        "by_owner": list(owners.values()),
        "quarters": quarters,
        "quarter_value": quarter_value,
        "by_type": by_type,
        "by_scope": by_scope,
        "by_source": by_source,
        "by_customer_type": by_ctype,
        "targets": targets,
        "ghost_leads": ghost_leads[:10],
        "year": year
    }
