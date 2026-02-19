frappe.pages['bd-dashboard'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'BD Performance Dashboard',
		single_column: true
	});

	// Load Google Fonts
	if (!document.getElementById('bd-dashboard-fonts')) {
		var link = document.createElement('link');
		link.id = 'bd-dashboard-fonts';
		link.rel = 'stylesheet';
		link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap';
		document.head.appendChild(link);
	}

	// Inject styles
	if (!document.getElementById('bd-dashboard-styles')) {
		var style = document.createElement('style');
		style.id = 'bd-dashboard-styles';
		style.textContent = `
			.bd-dash { font-family: 'DM Sans', sans-serif; background: #0a0c14; min-height: 100vh; padding: 0; margin: -15px; }
			.bd-header { background: linear-gradient(135deg, #0d1117 0%, #161b2e 100%); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 20px 32px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
			.bd-header h1 { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: #e8eaf6; letter-spacing: -0.5px; margin: 0; }
			.bd-header h1 span { color: #4f8ef7; }
			.bd-header p { color: #6b7296; font-size: 12px; margin: 2px 0 0; }
			.bd-header-right { display: flex; gap: 10px; align-items: center; }
			.bd-select { background: #1a1e2e; border: 1px solid rgba(255,255,255,0.08); color: #e8eaf6; padding: 7px 12px; border-radius: 8px; font-size: 13px; cursor: pointer; outline: none; }
			.bd-btn { background: #4f8ef7; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; }
			.bd-btn:hover { opacity: 0.85; }
			.bd-content { padding: 24px 32px; }
			.bd-summary { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-bottom: 20px; }
			.bd-card { background: #12151f; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 18px; position: relative; overflow: hidden; }
			.bd-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--ca, #4f8ef7); }
			.bd-card-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #6b7296; margin-bottom: 8px; }
			.bd-card-value { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: #e8eaf6; line-height: 1; }
			.bd-card-sub { font-size: 11px; color: #6b7296; margin-top: 5px; }
			.bd-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
			.bd-grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin-bottom: 20px; }
			.bd-panel { background: #12151f; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 18px; margin-bottom: 0; }
			.bd-panel-title { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #6b7296; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
			.bd-dot { width: 7px; height: 7px; border-radius: 50%; background: #4f8ef7; flex-shrink: 0; }
			.bd-table { width: 100%; border-collapse: collapse; font-size: 12px; }
			.bd-table th { color: #6b7296; font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; padding: 7px 8px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.06); font-weight: 500; }
			.bd-table td { padding: 9px 8px; border-bottom: 1px solid rgba(255,255,255,0.04); color: #e8eaf6; }
			.bd-table tr:last-child td { border-bottom: none; }
			.bd-badge { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 500; }
			.bd-badge-green { background: rgba(34,197,94,0.15); color: #22c55e; }
			.bd-badge-yellow { background: rgba(245,158,11,0.15); color: #f59e0b; }
			.bd-badge-red { background: rgba(239,68,68,0.15); color: #ef4444; }
			.bd-badge-blue { background: rgba(79,142,247,0.15); color: #4f8ef7; }
			.bd-health { display: flex; gap: 10px; margin-bottom: 16px; }
			.bd-health-item { flex: 1; background: #1a1e2e; border-radius: 10px; padding: 12px; text-align: center; border: 1px solid rgba(255,255,255,0.06); }
			.bd-health-count { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; }
			.bd-health-label { font-size: 10px; color: #6b7296; margin-top: 3px; text-transform: uppercase; }
			.bd-bar-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
			.bd-bar-label { width: 110px; font-size: 11px; color: #e8eaf6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex-shrink: 0; }
			.bd-bar-track { flex: 1; height: 7px; background: #1a1e2e; border-radius: 4px; overflow: hidden; }
			.bd-bar-fill { height: 100%; border-radius: 4px; }
			.bd-bar-val { width: 30px; text-align: right; font-size: 11px; color: #6b7296; }
			.bd-qgrid { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; }
			.bd-qcard { background: #1a1e2e; border-radius: 10px; padding: 14px; text-align: center; border: 1px solid rgba(255,255,255,0.06); }
			.bd-qlabel { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 800; color: #4f8ef7; }
			.bd-qcount { font-size: 22px; font-weight: 700; color: #e8eaf6; margin: 3px 0; }
			.bd-qval { font-size: 11px; color: #6b7296; }
			.bd-qprog { height: 4px; background: #0a0c14; border-radius: 2px; margin-top: 8px; overflow: hidden; }
			.bd-qprog-fill { height: 100%; border-radius: 2px; background: #4f8ef7; }
			.bd-alert { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); border-radius: 8px; padding: 10px 14px; margin-bottom: 8px; }
			.bd-alert-title { font-size: 12px; font-weight: 600; color: #ef4444; }
			.bd-alert-sub { font-size: 11px; color: #6b7296; margin-top: 2px; }
			.bd-mini-bar { display: flex; align-items: center; gap: 6px; }
			.bd-mini-track { flex: 1; height: 5px; background: #1a1e2e; border-radius: 3px; overflow: hidden; min-width: 50px; }
			.bd-mini-fill { height: 100%; border-radius: 3px; }
			.bd-loading { text-align: center; padding: 60px; color: #6b7296; font-size: 14px; background: #12151f; border-radius: 12px; }
			.bd-muted { color: #6b7296; }
			@media(max-width:1100px){ .bd-summary{grid-template-columns:repeat(3,1fr)} .bd-grid3{grid-template-columns:1fr 1fr} }
			@media(max-width:700px){ .bd-summary{grid-template-columns:1fr 1fr} .bd-grid2,.bd-grid3{grid-template-columns:1fr} }
		`;
		document.head.appendChild(style);
	}

	// Build UI
	$(wrapper).find('.page-content').html(`
		<div class="bd-dash">
			<div class="bd-header">
				<div>
					<h1>TRIPOD MENA | <span>BD Performance Dashboard</span></h1>
					<p id="bd-last-updated">Loading...</p>
				</div>
				<div class="bd-header-right">
					<select class="bd-select" id="bd-year">
						<option value="2026">2026</option>
						<option value="2025">2025</option>
						<option value="2024">2024</option>
					</select>
					<select class="bd-select" id="bd-owner">
						<option value="">All Salespersons</option>
					</select>
					<button class="bd-btn" id="bd-refresh">↻ Refresh</button>
				</div>
			</div>
			<div class="bd-content" id="bd-main">
				<div class="bd-loading">Loading dashboard data...</div>
			</div>
		</div>
	`);

	function fmt(val) {
		if (!val) return 'AED 0';
		if (val >= 1000000) return 'AED ' + (val/1000000).toFixed(1) + 'M';
		if (val >= 1000) return 'AED ' + (val/1000).toFixed(0) + 'K';
		return 'AED ' + parseInt(val).toLocaleString();
	}

	function pct(val, total) {
		if (!total) return 0;
		return Math.min(100, Math.round((val/total)*100));
	}

	function badge(s) {
		const map = {'Active':'green','Stale':'yellow','Ghost':'red','Qualified':'blue','Converted to Opportunity':'green','Lost':'red','Not Interested':'red','New':'blue','Contacted':'blue','Meeting Scheduled':'yellow'};
		return `<span class="bd-badge bd-badge-${map[s]||'blue'}">${s||'—'}</span>`;
	}

	function bars(data, colors) {
		const entries = Object.entries(data).filter(e=>e[1]>0).sort((a,b)=>b[1]-a[1]);
		const max = entries[0]?.[1]||1;
		return entries.map(([k,v],i)=>`
			<div class="bd-bar-row">
				<div class="bd-bar-label" title="${k}">${k}</div>
				<div class="bd-bar-track"><div class="bd-bar-fill" style="width:${pct(v,max)}%;background:${colors[i%colors.length]}"></div></div>
				<div class="bd-bar-val">${v}</div>
			</div>`).join('') || '<div class="bd-muted" style="font-size:12px">No data yet</div>';
	}

	function render(d) {
		const s = d.summary, h = d.health;
		const colors = ['#4f8ef7','#a855f7','#22c55e','#f59e0b','#14b8a6','#ef4444','#f97316'];

		// Update owner dropdown
		const ownerSel = document.getElementById('bd-owner');
		const curOwner = ownerSel.value;
		ownerSel.innerHTML = '<option value="">All Salespersons</option>';
		(d.by_owner||[]).forEach(o => {
			const opt = document.createElement('option');
			opt.value = o.name;
			opt.textContent = o.name.split('@')[0];
			if (o.name === curOwner) opt.selected = true;
			ownerSel.appendChild(opt);
		});

		document.getElementById('bd-last-updated').textContent =
			'Last updated: ' + new Date().toLocaleString() + ' | Year: ' + d.year;

		document.getElementById('bd-main').innerHTML = `
			<div class="bd-summary">
				<div class="bd-card" style="--ca:#4f8ef7">
					<div class="bd-card-label">Total Leads</div>
					<div class="bd-card-value">${s.total}</div>
					<div class="bd-card-sub">All BD leads</div>
				</div>
				<div class="bd-card" style="--ca:#22c55e">
					<div class="bd-card-label">Qualified</div>
					<div class="bd-card-value">${s.qualified}</div>
					<div class="bd-card-sub">${pct(s.qualified,s.total)}% of total</div>
				</div>
				<div class="bd-card" style="--ca:#a855f7">
					<div class="bd-card-label">Converted to Opp</div>
					<div class="bd-card-value">${s.converted}</div>
					<div class="bd-card-sub">${pct(s.converted,s.total)}% rate</div>
				</div>
				<div class="bd-card" style="--ca:#ef4444">
					<div class="bd-card-label">Lost / Not Interested</div>
					<div class="bd-card-value">${s.lost}</div>
					<div class="bd-card-sub">${pct(s.lost,s.total)}% loss rate</div>
				</div>
				<div class="bd-card" style="--ca:#14b8a6">
					<div class="bd-card-label">Pipeline Value</div>
					<div class="bd-card-value" style="font-size:20px">${fmt(s.pipeline_value)}</div>
					<div class="bd-card-sub">Total estimated</div>
				</div>
			</div>

			<div class="bd-panel" style="margin-bottom:20px">
				<div class="bd-panel-title"><span class="bd-dot"></span>Quarterly Pipeline — ${d.year}</div>
				<div class="bd-qgrid">
					${['Q1','Q2','Q3','Q4'].map(q => {
						const target = (d.targets||[]).reduce((sum,t)=>sum+(t[q.toLowerCase()+'_target']||0),0);
						const value = (d.quarter_value||{})[q]||0;
						const count = (d.quarters||{})[q]||0;
						const progress = pct(value, target);
						return `<div class="bd-qcard">
							<div class="bd-qlabel">${q}</div>
							<div class="bd-qcount">${count} <span style="font-size:12px;color:#6b7296">leads</span></div>
							<div class="bd-qval">${fmt(value)}</div>
							${target ? `<div style="font-size:10px;color:#f59e0b;margin-top:3px">Target: ${fmt(target)}</div>
							<div class="bd-qprog"><div class="bd-qprog-fill" style="width:${progress}%"></div></div>
							<div style="font-size:10px;color:#6b7296;margin-top:3px">${progress}% achieved</div>`
							: '<div style="font-size:10px;color:#6b7296;margin-top:3px">No target set</div>'}
						</div>`;
					}).join('')}
				</div>
			</div>

			<div class="bd-grid2">
				<div class="bd-panel">
					<div class="bd-panel-title"><span class="bd-dot" style="background:#22c55e"></span>Salesperson Performance</div>
					<table class="bd-table">
						<thead><tr><th>Person</th><th>Leads</th><th>Qualified</th><th>Converted</th><th>Value</th></tr></thead>
						<tbody>
						${(d.by_owner||[]).length ? (d.by_owner||[]).sort((a,b)=>b.value-a.value).map(o=>`
							<tr>
								<td><strong>${o.name.split('@')[0]}</strong></td>
								<td>${o.total}</td>
								<td>${o.qualified}</td>
								<td>${o.converted}</td>
								<td style="color:#14b8a6">${fmt(o.value)}</td>
							</tr>`).join('')
						: '<tr><td colspan="5" style="color:#6b7296;text-align:center;padding:16px">No leads assigned yet</td></tr>'}
						</tbody>
					</table>
				</div>

				<div class="bd-panel">
					<div class="bd-panel-title"><span class="bd-dot" style="background:#f59e0b"></span>Lead Health Monitor</div>
					<div class="bd-health">
						<div class="bd-health-item">
							<div class="bd-health-count" style="color:#22c55e">${h.active}</div>
							<div class="bd-health-label">🟢 Active</div>
							<div style="font-size:10px;color:#6b7296;margin-top:2px">&lt; 30 days</div>
						</div>
						<div class="bd-health-item">
							<div class="bd-health-count" style="color:#f59e0b">${h.stale}</div>
							<div class="bd-health-label">🟡 Stale</div>
							<div style="font-size:10px;color:#6b7296;margin-top:2px">30–60 days</div>
						</div>
						<div class="bd-health-item">
							<div class="bd-health-count" style="color:#ef4444">${h.ghost}</div>
							<div class="bd-health-label">🔴 Ghost</div>
							<div style="font-size:10px;color:#6b7296;margin-top:2px">60+ days</div>
						</div>
					</div>
					${(d.ghost_leads||[]).length ? `
					<div class="bd-panel-title" style="margin-top:4px"><span class="bd-dot" style="background:#ef4444"></span>Urgent Action Required</div>
					${(d.ghost_leads||[]).slice(0,4).map(l=>`
						<div class="bd-alert">
							<div class="bd-alert-title">${l.company_name||l.lead_name||l.name}</div>
							<div class="bd-alert-sub">${badge(l.custom_ghost_status)} · ${(l.lead_owner||'Unassigned').split('@')[0]} · ${l.custom_lead_status||''}</div>
						</div>`).join('')}`
					: '<div style="color:#22c55e;font-size:12px;padding:8px 0">✅ No ghost or stale leads!</div>'}
				</div>
			</div>

			<div class="bd-grid3">
				<div class="bd-panel">
					<div class="bd-panel-title"><span class="bd-dot" style="background:#a855f7"></span>By Project Type</div>
					${bars(d.by_type||{}, colors)}
				</div>
				<div class="bd-panel">
					<div class="bd-panel-title"><span class="bd-dot" style="background:#14b8a6"></span>By Scope</div>
					${bars(d.by_scope||{}, [colors[2],colors[4],colors[1],colors[0],colors[5]])}
				</div>
				<div class="bd-panel">
					<div class="bd-panel-title"><span class="bd-dot" style="background:#f59e0b"></span>By Lead Source</div>
					${bars(d.by_source||{}, [colors[3],colors[0],colors[2],colors[5]])}
				</div>
			</div>

			${(d.targets||[]).length ? `
			<div class="bd-panel">
				<div class="bd-panel-title"><span class="bd-dot"></span>Annual Target vs Pipeline — ${d.year}</div>
				<table class="bd-table">
					<thead><tr><th>Salesperson</th><th>Annual Target</th><th>Pipeline</th><th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th><th>Progress</th></tr></thead>
					<tbody>
					${(d.targets||[]).map(t=>{
						const ownerData = (d.by_owner||[]).find(o=>o.name===t.sales_person)||{};
						const actual = ownerData.value||0;
						const prog = pct(actual, t.annual_target);
						const col = prog>=75?'#22c55e':prog>=40?'#f59e0b':'#ef4444';
						return `<tr>
							<td><strong>${(t.sales_person||'').split('@')[0]}</strong></td>
							<td>${fmt(t.annual_target)}</td>
							<td style="color:#14b8a6">${fmt(actual)}</td>
							<td>${fmt(t.q1_target)}</td>
							<td>${fmt(t.q2_target)}</td>
							<td>${fmt(t.q3_target)}</td>
							<td>${fmt(t.q4_target)}</td>
							<td><div class="bd-mini-bar">
								<div class="bd-mini-track"><div class="bd-mini-fill" style="width:${prog}%;background:${col}"></div></div>
								<span style="font-size:11px;color:${col};width:34px">${prog}%</span>
							</div></td>
						</tr>`;
					}).join('')}
					</tbody>
				</table>
			</div>` : `
			<div class="bd-panel">
				<div class="bd-panel-title"><span class="bd-dot"></span>Salesperson Targets</div>
				<div class="bd-muted" style="font-size:12px">No targets set for ${d.year}. Search <strong>BD Target</strong> to add yearly targets per salesperson.</div>
			</div>`}
		`;
	}

	function loadDashboard() {
		document.getElementById('bd-main').innerHTML = '<div class="bd-loading">Loading...</div>';
		const year = document.getElementById('bd-year').value;
		const owner = document.getElementById('bd-owner').value;
		frappe.call({
			method: 'fitout_customization.fitout_customization.page.bd_dashboard.bd_dashboard.get_dashboard_data',
			args: { year: year, salesperson: owner },
			callback: function(r) {
				if (r.message) render(r.message);
				else document.getElementById('bd-main').innerHTML = '<div class="bd-loading">No data returned.</div>';
			},
			error: function(e) {
				document.getElementById('bd-main').innerHTML = '<div class="bd-loading">Error loading data. Check console.</div>';
				console.error(e);
			}
		});
	}

	document.getElementById('bd-refresh').addEventListener('click', loadDashboard);
	document.getElementById('bd-year').addEventListener('change', loadDashboard);
	document.getElementById('bd-owner').addEventListener('change', loadDashboard);

	loadDashboard();
};
