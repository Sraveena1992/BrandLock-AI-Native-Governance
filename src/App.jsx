import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, CheckCircle, RefreshCw, Cpu, FileText, 
  Layers, ChevronRight, Zap, Eye, Download, Info, Check, X, Sparkles, 
  Terminal, Shield, FileCheck, HelpCircle, LayoutDashboard, Share2, Award
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('studio');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [userRole, setUserRole] = useState('creator'); // creator, manager, compliance
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [apiKey, setApiKey] = useState('');

  // Sample Campaign Copy with intentional brand violations
  const [campaignCopy, setCampaignCopy] = useState(
    "Get ready for Acme's secret launch! We are offering a 50% discount on all cloud services next week. No other provider comes close to our speed. Contact our team at internal-project-alpha@acme.corp to pre-register today."
  );

  // Agent Swarm Log Tracking
  const [agentLogs, setAgentLogs] = useState([]);
  
  // Findings state
  const [findings, setFindings] = useState([
    {
      id: 1,
      category: 'Confidentiality',
      severity: 'High',
      agent: 'Security & Leak Agent',
      issue: 'Internal codename and confidential email leaked',
      citation: 'Policy Doc - Sec 4.2: Confidential Information',
      suggestion: 'Remove internal email and project codename before publishing.',
      fixed: false
    },
    {
      id: 2,
      category: 'Claims & Facts',
      severity: 'Medium',
      agent: 'Fact Check Agent',
      issue: 'Unsubstantiated discount rate and comparative claim',
      citation: 'Brand Guidelines - Page 12: Superlatives & Promos',
      suggestion: 'Replace "50% discount" with "exclusive offer" unless verified by Finance.',
      fixed: false
    },
    {
      id: 3,
      category: 'Tone & Style',
      severity: 'Low',
      agent: 'Tone Alignment Agent',
      issue: 'Informal tone ("secret launch") inconsistent with Enterprise Voice',
      citation: 'Voice & Tone Spec - Page 3: Professional Standard',
      suggestion: 'Change "secret launch" to "upcoming feature release".',
      fixed: false
    }
  ]);

  const runAgentSwarm = () => {
    setIsScanning(true);
    setScanComplete(false);
    setAgentLogs([]);

    const logSequence = [
      '🤖 Initializing Multi-Agent Swarm Environment...',
      '🔍 Agent 1 (Tone & Persona): Checking executive brand alignment...',
      '📚 Agent 2 (Terminology): Scanning vector DB for banned terms...',
      '⚖️ Agent 3 (Fact & Claim): Verifying discount rate & comparative claims...',
      '🎨 Agent 4 (Visual Identity): Validating color codes & logo safe zones...',
      '♿ Agent 5 (Accessibility): Auditing alt text and readability scores...',
      '🔒 Agent 6 (Confidentiality): Executing data leak & NDA disclosure check...',
      '✅ Swarm Synthesis Complete! Findings synthesized with citations.'
    ];

    logSequence.forEach((log, index) => {
      setTimeout(() => {
        setAgentLogs((prev) => [...prev, log]);
        if (index === logSequence.length - 1) {
          setIsScanning(false);
          setScanComplete(true);
        }
      }, (index + 1) * 400);
    });
  };

  const applyAutoFix = (id) => {
    setFindings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, fixed: true } : item))
    );
    if (id === 1) {
      setCampaignCopy((prev) =>
        prev.replace('internal-project-alpha@acme.corp', 'contact@acme.com')
      );
    } else if (id === 2) {
      setCampaignCopy((prev) =>
        prev.replace('50% discount', 'special offer')
      );
    } else if (id === 3) {
      setCampaignCopy((prev) =>
        prev.replace('secret launch', 'upcoming release')
      );
    }
  };

  const applyAllFixes = () => {
    findings.forEach((item) => applyAutoFix(item.id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Header Navigation */}
      <header className="border-b border-slate-800 bg-slate-950 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-wide flex items-center gap-2">
              BrandLock <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30">AI-Native Governance</span>
            </h1>
            <p className="text-xs text-slate-400">Multi-Agent Content Compliance & Pre-Publish Review</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowRoadmapModal(true)}
            className="flex items-center gap-1.5 text-xs bg-indigo-900/40 text-indigo-300 border border-indigo-700/50 px-3 py-1.5 rounded-md hover:bg-indigo-800/50 transition"
          >
            <Award className="w-4 h-4 text-indigo-400" />
            Round 3 Roadmap
          </button>

          <button 
            onClick={() => setShowAboutModal(true)}
            className="flex items-center gap-1.5 text-xs bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-700 transition"
          >
            <Info className="w-4 h-4 text-slate-400" />
            About BrandLock
          </button>

          <div className="h-4 w-px bg-slate-800"></div>

          {/* Role Switcher */}
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setUserRole('creator')}
              className={`px-3 py-1 rounded-md transition ${userRole === 'creator' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Creator
            </button>
            <button
              onClick={() => setUserRole('manager')}
              className={`px-3 py-1 rounded-md transition ${userRole === 'manager' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Brand Manager
            </button>
            <button
              onClick={() => setUserRole('compliance')}
              className={`px-3 py-1 rounded-md transition ${userRole === 'compliance' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Legal & Compliance
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-slate-800 bg-slate-950/50 p-4 flex flex-col justify-between hidden md:flex">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Navigation</p>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('studio')}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'studio' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Content Studio</span>
                </button>
                <button
                  onClick={() => setActiveTab('rules')}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'rules' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Brand Guidelines DB</span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'analytics' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Governance Analytics</span>
                </button>
              </nav>
            </div>

            {/* Active AI Swarm Status */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  Swarm Engine
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">6 Autonomous specialized agents ready for parallel verification.</p>
              <div className="space-y-1 text-[11px] text-slate-400">
                <div className="flex justify-between"><span>Tone & Persona Agent</span><Check className="w-3 h-3 text-emerald-400" /></div>
                <div className="flex justify-between"><span>Terminology Matcher</span><Check className="w-3 h-3 text-emerald-400" /></div>
                <div className="flex justify-between"><span>Fact & Claim Verifier</span><Check className="w-3 h-3 text-emerald-400" /></div>
                <div className="flex justify-between"><span>Visual Identity Agent</span><Check className="w-3 h-3 text-emerald-400" /></div>
                <div className="flex justify-between"><span>Accessibility Auditor</span><Check className="w-3 h-3 text-emerald-400" /></div>
                <div className="flex justify-between"><span>Confidentiality Leak</span><Check className="w-3 h-3 text-emerald-400" /></div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-3">
            Team BrandLock • Round 2 Build
          </div>
        </aside>

        {/* Content Workspace */}
        <main className="flex-1 bg-slate-900/60 overflow-y-auto p-6">
          {activeTab === 'studio' && (
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Studio Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    Pre-Publish Content Auditor
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Paste copy or upload campaign collateral to run real-time agentic governance checks.</p>
                </div>
                <button
                  onClick={runAgentSwarm}
                  disabled={isScanning}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-lg ${isScanning ? 'bg-indigo-800 text-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25'}`}
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Swarm Auditing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-white" />
                      Run AI Swarm Check
                    </>
                  )}
                </button>
              </div>

              {/* Main Workspace Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Editor & Input */}
                <div className="space-y-4">
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Campaign Copy Editor</span>
                      <span className="text-xs text-slate-500">{campaignCopy.length} characters</span>
                    </div>

                    <textarea
                      value={campaignCopy}
                      onChange={(e) => setCampaignCopy(e.target.value)}
                      rows={6}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition resize-none font-sans"
                      placeholder="Enter marketing copy, press release, or social media content..."
                    ></textarea>

                    <div className="flex justify-between items-center text-xs text-slate-400 pt-2">
                      <span>Target Platform: <strong>LinkedIn Corporate</strong></span>
                      <button 
                        onClick={() => setCampaignCopy("Get ready for Acme's secret launch! We are offering a 50% discount on all cloud services next week. No other provider comes close to our speed. Contact our team at internal-project-alpha@acme.corp to pre-register today.")}
                        className="text-indigo-400 hover:underline"
                      >
                        Reset Demo Copy
                      </button>
                    </div>
                  </div>

                  {/* Swarm Execution Logs Terminal */}
                  {(isScanning || agentLogs.length > 0) && (
                    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-2">
                      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-semibold text-slate-300">Agent Swarm Live Execution Terminal</span>
                      </div>
                      <div className="bg-slate-900/90 rounded-lg p-3 font-mono text-xs text-slate-300 space-y-1.5 max-h-40 overflow-y-auto">
                        {agentLogs.map((log, i) => (
                          <div key={i} className="leading-relaxed">{log}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: AI Findings & Suggestions */}
                <div className="space-y-4">
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-200">Governance Findings</h3>
                        <p className="text-xs text-slate-400">Grounded in Acme Corporate Guidelines 2026</p>
                      </div>
                      {scanComplete && (
                        <button
                          onClick={applyAllFixes}
                          className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg hover:bg-emerald-500/20 transition flex items-center gap-1.5 font-medium"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          1-Click Fix All
                        </button>
                      )}
                    </div>

                    {!scanComplete && !isScanning && (
                      <div className="text-center py-12 text-slate-500 space-y-2">
                        <ShieldCheck className="w-10 h-10 mx-auto stroke-1 text-slate-600" />
                        <p className="text-sm">Click "Run AI Swarm Check" to start multi-agent analysis.</p>
                      </div>
                    )}

                    {isScanning && (
                      <div className="text-center py-12 text-indigo-400 space-y-3">
                        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-indigo-500" />
                        <p className="text-xs text-slate-400">Agents analyzing vector chunks & verifying policies...</p>
                      </div>
                    )}

                    {scanComplete && (
                      <div className="space-y-3">
                        {findings.map((item) => (
                          <div
                            key={item.id}
                            className={`p-4 rounded-xl border transition ${item.fixed ? 'bg-slate-900/40 border-slate-800/60 opacity-60' : item.severity === 'High' ? 'bg-rose-950/20 border-rose-800/40' : item.severity === 'Medium' ? 'bg-amber-950/20 border-amber-800/40' : 'bg-blue-950/20 border-blue-800/40'}`}
                          >
                            <div className="flex justify-between items-start mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${item.severity === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : item.severity === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                                  {item.severity}
                                </span>
                                <span className="text-xs font-semibold text-slate-200">{item.category}</span>
                              </div>
                              <span className="text-[10px] text-slate-500">{item.agent}</span>
                            </div>

                            <p className="text-xs text-slate-300 mb-2">{item.issue}</p>

                            <div className="bg-slate-900 p-2 rounded text-[11px] text-indigo-300/90 font-mono mb-2 border border-slate-800">
                              📖 {item.citation}
                            </div>

                            <div className="flex justify-between items-center text-xs pt-1">
                              <span className="text-slate-400 text-[11px]">{item.suggestion}</span>
                              {!item.fixed ? (
                                <button
                                  onClick={() => applyAutoFix(item.id)}
                                  className="ml-2 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-medium transition whitespace-nowrap"
                                >
                                  Auto-Fix
                                </button>
                              ) : (
                                <span className="text-emerald-400 text-[11px] flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" /> Fixed
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
            <div className="max-w-4xl mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-lg font-bold text-white">Brand Guidelines Index (Vector Storage)</h2>
              <p className="text-xs text-slate-400">ChromaDB tenant database containing parsed brand rules for Acme Corp.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Tone & Voice Rules</h4>
                  <p className="text-xs text-slate-300">Maintain an authoritative, clear, and professional tone. Avoid hype words like "secret" or "unbeatable".</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">Confidentiality Rules</h4>
                  <p className="text-xs text-slate-300">Never publish internal email domains (@acme.corp), unannounced project codenames, or unverified financial figures.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="max-w-4xl mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-lg font-bold text-white">Governance Analytics Dashboard</h2>
              <p className="text-xs text-slate-400">Real-time organizational compliance metrics across teams.</p>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                  <span className="text-2xl font-extrabold text-emerald-400">94.2%</span>
                  <p className="text-xs text-slate-400 mt-1">Brand Clarity Index</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                  <span className="text-2xl font-extrabold text-indigo-400">142</span>
                  <p className="text-xs text-slate-400 mt-1">Pre-Publish Audits</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                  <span className="text-2xl font-extrabold text-amber-400">18</span>
                  <p className="text-xs text-slate-400 mt-1">Auto-Fixes Applied</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">About BrandLock</h3>
              <button onClick={() => setShowAboutModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </
