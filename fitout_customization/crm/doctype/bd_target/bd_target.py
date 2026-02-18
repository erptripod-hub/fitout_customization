import frappe
from frappe.model.document import Document

class BDTarget(Document):
    def validate(self):
        self.auto_split_quarterly_targets()

    def auto_split_quarterly_targets(self):
        """Auto split annual target equally if quarterly targets are not set"""
        if self.annual_target:
            quarter = self.annual_target / 4
            if not self.q1_target:
                self.q1_target = quarter
            if not self.q2_target:
                self.q2_target = quarter
            if not self.q3_target:
                self.q3_target = quarter
            if not self.q4_target:
                self.q4_target = quarter
