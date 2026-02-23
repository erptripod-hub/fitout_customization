frappe.pages['bd-dashboard'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'BD Dashboard',
		single_column: true
	});

	page.add_inner_button('Refresh', function() {
		load_data();
	});

	$('<style>').text(
		'.bdd { padding: 20px; background: #f5f7fa; min-height: 100vh; }' +
		'.bdd .hdr { background: #fff; border-radius: 8px; padding: 16px 20px; margin-bottom: 16px; border-left: 4px solid #2563eb; }' +
		'.bdd .hdr h2 { font-size: 16px; font-weight: 700; color: #1e293b; margin: 0; }' +
		'.bdd .hdr p { font-size: 11px; color: #64748b; margin-top: 4px; }' +
		'.bdd .row { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 16px; }' +
		'.bdd .card { background: #fff; border-radius: 8px; padding: 16px; border-top: 3px solid #2563eb; }' +
		'.bdd .card .lbl { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }' +
		'.bdd .card .val { font-size: 28px; font-weight: 800; color: #1e293b; }' +
		'.bdd .panels { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }' +
		'.bdd .panel { background: #fff; border-radius: 8px; padding: 16px; }' +
		'.bdd .panel h3 { font-size: 13px; font-weight: 700; color: #1e293b; margin-bottom: 14px; }' +
		'.bdd .br { display: flex; align-items: center; gap: 8px; margin-bottom: 9px; }' +
		'.bdd .br .lbl { width: 120px; font-size: 12px; color: #374151; flex-shrink: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }' +
		'.bdd .br .trk { flex: 1; height: 12px; background: #f1f5f9; border-radius: 4px; overflow: hidden; }' +
		'.bdd .br .fil { height: 100%; border-radius: 4px; }' +
		'.bdd .br .num { width: 28px; text-align: right; font-size: 12px; font-weight: 700; color: #1e293b; }' +
		'.bdd .loading { text-align: center; padding: 60px; color: #64748b; }'
	).appendTo('head');

	$(wrapper).find('.page-content').html(
		'<div class="bdd">' +
		'<div class="hdr"><h2>BD Performance Dashboard — Tripod MENA</h2><p id="bd-time">Loading...</p></div>' +
		'<div id="bd-body"><div class="loading">Loading data...</div></div>' +
		'</div>'
	);

	function render(d) {
		document.getElementById('bd-time').textContent = 'Last updated: ' + new Date().toLocaleString();

		var cols = ['#2563eb','#7c3aed','#16a34a','#d97706','#0d9488','#dc2626','#f97316','#06b6d4'];

		function make_bars(obj) {
			var entries = Object.entries(obj).sort(function(a,b){ return b[1]-a[1]; });
			var max = entries.length ? entries[0][1] : 1;
			return entries.map(function(e, i) {
				var w = Math.round(e[1]*100/max);
				return '<div class="br">' +
					'<div class="lbl" title="'+e[0]+'">'+e[0]+'</div>' +
					'<div class="trk"><div class="fil" style="width:'+w+'%;background:'+cols[i%cols.length]+'"></div></div>' +
					'<div class="num">'+e[1]+'</div>' +
					'</div>';
			}).join('');
		}

		var html =
			'<div class="row">' +
			'<div class="card" style="border-top-color:#2563eb"><div class="lbl">Total Leads</div><div class="val">'+d.total+'</div></div>' +
			'<div class="card" style="border-top-color:#16a34a"><div class="lbl">Open</div><div class="val">'+(d.by_status['Open']||0)+'</div></div>' +
			'<div class="card" style="border-top-color:#7c3aed"><div class="lbl">Converted</div><div class="val">'+(d.by_status['Converted']||0)+'</div></div>' +
			'<div class="card" style="border-top-color:#dc2626"><div class="lbl">Do Not Contact</div><div class="val">'+(d.by_status['Do Not Contact']||0)+'</div></div>' +
			'</div>' +
			'<div class="panels">' +
			'<div class="panel"><h3>Leads by Status</h3>'+make_bars(d.by_status)+'</div>' +
			'<div class="panel"><h3>Leads by Salesperson</h3>'+make_bars(d.by_owner)+'</div>' +
			'<div class="panel"><h3>Leads by Source</h3>'+make_bars(d.by_source)+'</div>' +
			'</div>';

		document.getElementById('bd-body').innerHTML = html;
	}

	function load_data() {
		document.getElementById('bd-body').innerHTML = '<div class="loading">Loading...</div>';
		frappe.call({
			method: 'fitout_customization.fitout_customization.page.bd_dashboard.bd_dashboard.get_dashboard_data',
			callback: function(r) {
				if (r.message) render(r.message);
				else document.getElementById('bd-body').innerHTML = '<div class="loading">No data.</div>';
			},
			error: function(e) {
				document.getElementById('bd-body').innerHTML = '<div class="loading">Error: ' + (e.message||'check console') + '</div>';
				console.error(e);
			}
		});
	}

	load_data();
};
