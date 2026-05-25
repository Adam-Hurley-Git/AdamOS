export default function ContextPage() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Active Context Gate</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage semantic context walls and isolated environments for your agents.</p>
        </div>
        <button className="btn" style={{ background: '#0f172a', color: '#fff' }}>+ New Context</button>
      </div>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)', overflow: 'hidden', padding: 0 }}>
        
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', fontWeight: 600 }}>
          Current Environment Details
        </div>
        
        <div style={{ padding: '32px', flex: 1, overflowY: 'auto', background: 'var(--bg-primary)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ padding: '20px', border: '1px solid var(--border-color)', borderRadius: '12px', background: '#f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '15px' }}>Global Omniscient Mode</h3>
                <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>ACTIVE</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                This is the unbounded root context. Agents operating here have full read/write access to all project memories, global variables, and OS-level operations. 
              </p>
            </div>

            <div style={{ padding: '20px', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, color: '#64748b', fontSize: '15px' }}>Marketing Site Project</h3>
                <span style={{ background: '#f1f5f9', color: '#64748b', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>SLEEPING</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                Isolated container. Agents spawned in this context cannot access global state or cross-project Graphiti memory nodes. 
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
