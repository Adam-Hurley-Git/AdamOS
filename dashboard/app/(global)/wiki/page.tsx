"use client";

import React, { useState } from 'react';
import { FileText, MoreHorizontal, MessageSquare, Clock, ChevronRight } from 'lucide-react';

const MOCK_WIKI_CONTENT = `# Sentinel Global Knowledge Base

Welcome to the central knowledge repository. This wiki is formatted in markdown and serves as the ultimate source of truth for both you and your AI agents.

## Core Directives
1. **Agnostic Architecture**: Do not hardcode agent behaviors. Rely on skills and context injected at runtime.
2. **Temporal Memory**: All long-term recall is handled via Graphiti.
3. **Task Delegation**: Use Multica for cross-agent task coordination.

### Example Code Snippet
\`\`\`javascript
function initializeAgent(context) {
  console.log("Booting Hermes with context:", context);
  // Framework integration logic here
}
\`\`\`

> **Note**: This file (\`global.md\`) is automatically injected into the system prompt of any agent operating in the Global OS scope.
`;

export default function WikiPage() {
  const [content, setContent] = useState(MOCK_WIKI_CONTENT);

  return (
    <div className="flex h-full bg-white overflow-hidden text-[#37352f]">
      
      {/* Sidebar - Notion Style */}
      <div className="w-64 border-r border-[#f1f1f1] bg-[#fcfcfc] flex flex-col flex-shrink-0">
        <div className="flex-1 overflow-y-auto py-6">
          
          <div className="px-4 mb-2">
            <span className="text-xs font-semibold text-[#9b9a97]">Global Context</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-[#f1f1f1] text-[#37352f] cursor-pointer font-medium text-sm">
              <ChevronRight size={14} className="text-[#9b9a97]" />
              <FileText size={16} className="text-[#9b9a97]" />
              <span>global_directives.md</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 hover:bg-[#f1f1f1] text-[#787774] cursor-pointer transition text-sm">
              <ChevronRight size={14} className="text-[#9b9a97]" />
              <FileText size={16} className="text-[#9b9a97]" />
              <span>agent_personas.md</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 hover:bg-[#f1f1f1] text-[#787774] cursor-pointer transition text-sm">
              <ChevronRight size={14} className="text-[#9b9a97]" />
              <FileText size={16} className="text-[#9b9a97]" />
              <span>api_keys_policy.md</span>
            </div>
          </div>
          
          <div className="px-4 mt-8 mb-2">
            <span className="text-xs font-semibold text-[#9b9a97]">Project Templates</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 px-4 py-1.5 hover:bg-[#f1f1f1] text-[#787774] cursor-pointer transition text-sm">
              <ChevronRight size={14} className="text-[#9b9a97]" />
              <FileText size={16} className="text-[#9b9a97]" />
              <span>standard_prd.md</span>
            </div>
          </div>
          
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
        
        {/* Top Nav (Breadcrumbs & Actions) */}
        <div className="h-12 flex justify-between items-center px-4 flex-shrink-0 absolute top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-10">
          <div className="text-sm text-[#787774] flex items-center gap-1">
            <span className="hover:bg-[#f1f1f1] px-1.5 py-0.5 rounded cursor-pointer transition">Global Context</span>
            <span>/</span>
            <span className="hover:bg-[#f1f1f1] px-1.5 py-0.5 rounded cursor-pointer transition font-medium text-[#37352f] flex items-center gap-1.5">
              <FileText size={14}/> global_directives.md
            </span>
          </div>
          <div className="flex gap-1 text-[#787774]">
            <span className="text-xs flex items-center mr-4">Edited 2 hrs ago</span>
            <button className="p-1.5 hover:bg-[#f1f1f1] rounded transition"><Clock size={16} /></button>
            <button className="p-1.5 hover:bg-[#f1f1f1] rounded transition"><MessageSquare size={16} /></button>
            <button className="p-1.5 hover:bg-[#f1f1f1] rounded transition"><MoreHorizontal size={16} /></button>
          </div>
        </div>
        
        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto px-24 py-32">
          <div className="max-w-[708px] mx-auto">
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[500px] resize-none outline-none font-sans text-[16px] text-[#37352f] leading-relaxed bg-transparent"
              spellCheck="false"
              style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}
