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
        
        section_names = [
            "Preliminaries", "Structural Works", "Civil Works", "Flooring Works",
            "Floor Finishes Works", "Partition & Cladding Works", "Wall Finishes Works",
            "Ceiling Works", "Ceiling Finishes Works", "Shop Front Works", "Door Works",
            "Joinery Works", "Loose Furniture Works", "Exterior Works", "Landscaping Works",
            "HVAC Works", "Electrical Works", "Lighting Works", "Fire Life Safety Works",
            "IT Works", "CCTV Works", "Access Control Works", "Access Point Works",
            "Music System Works", "AV Works", "Plumbing Works", "Sanitaryware's",
            "White Goods", "Miscellaneous Works"
        ]
        
        overall_subtotal = 0
        summary_rows = []
        
        for idx, section in enumerate(sections):
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
                
                # Add to summary if section has items
                if len(items) > 0:
                    summary_rows.append({
                        'letter': chr(65 + idx),  # A, B, C, etc.
                        'name': section_names[idx],
                        'total': section_total
                    })
        
        # Generate summary HTML table
        self.generate_summary_table(summary_rows, overall_subtotal)
        
        # Update summary
        self.subtotal = overall_subtotal
        vat_percent = self.vat_percent or 0
        self.vat_amount = (overall_subtotal * vat_percent) / 100
        self.grand_total = overall_subtotal + self.vat_amount
    
    def generate_summary_table(self, summary_rows, subtotal):
        """Generate HTML summary table"""
        html = """
        <table class='table table-bordered' style='margin-top:20px;'>
            <thead style='background:#1f4788;color:white;'>
                <tr>
                    <th style='width:10%;'>Ref</th>
                    <th style='width:60%;'>Section Name</th>
                    <th style='width:30%;text-align:right;'>Amount</th>
                </tr>
            </thead>
            <tbody>
        """
        
        for row in summary_rows:
            html += f"""
                <tr>
                    <td><strong>{row['letter']}</strong></td>
                    <td>{row['name']}</td>
                    <td style='text-align:right;'>{frappe.utils.fmt_money(row['total'], currency=self.currency if hasattr(self, 'currency') else 'AED')}</td>
                </tr>
            """
        
        vat_amount = (subtotal * (self.vat_percent or 0)) / 100
        grand_total = subtotal + vat_amount
        
        html += f"""
            </tbody>
            <tfoot>
                <tr style='background:#f0f4f8;'>
                    <td colspan='2' style='text-align:right;'><strong>SUB TOTAL AMOUNT</strong></td>
                    <td style='text-align:right;'><strong>{frappe.utils.fmt_money(subtotal, currency=self.currency if hasattr(self, 'currency') else 'AED')}</strong></td>
                </tr>
                <tr>
                    <td colspan='2' style='text-align:right;'><strong>VAT @ {self.vat_percent or 0}%</strong></td>
                    <td style='text-align:right;'><strong>{frappe.utils.fmt_money(vat_amount, currency=self.currency if hasattr(self, 'currency') else 'AED')}</strong></td>
                </tr>
                <tr style='background:#1f4788;color:white;'>
                    <td colspan='2' style='text-align:right;'><strong>FINAL VALUE OFFERED</strong></td>
                    <td style='text-align:right;'><strong>{frappe.utils.fmt_money(grand_total, currency=self.currency if hasattr(self, 'currency') else 'AED')}</strong></td>
                </tr>
            </tfoot>
        </table>
        """
        
        self.boq_summary_table = html
    
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
