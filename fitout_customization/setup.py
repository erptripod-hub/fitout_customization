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
        if not frappe.db.exists("Custom Field",
            {"dt": field["dt"], "fieldname": field["fieldname"]}):
            doc = frappe.get_doc(field)
            doc.insert()
    frappe.db.commit()
