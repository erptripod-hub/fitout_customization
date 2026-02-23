import frappe

@frappe.whitelist()
def get_dashboard_data():
    # Only standard Lead fields - no custom fields
    leads = frappe.get_all("Lead", fields=[
        "name", "lead_owner", "status", "source",
        "company_name", "lead_name", "creation"
    ])

    total = len(leads)
    by_status = {}
    by_owner = {}
    by_source = {}

    for l in leads:
        # By status
        s = l.status or "Unknown"
        by_status[s] = by_status.get(s, 0) + 1

        # By owner
        o = l.lead_owner or "Unassigned"
        if o not in by_owner:
            by_owner[o] = 0
        by_owner[o] += 1

        # By source
        src = l.source or "Unknown"
        by_source[src] = by_source.get(src, 0) + 1

    return {
        "total": total,
        "by_status": by_status,
        "by_owner": by_owner,
        "by_source": by_source
    }
