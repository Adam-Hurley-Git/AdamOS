export default function Home() {
  return (
    <div>
      <h1>Visual Harness Overview</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Welcome to the AdamOS dashboard. Every part of this framework is managed by self-checking and repairing agents.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        {/* Placeholder for System Health */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3>System Health</h3>
            <span style={{ background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>100% Stable</span>
          </div>
          <p style={{ fontSize: '14px' }}>All agents operating normally.</p>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '16px' }}>
            Last 2-5 AM Cron: <span style={{ color: 'var(--text-primary)' }}>Success (4 checks passed)</span>
          </div>
        </div>

        {/* Placeholder for Task Management */}
        <div className="card">
          <h3>Active Context (Multica)</h3>
          <p style={{ fontSize: '14px' }}>[PLACEHOLDER: Task Manager Component]</p>
          <ul style={{ fontSize: '14px', marginTop: '12px', paddingLeft: '20px', color: 'var(--text-secondary)' }}>
            <li>Build modular dashboard UI</li>
            <li>Setup Next.js environment</li>
          </ul>
        </div>

      </div>

      <h2>Modular Artifact Generator</h2>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
        This space will render live tools (calculators, converters) generated on the fly by the Capability Engine.
      </p>
      
      <div style={{ border: '1px dashed var(--border-color)', borderRadius: '8px', padding: '48px', textAlign: 'center', background: 'var(--bg-secondary)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>[PLACEHOLDER: Live Artifact Renderer]</p>
        <button className="btn" style={{ marginTop: '16px' }}>+ Request New Tool</button>
      </div>

    </div>
  );
}
