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

## Round 3 — planned major improvements

These are roadmap commitments, not completed Round 2 features.

1. **Brand-manual ingestion and evidence-grounded retrieval:** upload PDF guidelines, extract and index policy clauses, and show traceable page-level evidence for each relevant finding.
2. **Connected, independently testable analysis services:** implement dedicated tone, terminology, claims, visual-identity and confidentiality checks behind a real orchestration/API layer, with clear confidence and failure handling.
3. **Persistent governance and approval workflow:** add authenticated reviewer roles, saved audit history, version comparisons, approval records and organization-level risk analytics.

## Round 1 continuity

Round 1 proposed a broader brand-governance platform. Round 2 narrows the delivered scope to an interactive browser-local text policy audit and correction workflow. The larger integrations above remain future work and are not represented as shipped functionality.
