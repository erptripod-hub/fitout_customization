import frappe
from frappe.model.document import Document

class RFI(Document):
    def validate(self):
        if self.status == "Sent" and not self.date_sent:
            self.date_sent = frappe.utils.today()
        
        if self.status == "Received" and not self.date_received:
            self.date_received = frappe.utils.today()
