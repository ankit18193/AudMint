'use client';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div style={{ backgroundColor: '#f7f9fb', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <main style={{ width: '100%', maxWidth: '900px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)', display: 'flex', overflow: 'hidden', border: '1px solid #e0e3e5', minHeight: '600px' }}>

        {/* ── Left: Form Column ── */}
        <div style={{ flex: '0 0 50%', padding: '48px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#0a0a0a', fontVariationSettings: "'FILL' 1" }}>dataset</span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '22px', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em' }}>Credex</span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '28px', fontWeight: 700, color: '#191c1e', marginBottom: '6px', letterSpacing: '-0.02em' }}>
              Log in to your account
            </h1>
            <p style={{ fontSize: '15px', color: '#45464d', lineHeight: 1.5 }}>
              Welcome back! Please enter your details to access your dashboard.
            </p>
          </div>

          {/* Form */}
          <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label htmlFor="email" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', color: '#191c1e' }}>
                Email Address
              </label>
              <input id="email" type="email" placeholder="name@company.com"
                style={{ width: '100%', padding: '12px 14px', border: '1px solid #c6c6cd', borderRadius: '8px', fontSize: '15px', color: '#191c1e', backgroundColor: '#ffffff', outline: 'none', transition: 'border-color 0.15s' }}
                onFocus={e => e.currentTarget.style.borderColor = '#0a0a0a'}
                onBlur={e => e.currentTarget.style.borderColor = '#c6c6cd'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label htmlFor="password" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', color: '#191c1e' }}>
                  Password
                </label>
                <a href="#" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', color: '#0a0a0a', textDecoration: 'none' }}>
                  Forgot password?
                </a>
              </div>
              <input id="password" type="password" placeholder="••••••••"
                style={{ width: '100%', padding: '12px 14px', border: '1px solid #c6c6cd', borderRadius: '8px', fontSize: '15px', color: '#191c1e', backgroundColor: '#ffffff', outline: 'none', transition: 'border-color 0.15s' }}
                onFocus={e => e.currentTarget.style.borderColor = '#0a0a0a'}
                onBlur={e => e.currentTarget.style.borderColor = '#c6c6cd'}
              />
            </div>

            <button type="submit" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#0a0a0a', color: '#ffffff', fontWeight: 600, fontSize: '14px', letterSpacing: '0.04em', padding: '14px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '4px' }}>
              Sign In
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e3e5' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: '#45464d', textTransform: 'uppercase' }}>OR CONTINUE WITH</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e3e5' }} />
          </div>

          {/* OAuth Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', border: '1px solid #c6c6cd', borderRadius: '8px', backgroundColor: 'transparent', fontSize: '13px', fontWeight: 600, color: '#191c1e', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button type="button" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', border: '1px solid #c6c6cd', borderRadius: '8px', backgroundColor: 'transparent', fontSize: '13px', fontWeight: 600, color: '#191c1e', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" fillRule="evenodd"/>
              </svg>
              GitHub
            </button>
          </div>

          <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: '#45464d' }}>
            Don't have an account?{' '}
            <Link href="/signup" style={{ fontWeight: 700, color: '#0a0a0a', textDecoration: 'none' }}>Request access</Link>
          </p>
        </div>

        {/* ── Right: Dark Panel ── */}
        <div style={{ flex: '0 0 50%', backgroundColor: '#131b2e', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '40px', overflow: 'hidden' }}>
          {/* Background overlay image */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, mixBlendMode: 'overlay' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #131b2e 60%, transparent)' }} />

          {/* System status badge */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '999px', padding: '6px 14px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6bff8f' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', color: '#7c839b' }}>System Operational</span>
            </div>
          </div>

          {/* Testimonial */}
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '340px' }}>
            <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
              {[1,2,3,4,5].map(i => (
                <span key={i} className="material-symbols-outlined" style={{ fontSize: '20px', color: '#006e2f', fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <blockquote style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '22px', fontWeight: 600, color: '#7c839b', lineHeight: 1.4, marginBottom: '24px' }}>
              "Join 500+ startups optimizing their AI stack. The predictive models provided by Credex have completely transformed our operational efficiency."
            </blockquote>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#7c839b', letterSpacing: '0.04em' }}>Sarah Jenkins</p>
              <p style={{ fontSize: '13px', color: '#7c839b', opacity: 0.7, marginTop: '2px' }}>Chief Financial Officer, TechNova</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
