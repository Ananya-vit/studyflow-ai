'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, HelpCircle, Expand, Sparkles } from 'lucide-react';

interface KnowledgeNode {
  id: string;
  label: string;
  type: 'core' | 'pdf' | 'quiz' | 'note';
  x: number;
  y: number;
  connections: string[];
}

const graphNodes: KnowledgeNode[] = [
  { id: '1', label: 'Cell Biology Core', type: 'core', x: 50, y: 50, connections: ['2', '3', '4'] },
  { id: '2', label: 'Neuroanatomy_Lec4.pdf', type: 'pdf', x: 25, y: 30, connections: ['1', '5'] },
  { id: '3', label: 'Metabolism Notes', type: 'note', x: 75, y: 35, connections: ['1'] },
  { id: '4', label: 'Cell Cycle Quiz', type: 'quiz', x: 55, y: 80, connections: ['1', '6'] },
  { id: '5', label: 'Axon Structure Flashcards', type: 'note', x: 15, y: 60, connections: ['2'] },
  { id: '6', label: 'Mitosis Diagnostics', type: 'quiz', x: 80, y: 75, connections: ['4'] },
];

export default function KnowledgeGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getNodeColor = (type: string, isHovered: boolean) => {
    if (isHovered) return 'bg-white text-[#070913] border-white';
    switch (type) {
      case 'core': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      case 'pdf': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'quiz': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default: return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
    }
  };

  return (
    <div className="rounded-xl border border-white/[0.05] bg-[#0c1020]/40 p-5 backdrop-blur-sm flex flex-col justify-between h-[340px] relative overflow-hidden group">
      {/* Absolute Layer Details */}
      <div className="flex items-center justify-between z-10">
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-bold text-white tracking-tight">Your Learning Network</h2>
            <span className="text-[9px] font-medium text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded-full border border-indigo-500/20 flex items-center gap-0.5">
              <Sparkles className="h-2 w-2" /> Signature Sync
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Dynamic mapping of ingested documents into knowledge links</p>
        </div>
        <button className="text-slate-400 hover:text-white transition-colors p-1 rounded bg-white/[0.02]">
          <Expand className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Network Container Interface Box */}
      <div className="absolute inset-0 top-16 bottom-4 left-4 right-4 bg-white/[0.01] rounded-xl border border-white/[0.02] overflow-hidden">
        {/* SVG connection pipelines vectors mapping under node chips */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none">
          {graphNodes.map((node) => 
            node.connections.map((targetId) => {
              const target = graphNodes.find(n => n.id === targetId);
              if (!target) return null;
              const isHighlighted = hoveredNode === node.id || hoveredNode === targetId;
              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke={isHighlighted ? 'rgba(129, 140, 248, 0.4)' : 'rgba(255,255,255,0.04)'}
                  strokeWidth={isHighlighted ? '1.5' : '1'}
                  className="transition-colors duration-300"
                />
              );
            })
          )}
        </svg>

        {/* Dynamic Nodes Placed via coordinate maps matching responsive dimensions */}
        {graphNodes.map((node) => {
          const isHovered = hoveredNode === node.id;
          return (
            <motion.div
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
              className="absolute z-10"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`px-2 py-1 rounded-md border text-[10px] font-medium whitespace-nowrap shadow-lg cursor-pointer transition-colors duration-300 backdrop-blur-md ${getNodeColor(node.type, isHovered)}`}>
                {node.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom hint configuration string indicator */}
      <div className="z-10 text-[10px] text-slate-400 text-right italic">
        {hoveredNode ? 'Inspecting relative concept mapping relationships...' : 'Hover across nodes to trace structural dependencies'}
      </div>
    </div>
  );
}