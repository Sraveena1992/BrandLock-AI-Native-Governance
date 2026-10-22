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
  Award
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('studio');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [userRole, setUserRole] = useState('creator');
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  const defaultText = "Get ready for Acme secret launch! We offer 50% discount on cloud services. Contact internal-project-alpha@acme.corp to pre-register.";
  const [campaignCopy, setCampaignCopy] = useState(defaultText);

  const [agentLogs, setAgentLogs] = useState([]);
  
  const [findings, setFindings] = useState([
    {
      id: 1,
      category: 'Confidentiality',
      severity: 'High',
      agent: 'Security & Leak Agent',
      issue: 'Internal email leaked in public campaign copy',
      citation: 'Policy Doc - Sec 4.2: Confidentiality',
      suggestion: 'Remove internal email before publishing.',
      fixed: false
    },
    {
      id: 2,
      category: 'Claims & Facts',
      severity: 'Medium',
      agent: 'Fact Check Agent',
      issue: 'Unsubstantiated discount rate claim',
      citation: 'Brand Guidelines - Page 12: Promos',
      suggestion: 'Replace discount claim with special offer.',
      fixed: false
    },
    {
      id: 3,
      category: 'Tone & Style',
      severity: 'Low',
      agent: 'Tone Alignment Agent',
      issue: 'Informal tone inconsistent with Enterprise Voice',
      citation: 'Voice & Tone Spec - Page 3: Standard',
      suggestion: 'Change secret launch to upcoming release.',
      fixed: false
    }
  ]);

  const runAgentSwarm = () => {
    setIsScanning(true);
    setScanComplete(false);
    setAgentLogs([]);

    const logSequence = [
      'Initializing Multi-Agent Swarm Environment...',
      'Agent 1 (Tone): Checking executive brand alignment...',
      'Agent 2 (Terminology): Scanning vector DB for banned terms...',
      'Agent 3 (Fact & Claim): Verifying discount rate claims...',
      'Agent 4 (Confidentiality): Executing data leak disclosure check...',
      'Swarm Synthesis Complete! Findings generated
