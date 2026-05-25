export default function OmniSearchPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', paddingTop: '10vh' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Global Search (Recall)</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Search your entire digital history using natural language. This queries FalkorDB, past conversations, local files, and screen memory.
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: '800px' }}>
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          <input 
            type="text" 
            placeholder="e.g., 'Find that chart about user growth I saw last week...'" 
            style={{ width: '100%', padding: '24px 32px', fontSize: '18px', borderRadius: '16px', border: '2px solid var(--border-color)', outline: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
          />
          <button style={{ position: 'absolute', right: '16px', top: '16px', padding: '8px 16px', background: '#0f172a', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Search</button>
        </div>

        <div>
          <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Suggested Retrievals</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="card" style={{ padding: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '24px' }}>💬</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>Conversation with Amy (3 days ago)</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Discussed moving from Tailwind to Vanilla CSS for the Notion aesthetic.</div>
              </div>
            </div>

            <div className="card" style={{ padding: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '24px' }}>📄</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>adamos_NODE_V6_CAPABILITY_ENGINE.md</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Local file matches &quot;Capability Engine&quot; and &quot;Skill Registry&quot;.</div>
              </div>
            </div>

            <div className="card" style={{ padding: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px', opacity: 0.7 }}>
              <div style={{ fontSize: '24px' }}>🖥️</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>Screen Memory Snapshot (Yesterday, 4:15 PM)</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>You were looking at the Firecrawl documentation API reference.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
