frappe.ui.form.on('Opportunity', {
    refresh: function(frm) {
        // Add custom button to create BOQ
        if (frm.doc.docstatus === 0 && frm.doc.custom_boq_type) {
            frm.add_custom_button(__('Create BOQ'), function() {
                // Check if RFI is required but not completed
                if (frm.doc.custom_rfi_required) {
                    frappe.call({
                        method: 'frappe.client.get_list',
                        args: {
                            doctype: 'RFI',
                            filters: {
                                opportunity: frm.doc.name,
                                status: 'Completed'
                            },
                            limit: 1
                        },
                        callback: function(r) {
                            if (!r.message || r.message.length === 0) {
                                frappe.msgprint(__('Please complete RFI before creating BOQ'));
                                return;
                            }
                            check_site_survey(frm);
                        }
                    });
                } else {
                    check_site_survey(frm);
                }
            });
        }
    }
});

function check_site_survey(frm) {
    // Check if Site Survey is required but not completed
    if (frm.doc.custom_site_survey_required) {
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Site Survey',
                filters: {
                    opportunity: frm.doc.name,
                    status: 'Completed'
                },
                limit: 1
            },
            callback: function(r) {
                if (!r.message || r.message.length === 0) {
                    frappe.msgprint(__('Please complete Site Survey before creating BOQ'));
                    return;
                }
                create_boq(frm);
            }
        });
    } else {
        create_boq(frm);
    }
}

function create_boq(frm) {
    // Create new BOQ linked to this Opportunity
    frappe.route_options = {
        "opportunity": frm.doc.name
    };
    frappe.new_doc("BOQ");
}
