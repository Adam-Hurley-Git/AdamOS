"use client";

import React, { useState } from 'react';
import { Bot, Play, Square, Settings, MoreHorizontal, Cpu, Plus } from 'lucide-react';

export default function AgentsPage() {
  const [agents, setAgents] = useState([
    { id: '1', name: 'Hermes 3', type: 'Local Runtime', status: 'Running', cpu: '12%', ram: '2.4 GB', uptime: '4h 12m', project: 'Alpha' },
    { id: '2', name: 'Claude 3.5 Coder', type: 'API Connection', status: 'Idle', cpu: '-', ram: '-', uptime: '-', project: 'Global' },
    { id: '3', name: 'Llama 3 Local', type: 'Local Runtime', status: 'Stopped', cpu: '-', ram: '-', uptime: '-', project: 'Beta' },
  ]);

  const toggleStatus = (id: string) => {
    setAgents(agents.map(a => {
      if (a.id === id) {
        return { ...a, status: a.status === 'Running' ? 'Stopped' : a.status === 'Stopped' ? 'Running' : 'Idle' };
      }
      return a;
    }));
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden text-[#37352f]">
      
      {/* Header */}
      <div className="px-12 py-8 flex-shrink-0 border-b border-[#f1f1f1]">
        <h1 className="text-4xl font-bold tracking-tight mb-4 flex items-center gap-3">
          Agent Roster
        </h1>
        <div className="flex gap-4">
          <button className="text-sm px-3 py-1.5 bg-[#f1f1f1] hover:bg-[#e2e2e2] text-[#37352f] rounded transition font-medium flex items-center gap-2">
            <Plus size={16} /> New Agent
          </button>
          <button className="text-sm px-3 py-1.5 hover:bg-[#f1f1f1] text-[#787774] rounded transition">
            Filter
          </button>
          <button className="text-sm px-3 py-1.5 hover:bg-[#f1f1f1] text-[#787774] rounded transition">
            Sort
          </button>
        </div>
      </div>

      {/* Database Table View */}
      <div className="flex-1 overflow-auto p-12 bg-white">
        <div className="max-w-5xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 pb-2 border-b border-[#e2e2e2] text-xs font-medium text-[#9b9a97] uppercase tracking-wider">
            <div className="col-span-4">Name</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Project</div>
            <div className="col-span-3">Metrics</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col">
            {agents.map((agent) => (
              <div key={agent.id} className="grid grid-cols-12 gap-4 py-3 border-b border-[#f1f1f1] items-center hover:bg-[#fcfcfc] transition group">
                
                <div className="col-span-4 flex items-center gap-3">
                  <div className={`w-6 h-6 flex items-center justify-center rounded ${agent.status === 'Running' ? 'bg-[#e5f5e0] text-[#0f7b6c]' : 'bg-[#f1f1f1] text-[#787774]'}`}>
                    <Bot size={14} />
                  </div>
                  <span className="font-medium text-sm text-[#37352f]">{agent.name}</span>
                  <span className="text-xs text-[#9b9a97] px-1.5 py-0.5 border border-[#e2e2e2] rounded">{agent.type}</span>
                </div>
                
                <div className="col-span-2 flex items-center">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium flex items-center gap-1.5 ${
                    agent.status === 'Running' ? 'bg-[#e5f5e0] text-[#0f7b6c]' : 
                    agent.status === 'Idle' ? 'bg-[#fffae6] text-[#ff8b00]' : 
                    'bg-[#f1f1f1] text-[#787774]'
                  }`}>
                    {agent.status === 'Running' && <span className="w-1.5 h-1.5 rounded-full bg-[#0f7b6c]"></span>}
                    {agent.status}
                  </span>
                </div>
                
                <div className="col-span-2">
                  <span className="text-sm text-[#787774] hover:underline cursor-pointer">{agent.project}</span>
                </div>
                
                <div className="col-span-3 flex items-center gap-4 text-xs text-[#9b9a97]">
                  {agent.status === 'Running' ? (
                    <>
                      <span className="flex items-center gap-1" title="CPU"><Cpu size={12}/> {agent.cpu}</span>
                      <span title="RAM">{agent.ram}</span>
                      <span title="Uptime">{agent.uptime}</span>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </div>
                
                <div className="col-span-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button 
                    onClick={() => toggleStatus(agent.id)}
                    className="p-1.5 hover:bg-[#e2e2e2] rounded text-[#37352f] transition"
                    title={agent.status === 'Running' ? 'Stop' : 'Start'}
                  >
                    {agent.status === 'Running' ? <Square size={14} /> : <Play size={14} />}
                  </button>
                  <button className="p-1.5 hover:bg-[#e2e2e2] rounded text-[#787774] transition"><Settings size={14} /></button>
                  <button className="p-1.5 hover:bg-[#e2e2e2] rounded text-[#787774] transition"><MoreHorizontal size={14} /></button>
                </div>
                
              </div>
            ))}
            
            {/* Add Row Button */}
            <button className="flex items-center gap-2 py-3 text-sm text-[#9b9a97] hover:text-[#37352f] hover:bg-[#fcfcfc] transition border-b border-transparent">
              <Plus size={16} /> New row
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
