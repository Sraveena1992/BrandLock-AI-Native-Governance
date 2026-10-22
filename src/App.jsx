import React, { useState } from 'react';
import { Shield, ShieldCheck, RefreshCw, Cpu, FileText, Layers, Zap, Info, Check, X, Sparkles, Terminal, LayoutDashboard, Award } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('studio');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  const [copyText, setCopyText] = useState("Get ready for the launch! We offer 50% discount on services. Contact internal-team@acme.com for info.");
  const [logs, setLogs] = useState([]);
  
  const [findings, setFindings] = useState([
    { id: 1, category: 'Confidentiality', severity: 'High', agent: 'Security Agent', issue: 'Internal email address exposed', suggestion: 'Remove internal email.', fixed: false },
    { id: 2, category: 'Claims', severity: 'Medium', agent: 'Fact Check', issue: 'Unverified discount claim', suggestion: 'Replace with special offer.', fixed: false }
  ]);

  const runScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setLogs(['Initializing Agent Swarm...', 'Running Tone & Security Checks...', 'Scan Complete!']);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 1200);
  };

  const fixItem = (id) => {
    setFindings(prev => prev.map(item => item.id === id ? { ...item, fixed: true } : item));
    if (id === 1) setCopyText(prev => prev.replace('internal-team@acme.com', 'contact@acme.com'));
    if (id === 2) setCopyText(prev => prev.replace('50% discount', 'special offer'));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-950 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-wide flex items-center gap-2">
              BrandLock <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30">AI Governance</span>
            </h1>
            <p className="text-xs text-slate-400">Multi-Agent Content Compliance Platform</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => setShowRoadmapModal(true)} className="text-xs bg-indigo-900/40 text-indigo-300 border border-indigo-700/50 px-3 py-1.5 rounded-md">
            Round 3 Roadmap
          </button>
          <button onClick={() => setShowAboutModal(true)} className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-md">
            About
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-6">
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-white">Pre-Publish Content Auditor</h2>
            <p className="text-xs text-slate-400 mt-1">Run real-time multi-agent checks on marketing copy.</p>
          </div>
          <button onClick={runScan} disabled={isScanning} className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition flex items-center gap-2">
            {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            {isScanning ? 'Scanning...' : 'Run AI Swarm Check'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase">Campaign Copy Editor</h3>
            <textarea value={copyText} onChange={(e) => setCopyText(e.target.value)} rows={5} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"></textarea>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-semibold text-slate-200">Governance Findings</h3>
            {!scanComplete && <p className="text-xs text-slate-500 py-8 text-center">Click "Run AI Swarm Check" to analyze content.</p>}
            {scanComplete && findings.map(item => (
              <div key={item.id} className={`p-3 rounded-xl border ${item.fixed ? 'opacity-50 bg-slate-900' : 'bg-rose-950/20 border-rose-800/40'}`}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-rose-400">{item.category}</span>
                  <span className="text-slate-400">{item.agent}</span>
                </div>
                <p className="text-xs text-slate-300 mb-2">{item.issue}</p>
                {!item.fixed ? (
                  <button onClick={() => fixItem(item.id)} className="bg-indigo-600 text-white px-2.5 py-1 rounded text-[11px]">Auto-Fix</button>
                ) : (
                  <span className="text-emerald-400 text-[11px] flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Fixed</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {showAboutModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-3">
            <h3 className="font-bold text-white">About BrandLock</h3>
            <p className="text-xs text-slate-300">AI-native brand governance platform built for TechCircuit / Inkloom AI.</p>
            <button onClick={() => setShowAboutModal(false)} className="w-full bg-indigo-600 text-white py-2 rounded-xl text-xs">Close</button>
          </div>
        </div>
      )}

      {showRoadmapModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-3">
            <h3 className="font-bold text-white">Round 3 Major Improvements</h3>
            <p className="text-xs text-slate-300">1. Figma & Canva Plugin Integration<br/>2. Automated Guideline Generator<br/>3. Advanced Governance Analytics Dashboard</p>
            <button onClick={() => setShowRoadmapModal(false)} className="w-full bg-indigo-600 text-white py-2 rounded-xl text-xs">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
