"use client";

import React from 'react';
import { Network, Search, Filter, MoreHorizontal, Maximize2 } from 'lucide-react';

export default function MemoryPage() {
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden text-[#37352f]">
      
      {/* Header */}
      <div className="px-12 py-8 flex-shrink-0 border-b border-[#f1f1f1] flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
            Memory Graph
          </h1>
          <p className="text-[#9b9a97] text-sm">Temporal connections and context boundaries.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9b9a97]" size={14} />
            <input type="text" placeholder="Search nodes..." className="w-64 pl-8 pr-3 py-1.5 bg-[#fcfcfc] border border-[#e2e2e2] rounded text-sm outline-none focus:border-[#d4d4d4] transition" />
          </div>
          <button className="px-3 py-1.5 border border-[#e2e2e2] rounded text-[#787774] hover:bg-[#f1f1f1] transition text-sm font-medium flex items-center gap-2">
            <Filter size={14} /> Filter
          </button>
        </div>
      </div>

      <div className="flex-1 flex bg-[#fcfcfc] relative">
        
        {/* Canvas Area */}
        <div className="flex-1 relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(#e2e2e2 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          
          <div className="absolute top-6 right-6 flex gap-2">
            <button className="p-2 bg-white border border-[#e2e2e2] shadow-sm rounded text-[#787774] hover:bg-[#f1f1f1] transition"><Maximize2 size={16} /></button>
            <button className="p-2 bg-white border border-[#e2e2e2] shadow-sm rounded text-[#787774] hover:bg-[#f1f1f1] transition"><MoreHorizontal size={16} /></button>
          </div>

          {/* SVG Canvas Mock */}
          <svg className="w-full h-full" viewBox="0 0 800 600">
            <line x1="400" y1="300" x2="250" y2="150" stroke="#e2e2e2" strokeWidth="1" />
            <line x1="400" y1="300" x2="550" y2="200" stroke="#e2e2e2" strokeWidth="1" />
            <line x1="400" y1="300" x2="300" y2="450" stroke="#e2e2e2" strokeWidth="1" />
            <line x1="400" y1="300" x2="600" y2="400" stroke="#e2e2e2" strokeWidth="1" />
            <line x1="250" y1="150" x2="150" y2="250" stroke="#e2e2e2" strokeWidth="1" strokeDasharray="4" />
            <line x1="550" y1="200" x2="650" y2="100" stroke="#e2e2e2" strokeWidth="1" strokeDasharray="4" />
            
            {/* Center Node */}
            <circle cx="400" cy="300" r="30" fill="#ffffff" stroke="#37352f" strokeWidth="1.5" />
            <text x="400" y="304" fill="#37352f" fontSize="12" textAnchor="middle" fontWeight="500">Root</text>

            {/* Connected Nodes */}
            <circle cx="250" cy="150" r="20" fill="#ffffff" stroke="#0f7b6c" strokeWidth="1.5" />
            <text x="250" y="185" fill="#787774" fontSize="11" textAnchor="middle">Project Alpha</text>
            
            <circle cx="550" cy="200" r="24" fill="#ffffff" stroke="#0b6e99" strokeWidth="1.5" />
            <text x="550" y="240" fill="#787774" fontSize="11" textAnchor="middle">Agent Hermes</text>

            <circle cx="300" cy="450" r="16" fill="#ffffff" stroke="#ff8b00" strokeWidth="1.5" />
            <text x="300" y="480" fill="#787774" fontSize="11" textAnchor="middle">API Keys</text>

            <circle cx="600" cy="400" r="18" fill="#ffffff" stroke="#0f7b6c" strokeWidth="1.5" />
            <text x="600" y="435" fill="#787774" fontSize="11" textAnchor="middle">Wiki Docs</text>

            {/* Leaf Nodes */}
            <circle cx="150" cy="250" r="10" fill="#ffffff" stroke="#e2e2e2" strokeWidth="1" />
            <circle cx="650" cy="100" r="12" fill="#ffffff" stroke="#e2e2e2" strokeWidth="1" />
          </svg>
          
          {/* Hover Card */}
          <div className="absolute bottom-8 left-8 bg-white border border-[#e2e2e2] text-[#37352f] text-sm p-4 rounded shadow-sm max-w-xs">
            <div className="font-semibold mb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#0b6e99]"></div> Agent Hermes</div>
            <div className="text-[#787774] text-xs mb-3">Type: LLM Runtime</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <span className="text-[#9b9a97]">Last Active</span> <span>2 mins ago</span>
              <span className="text-[#9b9a97]">Context Size</span> <span>128k</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-64 border-l border-[#f1f1f1] bg-white p-6 flex flex-col gap-6 overflow-y-auto flex-shrink-0">
          <div>
            <h3 className="text-xs font-semibold text-[#9b9a97] uppercase tracking-wider mb-4">View Context</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm text-[#37352f] cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-[#e2e2e2] text-[#37352f] focus:ring-0 w-4 h-4" /> All Projects
              </label>
              <label className="flex items-center gap-3 text-sm text-[#37352f] cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-[#e2e2e2] text-[#37352f] focus:ring-0 w-4 h-4" /> Global OS Settings
              </label>
              <label className="flex items-center gap-3 text-sm text-[#37352f] cursor-pointer">
                <input type="checkbox" className="rounded border-[#e2e2e2] text-[#37352f] focus:ring-0 w-4 h-4" /> Archival Data
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-[#f1f1f1]">
            <h3 className="text-xs font-semibold text-[#9b9a97] uppercase tracking-wider mb-4">Node Types</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-[#787774]"><span className="w-2.5 h-2.5 rounded-full bg-[#0b6e99]"></span> Personas</div>
              <div className="flex items-center gap-2 text-sm text-[#787774]"><span className="w-2.5 h-2.5 rounded-full bg-[#0f7b6c]"></span> Documents</div>
              <div className="flex items-center gap-2 text-sm text-[#787774]"><span className="w-2.5 h-2.5 rounded-full bg-[#ff8b00]"></span> Secrets</div>
              <div className="flex items-center gap-2 text-sm text-[#787774]"><span className="w-2.5 h-2.5 rounded-full bg-[#37352f]"></span> Tool Executions</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
