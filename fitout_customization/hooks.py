from . import __version__ as app_version

app_name = "fitout_customization"
app_title = "Fitout Customization"
app_publisher = "Tripod Mena"
app_description = "Custom app for fitout"
app_email = "erp@tripodmena.com"
app_license = "MIT"

# include js in doctype views
doctype_js = {
    "Lead": "public/js/lead.js"
}

# Fixtures - auto export/import custom fields
fixtures = [
    {
        "dt": "Custom Field",
        "filters": [["dt", "=", "Lead"], ["fieldname", "like", "custom_%"]]
    }
]
