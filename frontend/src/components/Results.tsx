"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const T = {
  ink: '#0d0d0d', inkLight: '#374151', muted: '#6b7280', faint: '#9ca3af',
  border: '#e5e7eb', bg: '#f9fafb', surface: '#ffffff', surfaceAlt: '#f3f4f6',
  green: '#16a34a', greenBg: '#f0fdf4', greenBorder: '#bbf7d0', greenDeep: '#006e2f', greenDark: '#15803d',
  blue: '#2563eb', blueBg: '#eff6ff', blueBorder: '#bfdbfe',
  amber: '#d97706', amberBg: '#fffbeb', amberBorder: '#fde68a',
  red: '#dc2626', redBg: '#fef2f2', redBorder: '#fecaca',
  display: "'Plus Jakarta Sans', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
};

function RecTypeBadge({ type }: { type: string }) {
  const lc = type?.toLowerCase() ?? '';
  let bg, text, border, icon;
  if (lc.includes('downgrade')) { bg = T.amberBg; text = T.amber; border = T.amberBorder; icon = 'trending_down'; }
  else if (lc.includes('consolidat')) { bg = T.blueBg; text = T.blue; border = T.blueBorder; icon = 'merge'; }
  else { bg = T.greenBg; text = T.green; border = T.greenBorder; icon = 'savings'; }
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: bg, color: text, border: `1px solid ${border}`, borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
      <span className="material-symbols-outlined" style={{ fontSize: '13px', fontVariationSettings: "'FILL' 1" }}>{icon}</span>
      {type?.replace(/_/g, ' ')}
    </div>
  );
}

export default function Results({ result, onReset }: { result: any; onReset: () => void }) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [leadTeamSize, setLeadTeamSize] = useState<number | "">(result.teamSize || "");
  const [companyWebsite, setCompanyWebsite] = useState(""); // Honeypot
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [copied, setCopied] = useState(false);

  // Subscription feature for optimized users
  const [subEmail, setSubEmail] = useState("");
  const [subHoneypot, setSubHoneypot] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [subError, setSubError] = useState("");

  const router = useRouter();

  const submitLead = async (e: React.FormEvent) => {
    console.log("SUBMIT LEAD TRIGGERED");
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/api/lead`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          auditId: result.id,
          company,
          role,
          teamSize: leadTeamSize ? Number(leadTeamSize) : undefined,
          company_website: companyWebsite
        }),
      });
      if (res.ok) {
        setLeadCaptured(true);
      } else {
        const errorData = await res.json();
        setLeadError(errorData.message || "Failed to send report. Please try again.");
      }
      setLoading(false);
    } catch (err) {
      console.error("Lead Capture Error:", err);
      setLeadError("Could not connect to the server. Please check if the backend is running.");
      setLoading(false);
    }
  };

  const copyLink = () => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/report/${result.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true); setTimeout(() => setCopied(false), 2500);
  };

  const submitSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail) return;
    setSubLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/api/subscribe`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subEmail, company_website: subHoneypot }),
      });
      if (!res.ok) throw new Error("API failed");
      setSubError(""); setSubscribed(true);
    } catch { setSubError("Failed to subscribe. Please try again."); }
    finally { setSubLoading(false); }
  };

  const monthly: number = result.totalSavingsMonthly ?? 0;
  const yearly: number = result.totalSavingsYearly ?? 0;
  const recs: any[] = result.recommendations ?? [];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: T.bg, fontFamily: T.body, color: T.ink }}>
      <style>{`
        /* Responsive grids for Results page */
        .results-hero-grid { display: grid; grid-template-columns: 1fr auto; gap: 32px; align-items: center; position: relative; zIndex: 1; }
        @media (max-width: 768px) {
          .results-hero-grid { grid-template-columns: 1fr; text-align: center; justify-items: center; }
        }
        
        .results-main-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; align-items: start; }
        @media (max-width: 900px) {
          .results-main-grid { grid-template-columns: 1fr; }
        }

        .rec-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 500px) {
          .rec-card-grid { grid-template-columns: 1fr; }
        }
        
        .nav-inner { max-width: 1180px; margin: 0 auto; padding: 0 28px; height: 60px; display: flex; align-items: center; justify-content: space-between; }
        @media (max-width: 600px) {
          .nav-inner { padding: 0 16px; }
          .nav-hide-mobile { display: none !important; }
        }
        @media print {
          .no-print { display: none !important; }
          body { background-color: #ffffff !important; }
          .container { max-width: 100% !important; padding: 0 !important; }
          .card-hover { transform: none !important; box-shadow: none !important; border: 1px solid #eee !important; }
        }
      `}</style>

      {/* ── Navigation ── */}
      <nav
        className="no-print"
        style={{
          backgroundColor: T.surface,
          borderBottom: `1px solid ${T.border}`,
          position: 'sticky',
          top: 0,
          zIndex: 50,
          width: '100%'
        }}
      >
        {/* FULL WIDTH WRAPPER */}
        <div
          style={{
            width: '100%',
            maxWidth: '1400px',   // ← controls stretch like landing page
            margin: '0 auto',
            padding: '0 20px',    // ← side breathing space
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px'
          }}
        >

          {/* LEFT SIDE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

            {/* LOGO (CLICKABLE) */}
            <div
              onClick={() => window.location.href = '/'} // or use navigate('/')
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: T.ink,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '15px',
                    color: '#ffffff',
                    fontVariationSettings: "'FILL' 1"
                  }}
                >
                  psychology
                </span>
              </div>

              <span
                style={{
                  fontFamily: T.display,
                  fontWeight: 800,
                  fontSize: '16px',
                  letterSpacing: '-0.025em'
                }}
              >
                AudMint
              </span>
            </div>

            {/* DIVIDER */}
            <div
              className="nav-hide-mobile"
              style={{
                height: '16px',
                width: '1px',
                backgroundColor: T.border
              }}
            />

            {/* PAGE LABEL */}
            <div
              className="nav-hide-mobile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                color: T.muted,
                fontWeight: 500
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: '14px',
                  fontVariationSettings: "'FILL' 1",
                  color: T.green
                }}
              >
                analytics
              </span>
              Audit Results
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

            <button
              onClick={() => router.push(`/report/${result.id}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'transparent',
                color: T.muted,
                fontSize: '13px',
                fontWeight: 600,
                padding: '7px 14px',
                borderRadius: '8px',
                border: `1.5px solid ${T.border}`,
                cursor: 'pointer'
              }}
            >
              <span className="material-symbols-outlined nav-hide-mobile" style={{ fontSize: '15px' }}>
                visibility
              </span>

              <span className="nav-hide-mobile">
                View report
              </span>

              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: '18px',
                  display: 'var(--mobile-icon-display, none)'
                }}
              >
                visibility
              </span>
            </button>

            <button
              onClick={onReset}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: T.ink,
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                padding: '7px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>
                add
              </span>
              New audit
            </button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '48px 28px 80px' }}>

        {/* ── Savings Hero Banner ── */}
        <div style={{ backgroundColor: T.surface, borderRadius: '20px', padding: '48px 40px', border: `1px solid ${T.border}`, marginBottom: '32px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          {/* Background decoration */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '320px', height: '320px', background: 'radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="results-hero-grid">
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: T.faint, textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px', color: T.green, fontVariationSettings: "'FILL' 1" }}>savings</span>
                Total identified annual savings
              </div>
              <div
                style={{
                  fontFamily: T.display,
                  fontSize: 'clamp(48px, 7vw, 76px)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: yearly > 0 ? T.greenDeep : T.ink,
                  lineHeight: 1,
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                ${yearly.toLocaleString()}

                {/* Show icon ONLY if value > 0 */}
                {yearly > 0 && (
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: '48px',
                      color: T.greenDeep,
                      fontVariationSettings: "'FILL' 1"
                    }}
                  >
                    trending_up
                  </span>
                )}
              </div>
              <p style={{ fontSize: '15px', color: T.muted, maxWidth: '520px', lineHeight: 1.6 }}>
                Based on your team of <strong style={{ color: T.ink }}>{result.teamSize}</strong> — we identified{' '}
                <strong style={{ color: T.ink }}>${monthly.toLocaleString()}/mo</strong> in avoidable spend across {recs.length} recommendation{recs.length !== 1 ? 's' : ''}.
              </p>
            </div>

            {/* Conditional alert */}
            <div style={{ flexShrink: 0 }}>
              {monthly > 500 && (
                <div style={{ backgroundColor: T.redBg, border: `1px solid ${T.redBorder}`, borderRadius: '12px', padding: '16px 20px', textAlign: 'center', maxWidth: '220px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '28px', color: T.red, fontVariationSettings: "'FILL' 1", display: 'block', marginBottom: '6px' }}>warning</span>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: T.red, lineHeight: 1.4 }}>High waste detected</div>
                  <div style={{ fontSize: '12px', color: T.red, opacity: 0.8, marginTop: '4px' }}>Act now to recover ${monthly.toLocaleString()}/mo</div>
                </div>
              )}
              {monthly > 0 && monthly <= 100 && (
                <div style={{ backgroundColor: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: '12px', padding: '16px 20px', textAlign: 'center', maxWidth: '220px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '28px', color: T.green, fontVariationSettings: "'FILL' 1", display: 'block', marginBottom: '6px' }}>thumb_up</span>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: T.greenDark, lineHeight: 1.4 }}>Well optimized</div>
                  <div style={{ fontSize: '12px', color: T.muted, marginTop: '4px' }}>Minor improvements available</div>
                </div>
              )}
              {monthly === 0 && (
                <div style={{ backgroundColor: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: '12px', padding: '16px 20px', textAlign: 'center', maxWidth: '220px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '28px', color: T.green, fontVariationSettings: "'FILL' 1", display: 'block', marginBottom: '6px' }}>emoji_events</span>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: T.greenDark, lineHeight: 1.4 }}>Fully optimized</div>
                  <div style={{ fontSize: '12px', color: T.muted, marginTop: '4px' }}>No waste detected</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Two-Column Layout ── */}
        <div className="results-main-grid">

          {/* Left: Recommendations */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontFamily: T.display, fontSize: '20px', fontWeight: 800, letterSpacing: '-0.015em', color: T.ink }}>
                Optimization Plan
              </h2>
              {recs.length > 0 && (
                <div style={{ fontSize: '13px', color: T.muted, backgroundColor: T.surfaceAlt, padding: '4px 12px', borderRadius: '6px', fontWeight: 500 }}>
                  {recs.length} action{recs.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>

            {recs.length === 0 ? (
              <div style={{ backgroundColor: T.surface, borderRadius: '14px', padding: '48px', textAlign: 'center', border: `1px solid ${T.border}` }}>
                <span className="material-symbols-outlined" style={{ fontSize: '40px', color: T.green, fontVariationSettings: "'FILL' 1", display: 'block', marginBottom: '12px' }}>emoji_events</span>
                <div style={{ fontSize: '16px', fontWeight: 700, color: T.ink, marginBottom: '8px' }}>Fully optimized stack</div>
                <p style={{ fontSize: '14px', color: T.muted, lineHeight: 1.6 }}>No waste detected. Your current AI setup is well-configured for your team size and use case.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {recs.map((rec: any, i: number) => (
                  <div key={i} style={{ backgroundColor: T.surface, borderRadius: '14px', border: `1px solid ${T.border}`, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                    {/* Card Header */}
                    <div style={{ padding: '20px 24px 16px', borderBottom: `1px solid ${T.border}` }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <RecTypeBadge type={rec.type} />
                          <div style={{ fontFamily: T.display, fontSize: '18px', fontWeight: 800, color: T.ink, letterSpacing: '-0.015em' }}>{rec.tool}</div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: T.faint, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '3px' }}>Monthly savings</div>
                          <div style={{ fontFamily: T.display, fontSize: '28px', fontWeight: 800, color: T.greenDeep, letterSpacing: '-0.025em', lineHeight: 1 }}>
                            ${rec.savingsMonthly}
                            <span style={{ fontSize: '13px', fontWeight: 500, color: T.faint }}>/mo</span>
                          </div>
                          <div style={{ fontSize: '12px', color: T.muted, marginTop: '2px' }}>${(rec.savingsMonthly * 12).toLocaleString()}/yr</div>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '16px 24px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="rec-card-grid">
                        {/* Current */}
                        <div style={{ padding: '12px 14px', backgroundColor: T.bg, borderRadius: '8px', border: `1px solid ${T.border}` }}>
                          <div style={{ fontSize: '10px', fontWeight: 700, color: T.faint, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '5px' }}>Current plan</div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: T.ink }}>{rec.currentPlan}</div>
                        </div>
                        {/* Recommended */}
                        <div style={{ padding: '12px 14px', backgroundColor: T.greenBg, borderRadius: '8px', border: `1px solid ${T.greenBorder}` }}>
                          <div style={{ fontSize: '10px', fontWeight: 700, color: T.green, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '5px' }}>Recommended</div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: T.ink, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {rec.recommendedPlan || rec.recommendedAction}
                            <span className="material-symbols-outlined" style={{ fontSize: '14px', color: T.green, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          </div>
                        </div>
                      </div>

                      {/* Consultation CTA for High Savings */}
                      {monthly > 500 && i === 0 && (
                        <div style={{ marginTop: '4px', padding: '16px', backgroundColor: T.ink, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                          <div>
                            <div style={{ color: '#fff', fontSize: '14px', fontWeight: 700, marginBottom: '2px' }}>Need help with Enterprise negotiation?</div>
                            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>Our experts can help you lock in these savings.</div>
                          </div>
                          <button onClick={() => window.open('https://credex.ai/consult', '_blank')} style={{ backgroundColor: '#fff', color: T.ink, border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                            Book Consultation
                          </button>
                        </div>
                      )}

                      {/* Reason */}
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '12px 14px', backgroundColor: T.blueBg, borderRadius: '8px', border: `1px solid ${T.blueBorder}` }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: T.blue, flexShrink: 0, marginTop: '1px', fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                        <p style={{ fontSize: '13px', color: T.inkLight, lineHeight: 1.65, margin: 0 }}>{rec.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '80px' }}>

            {/* AI Summary Card */}
            <div
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f9fafb)',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                boxShadow: '0 6px 18px rgba(0,0,0,0.06)'
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '18px 22px',
                  borderBottom: '1px solid #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    background: 'rgba(59,130,246,0.08)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: '16px',
                      color: '#2563eb',
                      fontVariationSettings: "'FILL' 1"
                    }}
                  >
                    neurology
                  </span>
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: T.display,
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#111827'
                    }}
                  >
                    Executive Summary
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>
                    Powered by Claude
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '18px 22px' }}>
                <p
                  style={{
                    fontSize: '13.5px',
                    color: '#4b5563',
                    lineHeight: 1.8,
                    margin: 0
                  }}
                >
                  {result.aiSummary || (
                    <>
                      Your organization is currently spending{' '}
                      <span style={{ color: '#111827', fontWeight: 600 }}>
                        $45,000 annually
                      </span>{' '}
                      on AI tooling. We've identified{' '}
                      <span style={{ color: '#16a34a', fontWeight: 600 }}>
                        31% inefficiency
                      </span>{' '}
                      primarily driven by over-provisioned enterprise tiers.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Email Report Card */}
            <div className="no-print" style={{ backgroundColor: T.surface, borderRadius: '14px', border: `1px solid ${T.border}`, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: `1px solid ${T.border}` }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: T.ink, marginBottom: '2px' }}>Get your full report</div>
                <div style={{ fontSize: '12px', color: T.muted }}>Includes PDF, shareable link and 12-month projection.</div>
              </div>
              <div style={{ padding: '16px 20px' }}>
                {!leadCaptured ? (
                  <form onSubmit={submitLead} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* Honeypot field - hidden from users */}
                    <input
                      type="text"
                      name="company_website"
                      value={companyWebsite}
                      onChange={e => setCompanyWebsite(e.target.value)}
                      style={{ position: 'absolute', opacity: 0, height: 0, width: 0, zIndex: -1 }}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    <input type="email" required placeholder="work@company.com" value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: '8px', fontSize: '14px', color: T.ink, backgroundColor: T.surface, outline: 'none', boxSizing: 'border-box' }} />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <input type="text" placeholder="Company (Optional)" value={company}
                        onChange={e => setCompany(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', border: `1.5px solid ${T.border}`, borderRadius: '8px', fontSize: '13px', color: T.ink, backgroundColor: T.surface, outline: 'none', boxSizing: 'border-box' }} />
                      <input type="text" placeholder="Role (Optional)" value={role}
                        onChange={e => setRole(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', border: `1.5px solid ${T.border}`, borderRadius: '8px', fontSize: '13px', color: T.ink, backgroundColor: T.surface, outline: 'none', boxSizing: 'border-box' }} />
                    </div>

                    <input type="number" placeholder="Team Size (Optional)" value={leadTeamSize}
                      onChange={e => setLeadTeamSize(e.target.value === "" ? "" : Number(e.target.value))}
                      style={{ width: '100%', padding: '9px 12px', border: `1.5px solid ${T.border}`, borderRadius: '8px', fontSize: '13px', color: T.ink, backgroundColor: T.surface, outline: 'none', boxSizing: 'border-box' }} />

                    <button type="submit" disabled={loading}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: T.greenDeep, color: '#ffffff', fontWeight: 700, fontSize: '14px', padding: '11px', borderRadius: '8px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>mail</span>
                      {loading ? 'Sending…' : 'Email my report'}
                    </button>
                    {leadError && <p style={{ margin: 0, fontSize: '12px', color: T.red, fontWeight: 500 }}>{leadError}</p>}
                    <p style={{ margin: 0, fontSize: '11px', color: T.faint, textAlign: 'center' }}>We'll never spam. Unsubscribe any time.</p>
                  </form>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 14px', backgroundColor: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: '8px', color: T.greenDark, fontSize: '13px', fontWeight: 600 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      Report sent! Check your inbox.
                    </div>
                    <button onClick={copyLink}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: T.surfaceAlt, color: T.ink, fontWeight: 600, fontSize: '13px', padding: '10px', borderRadius: '8px', border: `1.5px solid ${T.border}`, cursor: 'pointer' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>{copied ? 'check' : 'content_copy'}</span>
                      {copied ? 'Copied to clipboard!' : 'Copy shareable link'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Optimization Alerts Card (Visible when savings <= 100) */}
            {monthly <= 100 && (
              <div className="no-print" style={{ backgroundColor: T.surface, borderRadius: '14px', border: `1px solid ${T.border}`, overflow: 'hidden', borderLeft: `4px solid ${T.blue}` }}>
                <div style={{ padding: '16px 20px', borderBottom: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: T.ink, marginBottom: '2px' }}>Stay Optimized</div>
                  <div style={{ fontSize: '12px', color: T.muted }}>You're already optimized. Want to be notified when new savings opportunities appear?</div>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  {!subscribed ? (
                    <form onSubmit={submitSubscription} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input
                        type="text"
                        name="sub_honeypot"
                        value={subHoneypot}
                        onChange={e => setSubHoneypot(e.target.value)}
                        style={{ position: 'absolute', opacity: 0, height: 0, width: 0, zIndex: -1 }}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                      <input type="email" required placeholder="your@email.com" value={subEmail}
                        onChange={e => setSubEmail(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: '8px', fontSize: '14px', color: T.ink, backgroundColor: T.surface, outline: 'none', boxSizing: 'border-box' }} />
                      <button type="submit" disabled={subLoading}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: T.blue, color: '#ffffff', fontWeight: 700, fontSize: '14px', padding: '11px', borderRadius: '8px', border: 'none', cursor: subLoading ? 'not-allowed' : 'pointer', opacity: subLoading ? 0.7 : 1 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>notifications</span>
                        {subLoading ? 'Subscribing…' : 'Notify Me'}
                      </button>
                      {subError && <p style={{ margin: 0, fontSize: '12px', color: T.red, fontWeight: 500 }}>{subError}</p>}
                    </form>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 14px', backgroundColor: T.blueBg, border: `1px solid ${T.blueBorder}`, borderRadius: '8px', color: T.blue, fontSize: '13px', fontWeight: 600 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      Alerts active!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick stats */}
            <div style={{ backgroundColor: T.surfaceAlt, borderRadius: '12px', border: `1px solid ${T.border}`, padding: '16px 20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: T.faint, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '12px' }}>Audit snapshot</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { label: 'Tools audited', value: String(result.tools?.length ?? 0) },
                  { label: 'Recommendations', value: String(recs.length) },
                  { label: 'Spend / Member', value: `$${result.spendPerMember ?? 0}` },
                  { label: 'Yearly savings', value: `$${yearly.toLocaleString()}` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ backgroundColor: T.surface, borderRadius: '8px', padding: '10px 12px', border: `1px solid ${T.border}` }}>
                    <div style={{ fontSize: '11px', color: T.faint, marginBottom: '3px' }}>{label}</div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: T.ink, fontFamily: T.display }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Benchmark Mode */}
              <div style={{ marginTop: '16px', padding: '12px', backgroundColor: T.surface, borderRadius: '10px', border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: T.faint, textTransform: 'uppercase', marginBottom: '8px' }}>Industry Benchmark</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '13px', color: T.muted }}>Avg. Spend / Dev</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: T.ink }}>$150/mo</div>
                </div>
                <div style={{ height: '4px', backgroundColor: T.bg, borderRadius: '2px', marginTop: '8px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${Math.min(((result.spendPerMember ?? 0) / 300) * 100, 100)}%`, backgroundColor: (result.spendPerMember ?? 0) > 150 ? T.red : T.green, borderRadius: '2px' }} />
                </div>
                <div style={{ fontSize: '10px', color: (result.spendPerMember ?? 0) > 150 ? T.red : T.green, marginTop: '6px', fontWeight: 600 }}>
                  {(result.spendPerMember ?? 0) > 150 ? 'Above average spend' : 'Below average spend'}
                </div>
              </div>
            </div>

            {/* Start over */}
            <button className="no-print" onClick={onReset}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: 'transparent', color: T.muted, fontWeight: 600, fontSize: '13px', padding: '10px', borderRadius: '8px', border: `1.5px solid ${T.border}`, cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>refresh</span>
              Start a new audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
