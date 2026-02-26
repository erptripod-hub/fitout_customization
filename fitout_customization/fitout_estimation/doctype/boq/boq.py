import frappe
from frappe.model.document import Document

class BOQ(Document):
    def validate(self):
        self.calculate_totals()
        self.validate_prerequisites()
    
    def calculate_totals(self):
        """Calculate amounts for all items and services"""
        # Calculate item amounts
        total_items = 0
        for item in self.items:
            item.amount = (item.qty or 0) * (item.rate or 0)
            total_items += item.amount
        
        # Calculate service amounts
        total_services = 0
        for service in self.services:
            service.amount = (service.qty or 0) * (service.rate or 0)
            total_services += service.amount
        
        # Update summary
        self.total_items = total_items
        self.total_services = total_services
        self.grand_total = total_items + total_services
        
        # Calculate VAT
        vat_percent = self.vat_percent or 0
        self.vat_amount = (self.grand_total * vat_percent) / 100
        self.final_value = self.grand_total + self.vat_amount
    
    def validate_prerequisites(self):
        """Check if RFI and Site Survey are completed if required"""
        if not self.opportunity:
            return
        
        opp = frappe.get_doc("Opportunity", self.opportunity)
        
        # Check RFI completion
        if opp.get("custom_rfi_required"):
            rfi_completed = frappe.db.exists("RFI", {
                "opportunity": self.opportunity,
                "status": "Completed"
            })
            if not rfi_completed:
                frappe.throw("RFI must be completed before creating BOQ")
        
        # Check Site Survey completion
        if opp.get("custom_site_survey_required"):
            survey_completed = frappe.db.exists("Site Survey", {
                "opportunity": self.opportunity,
                "status": "Completed"
            })
            if not survey_completed:
                frappe.throw("Site Survey must be completed before creating BOQ")
