import frappe
from frappe.model.document import Document

class BOQ(Document):
    def validate(self):
        self.calculate_all_sections()
        self.validate_prerequisites()
    
    def calculate_all_sections(self):
        """Calculate totals for all 29 sections"""
        sections = [
            "preliminaries", "structural_works", "civil_works", "flooring_works",
            "floor_finishes_works", "partition_and_cladding_works", "wall_finishes_works",
            "ceiling_works", "ceiling_finishes_works", "shop_front_works", "door_works",
            "joinery_works", "loose_furniture_works", "exterior_works", "landscaping_works",
            "hvac_works", "electrical_works", "lighting_works", "fire_life_safety_works",
            "it_works", "cctv_works", "access_control_works", "access_point_works",
            "music_system_works", "av_works", "plumbing_works", "sanitarywares",
            "white_goods", "miscellaneous_works"
        ]
        
        overall_subtotal = 0
        
        for section in sections:
            # Calculate line item amounts
            items_field = f"items_{section}"
            if hasattr(self, items_field):
                items = getattr(self, items_field) or []
                for item in items:
                    item.amount = (item.qty or 0) * (item.rate or 0)
                
                # Calculate section base total
                base_total = sum(item.amount or 0 for item in items)
                setattr(self, f"base_total_{section}", base_total)
                
                # Calculate markup
                markup_percent = getattr(self, f"markup_{section}") or 0
                markup_amount = (base_total * markup_percent) / 100
                setattr(self, f"markup_amount_{section}", markup_amount)
                
                # Calculate section total
                section_total = base_total + markup_amount
                setattr(self, f"section_total_{section}", section_total)
                
                overall_subtotal += section_total
        
        # Update summary
        self.subtotal = overall_subtotal
        vat_percent = self.vat_percent or 0
        self.vat_amount = (overall_subtotal * vat_percent) / 100
        self.grand_total = overall_subtotal + self.vat_amount
    
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
