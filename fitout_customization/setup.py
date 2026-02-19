import frappe
import json
import os

def after_install():
    install_custom_fields()

def install_custom_fields():
    path = os.path.join(os.path.dirname(__file__),
        "custom/custom_fields/lead_custom_fields.json")
    with open(path) as f:
        fields = json.load(f)
    for field in fields:
        fieldname = field.get("fieldname")
        dt = field.get("dt")
        if not fieldname or not dt:
            continue
        existing = frappe.db.exists("Custom Field", {"dt": dt, "fieldname": fieldname})
        if existing:
            # Update existing field
            doc = frappe.get_doc("Custom Field", existing)
            for key, val in field.items():
                if key not in ("doctype", "name"):
                    setattr(doc, key, val)
            doc.save()
        else:
            # Create new field
            field_copy = {k: v for k, v in field.items() if k != "name"}
            doc = frappe.get_doc(field_copy)
            doc.insert()
    frappe.db.commit()
