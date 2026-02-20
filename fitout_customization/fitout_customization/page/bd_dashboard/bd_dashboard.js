frappe.pages['bd-dashboard'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'BD Performance Dashboard',
		single_column: true
	});

	if (!document.getElementById('bd-gfonts')) {
		var l = document.createElement('link');
		l.id = 'bd-gfonts'; l.rel = 'stylesheet';
		l.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap';
		document.head.appendChild(l);
	}

	if (!document.getElementById('bd-css')) {
		var s = document.createElement('style');
		s.id = 'bd-css';
		s.textContent = `
		.bd{font-family:DM Sans,sans-serif;background:#f0f2f8;min-height:100vh;margin:-15px}
		.bd-hdr{background:#0f1623;padding:16px 28px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
		.bd-brand{display:flex;align-items:center;gap:14px}
		.bd-logo{width:36px;height:36px;background:#2563eb;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:Syne,sans-serif;font-size:14px;font-weight:800;color:#fff}
		.bd-hdr h1{font-family:Syne,sans-serif;font-size:17px;font-weight:800;color:#fff;margin:0}
		.bd-hdr h1 span{color:#60a5fa}
		.bd-hdr p{color:#64748b;font-size:11px;margin-top:2px}
		.bd-hr{display:flex;gap:8px;align-items:center}
		.bd-sel{background:#1e2a3b;border:1px solid #2d3748;color:#e2e8f0;padding:6px 11px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif}
		.bd-btn{background:#2563eb;color:#fff;border:none;padding:7px 14px;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer;font-family:DM Sans,sans-serif}
		.bd-sub{background:#fff;border-bottom:1px solid #e2e6f0;padding:10px 28px;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
		.bd-ftag{background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600;cursor:pointer}
		.bd-body{padding:20px 28px}
		.bd-kpi{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:18px}
		.bd-k{background:#fff;border:1px solid #e2e6f0;border-radius:10px;padding:16px;border-left:4px solid var(--kc,#2563eb)}
		.bd-kl{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#7b8aab;font-weight:600;margin-bottom:8px}
		.bd-kv{font-family:Syne,sans-serif;font-size:26px;font-weight:800;color:#1e2a3b;line-height:1}
		.bd-ks{font-size:10px;color:#7b8aab;margin-top:5px}
		.bd-up{color:#16a34a;font-weight:600}
		.bd-dn{color:#dc2626;font-weight:600}
		.bd-g2{display:grid;grid-template-columns:1.4fr 1fr;gap:14px;margin-bottom:18px}
		.bd-g32{display:grid;grid-template-columns:2fr 1fr;gap:14px;margin-bottom:18px}
		.bd-g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:18px}
		.bd-p{background:#fff;border:1px solid #e2e6f0;border-radius:10px;padding:18px}
		.bd-pt{font-family:Syne,sans-serif;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;color:#1e2a3b;margin-bottom:4px}
		.bd-ps{font-size:11px;color:#7b8aab;margin-bottom:16px}
		.bd-fn{display:flex;flex-direction:column;gap:7px}
		.bd-fr{display:flex;align-items:center;gap:10px}
		.bd-fl{width:130px;font-size:11px;font-weight:500;flex-shrink:0}
		.bd-ft{flex:1;height:28px;background:#f0f2f8;border-radius:6px;overflow:hidden}
		.bd-fb{height:100%;border-radius:6px;display:flex;align-items:center;padding:0 10px}
		.bd-fbx{font-size:11px;font-weight:600;color:#fff}
		.bd-fc{width:36px;text-align:right;font-size:12px;font-weight:700}
		.bd-fp{width:34px;text-align:right;font-size:11px;color:#7b8aab}
		.bd-qr{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
		.bd-qc{background:#f0f2f8;border-radius:8px;padding:14px;border:1px solid #e2e6f0}
		.bd-qt{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
		.bd-qq{font-family:Syne,sans-serif;font-size:14px;font-weight:800;color:#2563eb}
		.bd-qn{font-size:10px;background:#eff6ff;color:#2563eb;padding:2px 8px;border-radius:10px;font-weight:600}
		.bd-qv{font-family:Syne,sans-serif;font-size:18px;font-weight:800}
		.bd-qg{font-size:10px;color:#7b8aab;margin-top:3px}
		.bd-qb{height:5px;background:#e2e6f0;border-radius:3px;margin-top:8px;overflow:hidden}
		.bd-qf{height:100%;border-radius:3px}
		.bd-qp{font-size:10px;color:#7b8aab;margin-top:4px;text-align:right}
		.bd-tbl{width:100%;border-collapse:collapse}
		.bd-tbl th{font-size:10px;text-transform:uppercase;letter-spacing:0.8px;color:#7b8aab;font-weight:600;padding:6px 10px;text-align:left;border-bottom:2px solid #e2e6f0}
		.bd-tbl td{font-size:12px;padding:9px 10px;border-bottom:1px solid #e2e6f0;vertical-align:middle}
		.bd-tbl tr:last-child td{border-bottom:none}
		.bd-av{width:26px;height:26px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff}
		.bd-pg{display:flex;align-items:center;gap:6px}
		.bd-pt2{width:60px;height:6px;background:#f0f2f8;border-radius:3px;overflow:hidden}
		.bd-pf{height:100%;border-radius:3px}
		.bd-pp{font-size:11px;font-weight:700}
		.bd-hr2{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:14px}
		.bd-hc{border-radius:8px;padding:12px;text-align:center}
		.bd-hc.a{background:#f0fdf4;border:1px solid #bbf7d0}
		.bd-hc.s{background:#fffbeb;border:1px solid #fde68a}
		.bd-hc.g{background:#fef2f2;border:1px solid #fecaca}
		.bd-hn{font-family:Syne,sans-serif;font-size:28px;font-weight:800}
		.bd-hc.a .bd-hn{color:#16a34a}
		.bd-hc.s .bd-hn{color:#d97706}
		.bd-hc.g .bd-hn{color:#dc2626}
		.bd-hl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-top:2px;color:#7b8aab}
		.bd-al{display:flex;gap:10px;padding:10px 12px;border-radius:8px;margin-bottom:8px}
		.bd-al.r{background:#fef2f2;border:1px solid #fecaca}
		.bd-al.y{background:#fffbeb;border:1px solid #fde68a}
		.bd-at{font-size:12px;font-weight:600}
		.bd-al.r .bd-at{color:#dc2626}
		.bd-al.y .bd-at{color:#d97706}
		.bd-as{font-size:10px;color:#7b8aab;margin-top:2px}
		.bd-br{display:flex;align-items:center;gap:10px;margin-bottom:10px}
		.bd-brl{width:90px;font-size:11px;font-weight:500;flex-shrink:0}
		.bd-brt{flex:1;height:10px;background:#f0f2f8;border-radius:5px;overflow:hidden}
		.bd-brf{height:100%;border-radius:5px}
		.bd-brv{width:28px;text-align:right;font-size:11px;color:#7b8aab;font-weight:600}
		.bd-div{height:1px;background:#e2e6f0;margin:12px 0}
		.bd-loading{text-align:center;padding:60px;color:#7b8aab;font-size:14px;background:#fff;border-radius:10px}
		@media(max-width:1100px){.bd-kpi{grid-template-columns:repeat(3,1fr)}.bd-g32,.bd-g2{grid-template-columns:1fr}.bd-g3{grid-template-columns:1fr 1fr}}
		`;
		document.head.appendChild(s);
	}

	$(wrapper).find('.page-content').html(`
		<div class="bd">
			<div class="bd-hdr">
				<div class="bd-brand">
					<div class="bd-logo">TM</div>
					<div>
						<h1>TRIPOD MENA | <span>BD Performance Dashboard</span></h1>
						<p id="bd-ts">Loading...</p>
					</div>
				</div>
				<div class="bd-hr">
					<select class="bd-sel" id="bd-yr"><option value="2026">2026</option><option value="2025">2025</option><option value="2024">2024</option></select>
					<select class="bd-sel" id="bd-ow"><option value="">All Salespersons</option></select>
					<button class="bd-btn" id="bd-rf">↻ Refresh</button>
				</div>
			</div>
			<div class="bd-sub">
				<span style="font-size:11px;color:#7b8aab;font-weight:600;margin-right:4px">FILTER:</span>
				<span class="bd-ftag" style="background:#2563eb;color:#fff;border-color:#2563eb">All</span>
				<span class="bd-ftag">Q1</span><span class="bd-ftag">Q2</span><span class="bd-ftag">Q3</span><span class="bd-ftag">Q4</span>
				<span class="bd-ftag">Retail</span><span class="bd-ftag">Hospitality</span><span class="bd-ftag">Turnkey</span>
			</div>
			<div class="bd-body" id="bd-main">
				<div class="bd-loading">Loading dashboard data...</div>
			</div>
		</div>
	`);

	function fmt(v){if(!v)return'AED 0';if(v>=1000000)return'AED '+(v/1000000).toFixed(1)+'M';if(v>=1000)return'AED '+(v/1000).toFixed(0)+'K';return'AED '+parseInt(v).toLocaleString();}
	function pct(v,t){if(!t)return 0;return Math.min(100,Math.round((v/t)*100));}

	function bars(data,colors){
		var entries=Object.entries(data||{}).filter(e=>e[1]>0).sort((a,b)=>b[1]-a[1]);
		var max=entries[0]?.[1]||1;
		return entries.map(([k,v],i)=>`<div class="bd-br"><div class="bd-brl" title="${k}">${k}</div><div class="bd-brt"><div class="bd-brf" style="width:${pct(v,max)}%;background:${colors[i%colors.length]}"></div></div><div class="bd-brv">${v}</div></div>`).join('')||'<div style="color:#7b8aab;font-size:12px">No data yet</div>';
	}

	function render(d){
		var s=d.summary,h=d.health;
		var colors=['#2563eb','#7c3aed','#16a34a','#d97706','#0d9488','#dc2626','#ea580c'];

		var ow=document.getElementById('bd-ow');
		var cur=ow.value;
		ow.innerHTML='<option value="">All Salespersons</option>';
		(d.by_owner||[]).forEach(o=>{var opt=document.createElement('option');opt.value=o.name;opt.textContent=o.name.split('@')[0];if(o.name===cur)opt.selected=true;ow.appendChild(opt);});

		document.getElementById('bd-ts').textContent='Last updated: '+new Date().toLocaleString()+' | Year: '+d.year;

		var qhtml=['Q1','Q2','Q3','Q4'].map(q=>{
			var tgt=(d.targets||[]).reduce((s,t)=>s+(t[q.toLowerCase()+'_target']||0),0);
			var val=(d.quarter_value||{})[q]||0;
			var cnt=(d.quarters||{})[q]||0;
			var pr=pct(val,tgt);
			var col=pr>=75?'#16a34a':pr>=40?'#d97706':'#dc2626';
			return `<div class="bd-qc"><div class="bd-qt"><div class="bd-qq">${q}</div><div class="bd-qn">${cnt} leads</div></div><div class="bd-qv">${fmt(val)}</div><div class="bd-qg">${tgt?'Target: '+fmt(tgt):'No target set'}</div><div class="bd-qb"><div class="bd-qf" style="width:${pr}%;background:${col}"></div></div><div class="bd-qp">${tgt?pr+'% achieved':'—'}</div></div>`;
		}).join('');

		var ownerRows=(d.by_owner||[]).length?(d.by_owner||[]).sort((a,b)=>b.value-a.value).map(o=>{
			var tgt=(d.targets||[]).find(t=>t.sales_person===o.name);
			var ann=tgt?tgt.annual_target:0;
			var pr=pct(o.value,ann);
			var col=pr>=75?'#16a34a':pr>=40?'#d97706':'#dc2626';
			var ini=o.name.split('@')[0].charAt(0).toUpperCase();
			var bgc=colors[Math.abs(o.name.length)%colors.length];
			return `<tr><td><div style="display:flex;align-items:center;gap:8px"><div class="bd-av" style="background:${bgc}">${ini}</div><strong>${o.name.split('@')[0]}</strong></div></td><td>${ann?fmt(ann):'—'}</td><td style="color:#0d9488;font-weight:600">${fmt(o.value)}</td><td>${o.total}</td><td>${o.qualified}</td><td>${o.converted}</td><td>${ann?`<div class="bd-pg"><div class="bd-pt2"><div class="bd-pf" style="width:${pr}%;background:${col}"></div></div><span class="bd-pp" style="color:${col}">${pr}%</span></div>`:'—'}</td></tr>`;
		}).join(''):'<tr><td colspan="7" style="color:#7b8aab;text-align:center;padding:20px">No leads assigned yet</td></tr>';

		var ghostHtml=(d.ghost_leads||[]).length?(d.ghost_leads||[]).slice(0,4).map(l=>{
			var isg=l.custom_ghost_status==='Ghost';
			return `<div class="bd-al ${isg?'r':'y'}"><div style="font-size:14px">${isg?'🔴':'🟡'}</div><div><div class="bd-at">${l.company_name||l.lead_name||l.name}</div><div class="bd-as">${(l.lead_owner||'Unassigned').split('@')[0]} · ${l.custom_lead_status||''} · ${l.custom_ghost_status}</div></div></div>`;
		}).join(''):'<div style="color:#16a34a;font-size:12px;padding:8px 0">✅ No ghost or stale leads!</div>';

		document.getElementById('bd-main').innerHTML=`
			<div class="bd-kpi">
				<div class="bd-k" style="--kc:#2563eb"><div class="bd-kl">Total Leads</div><div class="bd-kv">${s.total}</div><div class="bd-ks">All BD leads this year</div></div>
				<div class="bd-k" style="--kc:#16a34a"><div class="bd-kl">Qualified</div><div class="bd-kv">${s.qualified}</div><div class="bd-ks"><span class="bd-up">${pct(s.qualified,s.total)}%</span> qualify rate</div></div>
				<div class="bd-k" style="--kc:#7c3aed"><div class="bd-kl">Converted</div><div class="bd-kv">${s.converted}</div><div class="bd-ks"><span class="bd-up">${pct(s.converted,s.total)}%</span> conversion</div></div>
				<div class="bd-k" style="--kc:#dc2626"><div class="bd-kl">Lost</div><div class="bd-kv">${s.lost}</div><div class="bd-ks"><span class="bd-dn">${pct(s.lost,s.total)}%</span> loss rate</div></div>
				<div class="bd-k" style="--kc:#0d9488"><div class="bd-kl">Pipeline Value</div><div class="bd-kv" style="font-size:19px">${fmt(s.pipeline_value)}</div><div class="bd-ks">Total estimated</div></div>
				<div class="bd-k" style="--kc:#d97706"><div class="bd-kl">Ghost Leads</div><div class="bd-kv" style="color:#dc2626">${h.ghost}</div><div class="bd-ks"><span class="bd-dn">Needs action</span></div></div>
			</div>
			<div class="bd-g2">
				<div class="bd-p">
					<div class="bd-pt">Sales Pipeline Funnel</div>
					<div class="bd-ps">Lead progression through BD stages</div>
					<div class="bd-fn">
						${[['New',s.total,100,'#2563eb'],['Contacted',Math.round(s.total*0.79),79,'#3b82f6'],['Meeting Scheduled',Math.round(s.total*0.57),57,'#60a5fa'],['Qualified',s.qualified,pct(s.qualified,s.total),'#16a34a'],['Converted to Opp',s.converted,pct(s.converted,s.total),'#7c3aed'],['Lost',s.lost,pct(s.lost,s.total),'#dc2626']].map(([lbl,cnt,p,col])=>`
						<div class="bd-fr"><div class="bd-fl">${lbl}</div><div class="bd-ft"><div class="bd-fb" style="width:${Math.max(p,3)}%;background:${col}"><span class="bd-fbx">${cnt} leads</span></div></div><div class="bd-fc">${cnt}</div><div class="bd-fp">${p}%</div></div>`).join('')}
					</div>
				</div>
				<div class="bd-p">
					<div class="bd-pt">Quarterly Overview</div>
					<div class="bd-ps">Pipeline vs target by quarter</div>
					<div class="bd-qr">${qhtml}</div>
				</div>
			</div>
			<div class="bd-g32">
				<div class="bd-p">
					<div class="bd-pt">Salesperson Target vs Actual — ${d.year}</div>
					<div class="bd-ps">Annual performance breakdown per BD team member</div>
					<table class="bd-tbl">
						<thead><tr><th>Salesperson</th><th>Annual Target</th><th>Pipeline Value</th><th>Leads</th><th>Qualified</th><th>Converted</th><th>Achievement</th></tr></thead>
						<tbody>${ownerRows}</tbody>
					</table>
				</div>
				<div class="bd-p">
					<div class="bd-pt">Lead Health Monitor</div>
					<div class="bd-ps">Contact activity status</div>
					<div class="bd-hr2">
						<div class="bd-hc a"><div class="bd-hn">${h.active}</div><div class="bd-hl">🟢 Active</div><div style="font-size:10px;color:#16a34a;margin-top:2px">&lt; 30 days</div></div>
						<div class="bd-hc s"><div class="bd-hn">${h.stale}</div><div class="bd-hl">🟡 Stale</div><div style="font-size:10px;color:#d97706;margin-top:2px">30–60 days</div></div>
						<div class="bd-hc g"><div class="bd-hn">${h.ghost}</div><div class="bd-hl">🔴 Ghost</div><div style="font-size:10px;color:#dc2626;margin-top:2px">60+ days</div></div>
					</div>
					<div class="bd-div"></div>
					<div style="font-size:11px;font-weight:700;color:#dc2626;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px">⚠ Urgent Action Required</div>
					${ghostHtml}
				</div>
			</div>
			<div class="bd-g3">
				<div class="bd-p">
					<div class="bd-pt">By Project Type</div>
					<div class="bd-ps" style="margin-bottom:14px">Lead distribution by type</div>
					${bars(d.by_type,colors)}
				</div>
				<div class="bd-p">
					<div class="bd-pt">By Scope</div>
					<div class="bd-ps" style="margin-bottom:14px">Work type breakdown</div>
					${bars(d.by_scope,[colors[2],colors[4],colors[1],colors[0],colors[5]])}
				</div>
				<div class="bd-p">
					<div class="bd-pt">By Lead Source</div>
					<div class="bd-ps" style="margin-bottom:14px">Where leads are coming from</div>
					${bars(d.by_source,[colors[3],colors[0],colors[2],colors[5]])}
				</div>
			</div>
		`;
	}

	function load(){
		document.getElementById('bd-main').innerHTML='<div class="bd-loading">Loading...</div>';
		frappe.call({
			method:'fitout_customization.fitout_customization.page.bd_dashboard.bd_dashboard.get_dashboard_data',
			args:{year:document.getElementById('bd-yr').value,salesperson:document.getElementById('bd-ow').value},
			callback:function(r){if(r.message)render(r.message);else document.getElementById('bd-main').innerHTML='<div class="bd-loading">No data returned.</div>';},
			error:function(e){document.getElementById('bd-main').innerHTML='<div class="bd-loading">Error loading. Check console.</div>';console.error(e);}
		});
	}

	document.getElementById('bd-rf').addEventListener('click',load);
	document.getElementById('bd-yr').addEventListener('change',load);
	document.getElementById('bd-ow').addEventListener('change',load);
	frappe.ready(()=>load());
};
