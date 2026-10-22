import React, { useState } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
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
  Award
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('studio');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [userRole, setUserRole] = useState('creator');
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  const [campaignCopy, setCampaignCopy] = useState(
    "Get ready for Acme's secret launch! We are offering a 50% discount on all cloud services next week. No other provider comes close to our speed. Contact our team at internal-project-alpha@acme.corp to pre-register today."
  );

  const [agentLogs, setAgentLogs] = useState([]);
  
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
      }, (index + 1) * 350);
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
      {/* Header */}
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
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
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
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'rules' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text
