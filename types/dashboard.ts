import { LucideIcon } from 'lucide-react';

export interface NavItem {
  name: string;
  icon: LucideIcon;
  id: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  change: string;
  isPositive: boolean;
  color: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  type: 'upload' | 'notes' | 'quiz' | 'flashcards' | 'mindmap' | 'planner' | 'analytics';
}

export interface TimelineItem {
  id: string;
  type: 'upload' | 'notes' | 'quiz' | 'flashcards' | 'mindmap';
  title: string;
  timestamp: string;
  status: string;
}