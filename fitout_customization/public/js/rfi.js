frappe.ui.form.on('RFI', {
    load_checklist_btn: function(frm) {
        frappe.call({
            method: 'fitout_customization.fitout_estimation.doctype.rfi.rfi.load_standard_checklist',
            args: {
                rfi_name: frm.doc.name
            },
            callback: function(r) {
                if (r.message) {
                    frm.reload_doc();
                }
            }
        });
    }
});

// Auto-uncheck opposite checkbox
frappe.ui.form.on('RFI Checklist Item', {
    received: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        if (row.received) {
            row.not_received = 0;
            frm.refresh_field('checklist_items');
        }
    },
    not_received: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        if (row.not_received) {
            row.received = 0;
            frm.refresh_field('checklist_items');
        }
    }
});
