from . import __version__ as app_version

app_name = "fitout_customization"
app_title = "Fitout Customization"
app_publisher = "Tripod Mena"
app_description = "Custom app for fitout"
app_email = "erp@tripodmena.com"
app_license = "MIT"

doctype_js = {
    "Lead": "public/js/lead.js"
}

fixtures = [
    {
        "dt": "Custom Field",
        "filters": [["dt", "=", "Lead"], ["fieldname", "like", "custom_%"]]
    }
]

after_install = "fitout_customization.setup.after_install"
after_migrate = "fitout_customization.setup.after_install"
