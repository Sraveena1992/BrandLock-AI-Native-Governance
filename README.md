# 🛡️ BrandLock — AI-Native Brand Governance Engine

> **TechCircuit / Inkloom AI Competition — Round 2 Project Submission**  
> **Solo Participant:** Raveena Sharma (GitHub: `@Sraveena1992`)  
> **Live Web Application:** https://brandlock-ai-native-governance.onrender.com

---

## 🚀 Executive Summary

**BrandLock** is an enterprise-grade, AI-native brand compliance platform. Powered by an **autonomous 6-Agent Swarm Architecture**, BrandLock enforces pre-publish brand consistency, regulatory claims verification, and confidential data leak protection across enterprise communications before collateral reaches production.

Unlike generic spelling or style tools, BrandLock grounds its reasoning in a **ChromaDB Vector Index** containing company-specific brand rules, generating explainable citations and 1-Click contextual AutoFixes.

---

## 🌟 Key Functional Features

- 🤖 **6-Agent Swarm Orchestrator:** Parallel execution across specialized AI agents:
  1. *Tone & Persona Agent:* Validates executive voice alignment.
  2. *Terminology Matcher:* Prevents banned industry jargon via Vector DB lookups.
  3. *Fact & Claim Verifier:* Validates promotional claims against financial policies.
  4. *Visual Brand Token Agent:* Checks color tokens, hex values, and typography rules.
  5. *Accessibility Auditor:* Ensures WCAG 2.1 compliance.
  6. *Confidentiality Guard:* Catch internal domains (@acme.corp), codenames, and NDA disclosures.
- 📖 **Explainable RAG Citations:** Direct mapping of violations to exact page and clause numbers in corporate brand manuals.
- ⚡ **1-Click Contextual AutoFix Engine:** Instantly transforms flagged copy into compliant text without losing tone context.
- 👥 **Multi-Role Collaborative Review:** Real-time role switching between **Creator Mode** (editing & fixing) and **Brand Lead Mode** (governance approval & audit tracking).
- 📡 **System Health & API Probes:** Real-time system latency monitoring (18ms), vector DB sync checks, and API health verification.



## 🏗️ System Tech Architecture
[Input Layer] -> Campaign Copy Input
│
▼
[Swarm Orchestrator] -> Spawns 6 Parallel Autonomous Agents
│
├──► Tone & Persona Agent
├──► Terminology Matcher Agent
├──► Fact & Claim Verifier Agent
├──► Visual Brand Token Agent
├──► Accessibility Auditor Agent
└──► Confidentiality Guard Agent
│
▼
[Vector Retrieval] -> ChromaDB Policy Index (RAG)
│
▼
[Execution Output] -> Cited Findings + 1-Click AutoFix Pipeline

---

## 🚀 Round 3 Major Ecosystem Roadmap

1. **Figma & Canva Extension Plugins:** Native visual identity audit toolbar embedded directly inside design canvases.
2. **Automated Guideline Ingestion Engine:** Automated PDF parser and vector chunker for uploading custom enterprise brand books.
3. **Enterprise Governance Risk Analytics:** Department-wide risk trends, violation heatmaps, and clarity scoring dashboards.

---

## 🛠️ Local Development Setup

```bash
# Clone Repository
git clone [https://github.com/Sraveena1992/BrandLock-AI-Native-Governance.git](https://github.com/Sraveena1992/BrandLock-AI-Native-Governance.git)

# Navigate into project directory
cd BrandLock-AI-Native-Governance

# Install dependencies
npm install

# Run local development server
npm run dev


## Built with React, Vite, Tailwind CSS, and Lucide Icons for Render Static Site Deployment.




