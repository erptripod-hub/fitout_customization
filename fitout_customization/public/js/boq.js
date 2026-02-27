frappe.ui.form.on('BOQ', {
    refresh_sections_btn: function(frm) {
        frappe.call({
            method: 'fitout_customization.fitout_estimation.doctype.boq.boq.refresh_sections',
            args: {
                boq_name: frm.doc.name
            },
            callback: function(r) {
                if (r.message) {
                    frm.reload_doc();
                }
            }
        });
    },
    
    validate: function(frm) {
        // Calculate line item amounts
        frm.doc.line_items.forEach(function(item) {
            item.amount = (item.qty || 0) * (item.rate || 0);
        });
        frm.refresh_field('line_items');
    }
});

frappe.ui.form.on('BOQ Line Item', {
    qty: function(frm, cdt, cdn) {
        calculate_line_amount(frm, cdt, cdn);
    },
    rate: function(frm, cdt, cdn) {
        calculate_line_amount(frm, cdt, cdn);
    }
});

frappe.ui.form.on('BOQ Section Markup', {
    markup_percent: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        row.markup_amount = (row.base_amount || 0) * (row.markup_percent || 0) / 100;
        row.total_amount = (row.base_amount || 0) + (row.markup_amount || 0);
        frm.refresh_field('section_markup');
    }
});

function calculate_line_amount(frm, cdt, cdn) {
    let row = locals[cdt][cdn];
    row.amount = (row.qty || 0) * (row.rate || 0);
    frm.refresh_field('line_items');
}
