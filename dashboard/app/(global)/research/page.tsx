export default function DeepResearchPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1>Deep Research Agent</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Comprehensive autonomous web scraping and analysis (powered by Firecrawl & Serper).</p>
        </div>
        <button className="btn" style={{ background: '#0f172a', color: '#fff' }}>+ New Research Task</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', flex: 1, minHeight: 0 }}>
        
        {/* Active Research Tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Active & Completed Reports</h2>
          
          {/* Active Task */}
          <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '16px', margin: 0 }}>State of Local LLMs on Apple Silicon</h3>
              <span style={{ fontSize: '12px', background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>In Progress (45%)</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Searching GitHub repos, Reddit discussions, and technical blogs.</p>
            
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '12px', fontFamily: 'monospace' }}>
              &gt; Firecrawl: Scraping https://github.com/ggerganov/llama.cpp...<br/>
              &gt; Extracting M4 Max benchmarks...<br/>
              &gt; Summarizing 42 Reddit threads in r/LocalLLaMA...
            </div>
          </div>

          {/* Completed Task */}
          <div className="card" style={{ borderLeft: '4px solid #22c55e', opacity: 0.8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '16px', margin: 0 }}>Competitor Analysis: AI Operating Systems</h3>
              <span style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>Completed</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Generated a 12-page markdown report with feature matrices.</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn" style={{ fontSize: '12px' }}>View Report</button>
              <button className="btn" style={{ fontSize: '12px' }}>Save to Wiki</button>
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '24px' }}>Configure Deep Run</h2>
          
          <label style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Research Query</label>
          <textarea 
            placeholder="Describe exactly what you want to research..." 
            style={{ width: '100%', height: '100px', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '24px', resize: 'none', outline: 'none' }}
          ></textarea>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Crawl Depth</label>
              <select style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <option>Shallow (Top 10 results)</option>
                <option>Deep (Crawl linked pages)</option>
                <option>Exhaustive (Firecrawl full domain)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Output Format</label>
              <select style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <option>Executive Summary</option>
                <option>Detailed Markdown Report</option>
                <option>JSON Data Extraction</option>
              </select>
            </div>
          </div>

          <button className="btn" style={{ background: '#0f172a', color: 'white', marginTop: 'auto', padding: '12px' }}>Launch Autonomous Researcher</button>
        </div>
        
      </div>
    </div>
  );
}
