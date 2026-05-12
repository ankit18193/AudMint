"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Local theme object to keep the Navbar self-contained
const T = {
    primary: '#09090b',
    textMuted: '#52525b',
    border: '#e4e4e7',
    fontDisplay: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
};

export default function Navbar() {
    const pathname = usePathname();

    const isReportPage = pathname?.startsWith('/report/');
    const [reportLink, setReportLink] = useState('/audit');

    useEffect(() => {
        if (pathname?.startsWith('/report/')) {
            // If the user is currently viewing a report, save this exact URL to their browser memory
            localStorage.setItem('last_viewed_report', pathname);
            setReportLink(pathname);
        } else {
            // If the user is on Pricing or Home, check if they have a saved report in memory
            const savedReport = localStorage.getItem('last_viewed_report');
            if (savedReport) {
                setReportLink(savedReport); // Route them back to their saved report!
            } else {
                setReportLink('/audit'); // If they've never made a report, fallback to the audit page
            }
        }
    }, [pathname]);

    // Helper function to determine if a link is active
    const isActive = (path: string) => {
        // For exact matches or nested routes (like /report/123)
        if (path === '/reports' && pathname?.startsWith('/report')) return true;
        return pathname === path;
    };

    return (
        <>
            <style>{`
        /* ── Navbar Specific CSS ── */
        .brand-link { transition: opacity 0.2s ease; }
        .brand-link:hover { opacity: 0.8; }
        
        .center-nav-link {
          position: relative;
          font-size: 14px; font-weight: 500; color: ${T.textMuted}; text-decoration: none; 
          padding: 7px 14px; border-radius: 6px; transition: color 0.15s, background-color 0.15s; 
          font-family: ${T.fontBody}; white-space: nowrap;
          background: transparent; border: none; cursor: pointer;
        }
        
        .center-nav-link:hover { color: ${T.primary}; background-color: #f3f4f6; }
        
        /* Animated Underline */
        .center-nav-link::after {
          content: ''; position: absolute; bottom: 4px; left: 14px; right: 14px; height: 2px;
          background-color: ${T.primary}; border-radius: 2px;
          transform: scaleX(0); transform-origin: left; transition: transform 0.25s ease-out;
        }
        
        .center-nav-link:hover::after, .center-nav-link.active::after { transform: scaleX(1); }
        .center-nav-link.active { color: ${T.primary}; font-weight: 700; }
        
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

        /* Responsive Navbar Rules */
        @media (max-width: 900px) { .center-nav { display: none !important; } }
        @media (max-width: 600px) { 
          .nav-padding-mobile { padding: 0 16px !important; } 
          .hide-mobile { display: none !important; } 
        }
      `}</style>

            <nav style={{
                backgroundColor: 'rgba(255,255,255,0.92)',
                borderBottom: `1px solid ${T.border}`,
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 1px 12px rgba(0,0,0,0.02)',
            }}>
                <div className="nav-padding-mobile" style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', boxSizing: 'border-box' }}>

                    {/* ── LEFT: Brand ── */}
                    <Link href="/" className="brand-link" aria-label="AudMint Home" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, zIndex: 2, textDecoration: 'none' }}>
                        <div style={{ width: '32px', height: '32px', backgroundColor: T.primary, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>
                            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '18px', color: '#fff', fontVariationSettings: "'FILL' 1" }}>psychology</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <span style={{ fontFamily: T.fontDisplay, fontWeight: 800, fontSize: '17px', letterSpacing: '-0.03em', color: T.primary, lineHeight: 1 }}>AudMint</span>
                            <span style={{ fontSize: '10px', fontWeight: 500, color: '#9ca3af', letterSpacing: '0.01em' }}>by Credex</span>
                        </div>
                    </Link>

                    {/* ── CENTER: Nav Links — absolutely centered ── */}
                    <div
                        className="center-nav"
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px',
                            zIndex: 1,
                        }}
                    >
                        <Link
                            href="/#how-it-works"
                            className={`center-nav-link ${isActive('/#how-it-works') ? 'active' : ''}`}
                        >
                            How it works
                        </Link>

                        <Link
                            href="/pricing"
                            className={`center-nav-link ${isActive('/pricing') ? 'active' : ''}`}
                        >
                            Pricing
                        </Link>

                        <Link
                            href={reportLink}
                            className={`center-nav-link ${pathname?.startsWith('/report/') ? 'active' : ''}`}
                        >
                            Reports
                        </Link>
                    </div>

                    {/* ── RIGHT: Auth CTAs ── */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, zIndex: 2 }}>
                        <Link href="/login" className="login-btn hide-mobile">
                            Sign in
                        </Link>
                        <Link href="/audit" className="start-audit-btn">
                            Start Free Audit
                            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '16px' }}>arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}