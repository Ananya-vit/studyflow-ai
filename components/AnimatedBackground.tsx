'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

interface Connection {
  from: number;
  to: number;
}

export default function AnimatedBackground() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    // Deterministic generation for stable client rendering matches
    const generatedNodes: Node[] = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 20 + 20,
    }));

    const generatedConnections: Connection[] = [];
    for (let i = 0; i < generatedNodes.length; i++) {
      // Connect each node to 1 or 2 nearby neighbors to simulate learning pathway topologies
      const targets = [
        (i + 1) % generatedNodes.length,
        (i + 5) % generatedNodes.length,
      ];
      targets.forEach(t => {
        if (!generatedConnections.some(c => (c.from === i && c.to === t) || (c.from === t && c.to === i))) {
          generatedConnections.push({ from: i, to: t });
        }
      });
    }

    setNodes(generatedNodes);
    setConnections(generatedConnections);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#070913]">
      {/* Premium Deep Aurora Glow Radiance Layout */}
      <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-900/15 blur-[140px]" />
      <div className="absolute bottom-[-5%] right-[-5%] h-[500px] w-[500px] rounded-full bg-purple-900/15 blur-[130px]" />
      <div className="absolute top-[40%] left-[35%] h-[400px] w-[400px] rounded-full bg-blue-900/10 blur-[120px]" />

      <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        {/* Connection pathways */}
        {connections.map((conn, index) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          if (!fromNode || !toNode) return null;
          return (
            <motion.line
              key={`line-${index}`}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke="rgba(129, 140, 248, 0.15)"
              strokeWidth="1"
              initial={{ strokeDasharray: "4 4", strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          );
        })}

        {/* Concept Graph Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={`node-${node.id}`}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill="url(#nodeGradient)"
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
              cy: [`${node.y}%`, `${node.y + (Math.sin(node.id) * 2)}%`, `${node.y}%`],
              cx: [`${node.x}%`, `${node.x + (Math.cos(node.id) * 2)}%`, `${node.x}%`]
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <defs>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Grid Pattern Mesh */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem]" 
        style={{ maskImage: 'radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)', WebkitMaskImage: 'radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)' }}
      />
    </div>
  );
}