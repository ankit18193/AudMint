'use client';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div style={{ backgroundColor: '#f7f9fb', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <main style={{ width: '100%', maxWidth: '960px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 12px -2px rgba(15,23,42,0.05), 0 2px 4px -2px rgba(15,23,42,0.10)', display: 'flex', overflow: 'hidden', minHeight: '700px' }}>

        {/* ── Left: Dark Brand Column ── */}
        <div style={{ flex: '0 0 42%', backgroundColor: '#131b2e', position: 'relative', display: 'flex', flexDirection: 'column', padding: '40px', overflow: 'hidden' }}>
          {/* Decorative radial glow */}
          <div style={{ position: 'absolute', top: '-10%', right: '-20%', width: '150%', height: '150%', background: 'radial-gradient(circle, rgba(63,70,92,0.3) 0%, transparent 60%)', pointerEvents: 'none' }} />

          {/* Logo */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '48px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#ffffff', fontVariationSettings: "'FILL' 1" }}>dataset</span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '22px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>Credex</span>
          </div>

          {/* Tagline */}
          <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '36px', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '20px' }}>
              Algorithmic Trust.<br />Tangible Savings.
            </h1>
            <p style={{ fontSize: '16px', color: '#bec6e0', lineHeight: 1.65, maxWidth: '300px', marginBottom: '32px' }}>
              Join the premier platform for AI-driven fiscal intelligence. Optimize your corporate spending with military-grade precision.
            </p>

            {/* Feature checklist */}
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none', marginBottom: '40px' }}>
              {['Stop overpaying for AI', 'Detailed savings reports', 'Credex Credit eligibility'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#6bff8f', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span style={{ fontSize: '15px', color: '#ffffff', fontWeight: 500 }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* Abstract image */}
            <div style={{
              borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(63,70,92,0.5)', height: '160px',
              backgroundImage: "url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80')",
              backgroundSize: 'cover', backgroundPosition: 'center'
            }} />
          </div>
        </div>

        {/* ── Right: Form Column ── */}
        <div style={{ flex: 1, padding: '56px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
          <div style={{ width: '100%', maxWidth: '380px' }}>
            {/* Heading */}
            <div style={{ marginBottom: '32px', textAlign: 'left' }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '28px', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                Create Account
              </h2>
              <p style={{ fontSize: '14px', color: '#45464d', lineHeight: 1.5 }}>
                Start optimizing your fiscal intelligence today.
              </p>
            </div>

            {/* Google sign-up */}
            <button type="button" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px 16px', border: '1px solid #c6c6cd', borderRadius: '8px', backgroundColor: 'transparent', fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', color: '#0a0a0a', cursor: 'pointer', marginBottom: '20px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#c6c6cd' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#45464d', textTransform: 'uppercase' }}>Or</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#c6c6cd' }} />
            </div>

            {/* Form */}
            <form style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { id: 'name',     label: 'Name',        type: 'text',     placeholder: 'Jane Doe' },
                { id: 'email',    label: 'Work Email',  type: 'email',    placeholder: 'jane@company.com' },
                { id: 'password', label: 'Password',    type: 'password', placeholder: '••••••••' },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} style={{ display: 'block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', color: '#0a0a0a', marginBottom: '5px' }}>
                    {label}
                  </label>
                  <input id={id} type={type} placeholder={placeholder}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #c6c6cd', borderRadius: '8px', fontSize: '15px', color: '#0a0a0a', backgroundColor: '#ffffff', outline: 'none' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#0a0a0a'}
                    onBlur={e => e.currentTarget.style.borderColor = '#c6c6cd'}
                  />
                </div>
              ))}

              <button type="button" style={{ width: '100%', backgroundColor: '#0a0a0a', color: '#ffffff', fontWeight: 700, fontSize: '14px', letterSpacing: '0.04em', padding: '14px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '6px' }}>
                Create Account
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#45464d' }}>
              Already have an account?{' '}
              <Link href="/login" style={{ fontWeight: 700, color: '#0a0a0a', textDecoration: 'none' }}>Log in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
