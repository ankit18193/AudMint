"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SampleReportPage from "@/app/sample-report/page";
import { useRouter } from "next/navigation";

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
// Single source of truth for the entire app's visual language
const T = {
  // Colors
  c: {
    ink: '#0d0d0d',
    inkLight: '#374151',
    muted: '#6b7280',
    faint: '#9ca3af',
    border: '#e5e7eb',
    borderHov: '#d1d5db',
    bg: '#f9fafb',
    surface: '#ffffff',
    surfaceAlt: '#f3f4f6',
    green: '#16a34a',
    greenBg: '#f0fdf4',
    greenBorder: '#bbf7d0',
    greenDark: '#15803d',
    greenDeep: '#006e2f',
    blue: '#2563eb',
    blueBg: '#eff6ff',
    amber: '#d97706',
    amberBg: '#fffbeb',
    red: '#dc2626',
    redBg: '#fef2f2',
    redBorder: '#fecaca',
  },
  // Typography
  f: {
    display: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
  },
  // Shadows
  s: {
    xs: '0 1px 2px rgba(0,0,0,0.05)',
    sm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    md: '0 4px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.03)',
    lg: '0 10px 24px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.04)',
    xl: '0 20px 40px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.04)',
  },
  // Radii
  r: { sm: '6px', md: '10px', lg: '14px', xl: '20px', full: '9999px' },
};

// ─── LANDING PAGE ────────────────────────────────────────────────────────────
export default function Landing({ onStart, onSample }: { onStart: () => void, onSample: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Scroll shadow on nav
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); };
  }, []);

  const smoothScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: T.f.body, backgroundColor: T.c.bg, color: T.c.ink }}>

      {/* ══════════════════ GLOBAL RESPONSIVE CSS ══════════════════ */}
      <style>{`
        /* Nav responsive */
        .nav-links { display: flex; }
        .nav-cta-text { display: inline; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-cta-text { display: none !important; }
        }
        /* Hero grid */
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .hero-card-wrap { display: none; }
        }
        /* How-it-works grid */
        .steps-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        @media (max-width: 860px) {
          .steps-grid { grid-template-columns: 1fr; }
        }
        /* Footer grid */
        .footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1.4fr; gap: 40px; }
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-col3 { display: none; }
        }
        /* Animations */
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn      { from { opacity:0; } to { opacity:1; } }
        /* Floating animation for hero card */
        @keyframes float { 
          0% { transform: translateY(0px); } 
          50% { transform: translateY(-8px); } 
          100% { transform: translateY(0px); } 
        }
        /* Pulse for CTA */
        @keyframes pulseDot {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(22, 163, 74, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
        }
        /* Marquee for logos */
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .hero-text  { animation: fadeSlideUp 0.55s cubic-bezier(.22,.68,0,1.2) both; }
        .hero-card-wrap  { animation: fadeSlideUp 0.65s 0.15s cubic-bezier(.22,.68,0,1.2) both; }
        .hero-card  { animation: float 6s ease-in-out infinite; transform-origin: center; }
        .social-bar { animation: fadeIn 0.5s 0.4s ease both; overflow: hidden; white-space: nowrap; }
        
        /* Steps Hover */
        .step-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .step-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.06); }
      `}</style>

      <Navbar />

      {/* ══════════════════ HERO ══════════════════ */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px 96px', width: '100%', boxSizing: 'border-box' }}>
        <div className="hero-grid">

          {/* Hero Copy */}
          <div className="hero-text" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', width: 'fit-content', backgroundColor: '#f0fdf4', color: T.c.greenDeep, border: `1px solid ${T.c.greenBorder}`, padding: '5px 12px', borderRadius: T.r.full, fontSize: '12px', fontWeight: 600, letterSpacing: '0.01em' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>verified</span>
              AI-powered spend auditing · Free to start
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily: T.f.display, fontSize: 'clamp(38px, 4.5vw, 58px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.035em', color: T.c.ink, margin: 0 }}>
              Stop burning cash<br />
              <span style={{ color: T.c.greenDeep }}>on AI tools.</span>
            </h1>

            {/* Subheadline */}
            <p style={{ fontSize: '18px', lineHeight: 1.72, color: T.c.inkLight, maxWidth: '440px', margin: 0 }}>
              AudMint audits your AI stack, flags waste, and delivers a ranked action plan — in under 60 seconds. No consultants needed.
            </p>

            {/* CTA Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <button onClick={onStart} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: T.c.ink, color: '#ffffff', fontWeight: 700, fontSize: '15px', padding: '13px 28px', borderRadius: T.r.lg, border: 'none', cursor: 'pointer', boxShadow: T.s.md, transition: 'transform 0.15s, box-shadow 0.15s' }}
                onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = T.s.lg; }}
                onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = T.s.md; }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                Start Free Audit
                <div style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%', marginLeft: '4px', animation: 'pulseDot 2s infinite' }} />
              </button>
              <button onClick={() => router.push('/sample-report')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: T.c.surface, color: T.c.inkLight, fontWeight: 600, fontSize: '15px', padding: '13px 24px', borderRadius: T.r.lg, border: `1.5px solid ${T.c.border}`, cursor: 'pointer', boxShadow: T.s.xs, transition: 'all 0.15s' }}
                onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = T.c.surfaceAlt; }}
                onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = T.c.surface; }}>
                <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>visibility</span>

                View Sample
              </button>
            </div>

            {/* Trust signals */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', paddingTop: '4px' }}>
              {[
                { icon: 'check_circle', text: 'Free, no credit card' },
                { icon: 'schedule', text: 'Ready in 60 seconds' },
                { icon: 'lock', text: 'Data never stored' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: T.c.muted }}>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '15px', color: T.c.greenDeep, fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Hero Card */}
          <div className="hero-card-wrap hero-card" style={{ backgroundColor: T.c.surface, borderRadius: T.r.xl, padding: '28px', boxShadow: T.s.xl, border: `1px solid ${T.c.border}` }}>

            {/* Card Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '20px', borderBottom: `1px solid ${T.c.border}` }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: T.c.faint, textTransform: 'uppercase', marginBottom: '6px' }}>ESTIMATED SAVINGS</div>
                <div style={{ fontFamily: T.f.display, fontSize: '40px', fontWeight: 800, letterSpacing: '-0.03em', color: T.c.ink, lineHeight: 1 }}>
                  $4,250
                  <span style={{ fontSize: '16px', fontWeight: 500, color: T.c.faint }}>/mo</span>
                </div>
                <div style={{ fontSize: '13px', color: T.c.muted, marginTop: '4px' }}>$51,000 saved per year</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                <div style={{ backgroundColor: '#dcfce7', color: T.c.greenDark, fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: T.r.sm, border: `1px solid ${T.c.greenBorder}` }}>
                  +15% savings
                </div>
                <div style={{ fontSize: '11px', color: T.c.faint }}>vs. current spend</div>
              </div>
            </div>

            {/* Tool Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {[
                { icon: 'chat', name: 'ChatGPT Enterprise', reason: 'Over-provisioned by 12 seats', saving: '−$1,200', iconColor: T.c.blue, iconBg: T.c.blueBg },
                { icon: 'code', name: 'GitHub Copilot', reason: '14 inactive users detected', saving: '−$850', iconColor: T.c.ink, iconBg: T.c.surfaceAlt },
                { icon: 'smart_toy', name: 'Midjourney', reason: 'Duplicate with Canva AI', saving: '−$600', iconColor: T.c.amber, iconBg: T.c.amberBg },
              ].map(item => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', padding: '11px 14px', backgroundColor: T.c.bg, borderRadius: T.r.md, border: `1px solid ${T.c.border}`, gap: '12px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.iconColor, flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '17px', fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: T.c.ink }}>{item.name}</div>
                    <div style={{ fontSize: '11px', color: T.c.faint, marginTop: '1px' }}>{item.reason}</div>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: T.c.greenDeep, flexShrink: 0 }}>{item.saving}</div>
                </div>
              ))}
            </div>

            {/* Run Button */}
            <button onClick={onStart} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: T.c.greenDeep, color: '#ffffff', fontWeight: 700, fontSize: '14px', padding: '13px', borderRadius: T.r.md, border: 'none', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>search</span>
              Audit my AI stack — it's free
            </button>
            <p style={{ textAlign: 'center', fontSize: '11px', color: T.c.faint, marginTop: '10px' }}>
              No sign-up required · Results in &lt;60 seconds
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════ SOCIAL PROOF ══════════════════ */}
      <section className="social-bar" style={{ backgroundColor: T.c.surface, borderTop: `1px solid ${T.c.border}`, borderBottom: `1px solid ${T.c.border}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 32px' }}>
          <p style={{ textAlign: 'center', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: T.c.faint, textTransform: 'uppercase', marginBottom: '20px' }}>
            Trusted by forward-thinking engineering teams
          </p>
          <div style={{ display: 'flex', overflow: 'hidden', position: 'relative', width: '100%', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div style={{ display: 'flex', gap: '64px', alignItems: 'center', paddingRight: '64px', animation: 'marquee 30s linear infinite' }}>
              {[...Array(2)].map((_, i) => (
                <div key={i} style={{ display: 'flex', gap: '64px', alignItems: 'center' }}>
                  {[['api', 'Stripe'], ['cloud', 'Vercel'], ['payments', 'Linear'], ['bolt', 'Notion'], ['devices', 'Raycast']].map(([icon, label]) => (
                    <div key={`${i}-${label}`} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '15px', fontWeight: 700, color: '#9ca3af', letterSpacing: '-0.01em', opacity: 0.8 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#d1d5db' }}>{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ HOW IT WORKS ══════════════════ */}
      <section id="how" style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 40px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: T.c.surfaceAlt, border: `1px solid ${T.c.border}`, borderRadius: T.r.full, padding: '5px 14px', fontSize: '12px', fontWeight: 600, color: T.c.muted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>
            How it works
          </div>
          <h2 style={{ fontFamily: T.f.display, fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, letterSpacing: '-0.03em', color: T.c.ink, marginBottom: '14px', margin: '0 0 14px 0' }}>
            From zero to savings in 3 steps
          </h2>
          <p style={{ fontSize: '17px', color: T.c.muted, maxWidth: '500px', margin: '0 auto', lineHeight: 1.65 }}>
            No consultants. No lengthy setup. Just clear data and a ranked action plan.
          </p>
        </div>

        <div className="steps-grid">
          {[
            {
              step: '01', icon: 'inventory_2', iconColor: T.c.ink, iconBg: T.c.surfaceAlt,
              title: 'Input your tools',
              desc: 'Select the AI subscriptions your team pays for. We support Cursor, ChatGPT, GitHub Copilot, Claude, Gemini, and 50+ more platforms.',
              tag: '~30 seconds',
            },
            {
              step: '02', icon: 'analytics', iconColor: T.c.blue, iconBg: T.c.blueBg,
              title: 'Run the audit',
              desc: 'Our deterministic engine benchmarks your stack against real market pricing, identifies seat redundancy, and flags consolidation opportunities.',
              tag: 'Instant',
            },
            {
              step: '03', icon: 'savings', iconColor: T.c.greenDeep, iconBg: T.c.greenBg,
              title: 'Act on savings',
              desc: 'Get a prioritised, shareable PDF report with concrete actions: which plans to downgrade, which tools to merge, and exact dollar impact.',
              tag: 'Actionable',
            },
          ].map(step => (
            <div key={step.step} className="step-card" style={{ backgroundColor: T.c.surface, borderRadius: T.r.xl, padding: '32px 28px', border: `1px solid ${T.c.border}`, boxShadow: T.s.sm, display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
              {/* Step number watermark */}
              <div style={{ position: 'absolute', top: '24px', right: '24px', fontFamily: T.f.display, fontSize: '11px', fontWeight: 800, color: T.c.border, letterSpacing: '-0.02em' }}>{step.step}</div>
              {/* Icon */}
              <div style={{ width: '48px', height: '48px', borderRadius: T.r.md, backgroundColor: step.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.iconColor, marginBottom: '20px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '24px', fontVariationSettings: "'FILL' 1" }}>{step.icon}</span>
              </div>
              {/* Tag */}
              <div style={{ display: 'inline-flex', width: 'fit-content', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, color: T.c.faint, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '10px', backgroundColor: T.c.surfaceAlt, padding: '3px 8px', borderRadius: T.r.sm }}>
                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>timer</span>
                {step.tag}
              </div>
              <h3 style={{ fontFamily: T.f.display, fontSize: '20px', fontWeight: 700, color: T.c.ink, marginBottom: '10px', letterSpacing: '-0.015em' }}>{step.title}</h3>
              <p style={{ fontSize: '14px', color: T.c.muted, lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <button onClick={onStart} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: T.c.ink, color: '#ffffff', fontWeight: 700, fontSize: '15px', padding: '14px 32px', borderRadius: T.r.lg, border: 'none', cursor: 'pointer', boxShadow: T.s.md }}>
            Start your audit — free
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </button>
          <p style={{ marginTop: '12px', fontSize: '13px', color: T.c.faint }}>No account needed · Free forever for teams under 10</p>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <Footer />
    </div>
  );
}
