"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Theme Colors derived from the design system
const T = {
    bg: '#f8fafc',
    surface: '#ffffff',
    primary: '#09090b',
    secondary: '#16a34a', // Trust Green
    secondaryLight: '#dcfce7', // Light green for badges/results
    secondaryDark: '#15803d',
    textMuted: '#52525b',
    border: '#e4e4e7',
    fontDisplay: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
};

export default function PricingPage() {
    // State for the Savings Calculator
    const [monthlySpend, setMonthlySpend] = useState<number>(10000);
    const inefficiencyRate = 0.18; // Industry Avg: 18%
    const estimatedCredits = monthlySpend * inefficiencyRate;

    // Handle number input with formatting
    const handleSpendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        setMonthlySpend(Number(rawValue));
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: T.bg, fontFamily: T.fontBody, color: T.primary, display: 'flex', flexDirection: 'column' }}>

            {/* Robust Global CSS for layout grids and responsiveness */}
            <style>{`
        .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        /* ── Navbar Specific CSS ── */
        .brand-link { transition: opacity 0.2s ease; }
        .brand-link:hover { opacity: 0.8; }
        
        .center-nav-link {
          position: relative;
          font-size: 14px; font-weight: 600; color: ${T.textMuted}; text-decoration: none; 
          padding: 7px 14px; border-radius: 6px; transition: color 0.15s, background-color 0.15s; 
          font-family: ${T.fontBody}; white-space: nowrap;
          background: transparent; border: none; cursor: pointer;
        }
        .center-nav-link:hover { color: ${T.primary}; background-color: #f3f4f6; }
        
        .center-nav-link::after {
          content: ''; position: absolute; bottom: 4px; left: 14px; right: 14px; height: 2px;
          background-color: ${T.primary}; border-radius: 2px;
          transform: scaleX(0); transform-origin: left; transition: transform 0.25s ease-out;
        }
        .center-nav-link:hover::after, .center-nav-link.active::after { transform: scaleX(1); }
        .center-nav-link.active { color: ${T.primary}; font-weight: 700; }
        
        .login-btn {
          font-size: 14px; font-weight: 600; color: #374151; text-decoration: none; 
          padding: 7px 16px; border: none; background-color: transparent; transition: all 0.15s;
        }
        .login-btn:hover { color: ${T.primary}; }
        
        .start-audit-btn {
          font-size: 14px; font-weight: 700; color: #fff; background-color: ${T.primary}; 
          padding: 10px 20px; border-radius: 8px; text-decoration: none; display: inline-flex; 
          align-items: center; gap: 6px; box-shadow: 0 1px 4px rgba(0,0,0,0.18); 
          transition: transform 0.15s, box-shadow 0.15s; white-space: nowrap;
        }
        .start-audit-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.22); }

        /* ── Pricing Grid ── */
        .pricing-grid { display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 48px; align-items: stretch; }
        @media (min-width: 1024px) { .pricing-grid { grid-template-columns: repeat(3, 1fr); align-items: center; } }

        .pricing-card {
          background-color: ${T.surface}; border: 1px solid ${T.border}; border-radius: 12px;
          padding: 32px; display: flex; flex-direction: column; position: relative;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .pricing-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.06); }
        
        .pricing-card.popular {
          border: 2px solid ${T.primary}; box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          transform: scale(1.02); z-index: 10;
        }
        .pricing-card.popular:hover { transform: scale(1.02) translateY(-4px); }
        @media (max-width: 1023px) { .pricing-card.popular { transform: none; } .pricing-card.popular:hover { transform: translateY(-4px); } }

        /* ── Credits Section Grid ── */
        .credits-section {
          margin-top: 80px; padding: 48px; border-radius: 20px;
          background: linear-gradient(135deg, #f0f4f8 0%, #e6f2eb 100%);
          border: 1px solid ${T.border};
        }
        .credits-grid { display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center; }
        @media (min-width: 900px) { .credits-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .credits-section { padding: 24px; } }

        /* Responsive */
        @media (max-width: 900px) { .center-nav { display: none !important; } }
        @media (max-width: 600px) { .nav-padding-mobile { padding: 0 16px !important; } .hide-mobile { display: none !important; } }
      `}</style>

            {/* ── Top Navigation ── */}
            <Navbar />

            {/* ── Main Content Canvas ── */}
            <main style={{ flex: 1, paddingTop: '140px', paddingBottom: '80px' }}>
                <div className="container">

                    {/* Hero Section */}
                    <header style={{ textAlign: 'center', marginBottom: '24px', maxWidth: '700px', margin: '0 auto' }}>
                        <h1 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 800, color: T.primary, margin: '0 0 16px 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                            Flexible plans for every stage of growth.
                        </h1>
                        <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: T.textMuted, lineHeight: 1.6, margin: 0 }}>
                            Scale your AI investments with confidence. Our transparent pricing ensures you only pay for the intelligence you need.
                        </p>
                    </header>

                    {/* Pricing Grid */}
                    <section className="pricing-grid">

                        {/* Starter Plan */}
                        <div className="pricing-card">
                            <h3 style={{ fontFamily: T.fontDisplay, fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0', color: T.primary }}>Starter</h3>
                            <p style={{ fontSize: '14px', color: T.textMuted, margin: '0 0 32px 0', lineHeight: 1.5, minHeight: '42px' }}>
                                For individuals and early-stage startups.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '32px' }}>
                                <span style={{ fontSize: '48px', fontWeight: 800, fontFamily: T.fontDisplay, color: T.primary, lineHeight: 1 }}>$0</span>
                                <span style={{ fontSize: '15px', fontWeight: 500, color: T.textMuted }}>/mo</span>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 48px 0', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                                {['1 audit/mo', 'Basic AI insights', 'Community support'].map((feat, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: T.primary, fontWeight: 500 }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: T.secondary }}>check_circle</span>
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                            <button style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${T.border}`, backgroundColor: 'transparent', color: T.primary, fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#f3f4f6'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                                Get Started
                            </button>
                        </div>

                        {/* Growth Plan (Most Popular) */}
                        <div className="pricing-card popular">
                            <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: T.secondaryDark, color: T.surface, padding: '4px 16px', borderRadius: '999px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                Most Popular
                            </div>
                            <h3 style={{ fontFamily: T.fontDisplay, fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0', color: T.primary }}>Growth</h3>
                            <p style={{ fontSize: '14px', color: T.textMuted, margin: '0 0 32px 0', lineHeight: 1.5, minHeight: '42px' }}>
                                For scaling teams optimizing AI spend.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '32px' }}>
                                <span style={{ fontSize: '48px', fontWeight: 800, fontFamily: T.fontDisplay, color: T.primary, lineHeight: 1 }}>$49</span>
                                <span style={{ fontSize: '15px', fontWeight: 500, color: T.textMuted }}>/mo</span>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 48px 0', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                                {['Unlimited audits', 'Advanced logic reports'].map((feat, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: T.primary, fontWeight: 500 }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: T.secondary }}>check_circle</span>
                                        {feat}
                                    </li>
                                ))}
                                {/* Highlighted Credit Feature */}
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: T.primary, fontWeight: 500 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: T.secondary }}>check_circle</span>
                                    <span style={{ backgroundColor: T.secondaryLight, padding: '2px 8px', borderRadius: '4px' }}>Credex Credit (10% back)</span>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: T.primary, fontWeight: 500 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: T.secondary }}>check_circle</span>
                                    Priority email support
                                </li>
                            </ul>
                            <button style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: T.primary, color: T.surface, fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = '0.9'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
                                Start Free Trial
                            </button>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="pricing-card">
                            <h3 style={{ fontFamily: T.fontDisplay, fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0', color: T.primary }}>Enterprise</h3>
                            <p style={{ fontSize: '14px', color: T.textMuted, margin: '0 0 32px 0', lineHeight: 1.5, minHeight: '42px' }}>
                                For large organizations requiring bespoke integration.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '32px' }}>
                                <span style={{ fontSize: '48px', fontWeight: 800, fontFamily: T.fontDisplay, color: T.primary, lineHeight: 1 }}>Custom</span>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 48px 0', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                                {['White-label reports', 'Dedicated account manager', 'Full API access'].map((feat, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: T.primary, fontWeight: 500 }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: T.secondary }}>check_circle</span>
                                        {feat}
                                    </li>
                                ))}
                                {/* Highlighted Credit Feature */}
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: T.primary, fontWeight: 500 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: T.secondary }}>check_circle</span>
                                    <span style={{ backgroundColor: T.secondaryLight, padding: '2px 8px', borderRadius: '4px' }}>Max Credex Credit (25% back)</span>
                                </li>
                            </ul>
                            <button style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${T.border}`, backgroundColor: 'transparent', color: T.primary, fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#f3f4f6'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                                Contact Sales
                            </button>
                        </div>

                    </section>

                    {/* ── Credex Credits Section ── */}
                    <section className="credits-section">
                        <div className="credits-grid">

                            {/* Left Content */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '32px', color: T.secondaryDark }}>all_inclusive</span>
                                    <h2 style={{ fontFamily: T.fontDisplay, fontSize: '32px', fontWeight: 700, color: T.primary, margin: 0 }}>Credex Credits</h2>
                                </div>
                                <p style={{ fontSize: '16px', color: T.textMuted, lineHeight: 1.6, marginBottom: '32px' }}>
                                    Turn AI optimization into tangible savings. Earn credits by successfully implementing our AI audit recommendations, directly reducing your operational costs.
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    {/* Item 1 */}
                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '48px', height: '48px', backgroundColor: T.surface, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                            <span className="material-symbols-outlined" style={{ color: T.primary }}>bar_chart</span>
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '14px', fontWeight: 700, color: T.primary, margin: '0 0 4px 0' }}>Analyze & Identify</h4>
                                            <p style={{ fontSize: '14px', color: T.textMuted, margin: 0, lineHeight: 1.5 }}>Run audits to uncover inefficiencies in your AI toolstack.</p>
                                        </div>
                                    </div>
                                    {/* Item 2 */}
                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '48px', height: '48px', backgroundColor: T.surface, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                            <span className="material-symbols-outlined" style={{ color: T.secondaryDark }}>trending_down</span>
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '14px', fontWeight: 700, color: T.primary, margin: '0 0 4px 0' }}>Optimize & Earn</h4>
                                            <p style={{ fontSize: '14px', color: T.textMuted, margin: 0, lineHeight: 1.5 }}>Apply recommendations to earn up to 25% back in credits.</p>
                                        </div>
                                    </div>
                                    {/* Item 3 */}
                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '48px', height: '48px', backgroundColor: T.surface, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                            <span className="material-symbols-outlined" style={{ color: T.primary }}>payments</span>
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '14px', fontWeight: 700, color: T.primary, margin: '0 0 4px 0' }}>Redeem</h4>
                                            <p style={{ fontSize: '14px', color: T.textMuted, margin: 0, lineHeight: 1.5 }}>Use accumulated credits to subsidize future AI subscriptions.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Calculator Card */}
                            <div style={{ backgroundColor: T.surface, borderRadius: '16px', padding: '32px', boxShadow: '0 12px 32px rgba(0,0,0,0.08)', border: `1px solid ${T.border}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${T.border}`, paddingBottom: '16px', marginBottom: '24px' }}>
                                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: T.primary, margin: 0 }}>Potential Savings Calculator</h4>
                                    <span className="material-symbols-outlined" style={{ color: T.textMuted, fontSize: '20px' }}>calculate</span>
                                </div>

                                <div style={{ marginBottom: '32px' }}>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: T.primary, marginBottom: '8px' }}>
                                        Monthly AI Spend
                                    </label>
                                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                        <span style={{ position: 'absolute', left: '16px', fontSize: '16px', color: T.textMuted, fontWeight: 500 }}>$</span>
                                        <input
                                            type="text"
                                            value={monthlySpend === 0 ? '' : monthlySpend.toLocaleString()}
                                            onChange={handleSpendChange}
                                            style={{ width: '100%', padding: '14px 16px 14px 36px', borderRadius: '8px', border: `1px solid ${T.border}`, fontSize: '16px', color: T.primary, fontWeight: 500, outline: 'none', backgroundColor: T.bg }}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '32px' }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: T.textMuted, marginBottom: '12px' }}>
                                        Estimated Inefficiency (Industry Avg: 18%)
                                    </label>
                                    <div style={{ width: '100%', height: '8px', backgroundColor: T.bg, borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: '18%', height: '100%', backgroundColor: '#dc2626', borderRadius: '4px' }}></div>
                                    </div>
                                </div>

                                <div style={{ backgroundColor: '#e6f2eb', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #bbf7d0' }}>
                                    <div>
                                        <div style={{ fontSize: '12px', fontWeight: 700, color: T.secondaryDark, marginBottom: '4px' }}>Estimated Credex Credits</div>
                                        <div style={{ fontSize: '32px', fontWeight: 800, color: T.primary, fontFamily: T.fontDisplay, lineHeight: 1 }}>
                                            ${Math.round(estimatedCredits).toLocaleString()}<span style={{ fontSize: '16px', fontWeight: 500, color: T.textMuted }}>/mo</span>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined" style={{ fontSize: '32px', color: T.secondaryDark }}>account_balance_wallet</span>
                                </div>
                            </div>

                        </div>
                    </section>

                </div>
            </main>


            <Footer />

        </div>
    );
}