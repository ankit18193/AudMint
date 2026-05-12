import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 1. Exact Theme Colors
const T = {
    bg: '#f8fafc',
    surface: '#ffffff',
    primary: '#09090b',
    secondary: '#16a34a',
    textMuted: '#52525b',
    border: '#e4e4e7',
    badgeBg: '#dcfce7',
    badgeText: '#15803d',
    fontDisplay: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
};

// 2. Icon Helper
function getToolIcon(toolName: string) {
    const name = String(toolName).toLowerCase();
    if (name.includes('copilot') || name.includes('cursor') || name.includes('windsurf')) return 'code';
    if (name.includes('chat') || name.includes('claude')) return 'chat';
    if (name.includes('midjourney') || name.includes('design')) return 'palette';
    if (name.includes('cloud') || name.includes('aws') || name.includes('gcp')) return 'cloud';
    if (name.includes('data')) return 'database';
    return 'smart_toy';
}

// 3. Static Server Component
export default function SampleReportPage() {

    // ── HARDCODED DUMMY DATA FOR SAMPLE REPORT ──
    const report = {
        id: "sample-12345",
        teamSize: 45,
        totalSavingsMonthly: 3850,
        totalSavingsYearly: 46200,
        recommendations: [
            {
                tool: "ChatGPT",
                type: "seat_optimization",
                currentPlan: "Team ($30/mo/user) (65 seats)",
                recommendedAction: "Reduce seats from 65 to 45",
                reason: "You have more seats assigned (65) than your total team size (45). Unused licenses are draining budget.",
                savingsMonthly: 600
            },
            {
                tool: "Jasper AI",
                type: "duplicate_tool",
                currentPlan: "Pro ($39/mo/user) (25 seats)",
                recommendedAction: "Cancel subscription",
                reason: "Redundant writing tool. You are already paying for Claude Pro. Consolidating tools saves money and centralizes knowledge.",
                savingsMonthly: 975
            },
            {
                tool: "GitHub Copilot",
                type: "tier_downgrade",
                currentPlan: "Business ($19/mo/user) (45 seats)",
                recommendedAction: "Downgrade 20 non-engineering seats",
                reason: "Usage data suggests non-technical staff (PMs, Designers) are holding active licenses without triggering code completions.",
                savingsMonthly: 380
            }
        ],
        globalInsight: {
            title: "Consolidated License Tiers",
            description: "Identified 85 redundant SaaS seats across 4 different AI collaboration platforms. Recommending a unified enterprise license approach to maximize volume discounts.",
            savingsYearly: 22800
        }
    };

    // Dynamic Logic Preserved
    const reductionPercent = ((report.totalSavingsMonthly / (report.totalSavingsMonthly + 100)) * 100).toFixed(1);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: T.bg, fontFamily: T.fontBody, color: T.primary, display: 'flex', flexDirection: 'column' }}>

            {/* Robust Global CSS for layout grids and responsiveness */}
            <style>{`
        .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        .hero-title { font-family: ${T.fontDisplay}; font-size: clamp(32px, 5vw, 40px); font-weight: 700; color: ${T.primary}; margin: 16px 0; letter-spacing: -0.02em; }
        .hero-subtitle { font-size: clamp(16px, 3vw, 18px); color: ${T.textMuted}; line-height: 1.6; max-width: 600px; margin: 0 auto; }
        .savings-amount { font-family: ${T.fontBody}; font-size: clamp(48px, 8vw, 64px); font-weight: 800; color: ${T.primary}; margin: 16px 0; letter-spacing: -0.02em; line-height: 1; }
        
        .grid-layout { display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 24px; }
        @media (min-width: 768px) { .grid-layout { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .grid-layout { grid-template-columns: repeat(3, 1fr); } }

        .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.06); }
        .cta-link { transition: transform 0.2s ease; }
        .cta-link:hover { transform: translateY(-2px); }

        .insight-card { display: flex; align-items: center; gap: 24px; grid-column: 1 / -1; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px; padding: 24px; }
        .insight-divider { border-left: 1px solid #e4e4e7; padding-left: 24px; display: flex; flex-direction: column; align-items: flex-end; justify-content: center; flex-shrink: 0; }
        @media (max-width: 768px) {
          .insight-card { flex-direction: column; align-items: flex-start; gap: 16px; }
          .insight-divider { border-left: none; border-top: 1px solid #e4e4e7; padding-left: 0; padding-top: 16px; width: 100%; align-items: flex-start; }
        }
      `}</style>

            <Navbar />

            {/* ── Main Content Canvas ── */}
            <main style={{ flex: 1, paddingTop: '64px', paddingBottom: '80px' }}>

                {/* ── SAMPLE ALERT BANNER ── */}
                <div style={{ backgroundColor: '#eff6ff', borderBottom: '1px solid #bfdbfe', padding: '16px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', zIndex: 40, position: 'relative' }}>
                    <span className="material-symbols-outlined" style={{ color: '#2563eb' }}>info</span>
                    <span style={{ fontSize: '14px', color: '#1e3a8a', fontWeight: 500 }}>
                        <strong>This is a sample report.</strong> See the insights AudMint generates, then <Link href="/audit" style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'underline' }}>start your own free audit</Link> to get your actual data.
                    </span>
                </div>

                <div className="container" style={{ paddingTop: '36px' }}>

                    {/* Header Section */}
                    <header style={{ textAlign: 'center', marginBottom: '48px', paddingTop: '16px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#f0fdf4', color: '#166534', padding: '6px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>verified</span>
                            VERIFIED AUDIT
                        </div>

                        <h1 className="hero-title">Infrastructure Efficiency Report</h1>
                        <p className="hero-subtitle">
                            A simplified analysis of cloud and SaaS expenditure, optimizing for Algorithmic Trust and high-signal operational efficiency for {report.teamSize} team members.
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '32px' }}>
                            <span style={{ fontSize: '13px', color: T.textMuted, fontWeight: 500 }}>Share this report:</span>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'transparent', border: `1px solid ${T.border}`, padding: '6px 12px', borderRadius: '999px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: T.textMuted }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>share</span> X / Twitter
                            </button>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'transparent', border: `1px solid ${T.border}`, padding: '6px 12px', borderRadius: '999px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: T.textMuted }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>link</span> LinkedIn
                            </button>
                        </div>
                    </header>

                    {/* Hero Savings Card */}
                    <section style={{ backgroundColor: T.surface, border: `1px solid ${T.border}`, borderRadius: '16px', padding: '48px 24px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', maxWidth: '900px', margin: '0 auto 64px' }}>
                        <h2 style={{ fontSize: '12px', fontWeight: 700, color: T.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                            Total Identified Annual Savings
                        </h2>
                        <div className="savings-amount">
                            ${report.totalSavingsYearly.toLocaleString()}
                        </div>
                        {report.totalSavingsYearly > 0 && (
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#e2ffe9', color: '#006e2f', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: 700 }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>trending_down</span>
                                {reductionPercent}% Reduction in Spend
                            </div>
                        )}
                    </section>

                    {/* Tool-by-Tool Grid */}
                    <section>
                        <h2 style={{ fontFamily: T.fontDisplay, fontSize: '28px', fontWeight: 700, color: T.primary, marginBottom: '8px' }}>Tool-by-Tool Logic</h2>

                        {report.recommendations.length === 0 ? (
                            <div style={{ backgroundColor: T.surface, borderRadius: '12px', padding: '48px', textAlign: 'center', border: `1px solid ${T.border}` }}>
                                No optimizations needed. Excellent infrastructure management!
                            </div>
                        ) : (
                            <div className="grid-layout">
                                {report.recommendations.map((rec: any, idx: number) => {
                                    const projectedSavingsYearly = (rec.savingsMonthly || 0) * 12;

                                    return (
                                        <article key={idx} className="card-hover" style={{ backgroundColor: T.surface, border: `1px solid ${T.border}`, borderRadius: '12px', padding: '28px', display: 'flex', flexDirection: 'column', minHeight: '280px' }}>

                                            {/* Card Header */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '24px', color: T.textMuted }}>
                                                        {getToolIcon(rec.tool)}
                                                    </span>
                                                    <span style={{ fontSize: '13px', fontWeight: 700, color: T.primary, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                                        {rec.tool}
                                                    </span>
                                                </div>
                                                <div style={{ backgroundColor: T.badgeBg, color: T.badgeText, padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, textTransform: 'capitalize' }}>
                                                    {rec.type.replace(/_/g, ' ')}
                                                </div>
                                            </div>

                                            {/* Card Body */}
                                            <div style={{ flex: 1 }}>
                                                <p style={{ fontSize: '15px', color: T.textMuted, lineHeight: 1.6, margin: '0 0 16px 0' }}>
                                                    {rec.reason}
                                                </p>
                                            </div>

                                            {/* Card Footer */}
                                            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                                <span style={{ fontSize: '12px', fontWeight: 600, color: T.textMuted }}>Projected Savings</span>
                                                <div style={{ fontSize: '24px', fontWeight: 700, color: T.primary, lineHeight: 1 }}>
                                                    ${projectedSavingsYearly.toLocaleString()} <span style={{ fontSize: '14px', fontWeight: 400, color: T.textMuted }}>/yr</span>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}

                                {/* ── Dynamic Full-Width AI Insight Section ── */}
                                {report.globalInsight && (
                                    <div className="insight-card card-hover">
                                        {/* Icon */}
                                        <div style={{ flexShrink: 0, width: '64px', height: '64px', backgroundColor: '#e0e7ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#1d4ed8', fontVariationSettings: "'FILL' 1" }}>
                                                auto_awesome
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                                                AI Suggestion Insight
                                            </div>
                                            <h3 style={{ fontFamily: T.fontDisplay, fontSize: '24px', fontWeight: 700, color: T.primary, margin: '0 0 8px 0' }}>
                                                {report.globalInsight.title}
                                            </h3>
                                            <p style={{ fontSize: '15px', color: T.textMuted, lineHeight: 1.5, margin: 0 }}>
                                                {report.globalInsight.description}
                                            </p>
                                        </div>

                                        {/* Savings (Right) */}
                                        <div className="insight-divider">
                                            <span style={{ fontSize: '12px', fontWeight: 600, color: T.textMuted, marginBottom: '4px' }}>Projected Savings</span>
                                            <div style={{ fontSize: '28px', fontWeight: 700, color: T.primary, lineHeight: 1 }}>
                                                ${report.globalInsight.savingsYearly.toLocaleString()} <span style={{ fontSize: '14px', fontWeight: 400, color: T.textMuted }}>/yr</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>

                </div>
            </main>

            {/* ── Floating CTA (Bottom Right) ── */}
            <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 100 }}>
                <Link href="/audit" className="cta-link" style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: T.primary, color: T.surface, padding: '16px 24px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Generate Your Own Audit</span>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
                </Link>
            </div>

            <Footer />

        </div>
    );
}