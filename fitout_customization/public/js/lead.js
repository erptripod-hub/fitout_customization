frappe.ui.form.on('Lead', {
    refresh: function(frm) {
        frm.trigger('calculate_ghost_status');
    },

    custom_last_contact_date: function(frm) {
        frm.trigger('calculate_ghost_status');
    },

    custom_lead_status: function(frm) {
        frm.trigger('calculate_ghost_status');
    },

    calculate_ghost_status: function(frm) {
        if (frm.doc.custom_lead_status === 'Converted to Opportunity') {
            frm.set_value('custom_ghost_status', 'Active');
            return;
        }

        if (!frm.doc.custom_last_contact_date) {
            frm.set_value('custom_ghost_status', 'Ghost');
        } else {
            let last_contact = frappe.datetime.str_to_obj(frm.doc.custom_last_contact_date);
            let today = frappe.datetime.str_to_obj(frappe.datetime.now_date());
            let diff = frappe.datetime.get_diff(today, last_contact);

            if (diff > 60) {
                frm.set_value('custom_ghost_status', 'Ghost');
            } else if (diff > 30) {
                frm.set_value('custom_ghost_status', 'Stale');
            } else {
                frm.set_value('custom_ghost_status', 'Active');
            }
        }

        if (frm.doc.creation) {
            let month = new Date(frm.doc.creation).getMonth() + 1;
            let quarter = 'Q' + Math.ceil(month / 3);
            frm.set_value('custom_quarter', quarter);
        }
    }
});
