"use client";

import { useState } from 'react';

const SKILL_DATABASE = [
  { id: 1, name: 'CSV to JSON Converter', category: 'Data Converters', author: 'Hermes', status: 'Production', hash: 'a1b2c3d' },
  { id: 2, name: 'Markdown Formatter', category: 'Data Converters', author: 'Hermes', status: 'Production', hash: 'e5f6g7h' },
  { id: 3, name: 'Docker Log Pruner', category: 'OS Tools', author: 'Janitor', status: 'Production', hash: '8k9l0m1' },
  { id: 4, name: 'Stale Container Cleanup', category: 'OS Tools', author: 'Janitor', status: 'Production', hash: '2n3o4p5' },
  { id: 5, name: 'Notion Sync Engine', category: 'Integrations', author: 'Kai', status: 'Quarantine', hash: 'q6r7s8t' },
  { id: 6, name: 'Multica Task Extractor', category: 'Integrations', author: 'Kai', status: 'Production', hash: 'u9v0w1x' },
  { id: 7, name: 'PDF Text Extractor', category: 'Data Processors', author: 'Hermes', status: 'Production', hash: 'y2z3a4b' },
  { id: 8, name: 'Image Resizer (Sharp)', category: 'Media Processors', author: 'Hermes', status: 'Production', hash: 'c5d6e7f' },
];

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Data Converters', 'OS Tools', 'Integrations', 'Data Processors', 'Media Processors'];

  const filteredSkills = SKILL_DATABASE.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1>Universal Skill Library</h1>
          <p style={{ color: '#64748b', maxWidth: '600px' }}>
            The master repository of all tools, calculators, and agent-generated scripts. 
            Ready for production mapping from `skill_registry.json`.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn" style={{ background: '#0f172a', color: 'white' }}>+ Register New Skill</button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="card" style={{ padding: '16px', marginBottom: '32px', display: 'flex', gap: '24px', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Search for a skill by name or hash..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
        />
        
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
                background: activeCategory === cat ? '#6366f1' : '#f1f5f9',
                color: activeCategory === cat ? 'white' : '#475569',
                border: 'none', transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredSkills.length > 0 ? filteredSkills.map(skill => (
          <div key={skill.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 600, color: '#6366f1', letterSpacing: '0.5px' }}>
                {skill.category}
              </span>
              <span style={{ 
                fontSize: '11px', padding: '2px 8px', borderRadius: '12px', fontWeight: 600,
                background: skill.status === 'Production' ? '#dcfce7' : '#fef3c7',
                color: skill.status === 'Production' ? '#166534' : '#92400e'
              }}>
                {skill.status}
              </span>
            </div>
            
            <h3 style={{ fontSize: '16px', margin: '0 0 4px 0', color: '#0f172a' }}>{skill.name}</h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0', fontFamily: 'monospace' }}>Hash: {skill.hash}</p>
            
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Author: <strong>{skill.author}</strong>
              </div>
              <button className="btn" style={{ fontSize: '12px', padding: '4px 12px' }}>Run Context</button>
            </div>
          </div>
        )) : (
          <div style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', color: '#64748b' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🔍</div>
            <p>No skills found matching your current filters.</p>
          </div>
        )}
      </div>

    </div>
  );
}
