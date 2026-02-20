frappe.pages["bd-dashboard"].on_page_load = function(wrapper) {
	frappe.ui.make_app_page({
		parent: wrapper,
		title: "BD Performance Dashboard",
		single_column: true
	});

	var style = document.createElement("style");
	style.textContent = [
		".bdash{background:#f0f2f8;min-height:100vh;margin:-15px;font-family:sans-serif}",
		".bdash .hdr{background:#0f1623;padding:16px 28px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}",
		".bdash .hdr h1{font-size:17px;font-weight:800;color:#fff;margin:0}",
		".bdash .hdr h1 em{color:#60a5fa;font-style:normal}",
		".bdash .hdr p{color:#64748b;font-size:11px;margin-top:2px}",
		".bdash .hdr-r{display:flex;gap:8px;align-items:center}",
		".bdash select{background:#1e2a3b;border:1px solid #2d3748;color:#e2e8f0;padding:6px 11px;border-radius:7px;font-size:12px}",
		".bdash .rbtn{background:#2563eb;color:#fff;border:none;padding:7px 14px;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer}",
		".bdash .body{padding:20px 28px}",
		".bdash .krow{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:18px}",
		".bdash .kcard{background:#fff;border:1px solid #e2e6f0;border-radius:10px;padding:16px;border-left:4px solid #2563eb}",
		".bdash .klbl{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#7b8aab;font-weight:600;margin-bottom:8px}",
		".bdash .kval{font-size:26px;font-weight:800;color:#1e2a3b;line-height:1}",
		".bdash .ksub{font-size:10px;color:#7b8aab;margin-top:5px}",
		".bdash .g2{display:grid;grid-template-columns:1.4fr 1fr;gap:14px;margin-bottom:18px}",
		".bdash .g32{display:grid;grid-template-columns:2fr 1fr;gap:14px;margin-bottom:18px}",
		".bdash .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:18px}",
		".bdash .panel{background:#fff;border:1px solid #e2e6f0;border-radius:10px;padding:18px}",
		".bdash .ptitle{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;color:#1e2a3b;margin-bottom:4px}",
		".bdash .psub{font-size:11px;color:#7b8aab;margin-bottom:16px}",
		".bdash .frow{display:flex;align-items:center;gap:10px;margin-bottom:7px}",
		".bdash .flbl{width:130px;font-size:11px;font-weight:500;flex-shrink:0}",
		".bdash .ftrk{flex:1;height:28px;background:#f0f2f8;border-radius:6px;overflow:hidden}",
		".bdash .fbar{height:100%;border-radius:6px;display:flex;align-items:center;padding:0 10px}",
		".bdash .fbar span{font-size:11px;font-weight:600;color:#fff}",
		".bdash .fcnt{width:36px;text-align:right;font-size:12px;font-weight:700}",
		".bdash .fpct{width:34px;text-align:right;font-size:11px;color:#7b8aab}",
		".bdash .qrow{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}",
		".bdash .qcard{background:#f0f2f8;border-radius:8px;padding:14px;border:1px solid #e2e6f0}",
		".bdash .qtop{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}",
		".bdash .qq{font-size:14px;font-weight:800;color:#2563eb}",
		".bdash .qn{font-size:10px;background:#eff6ff;color:#2563eb;padding:2px 8px;border-radius:10px;font-weight:600}",
		".bdash .qv{font-size:18px;font-weight:800}",
		".bdash .qg{font-size:10px;color:#7b8aab;margin-top:3px}",
		".bdash .qpb{height:5px;background:#e2e6f0;border-radius:3px;margin-top:8px;overflow:hidden}",
		".bdash .qpf{height:100%;border-radius:3px}",
		".bdash .qpp{font-size:10px;color:#7b8aab;margin-top:4px;text-align:right}",
		".bdash table{width:100%;border-collapse:collapse}",
		".bdash th{font-size:10px;text-transform:uppercase;letter-spacing:0.8px;color:#7b8aab;font-weight:600;padding:6px 10px;text-align:left;border-bottom:2px solid #e2e6f0}",
		".bdash td{font-size:12px;padding:9px 10px;border-bottom:1px solid #e2e6f0;vertical-align:middle}",
		".bdash tr:last-child td{border-bottom:none}",
		".bdash .av{width:26px;height:26px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff}",
		".bdash .pgrow{display:flex;align-items:center;gap:6px}",
		".bdash .pgtrk{width:60px;height:6px;background:#f0f2f8;border-radius:3px;overflow:hidden}",
		".bdash .pgfil{height:100%;border-radius:3px}",
		".bdash .hgrid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:14px}",
		".bdash .hcard{border-radius:8px;padding:12px;text-align:center}",
		".bdash .hcard.ac{background:#f0fdf4;border:1px solid #bbf7d0}",
		".bdash .hcard.st{background:#fffbeb;border:1px solid #fde68a}",
		".bdash .hcard.gh{background:#fef2f2;border:1px solid #fecaca}",
		".bdash .hnum{font-size:28px;font-weight:800}",
		".bdash .hcard.ac .hnum{color:#16a34a}",
		".bdash .hcard.st .hnum{color:#d97706}",
		".bdash .hcard.gh .hnum{color:#dc2626}",
		".bdash .hlbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-top:2px;color:#7b8aab}",
		".bdash .alrt{display:flex;gap:10px;padding:10px 12px;border-radius:8px;margin-bottom:8px}",
		".bdash .alrt.r{background:#fef2f2;border:1px solid #fecaca}",
		".bdash .alrt.y{background:#fffbeb;border:1px solid #fde68a}",
		".bdash .atitle{font-size:12px;font-weight:600}",
		".bdash .alrt.r .atitle{color:#dc2626}",
		".bdash .alrt.y .atitle{color:#d97706}",
		".bdash .asub{font-size:10px;color:#7b8aab;margin-top:2px}",
		".bdash .brow{display:flex;align-items:center;gap:10px;margin-bottom:10px}",
		".bdash .blbl{width:90px;font-size:11px;font-weight:500;flex-shrink:0}",
		".bdash .btrk{flex:1;height:10px;background:#f0f2f8;border-radius:5px;overflow:hidden}",
		".bdash .bfil{height:100%;border-radius:5px}",
		".bdash .bval{width:28px;text-align:right;font-size:11px;color:#7b8aab;font-weight:600}",
		".bdash .divdr{height:1px;background:#e2e6f0;margin:12px 0}",
		".bdash .loading{text-align:center;padding:60px;color:#7b8aab;font-size:14px;background:#fff;border-radius:10px}"
	].join("");
	document.head.appendChild(style);

	$(wrapper).find(".page-content").html(
		'<div class="bdash">' +
		'<div class="hdr">' +
		'<div><h1>TRIPOD MENA | <em>BD Performance Dashboard</em></h1><p id="bd-ts">Loading...</p></div>' +
		'<div class="hdr-r">' +
		'<select id="bd-yr"><option value="2026">2026</option><option value="2025">2025</option><option value="2024">2024</option></select>' +
		'<select id="bd-ow"><option value="">All Salespersons</option></select>' +
		'<button class="rbtn" id="bd-rf">Refresh</button>' +
		'</div></div>' +
		'<div class="body" id="bd-main"><div class="loading">Loading dashboard data...</div></div>' +
		'</div>'
	);

	function fmt(v) {
		if (!v) return "AED 0";
		if (v >= 1000000) return "AED " + (v / 1000000).toFixed(1) + "M";
		if (v >= 1000) return "AED " + (v / 1000).toFixed(0) + "K";
		return "AED " + parseInt(v).toLocaleString();
	}
	function pct(v, t) { return (!t) ? 0 : Math.min(100, Math.round((v / t) * 100)); }

	function bars(data, colors) {
		var entries = Object.entries(data || {}).filter(function(e) { return e[1] > 0; }).sort(function(a, b) { return b[1] - a[1]; });
		var max = entries.length ? entries[0][1] : 1;
		if (!entries.length) return '<div style="color:#7b8aab;font-size:12px">No data yet</div>';
		return entries.map(function(e, i) {
			return '<div class="brow"><div class="blbl" title="' + e[0] + '">' + e[0] + '</div><div class="btrk"><div class="bfil" style="width:' + pct(e[1], max) + '%;background:' + colors[i % colors.length] + '"></div></div><div class="bval">' + e[1] + '</div></div>';
		}).join("");
	}

	function render(d) {
		var s = d.summary, h = d.health;
		var colors = ["#2563eb", "#7c3aed", "#16a34a", "#d97706", "#0d9488", "#dc2626", "#ea580c"];

		var ow = document.getElementById("bd-ow");
		var cur = ow.value;
		ow.innerHTML = '<option value="">All Salespersons</option>';
		(d.by_owner || []).forEach(function(o) {
			var opt = document.createElement("option");
			opt.value = o.name;
			opt.textContent = o.name.split("@")[0];
			if (o.name === cur) opt.selected = true;
			ow.appendChild(opt);
		});

		document.getElementById("bd-ts").textContent = "Last updated: " + new Date().toLocaleString() + " | Year: " + d.year;

		var qhtml = ["Q1", "Q2", "Q3", "Q4"].map(function(q) {
			var tgt = (d.targets || []).reduce(function(sum, t) { return sum + (t[q.toLowerCase() + "_target"] || 0); }, 0);
			var val = (d.quarter_value || {})[q] || 0;
			var cnt = (d.quarters || {})[q] || 0;
			var pr = pct(val, tgt);
			var col = pr >= 75 ? "#16a34a" : pr >= 40 ? "#d97706" : "#dc2626";
			return '<div class="qcard"><div class="qtop"><div class="qq">' + q + '</div><div class="qn">' + cnt + ' leads</div></div><div class="qv">' + fmt(val) + '</div><div class="qg">' + (tgt ? "Target: " + fmt(tgt) : "No target set") + '</div><div class="qpb"><div class="qpf" style="width:' + pr + '%;background:' + col + '"></div></div><div class="qpp">' + (tgt ? pr + "% achieved" : "—") + '</div></div>';
		}).join("");

		var ownerRows = (d.by_owner || []).length ? (d.by_owner || []).sort(function(a, b) { return b.value - a.value; }).map(function(o, i) {
			var tgt = (d.targets || []).find(function(t) { return t.sales_person === o.name; });
			var ann = tgt ? tgt.annual_target : 0;
			var pr = pct(o.value, ann);
			var col = pr >= 75 ? "#16a34a" : pr >= 40 ? "#d97706" : "#dc2626";
			var ini = o.name.split("@")[0].charAt(0).toUpperCase();
			return '<tr><td><div style="display:flex;align-items:center;gap:8px"><div class="av" style="background:' + colors[i % colors.length] + '">' + ini + '</div><strong>' + o.name.split("@")[0] + '</strong></div></td><td>' + (ann ? fmt(ann) : "—") + '</td><td style="color:#0d9488;font-weight:600">' + fmt(o.value) + '</td><td>' + o.total + '</td><td>' + o.qualified + '</td><td>' + o.converted + '</td><td>' + (ann ? '<div class="pgrow"><div class="pgtrk"><div class="pgfil" style="width:' + pr + '%;background:' + col + '"></div></div><span style="font-size:11px;font-weight:700;color:' + col + '">' + pr + '%</span></div>' : "—") + '</td></tr>';
		}).join("") : '<tr><td colspan="7" style="color:#7b8aab;text-align:center;padding:20px">No leads assigned yet</td></tr>';

		var ghostHtml = (d.ghost_leads || []).length ? (d.ghost_leads || []).slice(0, 4).map(function(l) {
			var isg = l.custom_ghost_status === "Ghost";
			return '<div class="alrt ' + (isg ? "r" : "y") + '"><div style="font-size:14px">' + (isg ? "🔴" : "🟡") + '</div><div><div class="atitle">' + (l.company_name || l.lead_name || l.name) + '</div><div class="asub">' + (l.lead_owner || "Unassigned").split("@")[0] + " · " + (l.custom_lead_status || "") + " · " + l.custom_ghost_status + '</div></div></div>';
		}).join("") : '<div style="color:#16a34a;font-size:12px;padding:8px 0">No ghost or stale leads!</div>';

		var funnel = [
			["New", s.total, 100, "#2563eb"],
			["Contacted", Math.round(s.total * 0.79), 79, "#3b82f6"],
			["Meeting Scheduled", Math.round(s.total * 0.57), 57, "#60a5fa"],
			["Qualified", s.qualified, pct(s.qualified, s.total), "#16a34a"],
			["Converted to Opp", s.converted, pct(s.converted, s.total), "#7c3aed"],
			["Lost", s.lost, pct(s.lost, s.total), "#dc2626"]
		].map(function(r) {
			return '<div class="frow"><div class="flbl">' + r[0] + '</div><div class="ftrk"><div class="fbar" style="width:' + Math.max(r[2], 3) + '%;background:' + r[3] + '"><span>' + r[1] + ' leads</span></div></div><div class="fcnt">' + r[1] + '</div><div class="fpct">' + r[2] + '%</div></div>';
		}).join("");

		document.getElementById("bd-main").innerHTML =
			'<div class="krow">' +
			'<div class="kcard" style="border-left-color:#2563eb"><div class="klbl">Total Leads</div><div class="kval">' + s.total + '</div><div class="ksub">All BD leads this year</div></div>' +
			'<div class="kcard" style="border-left-color:#16a34a"><div class="klbl">Qualified</div><div class="kval">' + s.qualified + '</div><div class="ksub" style="color:#16a34a">' + pct(s.qualified, s.total) + '% qualify rate</div></div>' +
			'<div class="kcard" style="border-left-color:#7c3aed"><div class="klbl">Converted</div><div class="kval">' + s.converted + '</div><div class="ksub" style="color:#16a34a">' + pct(s.converted, s.total) + '% conversion</div></div>' +
			'<div class="kcard" style="border-left-color:#dc2626"><div class="klbl">Lost</div><div class="kval">' + s.lost + '</div><div class="ksub" style="color:#dc2626">' + pct(s.lost, s.total) + '% loss rate</div></div>' +
			'<div class="kcard" style="border-left-color:#0d9488"><div class="klbl">Pipeline Value</div><div class="kval" style="font-size:19px">' + fmt(s.pipeline_value) + '</div><div class="ksub">Total estimated</div></div>' +
			'<div class="kcard" style="border-left-color:#d97706"><div class="klbl">Ghost Leads</div><div class="kval" style="color:#dc2626">' + h.ghost + '</div><div class="ksub" style="color:#dc2626">Needs action</div></div>' +
			'</div>' +
			'<div class="g2">' +
			'<div class="panel"><div class="ptitle">Sales Pipeline Funnel</div><div class="psub">Lead progression through BD stages</div>' + funnel + '</div>' +
			'<div class="panel"><div class="ptitle">Quarterly Overview</div><div class="psub">Pipeline vs target by quarter</div><div class="qrow">' + qhtml + '</div></div>' +
			'</div>' +
			'<div class="g32">' +
			'<div class="panel"><div class="ptitle">Salesperson Target vs Actual</div><div class="psub">Annual performance — ' + d.year + '</div>' +
			'<table><thead><tr><th>Salesperson</th><th>Annual Target</th><th>Pipeline</th><th>Leads</th><th>Qualified</th><th>Converted</th><th>Achievement</th></tr></thead><tbody>' + ownerRows + '</tbody></table></div>' +
			'<div class="panel"><div class="ptitle">Lead Health Monitor</div><div class="psub">Contact activity status</div>' +
			'<div class="hgrid"><div class="hcard ac"><div class="hnum">' + h.active + '</div><div class="hlbl">Active</div><div style="font-size:10px;color:#16a34a;margin-top:2px">under 30 days</div></div>' +
			'<div class="hcard st"><div class="hnum">' + h.stale + '</div><div class="hlbl">Stale</div><div style="font-size:10px;color:#d97706;margin-top:2px">30-60 days</div></div>' +
			'<div class="hcard gh"><div class="hnum">' + h.ghost + '</div><div class="hlbl">Ghost</div><div style="font-size:10px;color:#dc2626;margin-top:2px">60+ days</div></div></div>' +
			'<div class="divdr"></div>' +
			'<div style="font-size:11px;font-weight:700;color:#dc2626;margin-bottom:10px;text-transform:uppercase">Urgent Action Required</div>' +
			ghostHtml + '</div>' +
			'</div>' +
			'<div class="g3">' +
			'<div class="panel"><div class="ptitle">By Project Type</div><div class="psub" style="margin-bottom:14px">Lead distribution</div>' + bars(d.by_type, colors) + '</div>' +
			'<div class="panel"><div class="ptitle">By Scope</div><div class="psub" style="margin-bottom:14px">Work type breakdown</div>' + bars(d.by_scope, [colors[2], colors[4], colors[1], colors[0], colors[5]]) + '</div>' +
			'<div class="panel"><div class="ptitle">By Lead Source</div><div class="psub" style="margin-bottom:14px">Where leads come from</div>' + bars(d.by_source, [colors[3], colors[0], colors[2], colors[5]]) + '</div>' +
			'</div>';
	}

	function load() {
		document.getElementById("bd-main").innerHTML = '<div class="loading">Loading...</div>';
		frappe.call({
			method: "fitout_customization.fitout_customization.page.bd_dashboard.bd_dashboard.get_dashboard_data",
			args: { year: document.getElementById("bd-yr").value, salesperson: document.getElementById("bd-ow").value },
			callback: function(r) {
				if (r.message) render(r.message);
				else document.getElementById("bd-main").innerHTML = '<div class="loading">No data returned.</div>';
			},
			error: function(e) {
				document.getElementById("bd-main").innerHTML = '<div class="loading">Error loading. Check console.</div>';
				console.error(e);
			}
		});
	}

	document.getElementById("bd-rf").addEventListener("click", load);
	document.getElementById("bd-yr").addEventListener("change", load);
	document.getElementById("bd-ow").addEventListener("change", load);
	frappe.ready(function() { load(); });
};
