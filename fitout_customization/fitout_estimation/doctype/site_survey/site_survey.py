import frappe
from frappe.model.document import Document

class SiteSurvey(Document):
    def validate(self):
        if self.status == "In Progress" and not self.survey_date:
            self.survey_date = frappe.utils.today()
