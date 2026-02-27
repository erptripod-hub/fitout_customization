import frappe
from frappe.model.document import Document

class BOQ(Document):
    def validate(self):
        self.calculate_line_amounts()
        self.validate_prerequisites()
        self.calculate_totals()
    
    def calculate_line_amounts(self):
        """Calculate amount for each line item"""
        for item in self.line_items:
            item.amount = (item.qty or 0) * (item.rate or 0)
    
    def calculate_totals(self):
        """Calculate section totals with markup and grand total"""
        # Calculate section base amounts from line items
        section_totals = {}
        for item in self.line_items:
            section = item.section
            if section:
                if section not in section_totals:
                    section_totals[section] = 0
                section_totals[section] += (item.amount or 0)
        
        # Update section markup table
        for markup_row in self.section_markup:
            section = markup_row.section
            base_amount = section_totals.get(section, 0)
            markup_row.base_amount = base_amount
            
            markup_percent = markup_row.markup_percent or 0
            markup_row.markup_amount = (base_amount * markup_percent) / 100
            markup_row.total_amount = base_amount + markup_row.markup_amount
        
        # Calculate subtotal (sum of all section totals with markup)
        subtotal = sum(row.total_amount or 0 for row in self.section_markup)
        self.subtotal = subtotal
        
        # Calculate VAT
        vat_percent = self.vat_percent or 0
        self.vat_amount = (subtotal * vat_percent) / 100
        
        # Grand total
        self.grand_total = subtotal + self.vat_amount
    
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


@frappe.whitelist()
def refresh_sections(boq_name):
    """Refresh section markup table based on line items"""
    doc = frappe.get_doc("BOQ", boq_name)
    
    # Get unique sections from line items
    sections_in_use = set()
    for item in doc.line_items:
        if item.section:
            sections_in_use.add(item.section)
    
    # Get existing sections in markup table
    existing_sections = {row.section for row in doc.section_markup}
    
    # Add missing sections
    for section in sections_in_use:
        if section not in existing_sections:
            doc.append("section_markup", {
                "section": section,
                "markup_percent": 0
            })
    
    # Remove sections no longer in use
    doc.section_markup = [row for row in doc.section_markup if row.section in sections_in_use]
    
    doc.save()
    frappe.msgprint(f"Sections refreshed. {len(sections_in_use)} sections found.")
    
    return doc
