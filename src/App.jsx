import React, { useState } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  RefreshCw, 
  Cpu, 
  FileText, 
  Layers, 
  Zap, 
  Info, 
  Check, 
  X, 
  Sparkles, 
  Terminal, 
  LayoutDashboard, 
  Award,
  CheckCircle,
  Users,
  CheckSquare,
  Activity,
  Database,
  Server,
  Code2,
  AlertOctagon,
  Gauge
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('studio');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [userRole, setUserRole] = useState('creator');
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [showDevInspector, setShowDevInspector] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const defaultText = "Get ready for Acme's secret launch! We offer a 50% discount on all cloud services next week. No other provider comes close to our speed. Contact internal-project-alpha@acme.corp to pre-register today.";
  const [campaignCopy, setCampaignCopy] = useState(defaultText);

  const [auditLogs, setAuditLogs] = useState([]);
  const [findings, setFindings] = useState([]);
  const [riskScore, setRiskScore] = useState(0);

  // Dynamic Rule Engine Execution
  const analyzeTextDynamically = (text) => {
    const detected = [];
    let calculatedRisk = 0;

    // 1. Confidentiality / NDA Leak Rules
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    const emailMatches = text.match(emailRegex);
    if (emailMatches) {
      emailMatches.forEach((email) => {
        if (email.includes('internal') || email.includes('.corp') || email.includes('admin') || email.includes('dev')) {
          detected.push({
            id: 'conf-' + Math.random().toString(36).substr(2, 4),
            category: 'Confidentiality Leak',
            severity: 'High',
            ruleGroup: 'Confidentiality rules',
            target: email,
            replacement: 'contact@acme.com',
            issue: `Internal domain or unauthorized address exposure: "${email}"`,
            citation: 'Enterprise Policy Sec 4.2: NDA & Private Domain Restrictions',
            suggestion: 'Replace with approved public contact endpoint.',
            fixed: false
          });
          calculatedRisk += 40;
        }
      });
    }

    if (text.toLowerCase().includes('secret launch') || text.toLowerCase().includes('project-alpha')) {
      detected.push({
        id: 'code-' + Math.random().toString(36).substr(2, 4),
        category: 'NDA Disclosure',
        severity: 'High',
        agent: 'Security & Leak Agent',
        target: text.toLowerCase().includes('secret launch') ? 'secret launch' : 'project-alpha',
        replacement: 'upcoming feature release',
        issue: 'Unannounced product internal codename or launch status',
        citation: 'Corporate Governance - Clause 9: Product Release Cycles',
        suggestion: 'Use standardized external release terminology.',
        fixed: false
      });
      calculatedRisk += 30;
    }

    // 2. Fact & Claim Verifier Rules
    const discountRegex = /(\d+%\s*discount|\bguarantee\b|\b100%\b|\bno other provider\b)/gi;
    const claimMatches = text.match(discountRegex);
    if (claimMatches) {
      claimMatches.forEach((claim) => {
        detected.push({
          id: 'claim-' + Math.random().toString(36).substr(2, 4),
          category: 'Unverified Claim',
          severity: 'Medium',
          ruleGroup: 'Claims rules',
          target: claim,
          replacement: claim.toLowerCase().includes('discount') ? 'special promo offer' : 'industry-leading standards',
          issue: `Unsubstantiated legal or financial claim: "${claim}"`,
          citation: 'Brand Guidelines 2026 - Page 14: Promos & Comparative Claims',
          suggestion: 'Substitute with pre-approved marketing phrasing.',
          fixed: false
        });
        calculatedRisk += 20;
      });
    }

    // Default Fallback
    if (detected.length === 0 && text.trim().length > 10) {
      calculatedRisk = 0;
    }

    return { detected, risk: Math.min(100, calculatedRisk) };
  };

  const runPolicyAudit = () => {
    setIsScanning(true);
    setScanComplete(false);
    setIsApproved(false);
    setAgentLogs([]);

    const { detected, risk } = analyzeTextDynamically(campaignCopy);

    const logSequence = [
      '[Policy Engine]: Starting browser-local rule checks...',
      '🔍 [Check 1 - Confidentiality]: Inspecting internal addresses and selected disclosure phrases...',
      '📚 [Check 2 - Claims]: Inspecting selected promotional and comparative claims...',
      '⚖️ [Synthesis]: Grouping matched rules into review findings...',
      '🔒 [Rule Check]: Applying local pattern matching for private domains and selected codenames...',
      '♿ [Scope]: Tone, visual identity and full accessibility checks are not included in this build.',
      '✅ [Policy Engine]: Local audit completed. Review each finding before making a decision.'
    ];

    setAgentLogs(logSequence);
    setFindings(detected);
    setRiskScore(risk);
    setIsScanning(false);
    setScanComplete(true);
  };

  const applyAutoFix = (id) => {
    const itemToFix = findings.find((f) => f.id === id);
    if (!itemToFix) return;

    setFindings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, fixed: true } : item))
    );

    if (itemToFix.target && itemToFix.replacement) {
      setCampaignCopy((prev) => prev.replace(itemToFix.target, itemToFix.replacement));
    }

    const remaining = findings.filter((item) => item.id !== id && !item.fixed);
    setRiskScore(Math.min(100, remaining.reduce((total, item) => total + (item.severity === 'High' ? 40 : 20), 0)));
  };

  const applyAllFixes = () => {
    let updatedText = campaignCopy;
    findings.forEach((item) => {
      if (item.target && item.replacement) {
        updatedText = updatedText.replace(item.target, item.replacement);
      }
    });
    setCampaignCopy(updatedText);
    setFindings((prev) => prev.map((item) => ({ ...item, fixed: true })));
    setRiskScore(0);
  };

  const handleFullReset = () => {
    setCampaignCopy(defaultText);
    setFindings([]);
    setAgentLogs([]);
    setScanComplete(false);
    setIsScanning(false);
    setIsApproved(false);
    setRiskScore(0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 py-3 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wide flex items-center gap-2 text-white">
              BrandLock <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30 font-semibold uppercase">Round 2 Prototype</span>
            </h1>
            <p className="text-xs text-slate-400">Brand Governance · Local Policy Audit</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowDevInspector(!showDevInspector)}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition font-mono ${showDevInspector ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'}`}
          >
            <Code2 className="w-4 h-4 text-emerald-400" />
            Audit Details
          </button>

          <button 
            onClick={() => setShowRoadmapModal(true)}
            className="flex items-center gap-1.5 text-xs bg-indigo-950/60 text-indigo-300 border border-indigo-700/50 px-3 py-1.5 rounded-lg hover:bg-indigo-900/50 transition font-medium"
          >
            <Award className="w-4 h-4 text-indigo-400" />
            R3 Roadmap
          </button>

          <button 
            onClick={() => setShowAboutModal(true)}
            className="flex items-center gap-1.5 text-xs bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-700 transition font-medium"
          >
            <Info className="w-4 h-4 text-slate-400" />
            About
          </button>

          <div className="h-4 w-px bg-slate-800"></div>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setUserRole('creator')}
              className={`px-3 py-1 rounded-md transition font-semibold ${userRole === 'creator' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Creator
            </button>
            <button
              onClick={() => setUserRole('manager')}
              className={`px-3 py-1 rounded-md transition font-semibold ${userRole === 'manager' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Brand Lead
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800 bg-slate-900/40 p-4 flex flex-col justify-between hidden md:flex">
          <div className="space-y-5">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Governance Studio</p>
              <nav className="space-y-1.5">
                <button
                  onClick={() => setActiveTab('studio')}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${activeTab === 'studio' ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Content Auditor</span>
                </button>
                <button
                  onClick={() => setActiveTab('rules')}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${activeTab === 'rules' ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Policy Rules</span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${activeTab === 'analytics' ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Risk Metrics</span>
                </button>
              </nav>
            </div>

            {/* Live Risk Index Gauge */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-indigo-400" />
                  Policy Exposure
                </span>
                <span className={`text-xs font-extrabold ${riskScore > 50 ? 'text-rose-400' : riskScore > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {riskScore}% RISK
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div 
                  className={`h-full transition-all duration-500 ${riskScore > 50 ? 'bg-rose-500' : riskScore > 0 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${riskScore}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-400">Calculated from the selected local policy checks.</p>
            </div>

            {/* Health Probes */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Activity className="w-3 h-3 text-indigo-400" /> Prototype Status
              </span>
              <div className="space-y-1 text-[10px] font-mono">
                <div className="flex justify-between text-slate-400"><span>Audit mode:</span><span className="text-emerald-400">Local</span></div>
                <div className="flex justify-between text-slate-400"><span>Policy Rules:</span><span className="text-emerald-400">Built-in demo rules</span></div>
                <div className="flex justify-between text-slate-400"><span>Execution:</span><span className="text-indigo-400">Browser-local</span></div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 border-t border-slate-800/80 pt-3 flex justify-between items-center">
            <span>BrandLock v2.4</span>
            <span className="text-indigo-400 font-semibold">TechCircuit R2</span>
          </div>
        </aside>

        {/* Content Workspace */}
        <main className="flex-1 bg-slate-950 overflow-y-auto p-6">
          {/* Execution Details Panel */}
          {showDevInspector && (
            <div className="mb-6 bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 font-mono text-xs text-slate-300 space-y-2 shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-emerald-400 font-bold flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Local Policy Engine Execution Details
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">LOCAL RULE ENGINE</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block mb-1">// Request Body:</span>
                  <pre className="text-indigo-300 whitespace-pre-wrap">{JSON.stringify({ content: campaignCopy, channel: "Enterprise Press Release", execution: "browser-local rule checks" }, null, 2)}</pre>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block mb-1">// Synthesized Response:</span>
                  <pre className="text-emerald-300 whitespace-pre-wrap">{JSON.stringify({ risk_score: riskScore, violations_found: findings.length, status: scanComplete ? "COMPLETED" : "IDLE" }, null, 2)}</pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'studio' && (
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Top Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">Pre-Publish Brand Policy Auditor</h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 rounded uppercase">
                      Role: {userRole === 'creator' ? 'Content Creator' : 'Brand Lead / Approver'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Paste campaign text to run the built-in local policy checks.</p>
                </div>
                
                <button
                  onClick={runPolicyAudit}
                  disabled={isScanning}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition shadow-lg ${isScanning ? 'bg-indigo-800 text-indigo-300 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/30'}`}
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-white" />
                      Run Policy Audit
                    </>
                  )}
                </button>
              </div>

              {/* Role Context Bar for Brand Lead */}
              {userRole === 'manager' && (
                <div className="bg-gradient-to-r from-indigo-950/60 to-slate-900 p-4 rounded-xl border border-indigo-800/40 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-400" />
                    <span><strong>Brand Lead Mode Active:</strong> Review creator fixes, inspect audit logs, and give final publish approval.</span>
                  </div>
                  <button 
                    disabled={!scanComplete || findings.some((item) => !item.fixed)}
                    onClick={() => setIsApproved(!isApproved)}
                    className={`px-4 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed ${isApproved ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
                  >
                    <CheckSquare className="w-4 h-4" />
                    {isApproved ? 'Approved for Publish ✅' : 'Approve Campaign Copy'}
                  </button>
                </div>
              )}

              {/* Grid Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Input Editor */}
                <div className="space-y-4">
                  <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-3 shadow-lg">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Campaign Copy Editor</span>
                      <span className="text-xs text-slate-500 font-mono">{campaignCopy.length} characters</span>
                    </div>

                    <textarea
                      value={campaignCopy}
                      onChange={(e) => { setCampaignCopy(e.target.value); setScanComplete(false); setFindings([]); setRiskScore(0); setIsApproved(false); }}
                      rows={7}
                      readOnly={userRole === 'manager'}
                      className={`w-full bg-slate-950 border rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none transition resize-none leading-relaxed font-sans ${userRole === 'manager' ? 'border-indigo-800/40 opacity-90' : 'border-slate-800 focus:border-indigo-500'}`}
                      placeholder="Type or paste marketing copy here to test dynamic AI governance..."
                    ></textarea>

                    <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
                      <span>Target Channel: <strong className="text-slate-200">Enterprise Press Release</strong></span>
                      <button 
                        onClick={handleFullReset}
                        className="text-indigo-400 hover:text-indigo-300 hover:underline text-xs font-medium"
                      >
                        Reset Test Copy & State 🔄
                      </button>
                    </div>
                  </div>

                  {/* Policy Audit Console */}
                  {(isScanning || agentLogs.length > 0) && (
                    <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-2 shadow-lg">
                      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-slate-300">Audit Execution Log</span>
                      </div>
                      <div className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] text-slate-300 space-y-1.5 max-h-44 overflow-y-auto border border-slate-800/80">
                        {agentLogs.map((log, i) => (
                          <div key={i} className="leading-normal">{log}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Findings */}
                <div className="space-y-4">
                  <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-lg">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Policy Findings</h3>
                        <p className="text-[11px] text-slate-400">Generated by local rule checks</p>
                      </div>
                      {scanComplete && findings.length > 0 && (
                        <button
                          onClick={applyAllFixes}
                          className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg hover:bg-emerald-500/20 transition flex items-center gap-1.5 font-semibold"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          1-Click Fix All
                        </button>
                      )}
                    </div>

                    {!scanComplete && !isScanning && (
                      <div className="text-center py-12 text-slate-500 space-y-3">
                        <ShieldCheck className="w-12 h-12 mx-auto stroke-1 text-slate-600" />
                        <p className="text-xs">Click "Run Policy Audit" to execute dynamic text audit.</p>
                      </div>
                    )}

                    {isScanning && (
                      <div className="text-center py-12 text-indigo-400 space-y-3">
                        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-indigo-500" />
                        <p className="text-xs text-slate-400">The browser is checking the built-in demonstration rules.</p>
                      </div>
                    )}

                    {scanComplete && findings.length === 0 && (
                      <div className="text-center py-12 text-emerald-400 space-y-2">
                        <CheckCircle className="w-12 h-12 mx-auto stroke-1 text-emerald-400" />
                        <h4 className="font-bold text-sm text-white">No matches found by the current checks</h4>
                        <p className="text-xs text-slate-400">This does not establish full brand compliance. Only the included checks were run.</p>
                      </div>
                    )}

                    {scanComplete && findings.length > 0 && (
                      <div className="space-y-3">
                        {findings.map((item) => (
                          <div
                            key={item.id}
                            className={`p-4 rounded-xl border transition ${item.fixed ? 'bg-slate-900/30 border-slate-800/80 opacity-60' : item.severity === 'High' ? 'bg-rose-950/20 border-rose-800/40' : 'bg-amber-950/20 border-amber-800/40'}`}
                          >
                            <div className="flex justify-between items-start mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${item.severity === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                                  {item.severity}
                                </span>
                                <span className="text-xs font-bold text-slate-200">{item.category}</span>
                              </div>
                              <span className="text-[10px] text-slate-400">{item.ruleGroup}</span>
                            </div>

                            <p className="text-xs text-slate-300 mb-2">{item.issue}</p>

                            <div className="bg-slate-950 p-2 rounded-lg text-[11px] text-indigo-300/90 font-mono mb-2.5 border border-slate-800">
                              📖 {item.citation}
                            </div>

                            <div className="flex justify-between items-center text-xs pt-1">
                              <span className="text-slate-400 text-[11px]">{item.suggestion}</span>
                              {!item.fixed ? (
                                <button
                                  onClick={() => applyAutoFix(item.id)}
                                  className="ml-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[11px] font-semibold transition shadow"
                                >
                                  Auto-Fix
                                </button>
                              ) : (
                                <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                                  <CheckCircle className="w-3.5 h-3.5" /> Fixed
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="max-w-4xl mx-auto bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-400" /> Built-in Demonstration Policy Rules
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase mb-2">Rule Example — Tone and Claims</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">Maintain authoritative executive voice. Flag informal launch phrases and comparative superlatives.</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-rose-400 uppercase mb-2">Rule Example — Confidentiality</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">Detect internal email domains (@acme.corp, dev/admin endpoints) and unannounced project codenames.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="max-w-4xl mx-auto bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-indigo-400" /> Audit Session Metrics
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-2xl font-extrabold text-emerald-400">{100 - riskScore}%</span>
                  <p className="text-xs text-slate-400 mt-1">Compliance Score</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-2xl font-extrabold text-indigo-400">{findings.length}</span>
                  <p className="text-xs text-slate-400 mt-1">Detected Issues</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-2xl font-extrabold text-amber-400">{findings.filter(f => f.fixed).length}</span>
                  <p className="text-xs text-slate-400 mt-1">Resolved Fixes</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-xl w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">About BrandLock Governance Engine</h3>
              <button onClick={() => setShowAboutModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              BrandLock is a prototype brand-governance workspace. Its current browser-local rules flag selected internal disclosure patterns and selected promotional claims before content is published.
            </p>
            <button onClick={() => setShowAboutModal(false)} className="w-full bg-indigo-600 text-white py-2 rounded-xl text-xs font-semibold">
              Close Overview
            </button>
          </div>
        </div>
      )}

      {/* Roadmap Modal */}
      {showRoadmapModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Round 3 Ecosystem Roadmap</h3>
              <button onClick={() => setShowRoadmapModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-300">1. Figma & Canva Plugins<br/>2. Automated PDF Vector Ingestion Engine<br/>3. Enterprise Risk Analytics Dashboard</p>
            <button onClick={() => setShowRoadmapModal(false)} className="w-full bg-indigo-600 text-white py-2 rounded-xl text-xs font-semibold">
              Close Roadmap
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
