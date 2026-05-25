"use client";

import React, { useState } from 'react';
import { Plus, MoreHorizontal, MessageSquare, Paperclip, Calendar, ChevronDown, CheckCircle2, Circle } from 'lucide-react';

type Task = { id: string, title: string, priority: string, comments: number, attachments: number, dueDate: string, assignee: string, status: string };

const COLUMNS = ['TO DO', 'IN PROGRESS', 'REVIEW', 'COMPLETE'];

const INITIAL_TASKS: Task[] = [
  { id: 'TSK-101', title: 'Refactor Auth Provider', priority: 'Low', comments: 2, attachments: 0, dueDate: 'May 30', assignee: 'KAI', status: 'TO DO' },
  { id: 'TSK-102', title: 'Design Agent Roster UI', priority: 'High', comments: 5, attachments: 2, dueDate: 'May 26', assignee: 'AMY', status: 'IN PROGRESS' },
  { id: 'TSK-103', title: 'Implement Multica API Sync', priority: 'Urgent', comments: 12, attachments: 1, dueDate: 'Today', assignee: 'HERMES', status: 'IN PROGRESS' },
  { id: 'TSK-100', title: 'Setup Next.js Routes', priority: 'Normal', comments: 0, attachments: 0, dueDate: 'May 24', assignee: 'AMY', status: 'COMPLETE' }
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden text-[#37352f]">
      
      {/* Header - Notion Style */}
      <div className="px-12 py-8 flex-shrink-0 border-b border-[#f1f1f1]">
        <h1 className="text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
          Multica Tasks
        </h1>
        <p className="text-[#9b9a97] text-sm flex items-center gap-4">
          <span className="flex items-center gap-1 cursor-pointer hover:bg-[#f1f1f1] px-1 rounded transition"><CheckCircle2 size={14} /> 4 Active Tasks</span>
          <span className="flex items-center gap-1 cursor-pointer hover:bg-[#f1f1f1] px-1 rounded transition">All Projects <ChevronDown size={14} /></span>
        </p>
      </div>

      {/* Board - ClickUp / Notion Board Style */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-8 flex gap-6 bg-[#fcfcfc]">
        {COLUMNS.map(col => {
          const colTasks = tasks.filter(t => t.status === col);
          return (
            <div key={col} className="w-80 flex-shrink-0 flex flex-col h-full">
              <div className="flex justify-between items-center mb-4 text-sm font-medium text-[#787774]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#f1f1f1] rounded text-xs">{col}</span>
                  <span className="text-[#9b9a97]">{colTasks.length}</span>
                </div>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-[#f1f1f1] rounded transition"><Plus size={16} /></button>
                  <button className="p-1 hover:bg-[#f1f1f1] rounded transition"><MoreHorizontal size={16} /></button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-8">
                {colTasks.map(task => (
                  <div key={task.id} className="bg-white p-4 rounded-md border border-[#e2e2e2] shadow-[0_1px_3px_rgba(0,0,0,0.04)] cursor-pointer hover:shadow-[0_2px_5px_rgba(0,0,0,0.08)] transition group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-[#9b9a97]">{task.id}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        task.priority === 'Urgent' ? 'bg-[#ffebe6] text-[#bf2600]' : 
                        task.priority === 'High' ? 'bg-[#fffae6] text-[#ff8b00]' : 
                        'bg-[#f1f1f1] text-[#787774]'
                      }`}>{task.priority}</span>
                    </div>
                    <div className="font-medium text-sm text-[#37352f] mb-4 leading-snug flex items-start gap-2">
                      {task.status === 'COMPLETE' ? <CheckCircle2 size={16} className="text-[#0f7b6c] mt-0.5 flex-shrink-0" /> : <Circle size={16} className="text-[#e2e2e2] mt-0.5 flex-shrink-0" />}
                      {task.title}
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto border-t border-[#f1f1f1] pt-3">
                      <div className="flex items-center gap-3 text-[#9b9a97]">
                        {task.comments > 0 && <span className="flex items-center gap-1 text-xs hover:text-[#37352f] transition"><MessageSquare size={14} /> {task.comments}</span>}
                        {task.attachments > 0 && <span className="flex items-center gap-1 text-xs hover:text-[#37352f] transition"><Paperclip size={14} /> {task.attachments}</span>}
                        <span className="flex items-center gap-1 text-xs hover:text-[#37352f] transition"><Calendar size={14} /> {task.dueDate}</span>
                      </div>
                      <div className="w-5 h-5 rounded bg-[#f1f1f1] text-[#37352f] flex items-center justify-center text-[10px] font-medium" title={task.assignee}>
                        {task.assignee.charAt(0)}
                      </div>
                    </div>
                  </div>
                ))}
                <button className="text-left text-sm text-[#9b9a97] hover:text-[#37352f] hover:bg-[#f1f1f1] p-2 rounded transition flex items-center gap-2">
                  <Plus size={16} /> New
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
