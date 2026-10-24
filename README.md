# BrandLock — AI-Native Brand Governance

**Round 2 build · TechCircuit / competition track to be confirmed against Round 1 record**

- **Live application:** https://brandlock-ai-native-governance.onrender.com
- **Source:** https://github.com/Sraveena1992/BrandLock-AI-Native-Governance
- **Current implementation:** React + Vite browser-based prototype

## What works in this build

BrandLock is a pre-publish policy-review prototype. A user can:

1. Paste or edit campaign copy in the Content Auditor.
2. Run the built-in local policy audit.
3. Review findings for selected confidentiality patterns and selected promotional/comparative claims.
4. Apply a suggested replacement to an individual finding or use Fix All.
5. Re-run the audit on the revised copy.
6. Switch between Creator and Brand Lead interface modes.
7. Re-run the audit after applying corrections, then use the Brand Lead approval control when the fresh audit has no outstanding findings.
8. View session-level issue, fix and risk indicators.

The audit currently uses deterministic JavaScript rules executed in the browser. Repeated matching terms are de-duplicated in the findings list, and the risk indicator is recalculated from unresolved finding severity. Findings include a severity, explanation, target text, suggested replacement and a **demonstration rule label**. These labels are not citations retrieved from an uploaded brand manual.

## Scope and limitations — please read

This repository currently contains a front-end prototype. The following are **not implemented as connected production capabilities**:

- No production LLM, external AI API, or autonomous multi-agent orchestration.
- No ChromaDB instance, vector database, or live RAG retrieval.
- No upload or parsing of company brand-guideline PDFs.
- No source-grounded policy citations.
- No automated logo, image, colour-palette or typography inspection.
- No complete WCAG accessibility audit.
- No backend persistence, authenticated users, or cross-user collaboration.
- Audit history and approval state are not stored in a server database.
- The built-in checks cover selected patterns only; a clean result does not certify that content is fully compliant.

The interface includes prototype/demo content to illustrate the intended direction. Do not interpret demonstration rule labels or local session metrics as external verification, legal advice, or production monitoring.

## Technology and implementation

- React 18
- Vite 5
- JavaScript / JSX
- Tailwind CSS 3
- Lucide React

The current data flow is local to the browser:

`Campaign text → deterministic rule checks → structured findings → suggested text replacements → local session metrics`

No model or remote inference endpoint is called by the current audit flow.

## Run locally

Requirements: Node.js and npm.

```bash
git clone https://github.com/Sraveena1992/BrandLock-AI-Native-Governance.git
cd BrandLock-AI-Native-Governance
npm install
npm run dev
```

Create a production build:

```bash
npm run build
npm run preview
```

## Round 2 upgrades added in the governance workspace

The **Governance Hub** is available from the floating button in the application.

1. **PDF guideline ingestion + evidence retrieval:** browser-side PDF.js extracts selectable text, splits it into page-level clauses, and provides keyword retrieval with document and page references. Scanned image-only PDFs are not OCR'd. Retrieval is lexical, not vector/semantic RAG.
2. **Specialist review orchestration:** five independent deterministic reviewers cover selected tone, terminology, claims, confidentiality and visual-readiness checks. A coordinator combines findings and attaches relevant guideline excerpts when keyword overlap exists. These are rule-based agents, not connected LLM agents; the visual reviewer is an advisory limitation check and does not inspect images.
3. **Persistent local governance trail:** reviewer-labeled decisions, copy snapshots, findings and per-copy revision counts are saved in browser localStorage and can be exported as JSON. This is device-local persistence, not authenticated enterprise approval or server-side audit storage.

PDF extraction, indexing, review and storage run in the browser. Users should verify extracted clauses and page references before relying on them.

## Round 3 — harder next-stage improvements

1. **Multimodal brand-forensics engine:** inspect uploaded creative assets and rendered campaign pages for logo geometry, colour tokens, typography, spacing, accessibility and cross-channel drift; return annotated evidence and severity-ranked diffs.
2. **Policy-as-code release gate and adversarial red-team harness:** integrate with GitHub/CI and content publishing workflows to block risky releases, run mutation/fuzz tests against policy rules, detect bypasses and produce reproducible signed test reports.
3. **Privacy-preserving cross-tenant governance intelligence:** build tenant-isolated policy stores, encryption/key management, role/attribute-based access, immutable tamper-evident audit events and privacy-safe aggregate risk benchmarks without exposing one customer's content to another.

## Round 1 continuity

Round 1 proposed a broader brand-governance platform. Round 2 narrows the delivered scope to an interactive browser-local text policy audit and correction workflow. The larger integrations above remain future work and are not represented as shipped functionality.
