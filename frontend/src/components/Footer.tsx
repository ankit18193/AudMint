"use client";

import Link from "next/link";

// Local theme object to keep the Footer self-contained
const T = {
    primary: '#09090b',
    surface: '#ffffff',
    surfaceAlt: '#f3f4f6',
    border: '#e4e4e7',
    textMuted: '#52525b',
    faint: '#9ca3af',
    greenDeep: '#15803d',
    fontDisplay: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
};

export default function Footer() {
    return (
        <>
            <style>{`
        /* ── Footer Specific CSS ── */
        .footer-grid { 
          display: grid; 
          grid-template-columns: 2fr 1fr 1fr; 
          gap: 48px; 
          max-width: 1200px; 
          margin: 0 auto; 
          padding: 48px 24px 36px; 
          align-items: start; 
        }
        
        .brand-footer { transition: opacity 0.2s; }
        .brand-footer:hover { opacity: 0.8; }
        
        .footer-link {
          font-size: 13px; 
          font-weight: 500; 
          color: ${T.textMuted}; 
          text-decoration: none; 
          transition: color 0.15s; 
          font-family: ${T.fontBody};
        }
        .footer-link:hover { color: ${T.primary}; }
        
        .footer-cta {
          display: inline-flex; 
          align-items: center; 
          gap: 8px; 
          background-color: ${T.greenDeep}; 
          color: #ffffff; 
          font-size: 13px; 
          font-weight: 700; 
          padding: 10px 20px; 
          border-radius: 8px; 
          border: none; 
          cursor: pointer; 
          transition: transform 0.15s, box-shadow 0.15s; 
          box-shadow: 0 1px 4px rgba(0,0,0,0.15); 
          text-decoration: none;
        }
        .footer-cta:hover { 
          transform: translateY(-1px); 
          box-shadow: 0 4px 12px rgba(0,110,47,0.3); 
        }

        /* Mobile Adjustments */
        @media(max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
          .footer-col3 { align-items: flex-start !important; }
        }
      `}</style>

            <footer style={{ backgroundColor: T.surface, borderTop: `1px solid ${T.border}`, marginTop: 'auto', fontFamily: T.fontBody }}>

                {/* ── Main footer grid: 3 columns ── */}
                <div className="footer-grid">

                    {/* Col 1 — Brand + tagline */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <Link href="/" className="brand-footer" aria-label="AudMint Home" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', width: 'fit-content' }}>
                            <div style={{ width: '28px', height: '28px', backgroundColor: T.primary, borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '15px', color: '#fff', fontVariationSettings: "'FILL' 1" }}>psychology</span>
                            </div>
                            <span style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: '16px', letterSpacing: '-0.025em', color: T.primary }}>AudMint</span>
                            <span style={{ fontSize: '10px', fontWeight: 500, color: T.faint, marginTop: '2px' }}>by Credex</span>
                        </Link>

                        <p style={{ fontSize: '13px', color: T.textMuted, lineHeight: 1.65, maxWidth: '280px', margin: 0 }}>
                            AI-powered spend auditing for engineering teams. Identify waste, cut redundancy, and save thousands — in 60 seconds.
                        </p>

                        <div style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                            {[
                                { icon: 'lock', label: 'SOC 2 compliant' },
                                { icon: 'verified_user', label: 'GDPR ready' },
                            ].map(({ icon, label }) => (
                                <div key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 600, color: T.faint, backgroundColor: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: '6px', padding: '4px 10px' }}>
                                    <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '13px', fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Col 2 — Navigation links */}
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.faint, marginBottom: '16px' }}>Product</div>
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li><Link href="/#how-it-works" className="footer-link">How it works</Link></li>
                            <li><Link href="/pricing" className="footer-link">Pricing</Link></li>
                            <li><Link href="/#sample" className="footer-link">Sample report</Link></li>
                            <li><Link href="/" className="footer-link">Start audit</Link></li>
                        </ul>
                    </div>

                    {/* Col 3 — Legal + CTA */}
                    <div className="footer-col3" style={{ display: 'flex', flexDirection: 'column', gap: '0', alignItems: 'flex-end' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.faint, marginBottom: '16px', alignSelf: 'flex-start' }}>Legal</div>
                        <ul style={{ listStyle: 'none', margin: '0 0 24px 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', alignSelf: 'flex-start' }}>
                            {['Privacy Policy', 'Terms of Service', 'AI Ethics', 'Contact Support'].map(link => (
                                <li key={link}>
                                    <Link href="#" className="footer-link">{link}</Link>
                                </li>
                            ))}
                        </ul>

                        {/* Footer CTA */}
                        <Link href="/" className="footer-cta">
                            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '15px', fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                            Start free audit
                        </Link>
                    </div>

                </div>

                {/* ── Bottom bar: divider + copyright ── */}
                <div style={{ borderTop: `1px solid ${T.border}` }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '12px', color: T.faint }}>© {new Date().getFullYear()} Credex AI, Inc. All rights reserved.</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
                            <span style={{ fontSize: '12px', color: T.faint, fontWeight: 500 }}>All systems operational</span>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    );
}