frappe.pages['bd-dashboard'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'BD Performance Dashboard',
		single_column: true
	});

	page.add_inner_button('Refresh', function() {
		load_data();
	});

	var css = '.bd{background:#f0f4f8;padding:20px 28px;min-height:100vh}' +
		'.bd .hd{background:#0f1623;border-radius:10px;padding:18px 24px;margin-bottom:18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}' +
		'.bd .hd h2{font-size:18px;font-weight:800;color:#fff;margin:0}' +
		'.bd .hd h2 b{color:#60a5fa;font-weight:800}' +
		'.bd .hd p{color:#64748b;font-size:11px;margin-top:3px}' +
		'.bd .hd select{background:#1e2a3b;border:1px solid #2d3748;color:#e2e8f0;padding:6px 10px;border-radius:6px;font-size:12px;margin-left:6px}' +
		'.bd .kr{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:16px}' +
		'.bd .kc{background:#fff;border-radius:10px;padding:16px;box-shadow:0 1px 4px rgba(0,0,0,0.07)}' +
		'.bd .kc .t{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#64748b;font-weight:600;margin-bottom:8px}' +
		'.bd .kc .v{font-size:26px;font-weight:800;color:#1e293b;line-height:1}' +
		'.bd .kc .s{font-size:10px;color:#64748b;margin-top:5px}' +
		'.bd .g2{display:grid;grid-template-columns:1.4fr 1fr;gap:14px;margin-bottom:16px}' +
		'.bd .g32{display:grid;grid-template-columns:2fr 1fr;gap:14px;margin-bottom:16px}' +
		'.bd .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:16px}' +
		'.bd .pn{background:#fff;border-radius:10px;padding:18px;box-shadow:0 1px 4px rgba(0,0,0,0.07)}' +
		'.bd .pn .pt{font-size:13px;font-weight:700;color:#1e293b;margin-bottom:3px}' +
		'.bd .pn .ps{font-size:11px;color:#64748b;margin-bottom:14px}' +
		'.bd .fr{display:flex;align-items:center;gap:8px;margin-bottom:7px}' +
		'.bd .fl{width:140px;font-size:11px;font-weight:500;flex-shrink:0;color:#374151}' +
		'.bd .fk{flex:1;height:26px;background:#f1f5f9;border-radius:6px;overflow:hidden}' +
		'.bd .fb{height:100%;border-radius:6px;display:flex;align-items:center;padding:0 10px;min-width:30px}' +
		'.bd .fb span{font-size:11px;font-weight:600;color:#fff}' +
		'.bd .fn{width:30px;text-align:right;font-size:12px;font-weight:700}' +
		'.bd .fp{width:34px;text-align:right;font-size:11px;color:#64748b}' +
		'.bd .qg{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}' +
		'.bd .qc{background:#f8fafc;border-radius:8px;padding:14px;border:1px solid #e2e8f0}' +
		'.bd .qc .qh{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}' +
		'.bd .qc .ql{font-size:16px;font-weight:800;color:#2563eb}' +
		'.bd .qc .qn{font-size:10px;background:#eff6ff;color:#2563eb;padding:2px 8px;border-radius:10px;font-weight:600}' +
		'.bd .qc .qv{font-size:17px;font-weight:700;color:#1e293b}' +
		'.bd .qc .qt{font-size:10px;color:#64748b;margin-top:3px}' +
		'.bd .qc .qb{height:5px;background:#e2e8f0;border-radius:3px;margin-top:8px;overflow:hidden}' +
		'.bd .qc .qf{height:100%;border-radius:3px}' +
		'.bd .qc .qp{font-size:10px;color:#64748b;margin-top:4px;text-align:right}' +
		'.bd table{width:100%;border-collapse:collapse}' +
		'.bd th{font-size:10px;text-transform:uppercase;letter-spacing:0.8px;color:#64748b;font-weight:600;padding:7px 10px;text-align:left;border-bottom:2px solid #e2e8f0}' +
		'.bd td{font-size:12px;padding:9px 10px;border-bottom:1px solid #f1f5f9;vertical-align:middle;color:#1e293b}' +
		'.bd tr:last-child td{border-bottom:none}' +
		'.bd .av{width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff}' +
		'.bd .hg{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:14px}' +
		'.bd .hc{border-radius:8px;padding:12px;text-align:center}' +
		'.bd .hc.a{background:#f0fdf4;border:1px solid #bbf7d0}' +
		'.bd .hc.s{background:#fffbeb;border:1px solid #fde68a}' +
		'.bd .hc.g{background:#fef2f2;border:1px solid #fecaca}' +
		'.bd .hc .hn{font-size:28px;font-weight:800}' +
		'.bd .hc.a .hn{color:#16a34a}' +
		'.bd .hc.s .hn{color:#d97706}' +
		'.bd .hc.g .hn{color:#dc2626}' +
		'.bd .hc .hl{font-size:10px;font-weight:700;text-transform:uppercase;margin-top:2px;color:#64748b}' +
		'.bd .hc .hx{font-size:10px;margin-top:2px}' +
		'.bd .hc.a .hx{color:#16a34a}' +
		'.bd .hc.s .hx{color:#d97706}' +
		'.bd .hc.g .hx{color:#dc2626}' +
		'.bd .al{display:flex;gap:10px;padding:10px 12px;border-radius:8px;margin-bottom:8px}' +
		'.bd .al.r{background:#fef2f2;border:1px solid #fecaca}' +
		'.bd .al.y{background:#fffbeb;border:1px solid #fde68a}' +
		'.bd .al .an{font-size:12px;font-weight:600}' +
		'.bd .al.r .an{color:#dc2626}' +
		'.bd .al.y .an{color:#d97706}' +
		'.bd .al .ax{font-size:10px;color:#64748b;margin-top:2px}' +
		'.bd .br2{display:flex;align-items:center;gap:8px;margin-bottom:9px}' +
		'.bd .bl{width:100px;font-size:11px;font-weight:500;flex-shrink:0;color:#374151}' +
		'.bd .bt{flex:1;height:10px;background:#f1f5f9;border-radius:5px;overflow:hidden}' +
		'.bd .bf{height:100%;border-radius:5px}' +
		'.bd .bv{width:28px;text-align:right;font-size:11px;color:#64748b;font-weight:600}' +
		'.bd .dv{height:1px;background:#e2e8f0;margin:12px 0}' +
		'.bd .ug{font-size:11px;font-weight:700;color:#dc2626;margin-bottom:10px;text-transform:uppercase}' +
		'.bd .pg{display:flex;align-items:center;gap:6px}' +
		'.bd .pk{width:65px;height:6px;background:#f1f5f9;border-radius:3px;overflow:hidden}' +
		'.bd .pf{height:100%;border-radius:3px}' +
		'.bd .ld{text-align:center;padding:60px;color:#64748b;font-size:14px}';

	$('<style>').text(css).appendTo('head');

	var $wrap = $(wrapper).find('.page-content');
	$wrap.html(
		'<div class="bd">' +
		'<div class="hd">' +
		'<div><h2>TRIPOD MENA &nbsp;|&nbsp; <b>BD Performance Dashboard</b></h2><p id="bd-ts">Loading...</p></div>' +
		'<div>' +
		'<select id="bd-yr"><option value="2026">2026</option><option value="2025">2025</option><option value="2024">2024</option></select>' +
		'<select id="bd-ow"><option value="">All Salespersons</option></select>' +
		'</div>' +
		'</div>' +
		'<div id="bd-main"><div class="ld">Loading dashboard data...</div></div>' +
		'</div>'
	);

	document.getElementById('bd-yr').addEventListener('change', load_data);
	document.getElementById('bd-ow').addEventListener('change', load_data);

	function f(v) {
		if (!v) return 'AED 0';
		if (v >= 1000000) return 'AED ' + (v/1000000).toFixed(1) + 'M';
		if (v >= 1000) return 'AED ' + Math.round(v/1000) + 'K';
		return 'AED ' + parseInt(v).toLocaleString();
	}

	function pc(v,t) { return t ? Math.min(100, Math.round(v*100/t)) : 0; }

	function bar_rows(data, cols) {
		var e = Object.entries(data||{}).filter(function(x){return x[1]>0;}).sort(function(a,b){return b[1]-a[1];});
		if (!e.length) return '<div style="color:#64748b;font-size:12px">No data yet</div>';
		var mx = e[0][1];
		return e.map(function(x,i){
			return '<div class="br2"><div class="bl">'+x[0]+'</div><div class="bt"><div class="bf" style="width:'+pc(x[1],mx)+'%;background:'+cols[i%cols.length]+'"></div></div><div class="bv">'+x[1]+'</div></div>';
		}).join('');
	}

	function render(d) {
		var s = d.summary;
		var h = d.health;
		var cols = ['#2563eb','#7c3aed','#16a34a','#d97706','#0d9488','#dc2626'];

		var ow = document.getElementById('bd-ow');
		var cur = ow.value;
		ow.innerHTML = '<option value="">All Salespersons</option>';
		(d.by_owner||[]).forEach(function(o){
			var op = document.createElement('option');
			op.value = o.name;
			op.textContent = o.name.split('@')[0];
			if (o.name === cur) op.selected = true;
			ow.appendChild(op);
		});

		document.getElementById('bd-ts').textContent = 'Last updated: ' + new Date().toLocaleString() + ' | Year: ' + d.year;

		var funnel = [
			['New', s.total, 100, '#2563eb'],
			['Contacted', Math.round(s.total*0.79), 79, '#3b82f6'],
			['Meeting Scheduled', Math.round(s.total*0.57), 57, '#60a5fa'],
			['Qualified', s.qualified, pc(s.qualified,s.total), '#16a34a'],
			['Converted to Opp', s.converted, pc(s.converted,s.total), '#7c3aed'],
			['Lost', s.lost, pc(s.lost,s.total), '#dc2626']
		].map(function(r){
			return '<div class="fr"><div class="fl">'+r[0]+'</div><div class="fk"><div class="fb" style="width:'+Math.max(r[2],4)+'%;background:'+r[3]+'"><span>'+r[1]+' leads</span></div></div><div class="fn">'+r[1]+'</div><div class="fp">'+r[2]+'%</div></div>';
		}).join('');

		var qhtml = ['Q1','Q2','Q3','Q4'].map(function(q){
			var tgt = (d.targets||[]).reduce(function(sum,t){return sum+(t[q.toLowerCase()+'_target']||0);},0);
			var val = (d.quarter_value||{})[q]||0;
			var cnt = (d.quarters||{})[q]||0;
			var pr = pc(val,tgt);
			var col = pr>=75?'#16a34a':pr>=40?'#d97706':'#dc2626';
			return '<div class="qc"><div class="qh"><div class="ql">'+q+'</div><div class="qn">'+cnt+' leads</div></div><div class="qv">'+f(val)+'</div><div class="qt">'+(tgt?'Target: '+f(tgt):'No target set')+'</div><div class="qb"><div class="qf" style="width:'+pr+'%;background:'+col+'"></div></div><div class="qp">'+(tgt?pr+'% achieved':'—')+'</div></div>';
		}).join('');

		var orows = (d.by_owner||[]).sort(function(a,b){return b.value-a.value;}).map(function(o,i){
			var tgt = (d.targets||[]).find(function(t){return t.sales_person===o.name;})||{};
			var ann = tgt.annual_target||0;
			var pr = pc(o.value,ann);
			var col = pr>=75?'#16a34a':pr>=40?'#d97706':'#dc2626';
			var ini = o.name.split('@')[0].charAt(0).toUpperCase();
			return '<tr>' +
				'<td><div style="display:flex;align-items:center;gap:8px"><div class="av" style="background:'+cols[i%cols.length]+'">'+ini+'</div><strong>'+o.name.split('@')[0]+'</strong></div></td>' +
				'<td>'+(ann?f(ann):'No target')+'</td>' +
				'<td style="color:#0d9488;font-weight:600">'+f(o.value)+'</td>' +
				'<td>'+o.total+'</td><td>'+o.qualified+'</td><td>'+o.converted+'</td>' +
				'<td>'+(ann?'<div class="pg"><div class="pk"><div class="pf" style="width:'+pr+'%;background:'+col+'"></div></div><span style="font-size:12px;font-weight:700;color:'+col+'">'+pr+'%</span></div>':'—')+'</td>' +
				'</tr>';
		}).join('') || '<tr><td colspan="7" style="color:#64748b;text-align:center;padding:20px">No leads assigned yet</td></tr>';

		var ghtml = (d.ghost_leads||[]).slice(0,4).map(function(l){
			var isg = l.custom_ghost_status === 'Ghost';
			return '<div class="al '+(isg?'r':'y')+'"><div style="font-size:16px">'+(isg?'🔴':'🟡')+'</div><div><div class="an">'+(l.company_name||l.lead_name||l.name)+'</div><div class="ax">'+(l.lead_owner||'Unassigned').split('@')[0]+' &nbsp;·&nbsp; '+(l.custom_lead_status||'')+' &nbsp;·&nbsp; '+l.custom_ghost_status+'</div></div></div>';
		}).join('') || '<div style="color:#16a34a;font-size:13px;padding:8px 0">No ghost or stale leads!</div>';

		var html =
			'<div class="kr">' +
			'<div class="kc" style="border-top:4px solid #2563eb"><div class="t">Total Leads</div><div class="v">'+s.total+'</div><div class="s">All BD leads this year</div></div>' +
			'<div class="kc" style="border-top:4px solid #16a34a"><div class="t">Qualified</div><div class="v">'+s.qualified+'</div><div class="s" style="color:#16a34a">'+pc(s.qualified,s.total)+'% qualify rate</div></div>' +
			'<div class="kc" style="border-top:4px solid #7c3aed"><div class="t">Converted to Opp</div><div class="v">'+s.converted+'</div><div class="s" style="color:#16a34a">'+pc(s.converted,s.total)+'% conversion</div></div>' +
			'<div class="kc" style="border-top:4px solid #dc2626"><div class="t">Lost</div><div class="v">'+s.lost+'</div><div class="s" style="color:#dc2626">'+pc(s.lost,s.total)+'% loss rate</div></div>' +
			'<div class="kc" style="border-top:4px solid #0d9488"><div class="t">Pipeline Value</div><div class="v" style="font-size:20px">'+f(s.pipeline_value)+'</div><div class="s">Total estimated</div></div>' +
			'<div class="kc" style="border-top:4px solid #d97706"><div class="t">Ghost Leads</div><div class="v" style="color:#dc2626">'+h.ghost+'</div><div class="s" style="color:#dc2626">Needs action</div></div>' +
			'</div>' +
			'<div class="g2">' +
			'<div class="pn"><div class="pt">Sales Pipeline Funnel</div><div class="ps">Lead progression through BD stages</div>'+funnel+'</div>' +
			'<div class="pn"><div class="pt">Quarterly Overview</div><div class="ps">Pipeline vs target by quarter</div><div class="qg">'+qhtml+'</div></div>' +
			'</div>' +
			'<div class="g32">' +
			'<div class="pn"><div class="pt">Salesperson Target vs Actual</div><div class="ps">Annual performance — '+d.year+'</div>' +
			'<table><thead><tr><th>Salesperson</th><th>Annual Target</th><th>Pipeline</th><th>Leads</th><th>Qualified</th><th>Converted</th><th>Achievement</th></tr></thead><tbody>'+orows+'</tbody></table></div>' +
			'<div class="pn"><div class="pt">Lead Health Monitor</div><div class="ps">Contact activity status</div>' +
			'<div class="hg">' +
			'<div class="hc a"><div class="hn">'+h.active+'</div><div class="hl">Active</div><div class="hx">under 30 days</div></div>' +
			'<div class="hc s"><div class="hn">'+h.stale+'</div><div class="hl">Stale</div><div class="hx">30-60 days</div></div>' +
			'<div class="hc g"><div class="hn">'+h.ghost+'</div><div class="hl">Ghost</div><div class="hx">60+ days</div></div>' +
			'</div>' +
			'<div class="dv"></div><div class="ug">Urgent Action Required</div>' +
			ghtml+'</div>' +
			'</div>' +
			'<div class="g3">' +
			'<div class="pn"><div class="pt">By Project Type</div><div class="ps" style="margin-bottom:14px">Lead distribution</div>'+bar_rows(d.by_type,cols)+'</div>' +
			'<div class="pn"><div class="pt">By Scope</div><div class="ps" style="margin-bottom:14px">Work type breakdown</div>'+bar_rows(d.by_scope,[cols[2],cols[4],cols[1],cols[0],cols[5]])+'</div>' +
			'<div class="pn"><div class="pt">By Lead Source</div><div class="ps" style="margin-bottom:14px">Where leads come from</div>'+bar_rows(d.by_source,[cols[3],cols[0],cols[2],cols[5]])+'</div>' +
			'</div>';

		document.getElementById('bd-main').innerHTML = html;
	}

	function load_data() {
		document.getElementById('bd-main').innerHTML = '<div class="ld">Loading...</div>';
		frappe.call({
			method: 'fitout_customization.fitout_customization.page.bd_dashboard.bd_dashboard.get_dashboard_data',
			args: {
				year: document.getElementById('bd-yr').value,
				salesperson: document.getElementById('bd-ow').value
			},
			callback: function(r) {
				if (r.message) {
					render(r.message);
				} else {
					document.getElementById('bd-main').innerHTML = '<div class="ld">No data returned.</div>';
				}
			},
			error: function(e) {
				document.getElementById('bd-main').innerHTML = '<div class="ld">Error loading data. Check console.</div>';
				console.error(e);
			}
		});
	}

	load_data();
};
