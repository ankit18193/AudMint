"use client";
import { useState, useEffect, useRef } from "react";

type UseCase = "coding" | "writing" | "data" | "research" | "mixed";
interface UserInputTool { name: string; plan: string; seats: number; }
interface FormData { teamSize: number | ""; primaryUseCase: UseCase | ""; tools: UserInputTool[]; }

// Reverted to original AudMint theme, added missing red colors for validation
const T = {
  ink: '#0d0d0d', inkLight: '#374151', muted: '#6b7280', faint: '#9ca3af',
  border: '#e5e7eb', borderHov: '#d1d5db', bg: '#f9fafb', surface: '#ffffff', surfaceAlt: '#f3f4f6',
  green: '#16a34a', greenBg: '#f0fdf4', greenBorder: '#bbf7d0', greenDark: '#15803d',
  blue: '#2563eb', blueBg: '#eff6ff', blueBorder: '#bfdbfe',
  amber: '#d97706', amberBg: '#fffbeb', amberBorder: '#fde68a',
  red: '#dc2626', redBg: '#fef2f2', redBorder: '#fecaca',
  display: "'Plus Jakarta Sans', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
};

interface ToolDef { plans: string[]; icon: string; desc: string; color: string; bg: string; price: string; defaultVisible: boolean; }

// Extended database including default visible tools and hidden searchable ones
const DEFAULT_DB: Record<string, ToolDef> = {
  "Cursor": { plans: ["Hobby", "Pro", "Business", "Enterprise"], icon: "code", desc: "AI code editor", color: "#0d0d0d", bg: "#f3f4f6", price: "$20/seat/mo", defaultVisible: true },
  "GitHub Copilot": { plans: ["Individual", "Business", "Enterprise"], icon: "code", desc: "GitHub AI assistant", color: "#0d0d0d", bg: "#f3f4f6", price: "$10/seat/mo", defaultVisible: true },
  "Claude": { plans: ["Free", "Pro", "Max", "Team", "Enterprise", "API direct"], icon: "chat", desc: "Anthropic assistant", color: "#d97706", bg: "#fffbeb", price: "$20/seat/mo", defaultVisible: true },
  "ChatGPT": { plans: ["Plus", "Team", "Enterprise", "API direct"], icon: "chat", desc: "OpenAI ChatGPT", color: "#16a34a", bg: "#f0fdf4", price: "$25/seat/mo", defaultVisible: true },
  "Gemini": { plans: ["Free", "Pro", "Ultra", "API"], icon: "smart_toy", desc: "Google's AI model", color: "#2563eb", bg: "#eff6ff", price: "$20/seat/mo", defaultVisible: true },
  "Windsurf": { plans: ["Pro"], icon: "code", desc: "AI-powered IDE", color: "#6366f1", bg: "#eef2ff", price: "$15/seat/mo", defaultVisible: true },
  "v0": { plans: ["Pro"], icon: "design_services", desc: "Vercel UI generator", color: "#0d0d0d", bg: "#f3f4f6", price: "$20/seat/mo", defaultVisible: true },
  "Anthropic API direct": { plans: ["Usage-based"], icon: "api", desc: "Direct API access", color: "#d97706", bg: "#fffbeb", price: "Variable", defaultVisible: true },
  "OpenAI API direct": { plans: ["Usage-based"], icon: "api", desc: "Direct API access", color: "#16a34a", bg: "#f0fdf4", price: "Variable", defaultVisible: true },
  // Hidden searchable tools
  "Midjourney": { plans: ["Basic", "Standard", "Pro"], icon: "palette", desc: "Image generation", color: "#8b5cf6", bg: "#ede9fe", price: "$10-30/mo", defaultVisible: false },
  "Notion AI": { plans: ["Plus", "Business"], icon: "edit_document", desc: "Workspace AI", color: "#0d0d0d", bg: "#f3f4f6", price: "$10/seat/mo", defaultVisible: false },
  "Perplexity": { plans: ["Free", "Pro", "Enterprise Pro"], icon: "travel_explore", desc: "AI search engine", color: "#0ea5e9", bg: "#e0f2fe", price: "$20/seat/mo", defaultVisible: false },
  "Jasper": { plans: ["Pro"], icon: "draw", desc: "Marketing copy AI", color: "#e11d48", bg: "#ffe4e6", price: "$39/seat/mo", defaultVisible: false },
};

const USE_CASES: { id: UseCase; label: string; icon: string }[] = [
  { id: 'coding', label: 'Coding', icon: 'terminal' },
  { id: 'writing', label: 'Writing', icon: 'edit_note' },
  { id: 'data', label: 'Data', icon: 'bar_chart' },
  { id: 'research', label: 'Research', icon: 'search' },
  { id: 'mixed', label: 'Mixed', icon: 'category' },
];

export default function AuditForm({ onComplete }: { onComplete: (result: any) => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<FormData>({ teamSize: "", primaryUseCase: "", tools: [] });

  // Search state
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [customDB, setCustomDB] = useState<Record<string, ToolDef>>(DEFAULT_DB);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("audmint_form");
    if (saved) { try { setData(JSON.parse(saved)); } catch { } }

    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => { localStorage.setItem("audmint_form", JSON.stringify(data)); }, [data]);

  const getToolInfo = (name: string) => customDB[name];

  const handleToolSelection = (name: string) => {
    // If it's a completely custom tool typed by the user, add it to our local custom DB first
    if (!customDB[name]) {
      setCustomDB(prev => ({
        ...prev,
        [name]: { plans: ["Standard", "Pro", "Enterprise"], icon: "extension", desc: "Custom AI Tool", color: "#4b5563", bg: "#e5e7eb", price: "Variable", defaultVisible: false }
      }));
    }

    setData(prev => {
      const exists = prev.tools.find(t => t.name === name);
      if (exists) return { ...prev, tools: prev.tools.filter(t => t.name !== name) };
      const plans = customDB[name]?.plans || ["Standard"];
      return { ...prev, tools: [...prev.tools, { name, plan: plans[0], seats: 1 }] };
    });
    setSearch("");
    setShowDropdown(false);
  };

  const updateTool = (name: string, field: 'plan' | 'seats', value: any) =>
    setData(prev => ({ ...prev, tools: prev.tools.map(t => t.name === name ? { ...t, [field]: value } : t) }));

  const canNext = () => {
    if (step === 1) return data.tools.length > 0;
    if (step === 2) return data.tools.every(t => t.plan && t.seats >= 1);
    if (step === 3) return !!(data.teamSize && Number(data.teamSize) >= 1 && data.primaryUseCase);
    return false;
  };

  const submitAudit = async () => {
    setLoading(true); setError("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/api/audit`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("API error");
      onComplete(await res.json());
    } catch { setError("Could not reach the backend. Please ensure it is running on port 3001."); }
    finally { setLoading(false); }
  };

  const STEPS = ["Select Tools", "Configure Usage", "Team Context"];
  const pct = Math.round((step / 3) * 100);

  // Compute search results
  const searchResults = Object.keys(customDB).filter(name =>
    !data.tools.some(t => t.name === name) && name.toLowerCase().includes(search.toLowerCase())
  );
  const isExactMatch = searchResults.some(name => name.toLowerCase() === search.toLowerCase());

  // Tools to render in the main grid (default ones + any selected custom ones)
  const displayTools = Array.from(new Set([
    ...Object.keys(customDB).filter(k => customDB[k].defaultVisible),
    ...data.tools.map(t => t.name)
  ]));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: T.bg, fontFamily: T.body, display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .tool-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
        @media (max-width: 500px) { .tool-grid { grid-template-columns: 1fr; } }
        .usage-grid { display: grid; grid-template-columns: 180px 1fr 140px; gap: 12px; align-items: center; }
        @media (max-width: 650px) {
          .usage-grid { grid-template-columns: 1fr; gap: 16px; }
          .usage-grid > div { width: 100%; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── Fixed & Clean Top Bar ── */}
      <div
        role="banner"
        style={{
          backgroundColor: T.surface,
          borderBottom: `1px solid ${T.border}`,
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LOGO */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: T.ink,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "16px",
                  color: "#ffffff",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                psychology
              </span>
            </div>

            <span
              style={{
                fontFamily: T.display,
                fontWeight: 800,
                fontSize: "17px",
                letterSpacing: "-0.02em",
                color: T.ink,
              }}
            >
              AudMint
            </span>
          </a>

          {/* STEP PROGRESS */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {STEPS.map((label, i) => {
              const isCompleted = step > i + 1;
              const isActive = step === i + 1;

              return (
                <div
                  key={label}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {/* Circle */}
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      backgroundColor: isCompleted || isActive ? T.ink : T.border,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.25s ease",
                    }}
                  >
                    {isCompleted ? (
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontSize: "14px",
                          color: "#ffffff",
                          fontVariationSettings: "'FILL' 1",
                        }}
                      >
                        check
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: isActive ? "#ffffff" : T.faint,
                        }}
                      >
                        {i + 1}
                      </span>
                    )}
                  </div>

                  {/* Line */}
                  {i < STEPS.length - 1 && (
                    <div
                      style={{
                        width: "40px",
                        height: "2px",
                        backgroundColor: step > i + 1 ? T.ink : T.border,
                        transition: "all 0.25s ease",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ flex: 1, maxWidth: '720px', width: '100%', margin: '0 auto', padding: '40px 24px 100px', boxSizing: 'border-box' }}>

        {/* Step Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: T.ink }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: T.faint, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Step {step} of 3 · {pct}% complete
            </span>
          </div>
          <h1 style={{ fontFamily: T.display, fontSize: 'clamp(24px, 4vw, 28px)', fontWeight: 800, color: T.ink, letterSpacing: '-0.025em', marginBottom: '6px' }}>
            {step === 1 ? "Which AI tools does your team use?" : step === 2 ? "Configure your subscriptions" : "Tell us about your team"}
          </h1>
          <p style={{ fontSize: '15px', color: T.muted, lineHeight: 1.6 }}>
            {step === 1 ? "Select every active subscription — even those you suspect are underused." : step === 2 ? "Set your current plan and paid seats for each tool." : "Context helps our engine generate more precise recommendations."}
          </p>
          <div style={{ marginTop: '16px', height: '3px', backgroundColor: T.surfaceAlt, borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${T.ink}, ${T.inkLight})`, borderRadius: '999px', transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)' }} />
          </div>
        </div>

        {/* ── Form Card ── */}
        <div style={{ backgroundColor: T.surface, borderRadius: '16px', padding: '28px', border: `1px solid ${T.border}`, boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>

          {/* STEP 1: Tool Selection with Search */}
          {step === 1 && (
            <div>
              <div className="tool-grid">
                {displayTools.map(name => {
                  const t = getToolInfo(name);
                  const selected = data.tools.some(x => x.name === name);
                  return (
                    <button key={name} type="button" onClick={() => handleToolSelection(name)}
                      style={{
                        position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px',
                        borderRadius: '12px', border: selected ? `2px solid ${T.ink}` : `1.5px solid ${T.border}`,
                        backgroundColor: selected ? T.bg : T.surface, cursor: 'pointer', textAlign: 'left',
                        boxShadow: selected ? '0 0 0 3px rgba(0,0,0,0.04)' : 'none', transition: 'all 0.15s',
                      }}>
                      {selected && (
                        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '18px', height: '18px', backgroundColor: T.ink, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '11px', color: '#ffffff', fontVariationSettings: "'FILL' 1" }}>check</span>
                        </div>
                      )}
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: selected ? T.ink : t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: selected ? '#ffffff' : t.color, transition: 'all 0.15s' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>{t.icon}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: T.ink, marginBottom: '2px' }}>{name}</div>
                        <div style={{ fontSize: '11px', color: T.faint }}>{t.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Search / Custom Add Component */}
              <div ref={searchRef} style={{ position: 'relative', marginTop: '20px' }}>
                <label htmlFor="tool-search" style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: T.faint, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
                  Missing a tool? Search or add custom
                </label>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: T.bg, border: `1.5px solid ${T.border}`, borderRadius: '10px', padding: '0 12px', transition: 'border-color 0.2s' }}>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{ color: T.faint, fontSize: '20px' }}>search</span>
                  <input
                    id="tool-search"
                    type="text" value={search} onChange={e => setSearch(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="e.g. Midjourney, Notion AI, Custom Script..."
                    style={{ flex: 1, border: 'none', padding: '12px 10px', outline: 'none', background: 'transparent', fontSize: '14px', color: T.ink }}
                  />
                </div>

                {/* Search Dropdown Results */}
                {showDropdown && search && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: T.surface, border: `1px solid ${T.border}`, borderRadius: '10px', marginTop: '6px', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxHeight: '200px', overflowY: 'auto' }}>
                    {searchResults.map(name => (
                      <div key={name} onClick={() => handleToolSelection(name)}
                        style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', borderBottom: `1px solid ${T.bg}` }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: customDB[name].color }}>{customDB[name].icon}</span>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: T.ink }}>{name}</div>
                          <div style={{ fontSize: '11px', color: T.faint }}>{customDB[name].desc}</div>
                        </div>
                      </div>
                    ))}
                    {/* Allow adding generic custom tool if no exact match exists */}
                    {!isExactMatch && (
                      <div onClick={() => handleToolSelection(search.trim())}
                        style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: T.blue, backgroundColor: T.blueBg }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_circle</span>
                        <div style={{ fontSize: '14px', fontWeight: 600 }}>Add "{search}" as custom tool</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {data.tools.length > 0 && (
                <div style={{ marginTop: '20px', padding: '10px 16px', backgroundColor: T.greenBg, borderRadius: '8px', border: `1px solid ${T.greenBorder}`, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: T.greenDark, fontWeight: 600 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  {data.tools.length} tool{data.tools.length > 1 ? 's' : ''} selected · proceed to configure usage
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Usage Config */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.tools.map(tool => {
                const tInfo = getToolInfo(tool.name);
                return (
                  <div key={tool.name} className="usage-grid" style={{ padding: '14px 16px', backgroundColor: T.bg, borderRadius: '10px', border: `1px solid ${T.border}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: tInfo.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tInfo.color, flexShrink: 0 }}>
                        <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '17px', fontVariationSettings: "'FILL' 1" }}>{tInfo.icon}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>{tool.name}</div>
                        <div style={{ fontSize: '11px', color: T.faint }}>{tInfo.price}</div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor={`plan-${tool.name}`} style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: T.faint, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>Current Plan</label>
                      <select id={`plan-${tool.name}`} value={tool.plan} onChange={e => updateTool(tool.name, 'plan', e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', border: `1.5px solid ${T.border}`, borderRadius: '8px', fontSize: '14px', color: T.ink, backgroundColor: T.surface, outline: 'none', cursor: 'pointer' }}>
                        {tInfo.plans.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`seats-${tool.name}`} style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: T.faint, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>Paid Seats</label>
                      <input id={`seats-${tool.name}`} type="number" min="1" value={tool.seats}
                        onChange={e => updateTool(tool.name, 'seats', parseInt(e.target.value) || 1)}
                        style={{ width: '100%', padding: '8px 12px', border: `1.5px solid ${T.border}`, borderRadius: '8px', fontSize: '14px', color: T.ink, backgroundColor: T.surface, outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 3: Context */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <label htmlFor="team-size" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: T.ink, marginBottom: '8px' }}>
                  Total team size
                  <span style={{ color: T.red, marginLeft: '4px' }}>*</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input id="team-size" type="number" min="1" max="10000" placeholder="e.g. 12"
                    value={data.teamSize}
                    onChange={e => setData({ ...data, teamSize: parseInt(e.target.value) || "" })}
                    style={{ width: '160px', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: '8px', fontSize: '16px', fontWeight: 600, color: T.ink, backgroundColor: T.surface, outline: 'none' }} />
                  <span style={{ fontSize: '13px', color: T.faint }}>team members (including yourself)</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: T.ink, marginBottom: '14px' }}>
                  Primary AI use case
                  <span style={{ color: T.red, marginLeft: '4px' }}>*</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {USE_CASES.map(uc => {
                    const selected = data.primaryUseCase === uc.id;
                    return (
                      <button key={uc.id} type="button" onClick={() => setData({ ...data, primaryUseCase: uc.id })}
                        style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '8px', border: selected ? `2px solid ${T.ink}` : `1.5px solid ${T.border}`, backgroundColor: selected ? T.ink : T.surface, color: selected ? '#ffffff' : T.muted, fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', textTransform: 'capitalize' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: selected ? "'FILL' 1" : "'FILL' 0" }}>{uc.icon}</span>
                        {uc.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {error && (
            <div style={{ marginTop: '20px', padding: '12px 16px', backgroundColor: T.redBg, border: `1px solid ${T.redBorder}`, borderRadius: '8px', color: T.red, fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px', fontVariationSettings: "'FILL' 1" }}>error</span>
              {error}
            </div>
          )}
        </div>

        {/* ── Navigation Actions ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          {step > 1 ? (
            <button type="button" onClick={() => setStep(s => s - 1)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'transparent', color: T.muted, fontWeight: 600, fontSize: '14px', padding: '10px 18px', borderRadius: '8px', border: `1.5px solid ${T.border}`, cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>arrow_back</span>
              Back
            </button>
          ) : <div />}

          <button type="button" disabled={!canNext() || loading}
            onClick={() => step < 3 ? setStep(s => s + 1) : submitAudit()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              backgroundColor: T.ink, color: '#ffffff', fontWeight: 700, fontSize: '15px',
              padding: '11px 28px', borderRadius: '10px', border: 'none',
              cursor: !canNext() || loading ? 'not-allowed' : 'pointer',
              opacity: !canNext() || loading ? 0.4 : 1, boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
              transition: 'opacity 0.2s',
            }}>
            {loading ? (
              <>
                <span style={{ width: '15px', height: '15px', border: '2px solid rgba(255,255,255,0.25)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.65s linear infinite' }} />
                Analyzing your stack…
              </>
            ) : step === 3 ? (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>analytics</span>
                Run Audit
              </>
            ) : (
              <>
                Continue to {STEPS[step]}
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}