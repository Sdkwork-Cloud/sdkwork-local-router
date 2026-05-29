use axum::response::{Html, IntoResponse};

pub async fn dashboard() -> impl IntoResponse {
    Html(DASHBOARD_HTML)
}

static DASHBOARD_HTML: &str = r##"<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>sdkwork-local-router</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0f172a;--surface:#1e293b;--border:#334155;--text:#e2e8f0;--text2:#94a3b8;--primary:#3b82f6;--primary-hover:#2563eb;--green:#22c55e;--yellow:#eab308;--red:#ef4444;--orange:#f97316}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
.header{background:var(--surface);border-bottom:1px solid var(--border);padding:16px 24px;display:flex;align-items:center;justify-content:space-between}
.header h1{font-size:20px;font-weight:600;display:flex;align-items:center;gap:10px}
.header h1 .dot{width:10px;height:10px;border-radius:50%;background:var(--green)}
.header .ver{color:var(--text2);font-size:13px}
.container{max-width:1400px;margin:0 auto;padding:24px}
.tabs{display:flex;gap:4px;margin-bottom:24px;background:var(--surface);border-radius:10px;padding:4px;border:1px solid var(--border)}
.tab{padding:10px 20px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:500;color:var(--text2);transition:all .2s;border:none;background:none}
.tab:hover{color:var(--text)}
.tab.active{background:var(--primary);color:#fff}
.panel{display:none}
.panel.active{display:block}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-bottom:24px}
.card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px}
.card .label{font-size:13px;color:var(--text2);margin-bottom:4px}
.card .value{font-size:28px;font-weight:700}
.card .value.green{color:var(--green)}
.card .value.yellow{color:var(--yellow)}
.card .value.red{color:var(--red)}
.table-wrap{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden}
.table-header{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
.table-header h3{font-size:16px;font-weight:600}
table{width:100%;border-collapse:collapse}
th{text-align:left;padding:12px 20px;font-size:12px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.5px;background:rgba(0,0,0,.2);border-bottom:1px solid var(--border)}
td{padding:12px 20px;font-size:14px;border-bottom:1px solid var(--border)}
tr:last-child td{border-bottom:none}
.badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600}
.badge.green{background:rgba(34,197,94,.15);color:var(--green)}
.badge.yellow{background:rgba(234,179,8,.15);color:var(--yellow)}
.badge.red{background:rgba(239,68,68,.15);color:var(--red)}
.badge.blue{background:rgba(59,130,246,.15);color:var(--primary)}
.btn{padding:8px 16px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;border:1px solid var(--border);background:var(--surface);color:var(--text);transition:all .2s}
.btn:hover{background:var(--border)}
.btn.primary{background:var(--primary);border-color:var(--primary);color:#fff}
.btn.primary:hover{background:var(--primary-hover)}
.btn.sm{padding:5px 12px;font-size:12px}
.btn.danger{border-color:var(--red);color:var(--red)}
.btn.danger:hover{background:rgba(239,68,68,.15)}
select{padding:8px 12px;border-radius:8px;font-size:13px;background:var(--surface);color:var(--text);border:1px solid var(--border);cursor:pointer}
.empty{text-align:center;padding:40px;color:var(--text2);font-size:14px}
.modal-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.6);display:none;align-items:center;justify-content:center;z-index:100}
.modal-overlay.show{display:flex}
.modal{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:24px;width:500px;max-width:90vw}
.modal h3{margin-bottom:20px;font-size:18px}
.form-group{margin-bottom:16px}
.form-group label{display:block;font-size:13px;color:var(--text2);margin-bottom:6px}
.form-group input,.form-group select,.form-group textarea{width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:14px}
.form-group textarea{min-height:80px;resize:vertical;font-family:monospace}
.form-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:20px}
.toast{position:fixed;top:20px;right:20px;padding:12px 20px;border-radius:10px;font-size:14px;z-index:200;transform:translateX(120%);transition:transform .3s}
.toast.show{transform:translateX(0)}
.toast.success{background:rgba(34,197,94,.9);color:#fff}
.toast.error{background:rgba(239,68,68,.9);color:#fff}
.usage-bar{height:6px;background:var(--border);border-radius:3px;overflow:hidden;margin-top:6px}
.usage-bar .fill{height:100%;border-radius:3px;transition:width .5s}
</style>
</head>
<body>
<div class="header">
<h1><span class="dot"></span>sdkwork-local-router<span class="ver" id="version"></span></h1>
<div style="display:flex;gap:8px;align-items:center">
<select id="strategySelect" onchange="setStrategy(this.value)">
<option value="priority">Priority</option>
<option value="round_robin">Round Robin</option>
<option value="random">Random</option>
<option value="least_latency">Least Latency</option>
</select>
</div>
</div>
<div class="container">
<div id="login-prompt" style="display:none;text-align:center;padding:60px 20px">
<h2 style="margin-bottom:16px">Authentication Required</h2>
<p style="color:var(--text2);margin-bottom:24px">Enter your API key to access the dashboard</p>
<div style="display:flex;gap:8px;justify-content:center;max-width:400px;margin:0 auto">
<input id="auth-input" type="password" placeholder="sk-..." style="flex:1;padding:10px 12px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:14px" onkeydown="if(event.key==='Enter')setAuth()">
<button class="btn primary" onclick="setAuth()">Login</button>
</div>
<p id="auth-error" style="color:var(--red);margin-top:12px;display:none"></p>
</div>
<div id="main-content" style="display:none">
<div class="tabs">
<button class="tab active" onclick="switchTab('overview')">Overview</button>
<button class="tab" onclick="switchTab('accounts')">Accounts</button>
<button class="tab" onclick="switchTab('health')">Health</button>
<button class="tab" onclick="switchTab('usage')">Usage</button>
<button class="tab" onclick="switchTab('logs')">Logs</button>
</div>
<div id="panel-overview" class="panel active">
<div class="grid" id="overview-cards"></div>
</div>
<div id="panel-accounts" class="panel">
<div class="table-header">
<h3>Account Pool</h3>
<button class="btn primary" onclick="showAddModal()">+ Add Account</button>
</div>
<div class="table-wrap">
<table><thead><tr><th>Name</th><th>Provider</th><th>Base URL</th><th>API Key</th><th>Models</th><th>Priority</th><th>Timeout</th><th>Retries</th><th>Status</th><th>Actions</th></tr></thead>
<tbody id="accounts-tbody"></tbody></table>
</div>
</div>
<div id="panel-health" class="panel">
<div class="grid" id="health-cards"></div>
<div class="table-wrap" style="margin-top:16px">
<table><thead><tr><th>Account</th><th>State</th><th>Consecutive Failures</th><th>Total Failures</th><th>Total Successes</th><th>Circuit Opens</th><th>Actions</th></tr></thead>
<tbody id="health-tbody"></tbody></table>
</div>
</div>
<div id="panel-usage" class="panel">
<div class="grid" id="usage-cards"></div>
<div class="table-wrap" style="margin-top:16px">
<div class="table-header"><h3>Usage by Model</h3></div>
<table><thead><tr><th>Model</th><th>Requests</th><th>Prompt Tokens</th><th>Completion Tokens</th><th>Total Tokens</th></tr></thead>
<tbody id="usage-tbody"></tbody></table>
</div>
</div>
<div id="panel-logs" class="panel">
<div class="table-wrap">
<table><thead><tr><th>Time</th><th>Request ID</th><th>Account</th><th>Protocol</th><th>Model</th><th>Status</th><th>Latency</th><th>Error</th></tr></thead>
<tbody id="logs-tbody"></tbody></table>
</div>
</div>
</div>
</div>
<div class="modal-overlay" id="addModal">
<div class="modal">
<h3 id="modalTitle">Add Account</h3>
<div class="form-group"><label>Name</label><input id="f-name" placeholder="my-openai"></div>
<div class="form-group"><label>Provider</label><select id="f-provider"><option value="openai">OpenAI</option><option value="anthropic">Anthropic</option><option value="google">Google</option></select></div>
<div class="form-group"><label>Base URL</label><input id="f-baseurl" placeholder="https://api.openai.com/v1"></div>
<div class="form-group"><label>API Key</label><input id="f-apikey" type="password" placeholder="sk-..."></div>
<div class="form-group"><label>Models (comma-separated)</label><input id="f-models" placeholder="gpt-4*, gpt-3.5-turbo*"></div>
<div class="form-group"><label>Priority</label><input id="f-priority" type="number" value="10"></div>
<div class="form-group"><label>Timeout (secs)</label><input id="f-timeout" type="number" value="120"></div>
<div class="form-group"><label>Max Retries</label><input id="f-maxretries" type="number" value="0" min="0" max="3"></div>
<div class="form-group"><label>Retry Delay (ms)</label><input id="f-retrydelay" type="number" value="500" min="100"></div>
<div class="form-group"><label>Anthropic Version (optional)</label><input id="f-anthropicver" placeholder="2023-06-01"></div>
<div class="form-group"><label>Default Headers (JSON, optional)</label><textarea id="f-headers" placeholder='{"X-Custom-Header": "value"}'></textarea></div>
<div class="form-group"><label>Model Aliases (JSON, optional)</label><textarea id="f-aliases" placeholder='{"gpt-4": "gpt-4-turbo"}'></textarea></div>
<div class="form-actions">
<button class="btn" onclick="hideAddModal()">Cancel</button>
<button class="btn primary" onclick="submitAccount()">Save</button>
</div>
</div>
</div>
<div class="toast" id="toast"></div>
<script>
const API_BASE='';
let currentAuth=localStorage.getItem('lr_auth_key')||'';
function getHeaders(){const h={'Content-Type':'application/json'};if(currentAuth)h['Authorization']='Bearer '+currentAuth;return h}
function setAuth(){const val=document.getElementById('auth-input').value.trim();if(!val)return;currentAuth=val;localStorage.setItem('lr_auth_key',val);document.getElementById('login-prompt').style.display='none';document.getElementById('main-content').style.display='block';document.getElementById('auth-error').style.display='none';loadData()}
async function api(path,opts={}){try{const r=await fetch(API_BASE+path,{...opts,headers:{...getHeaders(),...(opts.headers||{})}});if(!r.ok){if(r.status===401||r.status===403){handleAuthExpired()}let msg=await r.text();try{const j=JSON.parse(msg);msg=j.error||j.message||msg}catch(e){}throw new Error(r.status+' '+msg)}return r.json()}catch(e){if(e.message&&(e.message.startsWith('401')||e.message.startsWith('403'))){handleAuthExpired()}throw e}}
function handleAuthExpired(){currentAuth='';localStorage.removeItem('lr_auth_key');document.getElementById('main-content').style.display='none';document.getElementById('login-prompt').style.display='block';document.getElementById('auth-error').style.display='block';document.getElementById('auth-error').textContent='Authentication failed. Please check your API key.'}
function toast(msg,type='success'){const t=document.getElementById('toast');t.textContent=msg;t.className='toast '+type+' show';setTimeout(()=>t.classList.remove('show'),3000)}
function switchTab(name){document.querySelectorAll('.tab').forEach((t,i)=>{t.classList.toggle('active',['overview','accounts','health','usage','logs'][i]===name)});document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));document.getElementById('panel-'+name).classList.add('active');loadData()}
async function loadData(){try{const status=await api('/app/v3/api/router/status');document.getElementById('version').textContent='v'+(status.version||'');document.getElementById('strategySelect').value=(status.routing_strategy||'priority').toLowerCase();renderOverview(status)}catch(e){if(e.message&&(e.message.startsWith('401')||e.message.startsWith('403')))return}try{const accounts=await api('/backend/v3/api/router/accounts');renderAccounts(accounts.accounts||[])}catch(e){}try{const health=await api('/backend/v3/api/router/health');renderHealth(health)}catch(e){}try{const summary=await api('/backend/v3/api/router/usages/summary');renderUsage(summary)}catch(e){}try{const logs=await api('/backend/v3/api/router/logs?limit=50');renderLogs(logs.logs||[])}catch(e){}}
function startDashboard(){if(currentAuth){document.getElementById('login-prompt').style.display='none';document.getElementById('main-content').style.display='block';loadData()}else{document.getElementById('login-prompt').style.display='block';document.getElementById('main-content').style.display='none'}}
startDashboard();setInterval(()=>{if(currentAuth)loadData()},15000);
function renderOverview(s){const c=document.getElementById('overview-cards');c.innerHTML=`
<div class="card"><div class="label">Upstreams</div><div class="value green">${s.upstream_count||0}</div></div>
<div class="card"><div class="label">Auth Mode</div><div class="value">${s.auth_mode||'none'}</div></div>
<div class="card"><div class="label">Fallback</div><div class="value">${s.fallback_enabled?'Enabled':'Disabled'}</div></div>
<div class="card"><div class="label">Strategy</div><div class="value">${s.routing_strategy||'Priority'}</div></div>`}
function renderAccounts(accounts){const tb=document.getElementById('accounts-tbody');if(!accounts.length){tb.innerHTML='<tr><td colspan="10" class="empty">No accounts configured</td></tr>';return}
tb.innerHTML=accounts.map(a=>`<tr>
<td><strong>${esc(a.name)}</strong></td>
<td><span class="badge blue">${esc(a.provider)}</span></td>
<td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(a.base_url)}</td>
<td><code>${esc(a.api_key)}</code></td>
<td>${(a.models||[]).map(m=>'<span class="badge blue" style="margin:2px">'+esc(m)+'</span>').join('')}</td>
<td>${a.priority}</td>
<td>${a.timeout_secs||120}s</td>
<td>${a.max_retries||0} / ${a.retry_delay_ms||500}ms</td>
<td><span class="badge ${a.enabled?'green':'red'}">${a.enabled?'Enabled':'Disabled'}</span></td>
<td><button class="btn sm" onclick="showEditModal(${a.id},'${esc(a.name)}','${esc(a.provider)}','${esc(a.base_url)}','','${esc((a.models||[]).join(','))}',${a.priority},${a.timeout_secs||120},${a.max_retries||0},${a.retry_delay_ms||500},'${esc(a.anthropic_version||'')}','${esc(JSON.stringify(a.default_headers||{}))}', '${esc(JSON.stringify(a.model_aliases||{}))}')">Edit</button>
<button class="btn sm" onclick="toggleAccount(${a.id},${!a.enabled})">${a.enabled?'Disable':'Enable'}</button>
<button class="btn sm danger" onclick="deleteAccount(${a.id})">Delete</button></td>
</tr>`).join('')}
function renderHealth(h){const s=h.summary||{};document.getElementById('health-cards').innerHTML=`
<div class="card"><div class="label">Healthy</div><div class="value green">${s.healthy||0}</div></div>
<div class="card"><div class="label">Degraded</div><div class="value yellow">${s.degraded||0}</div></div>
<div class="card"><div class="label">Circuit Open</div><div class="value red">${s.circuit_open||0}</div></div>
<div class="card"><div class="label">Total</div><div class="value">${s.total||0}</div></div>`;
const tb=document.getElementById('health-tbody');const accts=h.accounts||[];
if(!accts.length){tb.innerHTML='<tr><td colspan="7" class="empty">No health data</td></tr>';return}
tb.innerHTML=accts.map(a=>`<tr>
<td><strong>${esc(a.account_name)}</strong></td>
<td><span class="badge ${a.state==='healthy'?'green':a.state==='degraded'?'yellow':'red'}">${a.state}</span></td>
<td>${a.consecutive_failures}</td><td>${a.total_failures}</td><td>${a.total_successes}</td><td>${a.total_opens}</td>
<td><button class="btn sm" onclick="forceClose('${esc(a.account_name)}')">Reset</button>
<button class="btn sm danger" onclick="forceOpen('${esc(a.account_name)}')">Force Open</button></td>
</tr>`).join('')}
function renderUsage(s){const t=s.totals||{};document.getElementById('usage-cards').innerHTML=`
<div class="card"><div class="label">Total Prompt Tokens</div><div class="value">${fmtNum(t.prompt_tokens||0)}</div></div>
<div class="card"><div class="label">Total Completion Tokens</div><div class="value">${fmtNum(t.completion_tokens||0)}</div></div>
<div class="card"><div class="label">Total Tokens</div><div class="value green">${fmtNum(t.total_tokens||0)}</div></div>
<div class="card"><div class="label">Total Invocations</div><div class="value">${fmtNum(s.invocation_count||0)}</div></div>`;
const tb=document.getElementById('usage-tbody');const bm=s.by_model||[];
if(!bm.length){tb.innerHTML='<tr><td colspan="5" class="empty">No usage data yet</td></tr>';return}
const maxTokens=Math.max(...bm.map(m=>m.total_tokens||0),1);
tb.innerHTML=bm.map(m=>`<tr>
<td><strong>${esc(m.model||'unknown')}</strong></td>
<td>${fmtNum(m.request_count||0)}</td>
<td>${fmtNum(m.prompt_tokens||0)}</td>
<td>${fmtNum(m.completion_tokens||0)}</td>
<td>${fmtNum(m.total_tokens||0)}<div class="usage-bar"><div class="fill" style="width:${((m.total_tokens||0)/maxTokens*100).toFixed(1)}%;background:var(--primary)"></div></div></td>
</tr>`).join('')}
function renderLogs(logs){const tb=document.getElementById('logs-tbody');if(!logs.length){tb.innerHTML='<tr><td colspan="8" class="empty">No logs yet</td></tr>';return}
tb.innerHTML=logs.slice(0,50).map(l=>`<tr>
<td style="white-space:nowrap;font-size:12px;color:var(--text2)">${esc(l.created_at||'')}</td>
<td style="font-family:monospace;font-size:12px">${esc(l.request_id||'').substring(0,8)}</td>
<td>${esc(l.account_name||'-')}</td>
<td><span class="badge blue">${esc(l.protocol||'')}</span></td>
<td>${esc(l.model||'-')}</td>
<td>${l.status_code?`<span class="badge ${l.status_code<400?'green':'red'}">${l.status_code}</span>`:'-'}</td>
<td>${l.latency_ms?l.latency_ms+'ms':'-'}</td>
<td style="color:var(--red);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(l.error_message||'')}</td>
</tr>`).join('')}
function showAddModal(){document.getElementById('addModal').classList.add('show');document.getElementById('modalTitle').textContent='Add Account'}
function hideAddModal(){document.getElementById('addModal').classList.remove('show')}
async function submitAccount(){const name=document.getElementById('f-name').value.trim();const provider=document.getElementById('f-provider').value;const base_url=document.getElementById('f-baseurl').value.trim();const api_key=document.getElementById('f-apikey').value;const models=document.getElementById('f-models').value.split(',').map(s=>s.trim()).filter(Boolean);const priority=parseInt(document.getElementById('f-priority').value)||10;const timeout_secs=parseInt(document.getElementById('f-timeout').value)||120;const max_retries=parseInt(document.getElementById('f-maxretries').value)||0;const retry_delay_ms=parseInt(document.getElementById('f-retrydelay').value)||500;const anthropic_version=document.getElementById('f-anthropicver').value.trim()||null;let default_headers={};try{const v=document.getElementById('f-headers').value.trim();if(v)default_headers=JSON.parse(v)}catch(e){toast('Invalid JSON in Default Headers','error');return}let model_aliases={};try{const v=document.getElementById('f-aliases').value.trim();if(v)model_aliases=JSON.parse(v)}catch(e){toast('Invalid JSON in Model Aliases','error');return}
if(!name||!base_url){toast('Name and Base URL are required','error');return}
const body={name,provider,base_url,models,priority,timeout_secs,max_retries,retry_delay_ms,enabled:true};
if(api_key)body.api_key=api_key;
if(anthropic_version)body.anthropic_version=anthropic_version;
if(Object.keys(default_headers).length)body.default_headers=default_headers;
if(Object.keys(model_aliases).length)body.model_aliases=model_aliases;
const editId=document.getElementById('addModal').dataset.editId;
if(editId){try{await api('/backend/v3/api/router/accounts/'+editId,{method:'PUT',body:JSON.stringify(body)});hideAddModal();toast('Account updated');loadData()}catch(e){toast('Failed: '+e.message,'error')}}else{try{await api('/backend/v3/api/router/accounts',{method:'POST',body:JSON.stringify(body)});hideAddModal();toast('Account added');loadData()}catch(e){toast('Failed: '+e.message,'error')}}}
function showEditModal(id,name,provider,base_url,api_key,models,priority,timeout_secs,max_retries,retry_delay_ms,anthropic_version,default_headers,model_aliases){document.getElementById('modalTitle').textContent='Edit Account';document.getElementById('addModal').classList.add('show');
try{var dh=JSON.parse(decodeURIComponent(default_headers||'{}'))}catch(e){dh={}}
try{var ma=JSON.parse(decodeURIComponent(model_aliases||'{}'))}catch(e){ma={}}
document.getElementById('f-name').value=name;document.getElementById('f-provider').value=provider;document.getElementById('f-baseurl').value=base_url;document.getElementById('f-apikey').value='';document.getElementById('f-models').value=models;document.getElementById('f-priority').value=priority;document.getElementById('f-timeout').value=timeout_secs;document.getElementById('f-maxretries').value=max_retries;document.getElementById('f-retrydelay').value=retry_delay_ms;document.getElementById('f-anthropicver').value=decodeURIComponent(anthropic_version||'');
document.getElementById('f-headers').value=JSON.stringify(dh,null,2);document.getElementById('f-aliases').value=JSON.stringify(ma,null,2);
document.getElementById('addModal').dataset.editId=id}
function hideAddModal(){document.getElementById('addModal').classList.remove('show');delete document.getElementById('addModal').dataset.editId;document.getElementById('modalTitle').textContent='Add Account';document.getElementById('f-name').value='';document.getElementById('f-baseurl').value='';document.getElementById('f-apikey').value='';document.getElementById('f-models').value='';document.getElementById('f-priority').value='10';document.getElementById('f-timeout').value='120';document.getElementById('f-maxretries').value='0';document.getElementById('f-retrydelay').value='500';document.getElementById('f-anthropicver').value='';document.getElementById('f-headers').value='';document.getElementById('f-aliases').value='';}
function showAddModal(){document.getElementById('addModal').classList.add('show');document.getElementById('modalTitle').textContent='Add Account'}
async function toggleAccount(id,enabled){try{await api('/backend/v3/api/router/accounts/'+id+'/toggle',{method:'POST',body:JSON.stringify({enabled})});toast(enabled?'Account enabled':'Account disabled');loadData()}catch(e){toast('Failed: '+e.message,'error')}}
async function deleteAccount(id){if(!confirm('Delete this account?'))return;try{await api('/backend/v3/api/router/accounts/'+id,{method:'DELETE'});toast('Account deleted');loadData()}catch(e){toast('Failed: '+e.message,'error')}}
async function forceOpen(name){try{await api('/backend/v3/api/router/health/'+encodeURIComponent(name)+'/open',{method:'POST'});toast('Circuit opened');loadData()}catch(e){toast('Failed: '+e.message,'error')}}
async function forceClose(name){try{await api('/backend/v3/api/router/health/'+encodeURIComponent(name)+'/close',{method:'POST'});toast('Circuit closed');loadData()}catch(e){toast('Failed: '+e.message,'error')}}
async function setStrategy(s){try{await api('/backend/v3/api/router/strategy',{method:'POST',body:JSON.stringify({strategy:s})});toast('Strategy updated');loadData()}catch(e){toast('Failed: '+e.message,'error')}}
function esc(s){if(!s)return'';const d=document.createElement('div');d.textContent=s;return d.innerHTML}
function fmtNum(n){return n.toLocaleString()}
</script>
</body>
</html>"##;
