frappe.ui.form.on('BOQ', {
    validate: function(frm) {
        calculate_all_totals(frm);
    }
});

// Add calculation for all 29 section child tables
const sections = [
    'preliminaries', 'structural_works', 'civil_works', 'flooring_works',
    'floor_finishes_works', 'partition_and_cladding_works', 'wall_finishes_works',
    'ceiling_works', 'ceiling_finishes_works', 'shop_front_works', 'door_works',
    'joinery_works', 'loose_furniture_works', 'exterior_works', 'landscaping_works',
    'hvac_works', 'electrical_works', 'lighting_works', 'fire_life_safety_works',
    'it_works', 'cctv_works', 'access_control_works', 'access_point_works',
    'music_system_works', 'av_works', 'plumbing_works', 'sanitarywares',
    'white_goods', 'miscellaneous_works'
];

sections.forEach(function(section) {
    const child_table = `BOQ ${section.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).replace('And', '&')}`;
    
    frappe.ui.form.on(child_table, {
        qty: function(frm, cdt, cdn) {
            calculate_line_amount(frm, cdt, cdn);
        },
        rate: function(frm, cdt, cdn) {
            calculate_line_amount(frm, cdt, cdn);
        }
    });
    
    frappe.ui.form.on('BOQ', {
        [`markup_${section}`]: function(frm) {
            calculate_section_total(frm, section);
        }
    });
});

function calculate_line_amount(frm, cdt, cdn) {
    let row = locals[cdt][cdn];
    row.amount = (row.qty || 0) * (row.rate || 0);
    refresh_field(cdt);
}

function calculate_section_total(frm, section) {
    const items = frm.doc[`items_${section}`] || [];
    const base_total = items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const markup_percent = frm.doc[`markup_${section}`] || 0;
    const markup_amount = (base_total * markup_percent) / 100;
    
    frm.set_value(`base_total_${section}`, base_total);
    frm.set_value(`markup_amount_${section}`, markup_amount);
    frm.set_value(`section_total_${section}`, base_total + markup_amount);
}

function calculate_all_totals(frm) {
    let overall_total = 0;
    
    sections.forEach(function(section) {
        const section_total = frm.doc[`section_total_${section}`] || 0;
        overall_total += section_total;
    });
    
    frm.set_value('subtotal', overall_total);
    const vat_percent = frm.doc.vat_percent || 0;
    const vat_amount = (overall_total * vat_percent) / 100;
    frm.set_value('vat_amount', vat_amount);
    frm.set_value('grand_total', overall_total + vat_amount);
}
