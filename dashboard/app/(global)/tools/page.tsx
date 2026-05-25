"use client";

import React, { useState } from 'react';
import { Image as ImageIcon, PenTool, Box, Triangle, Droplet, BrainCircuit, Database, Scissors, Search } from 'lucide-react';

type Tool = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  url: string;
  type: 'web' | 'local' | 'script';
  isPinned: boolean;
};

const MOCK_TOOLS: Tool[] = [
  { id: 't1', name: 'Adobe BG Remover', description: 'Instantly strip backgrounds from product photos.', category: 'Design & Media', icon: <ImageIcon size={24} strokeWidth={1.5} />, url: '#', type: 'web', isPinned: true },
  { id: 't2', name: 'Figma', description: 'Collaborative interface design tool.', category: 'Design & Media', icon: <PenTool size={24} strokeWidth={1.5} />, url: '#', type: 'web', isPinned: true },
  { id: 't3', name: 'Spline 3D', description: 'Web-based 3D design tool for interactive web elements.', category: 'Design & Media', icon: <Box size={24} strokeWidth={1.5} />, url: '#', type: 'web', isPinned: false },
  { id: 't4', name: 'Vercel', description: 'Deploy Next.js apps and monitor production branches.', category: 'Development', icon: <Triangle size={24} strokeWidth={1.5} />, url: '#', type: 'web', isPinned: true },
  { id: 't5', name: 'Tailwind Palette Gen', description: 'Generate cohesive HSL color tokens for web projects.', category: 'Development', icon: <Droplet size={24} strokeWidth={1.5} />, url: '#', type: 'web', isPinned: false },
  { id: 't6', name: 'Claude Sonnet', description: 'Quick access to Claude for manual copy generation.', category: 'AI Assistants', icon: <BrainCircuit size={24} strokeWidth={1.5} />, url: '#', type: 'web', isPinned: false },
  { id: 't7', name: 'Local DB Viewer', description: 'View and edit local SQLite databases instantly.', category: 'Development', icon: <Database size={24} strokeWidth={1.5} />, url: '#', type: 'local', isPinned: true },
  { id: 't8', name: 'SVG Optimizer', description: 'Minify SVGs before pushing to production repos.', category: 'Design & Media', icon: <Scissors size={24} strokeWidth={1.5} />, url: '#', type: 'script', isPinned: false },
];

const CATEGORIES = ['All Tools', 'Design & Media', 'Development', 'AI Assistants'];

export default function HumanToolsPage() {
  const [activeCategory, setActiveCategory] = useState('All Tools');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = MOCK_TOOLS.filter(tool => {
    const matchesCategory = activeCategory === 'All Tools' || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const pinnedTools = filteredTools.filter(t => t.isPinned);
  const unpinnedTools = filteredTools.filter(t => !t.isPinned);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>My Tools</h1>
        <p style={{ color: '#64748b', margin: 0, fontSize: '15px' }}>Your personal directory of web apps, local scripts, and SaaS platforms. One click away.</p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeCategory === cat ? '#0f172a' : '#f1f5f9',
                color: activeCategory === cat ? '#ffffff' : '#64748b',
                border: 'none',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input 
            type="text" 
            placeholder="Search tools..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px', width: '240px' }}
          />
          <button style={{ padding: '10px 20px', borderRadius: '8px', background: '#6366f1', color: 'white', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>+</span> Add Tool
          </button>
        </div>
      </div>

      {/* Pinned Tools Grid */}
      {pinnedTools.length > 0 && (
        <div>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>Pinned Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {pinnedTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
          </div>
        </div>
      )}

      {/* All Tools Grid */}
      {unpinnedTools.length > 0 && (
        <div>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px', marginTop: pinnedTools.length > 0 ? '16px' : '0' }}>All Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {unpinnedTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
          </div>
        </div>
      )}

      {filteredTools.length === 0 && (
        <div style={{ textAlign: 'center', padding: '64px 0', color: '#94a3b8' }}>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center', opacity: 0.5 }}><Search size={48} strokeWidth={1} /></div>
          <p style={{ fontSize: '15px' }}>No tools found matching your search.</p>
        </div>
      )}
    </div>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.06)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)'; }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: '1px solid #e2e8f0' }}>
          {tool.icon}
        </div>
        <div style={{ padding: '4px 8px', borderRadius: '4px', background: tool.type === 'web' ? '#eff6ff' : tool.type === 'local' ? '#ecfdf5' : '#fef2f2', color: tool.type === 'web' ? '#2563eb' : tool.type === 'local' ? '#059669' : '#dc2626', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
          {tool.type}
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{tool.name}</h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>{tool.description}</p>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>{tool.category}</span>
        <button style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Launch <span style={{ fontSize: '14px' }}>↗</span>
        </button>
      </div>
    </div>
  );
}
