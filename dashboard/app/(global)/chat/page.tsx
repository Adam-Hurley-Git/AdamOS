"use client";

import React, { useState } from 'react';
import { Send, Paperclip, Mic, Bot, User, Sparkles, ChevronDown } from 'lucide-react';

export default function ChatPage() {
  const [input, setInput] = useState('');

  return (
    <div className="flex h-full bg-white overflow-hidden text-[#37352f]">
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        
        {/* Header */}
        <div className="h-14 border-b border-[#f1f1f1] flex justify-between items-center px-8 flex-shrink-0">
          <div className="flex items-center gap-2 cursor-pointer hover:bg-[#f1f1f1] px-2 py-1 rounded transition">
            <h3 className="font-semibold text-[#37352f] text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0f7b6c]"></span> Amy (Companion)
            </h3>
            <ChevronDown size={14} className="text-[#9b9a97] mt-0.5" />
          </div>
          <div className="text-xs text-[#9b9a97]">Global Context</div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-6">
          <div className="text-center text-xs text-[#9b9a97] my-4 font-medium">Today, 2:30 PM</div>
          
          {/* User Message */}
          <div className="flex gap-4 max-w-3xl mx-auto w-full">
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-[#787774] mt-1">
              <User size={20} />
            </div>
            <div className="text-[15px] leading-relaxed pt-1">
              I need help refactoring the Task UI to look more like a Kanban board.
            </div>
          </div>

          {/* Agent Message */}
          <div className="flex gap-4 max-w-3xl mx-auto w-full">
            <div className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center bg-[#f1f1f1] text-[#37352f] mt-1">
              <Bot size={20} />
            </div>
            <div className="text-[15px] leading-relaxed pt-1 w-full">
              <p className="mb-4">Absolutely! A Kanban view is perfect for the Multica tasks. We can use <code className="bg-[#f1f1f1] text-[#eb5757] px-1.5 py-0.5 rounded text-sm font-mono">lucide-react</code> icons to make it look premium.</p>
              <p className="mb-4">I suggest we create columns for <strong>TO DO</strong>, <strong>IN PROGRESS</strong>, and <strong>COMPLETE</strong>. Let me sketch out the React component structure for you.</p>
              
              <div className="border border-[#e2e2e2] rounded overflow-hidden mt-4 bg-[#fcfcfc]">
                <div className="flex justify-between items-center px-4 py-2 border-b border-[#e2e2e2] bg-white">
                  <span className="text-xs text-[#787774] font-medium">page.tsx</span>
                  <span className="flex items-center gap-1.5 text-xs text-[#0b6e99] font-medium cursor-pointer hover:bg-[#e6f3f7] px-2 py-1 rounded transition">
                    <Sparkles size={12}/> Generate Sandbox
                  </span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-[#37352f] leading-loose">
<code>{`export default function TasksPage() {
  return (
    <div className="flex gap-4">
      {/* Column rendering logic */}
    </div>
  );
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-8 pt-0 max-w-3xl mx-auto w-full">
          <div className="relative border border-[#e2e2e2] rounded-md shadow-[0_2px_6px_rgba(0,0,0,0.02)] focus-within:border-[#d4d4d4] focus-within:shadow-[0_2px_8px_rgba(0,0,0,0.06)] bg-white transition-all">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Reply to Amy..."
              className="w-full bg-transparent p-3 outline-none resize-none h-14 text-[15px] text-[#37352f] placeholder-[#9b9a97]"
            />
            <div className="absolute right-2 bottom-2 flex gap-1">
              <button className="p-1.5 text-[#9b9a97] hover:bg-[#f1f1f1] rounded transition"><Paperclip size={18} /></button>
              <button className="p-1.5 text-[#9b9a97] hover:bg-[#f1f1f1] rounded transition"><Mic size={18} /></button>
              <button className="p-1.5 text-[#37352f] hover:bg-[#f1f1f1] rounded transition ml-2"><Send size={18} /></button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
