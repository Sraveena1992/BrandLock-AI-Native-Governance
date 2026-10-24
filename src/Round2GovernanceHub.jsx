import React, { useEffect, useMemo, useState } from 'react';
import { FileUp, BookOpen, Search, Bot, ShieldCheck, History, Download, Trash2, CheckCircle2, AlertTriangle, X, Network } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const STORE_KEY = 'brandlock:r2:governance:v1';
const AGENTS = [
  { id: 'tone', name: 'Tone & voice agent', test: (s) => [/\bhey guys\b/i, /\b(kinda|gonna|wanna)\b/i, /!!!+/].some((r) => r.test(s)), why: 'Informal phrasing or excessive punctuation may conflict with an executive brand voice.', fix: 'Please review this wording for the approved brand voice.' },
  { id: 'terms', name: 'Terminology agent', test: (s) => [/\butili[sz]e\b/i, /\bsynergy\b/i, /\bnext[- ]gen\b/i].some((r) => r.test(s)), why: 'A preferred terminology or wording check matched. Confirm against the uploaded glossary.', fix: 'Use the approved product terminology.' },
  { id: 'claims', name: 'Claims & substantiation agent', test: (s) => [/(\d+%\s*discount)/i, /\bguarantee(d)?\b/i, /\b100%\b/i, /\bno other provider\b/i].some((r) => r.test(s)), why: 'A measurable, absolute or comparative claim needs substantiation before publication.', fix: 'Please use a substantiated, approved claim.' },
  { id: 'confidentiality', name: 'Confidentiality agent', test: (s) => [/@[^\s]*\.corp\b/i, /\bsecret launch\b/i, /\bproject-alpha\b/i, /\binternal[- ]only\b/i].some((r) => r.test(s)), why: 'A selected internal-domain or unreleased-information pattern matched.', fix: 'Remove the internal detail or replace it with approved public wording.' },
  { id: 'visual', name: 'Visual identity readiness agent', test: (s) => /\b(logo|colour palette|color palette|font|typography|image)\b/i.test(s), why: 'The copy mentions visual assets. This text-only build cannot inspect images, logos, colours or typography; a manual visual review is required.', fix: 'Attach and review the actual visual asset in a future visual-review workflow.', informational: true }
];

function readStore() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{"guidelines":[],"history":[]}'); }
  catch { return { guidelines: [], history: [] }; }
}

export default function Round2GovernanceHub() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('guidelines');
  const [guidelines, setGuidelines] = useState(() => readStore().guidelines || []);
  const [history, setHistory] = useState(() => readStore().history || []);
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState('');
  const [reviewer, setReviewer] = useState('Brand Lead');
  const [status, setStatus] = useState('');
  const [copy, setCopy] = useState('Get ready for our next launch. We guarantee a 50% discount. Contact internal-only@acme.corp.');
  const [results, setResults] = useState([]);

  useEffect(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ guidelines, history })); }
    catch { setStatus('Browser storage is unavailable or full. Export your records before closing this tab.'); }
  }, [guidelines, history]);

  const clauses = useMemo(() => guidelines.flatMap((doc) => doc.pages.flatMap((page) => page.clauses.map((clause, index) => ({ ...clause, docName: doc.name, page: page.page, id: doc.id + '-' + page.page + '-' + index })))), [guidelines]);
  const matchedClauses = useMemo(() => {
    const terms = query.toLowerCase().split(/\W+/).filter((t) => t.length > 2);
    if (!terms.length) return clauses.slice(0, 12);
    return clauses.map((c) => ({ ...c, score: terms.reduce((n, t) => n + ((c.text || '').toLowerCase().includes(t) ? 1 : 0), 0) }))
      .filter((c) => c.score > 0).sort((a, b) => b.score - a.score).slice(0, 20);
  }, [clauses, query]);

  async function ingestFiles(files) {
    setBusy(true); setStatus('');
    try {
      const added = [];
      for (const file of Array.from(files || [])) {
        if (file.type !== 'application/pdf') { setStatus(file.name + ' skipped: upload a PDF file.'); continue; }
        const data = new Uint8Array(await file.arrayBuffer());
        const pdf = await pdfjsLib.getDocument({ data }).promise;
        const pages = [];
        for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
          const page = await pdf.getPage(pageNo);
          const textContent = await page.getTextContent();
          const text = textContent.items.map((item) => item.str || '').join(' ').replace(/\s+/g, ' ').trim();
          if (text) {
            const sentences = text.split(/(?<=[.!?;])\s+/).filter((s) => s.trim().length > 18);
            pages.push({ page: pageNo, clauses: (sentences.length ? sentences : [text]).map((value) => ({ text: value.trim() })) });
          }
        }
        added.push({ id: (globalThis.crypto?.randomUUID?.() || String(Date.now()) + Math.random()), name: file.name, pages, uploadedAt: new Date().toISOString(), pageCount: pdf.numPages });
      }
      if (added.length) {
        setGuidelines((prev) => [...prev, ...added]);
        setStatus('PDF text extracted and indexed locally. Review the extracted clauses and page references before relying on them.');
      }
    } catch (error) {
      setStatus('PDF extraction failed: ' + (error?.message || 'unknown error'));
    } finally { setBusy(false); }
  }

  function runAgents() {
    const findings = AGENTS.flatMap((agent) => agent.test(copy) ? [{
      id: agent.id + '-' + Date.now(), agent: agent.name, severity: agent.informational ? 'Review' : 'Flag',
      explanation: agent.why, suggestedAction: agent.fix, informational: !!agent.informational,
      evidence: clauses.filter((c) => {
        const terms = (copy.toLowerCase().match(/[a-z]{4,}/g) || []).slice(0, 12);
        return terms.some((term) => c.text.toLowerCase().includes(term));
      }).slice(0, 3).map((c) => ({ document: c.docName, page: c.page, excerpt: c.text }))
    }] : []);
    setResults(findings);
    setStatus('Five specialist rule agents completed. These are deterministic local checks, not LLM-generated judgments.');
  }

  function saveDecision(decision) {
    const record = { id: globalThis.crypto?.randomUUID?.() || String(Date.now()), createdAt: new Date().toISOString(), reviewer, decision, copy, findings: results, revision: history.filter((h) => h.copy === copy).length + 1 };
    setHistory((prev) => [record, ...prev].slice(0, 500));
    setStatus('Decision saved to this browser on this device. It is not a server-backed or authenticated approval.');
  }

  function exportHistory() {
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), guidelines, history }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'brandlock-governance-export.json'; a.click(); URL.revokeObjectURL(url);
  }

  return <>
    <button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-900 px-4 py-3 text-xs font-bold text-cyan-200 shadow-2xl shadow-cyan-950/50 hover:bg-slate-800">
      <Network className="h-4 w-4" /> Governance Hub <span className="rounded bg-cyan-500/15 px-1.5 py-0.5">R2</span>
    </button>
    {open && <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 p-3 backdrop-blur-xl md:p-8">
      <div className="mx-auto max-w-6xl space-y-5">
        <header className="flex items-start justify-between gap-4 rounded-2xl border border-cyan-500/20 bg-slate-900 p-5">
          <div><div className="flex items-center gap-2 text-cyan-300"><ShieldCheck className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-widest">BrandLock · Round 2 upgrades</span></div><h2 className="mt-2 text-2xl font-bold text-white">Evidence & Governance Workspace</h2><p className="mt-1 text-sm text-slate-400">Local PDF evidence retrieval · specialist review agents · persistent browser audit trail</p></div>
          <button onClick={() => setOpen(false)} className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:bg-slate-800" aria-label="Close"><X className="h-5 w-5" /></button>
        </header>
        <nav className="flex flex-wrap gap-2">
          {[['guidelines','1 · Guideline ingestion'],['agents','2 · Agent review'],['governance','3 · Approval & history']].map(([id,label]) => <button key={id} onClick={() => setTab(id)} className={'rounded-xl border px-4 py-2 text-xs font-semibold ' + (tab === id ? 'border-cyan-400/50 bg-cyan-500/15 text-cyan-200' : 'border-slate-800 bg-slate-900 text-slate-400')}>{label}</button>)}
        </nav>
        {status && <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3 text-xs text-amber-200">{status}</div>}
        {tab === 'guidelines' && <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-2 text-white"><FileUp className="h-5 w-5 text-cyan-300" /><h3 className="font-bold">Upload brand guideline PDFs</h3></div>
            <p className="text-xs leading-5 text-slate-400">Extracts selectable PDF text in your browser, splits it into page-level clauses and indexes those clauses for keyword retrieval. Scanned image-only PDFs require OCR and are not supported in this build.</p>
            <label className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-dashed border-cyan-500/40 bg-slate-950 p-8 text-center hover:bg-slate-800/70"><FileUp className="h-8 w-8 text-cyan-300" /><span className="text-sm font-semibold text-slate-200">{busy ? 'Extracting PDF…' : 'Choose PDF guideline files'}</span><span className="text-[11px] text-slate-500">PDF · multiple files supported</span><input type="file" accept="application/pdf,.pdf" multiple disabled={busy} onChange={(e) => ingestFiles(e.target.files)} className="sr-only" /></label>
            <div className="space-y-2">{guidelines.map((doc) => <div key={doc.id} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-3"><div className="min-w-0"><p className="truncate text-xs font-semibold text-slate-200">{doc.name}</p><p className="text-[10px] text-slate-500">{doc.pageCount} pages · {doc.pages.reduce((n,p) => n + p.clauses.length,0)} extracted clauses</p></div><button onClick={() => setGuidelines((prev) => prev.filter((d) => d.id !== doc.id))} className="p-2 text-rose-300" aria-label="Remove PDF"><Trash2 className="h-4 w-4" /></button></div>)}</div>
            <p className="text-[10px] text-slate-500">Privacy: extraction and index are browser-local. No file is uploaded to a server by this feature.</p>
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-2 text-white"><Search className="h-5 w-5 text-cyan-300" /><h3 className="font-bold">Evidence retrieval</h3></div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search clauses, e.g. claims, tone, logo…" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-cyan-500" />
            <div className="max-h-[440px] space-y-3 overflow-y-auto">{matchedClauses.map((c) => <article key={c.id} className="rounded-xl border border-slate-800 bg-slate-950 p-3"><div className="mb-2 flex items-center justify-between gap-2 text-[10px] text-cyan-300"><span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {c.docName}</span><span>Page {c.page}</span></div><p className="text-xs leading-5 text-slate-300">{c.text}</p></article>)}{!matchedClauses.length && <p className="py-10 text-center text-xs text-slate-500">No matching evidence yet. Upload a text-based PDF and search again.</p>}</div>
          </div>
        </section>}
        {tab === 'agents' && <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-2 text-white"><Bot className="h-5 w-5 text-cyan-300" /><h3 className="font-bold">Specialist governance review</h3></div>
          <p className="text-xs text-slate-400">Each specialist runs an independent deterministic rule set. The coordinator combines findings and attaches relevant retrieved policy excerpts where keyword overlap exists. These are not autonomous LLM agents.</p>
          <textarea value={copy} onChange={(e) => setCopy(e.target.value)} rows={5} className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-slate-200 outline-none focus:border-cyan-500" />
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{AGENTS.map((a) => <div key={a.id} className="rounded-xl border border-slate-800 bg-slate-950 p-3"><p className="text-xs font-bold text-slate-200">{a.name}</p><p className="mt-1 text-[10px] text-slate-500">{a.informational ? 'Manual-review advisory' : 'Deterministic pattern checks'}</p></div>)}</div>
          <button onClick={runAgents} className="rounded-xl bg-cyan-600 px-5 py-3 text-xs font-bold text-white hover:bg-cyan-500">Run specialist review</button>
          {results.map((f) => <article key={f.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><b className="text-sm text-white">{f.agent}</b><span className="rounded bg-amber-500/15 px-2 py-1 text-[10px] text-amber-300">{f.severity}</span></div><p className="mt-2 text-xs text-slate-300">{f.explanation}</p><p className="mt-2 text-xs text-cyan-200">Action: {f.suggestedAction}</p>{f.evidence.length > 0 && <div className="mt-3 space-y-2 border-t border-slate-800 pt-3">{f.evidence.map((e,i) => <p key={i} className="text-[10px] leading-4 text-slate-400">Evidence candidate · {e.document}, p. {e.page}: “{e.excerpt}”</p>)}</div>}</article>)}
          {results.length === 0 && <p className="text-xs text-slate-500">Run the review to see findings. No finding does not mean full compliance.</p>}
        </section>}
        {tab === 'governance' && <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-2 text-white"><ShieldCheck className="h-5 w-5 text-cyan-300" /><h3 className="font-bold">Reviewer decision</h3></div>
            <label className="block text-xs text-slate-400">Reviewer label<input value={reviewer} onChange={(e) => setReviewer(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-white" /></label>
            <p className="text-xs text-slate-400">Save a review decision and a snapshot of the copy and current specialist findings. Revision numbers are tracked per exact copy.</p>
            <button onClick={() => saveDecision('Approved for next stage')} disabled={!results.length || results.some((f) => !f.informational)} className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Approve reviewed copy</button>
            <button onClick={() => saveDecision('Changes requested')} disabled={!results.length} className="w-full rounded-xl border border-amber-500/40 px-4 py-3 text-xs font-bold text-amber-200 disabled:opacity-40">Request changes</button>
            <button onClick={exportHistory} className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-xs font-bold text-slate-200"><Download className="h-4 w-4" /> Export governance records</button>
            <p className="text-[10px] text-amber-300">Prototype control: browser-local storage only. Reviewer labels are not authenticated identities; this is not a legally binding enterprise approval.</p>
          </div>
          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between gap-2"><div className="flex items-center gap-2 text-white"><History className="h-5 w-5 text-cyan-300" /><h3 className="font-bold">Audit & decision history</h3></div><span className="text-xs text-slate-500">{history.length} records</span></div>
            {history.map((item) => <article key={item.id} className="rounded-xl border border-slate-800 bg-slate-950 p-3"><div className="flex flex-wrap justify-between gap-2"><b className="text-xs text-white">{item.decision}</b><span className="text-[10px] text-slate-500">{new Date(item.createdAt).toLocaleString()}</span></div><p className="mt-1 text-[10px] text-cyan-300">{item.reviewer} · Revision {item.revision} · {item.findings.length} findings</p><p className="mt-2 line-clamp-2 text-xs text-slate-400">{item.copy}</p></article>)}
            {!history.length && <div className="py-12 text-center text-xs text-slate-500"><AlertTriangle className="mx-auto mb-2 h-6 w-6" />No decisions saved yet.</div>}
          </div>
        </section>}
        <footer className="pb-6 text-[10px] leading-5 text-slate-500">Round 2 local implementation. PDF text extraction, lexical evidence retrieval, deterministic specialist checks and browser-persisted decision records run on this device. For production: add OCR, semantic/vector retrieval, authenticated server-side users, database-backed immutable audit events, API orchestration and actual visual inspection.</footer>
      </div>
    </div>}
  </>;
}
