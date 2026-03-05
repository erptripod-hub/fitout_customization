import frappe
from frappe.model.document import Document

class RFI(Document):
    def validate(self):
        if self.status == "Sent" and not self.date_sent:
            self.date_sent = frappe.utils.today()
        
        if self.status == "Received" and not self.date_received:
            self.date_received = frappe.utils.today()


@frappe.whitelist()
def load_standard_checklist(rfi_name):
    """Load the standard RFI checklist items"""
    doc = frappe.get_doc("RFI", rfi_name)
    
    # Clear existing checklist
    doc.checklist_items = []
    
    # Standard checklist items
    checklist_items = [
        {"no": "1.00", "detail": "Architectural Drawing"},
        {"no": "1.01", "detail": "Demolition Layout"},
        {"no": "1.02", "detail": "Partition Layout"},
        {"no": "1.03", "detail": "Flooring Layout"},
        {"no": "1.04", "detail": "Wall Finishes Layout"},
        {"no": "1.05", "detail": "Ceiling Layout"},
        {"no": "1.06", "detail": "Ceiling Finishes"},
        {"no": "1.07", "detail": "Shop Front Elevation"},
        {"no": "1.08", "detail": "Internal Elevation"},
        {"no": "1.09", "detail": "FF&E Layout"},
        {"no": "1.10", "detail": "Joinery detailed layout"},
        {"no": "1.11", "detail": "RCP Layout"},
        {"no": "2.00", "detail": "MEP Drawings"},
        {"no": "2.01", "detail": "Lighting Layout"},
        {"no": "2.02", "detail": "Power Layout"},
        {"no": "2.03", "detail": "IT Layout"},
        {"no": "2.04", "detail": "AV Layout"},
        {"no": "2.05", "detail": "HVAC Layout"},
        {"no": "2.06", "detail": "Plumbing Layout"},
        {"no": "2.07", "detail": "Proposed Fire Alarm Layout"},
        {"no": "2.08", "detail": "Proposed Fire Fighting Layout"},
        {"no": "2.09", "detail": "Proposed EM & Exit Light Layout"},
        {"no": "3.00", "detail": "Asbuilt Layout"},
        {"no": "3.01", "detail": "Architectural layout"},
        {"no": "3.02", "detail": "HVAC Layout"},
        {"no": "3.03", "detail": "Lighting Layout"},
        {"no": "3.04", "detail": "Power Layout"},
        {"no": "3.05", "detail": "IT and AV Layouts"},
        {"no": "3.06", "detail": "Plumbing Layout"},
        {"no": "3.07", "detail": "Fire Fighting Layout"},
        {"no": "3.08", "detail": "EM & Exit Light Layout"},
        {"no": "4.00", "detail": "Renders"},
        {"no": "5.00", "detail": "Material Schedule"},
        {"no": "6.00", "detail": "BOQ (if available)"}
    ]
    
    for item in checklist_items:
        doc.append("checklist_items", {
            "item_no": item["no"],
            "required_detail": item["detail"],
            "received": 0,
            "not_received": 0
        })
    
    doc.save()
    frappe.msgprint(f"Loaded {len(checklist_items)} checklist items")
    
    return doc
