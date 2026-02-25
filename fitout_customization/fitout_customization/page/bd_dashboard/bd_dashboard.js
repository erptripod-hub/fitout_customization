frappe.pages['bd-dashboard'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'BD Dashboard',
		single_column: true
	});

	page.add_inner_button('Refresh', function() { load_data(); });

	$('<style>').text(
		'.bdd{padding:20px;background:#f0f4f8;min-height:100vh}' +
		'.bdd .hdr{background:#0f1623;border-radius:8px;padding:16px 22px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px}' +
		'.bdd .hdr h2{font-size:16px;font-weight:800;color:#fff;margin:0}' +
		'.bdd .hdr h2 span{color:#60a5fa}' +
		'.bdd .hdr p{font-size:11px;color:#64748b;margin-top:3px}' +
		'.bdd .hdr-r{display:flex;gap:8px;align-items:center}' +
		'.bdd .hdr-r select{background:#1e2a3b;border:1px solid #2d3748;color:#e2e8f0;padding:6px 10px;border-radius:6px;font-size:12px}' +
		'.bdd .sec{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin:18px 0 10px 0}' +
		'.bdd .krow{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:4px}' +
		'.bdd .krow6{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:4px}' +
		'.bdd .kc{background:#fff;border-radius:8px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,0.08);border-top:4px solid #2563eb}' +
		'.bdd .kc .t{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#64748b;font-weight:600;margin-bottom:8px}' +
		'.bdd .kc .v{font-size:24px;font-weight:800;color:#1e293b;line-height:1}' +
		'.bdd .kc .s{font-size:10px;color:#64748b;margin-top:5px}' +
		'.bdd .g2{display:grid;grid-template-columns:1.4fr 1fr;gap:14px;margin-bottom:16px}' +
		'.bdd .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:16px}' +
		'.bdd .g32{display:grid;grid-template-columns:2fr 1fr;gap:14px;margin-bottom:16px}' +
		'.bdd .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:16px}' +
		'.bdd .pn{background:#fff;border-radius:8px;padding:18px;box-shadow:0 1px 3px rgba(0,0,0,0.08)}' +
		'.bdd .pt{font-size:13px;font-weight:700;color:#1e293b;margin-bottom:3px}' +
		'.bdd .ps{font-size:11px;color:#64748b;margin-bottom:14px}' +
		'.bdd .fr{display:flex;align-items:center;gap:8px;margin-bottom:8px}' +
		'.bdd .fl{width:160px;font-size:11px;font-weight:500;flex-shrink:0;color:#374151}' +
		'.bdd .fk{flex:1;height:24px;background:#f1f5f9;border-radius:5px;overflow:hidden}' +
		'.bdd .fb{height:100%;border-radius:5px;display:flex;align-items:center;padding:0 8px;min-width:20px}' +
		'.bdd .fb span{font-size:11px;font-weight:600;color:#fff}' +
		'.bdd .fn{width:28px;text-align:right;font-size:12px;font-weight:700;color:#1e293b}' +
		'.bdd .fp{width:32px;text-align:right;font-size:11px;color:#64748b}' +
		'.bdd .qg{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}' +
		'.bdd .qc{background:#f8fafc;border-radius:8px;padding:14px;border:1px solid #e2e8f0}' +
		'.bdd .qh{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}' +
		'.bdd .ql{font-size:16px;font-weight:800;color:#2563eb}' +
		'.bdd .qn{font-size:10px;background:#eff6ff;color:#2563eb;padding:2px 8px;border-radius:10px;font-weight:600}' +
		'.bdd .qv{font-size:16px;font-weight:700;color:#1e293b}' +
		'.bdd .qt{font-size:10px;color:#64748b;margin-top:3px}' +
		'.bdd .qb{height:5px;background:#e2e8f0;border-radius:3px;margin-top:8px;overflow:hidden}' +
		'.bdd .qf{height:100%;border-radius:3px}' +
		'.bdd .qp{font-size:10px;color:#64748b;margin-top:4px;text-align:right}' +
		'.bdd .fwc{border-radius:8px;padding:16px;text-align:center;border:1px solid #e2e8f0}' +
		'.bdd .fwc.d30{background:#f0fdf4;border-color:#bbf7d0}' +
		'.bdd .fwc.d60{background:#fffbeb;border-color:#fde68a}' +
		'.bdd .fwc.d90{background:#eff6ff;border-color:#bfdbfe}' +
		'.bdd .fwv{font-size:20px;font-weight:800;margin-bottom:4px}' +
		'.bdd .fwc.d30 .fwv{color:#16a34a}' +
		'.bdd .fwc.d60 .fwv{color:#d97706}' +
		'.bdd .fwc.d90 .fwv{color:#2563eb}' +
		'.bdd .fwl{font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.5px}' +
		'.bdd .fwn{font-size:11px;color:#64748b;margin-top:4px}' +
		'.bdd table{width:100%;border-collapse:collapse}' +
		'.bdd th{font-size:10px;text-transform:uppercase;letter-spacing:0.8px;color:#64748b;font-weight:600;padding:7px 10px;text-align:left;border-bottom:2px solid #e2e8f0}' +
		'.bdd td{font-size:12px;padding:9px 10px;border-bottom:1px solid #f1f5f9;vertical-align:middle;color:#1e293b}' +
		'.bdd tr:last-child td{border-bottom:none}' +
		'.bdd tr:hover td{background:#f8fafc}' +
		'.bdd .av{width:26px;height:26px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff}' +
		'.bdd .pg{display:flex;align-items:center;gap:6px}' +
		'.bdd .pk{width:55px;height:6px;background:#f1f5f9;border-radius:3px;overflow:hidden}' +
		'.bdd .pf{height:100%;border-radius:3px}' +
		'.bdd .hg{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:14px}' +
		'.bdd .hc{border-radius:8px;padding:12px;text-align:center}' +
		'.bdd .hc.a{background:#f0fdf4;border:1px solid #bbf7d0}' +
		'.bdd .hc.s{background:#fffbeb;border:1px solid #fde68a}' +
		'.bdd .hc.g{background:#fef2f2;border:1px solid #fecaca}' +
		'.bdd .hn{font-size:28px;font-weight:800}' +
		'.bdd .hc.a .hn{color:#16a34a}' +
		'.bdd .hc.s .hn{color:#d97706}' +
		'.bdd .hc.g .hn{color:#dc2626}' +
		'.bdd .hl{font-size:10px;font-weight:700;text-transform:uppercase;margin-top:2px;color:#64748b}' +
		'.bdd .hx{font-size:10px;margin-top:2px}' +
		'.bdd .hc.a .hx{color:#16a34a}' +
		'.bdd .hc.s .hx{color:#d97706}' +
		'.bdd .hc.g .hx{color:#dc2626}' +
		'.bdd .al{display:flex;gap:10px;padding:10px 12px;border-radius:8px;margin-bottom:8px}' +
		'.bdd .al.r{background:#fef2f2;border:1px solid #fecaca}' +
		'.bdd .al.y{background:#fffbeb;border:1px solid #fde68a}' +
		'.bdd .an{font-size:12px;font-weight:600}' +
		'.bdd .al.r .an{color:#dc2626}' +
		'.bdd .al.y .an{color:#d97706}' +
		'.bdd .ax{font-size:10px;color:#64748b;margin-top:2px}' +
		'.bdd .br2{display:flex;align-items:center;gap:8px;margin-bottom:9px}' +
		'.bdd .bl{width:110px;font-size:11px;font-weight:500;flex-shrink:0;color:#374151;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
		'.bdd .bt{flex:1;height:10px;background:#f1f5f9;border-radius:5px;overflow:hidden}' +
		'.bdd .bf{height:100%;border-radius:5px}' +
		'.bdd .bv{width:28px;text-align:right;font-size:11px;color:#64748b;font-weight:600}' +
		'.bdd .dv{height:1px;background:#e2e8f0;margin:12px 0}' +
		'.bdd .ug{font-size:11px;font-weight:700;color:#dc2626;margin-bottom:10px;text-transform:uppercase}' +
		'.bdd .ld{text-align:center;padding:60px;color:#64748b;font-size:14px}'
	).appendTo('head');

	$(wrapper).find('.page-content').html(
		'<div class="bdd">' +
		'<div class="hdr">' +
		'<div><h2>TRIPOD MENA | <span>BD Performance Dashboard</span></h2><p id="bd-ts">Loading...</p></div>' +
		'<div class="hdr-r">' +
		'<select id="bd-yr"><option value="2026">2026</option><option value="2025">2025</option><option value="2024">2024</option></select>' +
		'<select id="bd-ow"><option value="">All Salespersons</option></select>' +
		'</div>' +
		'</div>' +
		'<div id="bd-body"><div class="ld">Loading data...</div></div>' +
		'</div>'
	);

	document.getElementById('bd-yr').addEventListener('change', load_data);
	document.getElementById('bd-ow').addEventListener('change', load_data);

	function fmt(v) {
		if (!v) return 'AED 0';
		if (v >= 1000000) return 'AED ' + (v/1000000).toFixed(1) + 'M';
		if (v >= 1000) return 'AED ' + Math.round(v/1000) + 'K';
		return 'AED ' + parseInt(v).toLocaleString();
	}
	function pc(v,t) { return t ? Math.min(100, Math.round(v*100/t)) : 0; }

	function make_bars(obj, cols) {
		var entries = Object.entries(obj).filter(function(x){return x[1]>0 && x[0]!='Unknown';}).sort(function(a,b){return b[1]-a[1];});
		if (!entries.length) return '<div style="color:#64748b;font-size:12px;padding:8px 0">No data yet — fill fields in leads</div>';
		var mx = entries[0][1];
		return entries.map(function(x,i){
			return '<div class="br2"><div class="bl" title="'+x[0]+'">'+x[0]+'</div><div class="bt"><div class="bf" style="width:'+pc(x[1],mx)+'%;background:'+cols[i%cols.length]+'"></div></div><div class="bv">'+x[1]+'</div></div>';
		}).join('');
	}

	function render(d) {
		var cols = ['#2563eb','#7c3aed','#16a34a','#d97706','#0d9488','#dc2626','#f97316','#06b6d4'];

		var ow = document.getElementById('bd-ow');
		var cur = ow.value;
		ow.innerHTML = '<option value="">All Salespersons</option>';
		(d.owner_data||[]).forEach(function(o){
			var op = document.createElement('option');
			op.value = o.name;
			op.textContent = o.name.split('@')[0];
			if (o.name===cur) op.selected=true;
			ow.appendChild(op);
		});

		document.getElementById('bd-ts').textContent = 'Last updated: ' + new Date().toLocaleString() + ' | Year: ' + d.year;

		// Section 1 - Core KPIs
		var kpi1 =
			'<div class="sec">Pipeline Overview</div>' +
			'<div class="krow6" style="margin-bottom:16px">' +
			'<div class="kc" style="border-top-color:#2563eb"><div class="t">Total Leads</div><div class="v">'+d.total+'</div><div class="s">All active leads</div></div>' +
			'<div class="kc" style="border-top-color:#0d9488"><div class="t">Pipeline Value</div><div class="v" style="font-size:18px">'+fmt(d.pipeline_value)+'</div><div class="s">Gross estimated</div></div>' +
			'<div class="kc" style="border-top-color:#7c3aed"><div class="t">Weighted Pipeline</div><div class="v" style="font-size:18px">'+fmt(d.weighted_pipeline)+'</div><div class="s">Probability adjusted</div></div>' +
			'<div class="kc" style="border-top-color:#16a34a"><div class="t">Est. Margin Value</div><div class="v" style="font-size:18px">'+fmt(d.total_margin)+'</div><div class="s">Gross profit est.</div></div>' +
			'<div class="kc" style="border-top-color:#d97706"><div class="t">Qualified</div><div class="v">'+d.qualified+'</div><div class="s" style="color:#16a34a">'+pc(d.qualified,d.total)+'% of total</div></div>' +
			'<div class="kc" style="border-top-color:#dc2626"><div class="t">Ghost Leads</div><div class="v" style="color:#dc2626">'+d.ghost+'</div><div class="s" style="color:#dc2626">Need urgent action</div></div>' +
			'</div>';

		// Section 2 - 90 day forward view
		var forward =
			'<div class="sec">90-Day Forward Visibility — What Are We Closing?</div>' +
			'<div class="g3" style="margin-bottom:16px">' +
			'<div class="pn fwc d30"><div class="fwl">Next 30 Days</div><div class="fwv">'+fmt(d.forward_30.value)+'</div><div class="fwn">'+d.forward_30.count+' leads closing</div></div>' +
			'<div class="pn fwc d60"><div class="fwl">Next 31-60 Days</div><div class="fwv">'+fmt(d.forward_60.value)+'</div><div class="fwn">'+d.forward_60.count+' leads closing</div></div>' +
			'<div class="pn fwc d90"><div class="fwl">Next 61-90 Days</div><div class="fwv">'+fmt(d.forward_90.value)+'</div><div class="fwn">'+d.forward_90.count+' leads closing</div></div>' +
			'</div>';

		// Section 3 - Funnel with conversion ratios
		var stages = ['New','Contacted','Meeting Scheduled','Qualified','Converted to Opportunity','Lost'];
		var stage_colors = ['#2563eb','#3b82f6','#60a5fa','#16a34a','#7c3aed','#dc2626'];
		var funnel = stages.map(function(st,i){
			var cnt = d.stage_counts[st] || 0;
			var p = pc(cnt, d.total);
			return '<div class="fr"><div class="fl">'+st+'</div><div class="fk"><div class="fb" style="width:'+Math.max(p,2)+'%;background:'+stage_colors[i]+'"><span>'+cnt+'</span></div></div><div class="fn">'+cnt+'</div><div class="fp">'+p+'%</div></div>';
		}).join('');

		// Section 4 - Quarterly
		var qhtml = ['Q1','Q2','Q3','Q4'].map(function(q){
			var tgt = (d.targets||[]).reduce(function(sum,t){return sum+(t[q.toLowerCase()+'_target']||0);},0);
			var val = (d.quarter_value||{})[q]||0;
			var cnt = (d.quarters||{})[q]||0;
			var pr = pc(val,tgt);
			var col = pr>=75?'#16a34a':pr>=40?'#d97706':'#dc2626';
			return '<div class="qc"><div class="qh"><div class="ql">'+q+'</div><div class="qn">'+cnt+' leads</div></div><div class="qv">'+fmt(val)+'</div><div class="qt">'+(tgt?'Target: '+fmt(tgt):'No target set')+'</div><div class="qb"><div class="qf" style="width:'+pr+'%;background:'+col+'"></div></div><div class="qp">'+(tgt?pr+'% achieved':'—')+'</div></div>';
		}).join('');

		// Section 5 - Salesperson table
		var orows = (d.owner_data||[]).sort(function(a,b){return b.value-a.value;}).map(function(o,i){
			var tgt = (d.targets||[]).find(function(t){return t.sales_person===o.name;})||{};
			var ann = tgt.annual_target||0;
			var pr = pc(o.value,ann);
			var col = pr>=75?'#16a34a':pr>=40?'#d97706':'#dc2626';
			var ini = o.name.split('@')[0].charAt(0).toUpperCase();
			return '<tr>' +
				'<td><div style="display:flex;align-items:center;gap:8px"><div class="av" style="background:'+cols[i%cols.length]+'">'+ini+'</div><strong>'+o.name.split('@')[0]+'</strong></div></td>' +
				'<td>'+(ann?fmt(ann):'—')+'</td>' +
				'<td style="color:#0d9488;font-weight:600">'+fmt(o.value)+'</td>' +
				'<td style="color:#7c3aed;font-weight:600">'+fmt(o.weighted)+'</td>' +
				'<td style="color:#16a34a;font-weight:600">'+fmt(o.margin)+'</td>' +
				'<td>'+o.total+'</td><td>'+o.qualified+'</td><td>'+o.converted+'</td>' +
				'<td>'+(ann?'<div class="pg"><div class="pk"><div class="pf" style="width:'+pr+'%;background:'+col+'"></div></div><span style="font-size:11px;font-weight:700;color:'+col+'">'+pr+'%</span></div>':'—')+'</td>' +
				'</tr>';
		}).join('') || '<tr><td colspan="9" style="color:#64748b;text-align:center;padding:20px">No data</td></tr>';

		// Ghost alerts
		var ghtml = (d.ghost_leads||[]).length ? (d.ghost_leads||[]).map(function(l){
			var isg = l.custom_ghost_status==='Ghost';
			return '<div class="al '+(isg?'r':'y')+'"><div style="font-size:15px">'+(isg?'🔴':'🟡')+'</div><div><div class="an">'+(l.company_name||l.lead_name||l.name)+'</div><div class="ax">'+(l.lead_owner||'').split('@')[0]+' · '+(l.custom_lead_status||'')+' · '+l.custom_ghost_status+' · '+fmt(l.custom_estimated_value)+'</div></div></div>';
		}).join('') : '<div style="color:#16a34a;font-size:12px;padding:8px 0">No ghost or stale leads</div>';

		document.getElementById('bd-body').innerHTML =
			kpi1 +
			forward +
			'<div class="g2">' +
			'<div class="pn"><div class="pt">BD Pipeline Funnel</div><div class="ps">Stage conversion ratios</div>'+funnel+'</div>' +
			'<div class="pn"><div class="pt">Quarterly Overview</div><div class="ps">Pipeline value vs target</div><div class="qg">'+qhtml+'</div></div>' +
			'</div>' +
			'<div class="sec">Salesperson Performance</div>' +
			'<div class="pn" style="margin-bottom:16px"><div class="pt">Target vs Actual — '+d.year+'</div><div class="ps">Pipeline, weighted pipeline, margin and achievement per salesperson</div>' +
			'<table><thead><tr><th>Salesperson</th><th>Annual Target</th><th>Pipeline Value</th><th>Weighted Pipeline</th><th>Est. Margin</th><th>Leads</th><th>Qualified</th><th>Converted</th><th>Achievement</th></tr></thead>' +
			'<tbody>'+orows+'</tbody></table></div>' +
			'<div class="g32">' +
			'<div class="pn"><div class="pt">Lead Health Monitor</div><div class="ps">Contact activity status</div>' +
			'<div class="hg"><div class="hc a"><div class="hn">'+d.active+'</div><div class="hl">Active</div><div class="hx">under 30 days</div></div>' +
			'<div class="hc s"><div class="hn">'+d.stale+'</div><div class="hl">Stale</div><div class="hx">30-60 days</div></div>' +
			'<div class="hc g"><div class="hn">'+d.ghost+'</div><div class="hl">Ghost</div><div class="hx">60+ days</div></div></div>' +
			'<div class="dv"></div><div class="ug">Urgent Action Required</div>'+ghtml+'</div>' +
			'<div class="pn"><div class="pt">By Lead Source</div><div class="ps" style="margin-bottom:14px">Where leads come from</div>'+make_bars(d.by_source,cols)+'</div>' +
			'</div>' +
			'<div class="sec">Segmentation</div>' +
			'<div class="g4">' +
			'<div class="pn"><div class="pt">By Project Type</div><div class="ps" style="margin-bottom:14px">Sector focus</div>'+make_bars(d.by_type,cols)+'</div>' +
			'<div class="pn"><div class="pt">By Scope</div><div class="ps" style="margin-bottom:14px">Work type</div>'+make_bars(d.by_scope,[cols[2],cols[4],cols[1],cols[0],cols[5]])+'</div>' +
			'<div class="pn"><div class="pt">By Customer Type</div><div class="ps" style="margin-bottom:14px">New vs existing</div>'+make_bars(d.by_ctype,[cols[3],cols[0],cols[2]])+'</div>' +
			'<div class="pn"><div class="pt">By Geography</div><div class="ps" style="margin-bottom:14px">City breakdown</div>'+make_bars(d.by_city,[cols[4],cols[0],cols[1],cols[3],cols[2]])+'</div>' +
			'</div>';
	}

	function load_data() {
		document.getElementById('bd-body').innerHTML = '<div class="ld">Loading...</div>';
		frappe.call({
			method: 'fitout_customization.fitout_customization.page.bd_dashboard.bd_dashboard.get_dashboard_data',
			args: {year: document.getElementById('bd-yr').value, salesperson: document.getElementById('bd-ow').value},
			callback: function(r) {
				if (r.message) render(r.message);
				else document.getElementById('bd-body').innerHTML = '<div class="ld">No data returned.</div>';
			},
			error: function(e) {
				document.getElementById('bd-body').innerHTML = '<div class="ld">Error loading data.</div>';
				console.error(e);
			}
		});
	}

	load_data();
};
