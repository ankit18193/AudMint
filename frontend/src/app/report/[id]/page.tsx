import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// OG Metadata Generation
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const report = await getReport(resolvedParams.id);
  const baseUrl = process.env.BASE_URL || "https://audmint.credex.ai"; // Fallback URL

  if (!report) {
    return {
      title: "Report Not Found | AudMint",
      description: "This audit report does not exist or has expired.",
    };
  }

  const hasSavings = report.totalSavingsMonthly > 0;
  const title = hasSavings 
    ? `I found $${report.totalSavingsMonthly.toLocaleString()}/mo in AI savings with AudMint`
    : "My AI stack is already optimized with AudMint";
  
  const description = `AudMint analyzed my AI tools and found actionable ways to reduce costs and eliminate redundancy. Total annual savings: $${report.totalSavingsYearly.toLocaleString()}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/report/${resolvedParams.id}`,
      // Dynamic OG Image Route (to be implemented)
      images: [
        {
          url: `${baseUrl}/api/og?savings=${report.totalSavingsYearly}&id=${resolvedParams.id}`,
          width: 1200,
          height: 630,
          alt: "AudMint Savings Report",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/api/og?savings=${report.totalSavingsYearly}&id=${resolvedParams.id}`],
    },
  };
}

// 1. Unchanged Data Fetching Logic
async function getReport(id: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const res = await fetch(`${apiUrl}/api/report/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

// 2. Exact Theme Colors from Target Image
const T = {
  bg: '#f8fafc', // Very light grey background
  surface: '#ffffff',
  primary: '#09090b', // Deep black/grey
  secondary: '#16a34a', // Trust Green
  textMuted: '#52525b',
  border: '#e4e4e7',
  badgeBg: '#dcfce7',
  badgeText: '#15803d',
  fontDisplay: "'Plus Jakarta Sans', system-ui, sans-serif",
  fontBody: "'Inter', system-ui, sans-serif",
};

// 3. Helper to determine icon based on tool name dynamically
function getToolIcon(toolName: string) {
  const name = String(toolName).toLowerCase();
  if (name.includes('copilot') || name.includes('cursor') || name.includes('windsurf')) return 'code';
  if (name.includes('chat') || name.includes('claude')) return 'chat';
  if (name.includes('midjourney') || name.includes('design')) return 'palette';
  if (name.includes('cloud') || name.includes('aws') || name.includes('gcp')) return 'cloud';
  if (name.includes('data')) return 'database';
  return 'smart_toy';
}

// 4. Main Server Component
export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const report = await getReport(resolvedParams.id);

  const { id } = await params;

  // Fallback if not found
  if (!report) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: T.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: T.fontBody }}>
        <h1 style={{ fontFamily: T.fontDisplay, fontSize: '32px', fontWeight: 700, color: T.primary, marginBottom: '16px' }}>Report Not Found</h1>
        <p style={{ color: T.textMuted, marginBottom: '32px' }}>This audit report does not exist or has expired.</p>
        <Link href="/" style={{ backgroundColor: T.primary, color: T.surface, padding: '12px 24px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>
          Run a new audit
        </Link>
      </div>
    );
  }

  // Dynamic Logic Preserved
  const reductionPercent = ((report.totalSavingsMonthly / (report.totalSavingsMonthly + 100)) * 100).toFixed(1);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: T.bg, fontFamily: T.fontBody, color: T.primary, display: 'flex', flexDirection: 'column' }}>

      {/* Robust Global CSS for layout grids and responsiveness */}
      <style>{`
        .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        /* ── Navbar Specific CSS (Replaces JS Hover Handlers) ── */
        .brand-link { transition: opacity 0.2s ease; }
        .brand-link:hover { opacity: 0.8; }
        
        .center-nav-link {
          font-size: 14px; font-weight: 500; color: ${T.textMuted}; text-decoration: none; 
          padding: 7px 14px; border-radius: 6px; transition: color 0.15s, background-color 0.15s; 
          font-family: ${T.fontBody}; white-space: nowrap;
        }
        .center-nav-link:hover { color: ${T.primary}; background-color: #f3f4f6; }
        
        .login-btn {
          font-size: 14px; font-weight: 600; color: #374151; text-decoration: none; 
          padding: 7px 16px; border: 1.5px solid ${T.border}; border-radius: 10px; 
          background-color: transparent; transition: all 0.15s; display: inline-block;
        }
        .login-btn:hover { border-color: #d1d5db; background-color: #f3f4f6; }
        
        .start-audit-btn {
          font-size: 14px; font-weight: 700; color: #fff; background-color: ${T.primary}; 
          padding: 8px 20px; border-radius: 10px; text-decoration: none; display: inline-flex; 
          align-items: center; gap: 6px; box-shadow: 0 1px 4px rgba(0,0,0,0.18); 
          transition: transform 0.15s, box-shadow 0.15s, background-color 0.15s; white-space: nowrap;
        }
        .start-audit-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.22); }
        
        /* ── Report Layout CSS ── */
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

        /* Responsive Navbar Rules */
        @media (max-width: 900px) { .center-nav { display: none !important; } }
        @media (max-width: 600px) { 
          .nav-padding-mobile { padding: 0 16px !important; } 
          .hide-mobile { display: none !important; } 
        }

        .insight-card { display: flex; align-items: center; gap: 24px; grid-column: 1 / -1; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px; padding: 24px; }
.insight-divider { border-left: 1px solid #e4e4e7; padding-left: 24px; display: flex; flex-direction: column; align-items: flex-end; justify-content: center; flex-shrink: 0; }
@media (max-width: 768px) {
  .insight-card { flex-direction: column; align-items: flex-start; gap: 16px; }
  .insight-divider { border-left: none; border-top: 1px solid #e4e4e7; padding-left: 0; padding-top: 16px; width: 100%; align-items: flex-start; }
}

.center-nav-link {
  position: relative;
  font-size: 14px; 
  font-weight: 500; 
  color: #52525b; /* T.textMuted */
  text-decoration: none; 
  padding: 7px 14px; 
  border-radius: 6px; 
  transition: color 0.15s, background-color 0.15s; 
  white-space: nowrap;
  
  /* Add these 4 lines so <button> tags look identical to links */
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
}
      `}</style>

      <Navbar />

      {/* ── Main Content Canvas ── */}
      <main style={{ flex: 1, paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="container">

          {/* Header Section */}
          <header style={{ textAlign: 'center', marginBottom: '48px', paddingTop: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#f0fdf4', color: '#166534', padding: '6px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em' }}>
              <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>verified</span>
              VERIFIED AUDIT
            </div>

            <h1 className="hero-title">Infrastructure Efficiency Report</h1>
            <p className="hero-subtitle">
              A simplified analysis of cloud and SaaS expenditure, optimizing for Algorithmic Trust and high-signal operational efficiency for {report.teamSize} team members.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '32px' }}>
              <span style={{ fontSize: '13px', color: T.textMuted, fontWeight: 500 }}>Share this report:</span>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'transparent', border: `1px solid ${T.border}`, padding: '6px 12px', borderRadius: '999px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: T.textMuted }}>
                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '16px' }}>share</span> X / Twitter
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'transparent', border: `1px solid ${T.border}`, padding: '6px 12px', borderRadius: '999px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: T.textMuted }}>
                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '16px' }}>link</span> LinkedIn
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
                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '18px' }}>trending_down</span>
                {reductionPercent}% Reduction in Spend
              </div>
            )}
          </section>
          
          {/* Benchmark Comparison */}
          <section style={{ maxWidth: '900px', margin: '0 auto 64px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              <div style={{ backgroundColor: T.surface, border: `1px solid ${T.border}`, borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', marginBottom: '8px' }}>Spend Per Member</div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: T.primary }}>${report.spendPerMember ?? 0}<span style={{ fontSize: '16px', fontWeight: 500, color: T.textMuted }}>/mo</span></div>
              </div>
              <div style={{ backgroundColor: T.surface, border: `1px solid ${T.border}`, borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', marginBottom: '8px' }}>Industry Benchmark</div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: T.primary }}>$150<span style={{ fontSize: '16px', fontWeight: 500, color: T.textMuted }}>/mo</span></div>
              </div>
              <div style={{ gridColumn: 'span 2', backgroundColor: T.surface, border: `1px solid ${T.border}`, borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                   <span style={{ fontSize: '14px', fontWeight: 600, color: T.textMuted }}>Efficiency Status</span>
                   <span style={{ fontSize: '14px', fontWeight: 700, color: (report.spendPerMember ?? 0) > 150 ? '#dc2626' : '#16a34a' }}>
                     {(report.spendPerMember ?? 0) > 150 ? 'Above Average' : 'Optimal Spend'}
                   </span>
                </div>
                <div style={{ height: '8px', backgroundColor: T.bg, borderRadius: '4px', position: 'relative' }}>
                   <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${Math.min(((report.spendPerMember ?? 0) / 300) * 100, 100)}%`, backgroundColor: (report.spendPerMember ?? 0) > 150 ? '#dc2626' : '#16a34a', borderRadius: '4px' }} />
                   <div style={{ position: 'absolute', top: '-4px', left: '50%', height: '16px', width: '2px', backgroundColor: T.primary, opacity: 0.2 }} />
                </div>
                <p style={{ fontSize: '13px', color: T.textMuted, marginTop: '12px', margin: '12px 0 0 0' }}>
                  Your team spends ${(report.spendPerMember ?? 0).toLocaleString()} monthly on AI tooling per member. 
                  The average for high-growth startups is roughly $150.
                </p>
              </div>
            </div>
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
                          <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '24px', color: T.textMuted }}>
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
                      <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: `1px solid ${T.border}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
                           <div style={{ flex: 1 }}>
                             <div style={{ fontSize: '10px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>Target Plan</div>
                             <div style={{ fontSize: '14px', fontWeight: 700, color: T.secondary, display: 'flex', alignItems: 'center', gap: '4px' }}>
                               {rec.recommendedPlan || rec.recommendedAction}
                               <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                             </div>
                           </div>
                           <div style={{ textAlign: 'right' }}>
                             <span style={{ fontSize: '10px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Savings</span>
                             <div style={{ fontSize: '24px', fontWeight: 700, color: T.primary, lineHeight: 1 }}>
                               ${projectedSavingsYearly.toLocaleString()} <span style={{ fontSize: '14px', fontWeight: 400, color: T.textMuted }}>/yr</span>
                             </div>
                           </div>
                        </div>

                        {/* Consultation CTA for High Savings (Report View) */}
                        {report.totalSavingsMonthly > 500 && idx === 0 && (
                          <div style={{ padding: '14px', backgroundColor: T.primary, borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>Need help negotiating these savings?</div>
                            <Link href="https://credex.ai/consult" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#fff', color: T.primary, textAlign: 'center', padding: '8px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}>
                              Book Expert Consultation
                            </Link>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}

                {/* ── Missing Full-Width AI Insight Section ── */}
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
        <Link href="/" className="cta-link" style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: T.primary, color: T.surface, padding: '16px 24px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Generate Your Own Audit</span>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
        </Link>
      </div>

      <Footer />

    </div>
  );
}