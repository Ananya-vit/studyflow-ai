import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  description, 
  trend 
}: StatCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Top Section: Title & Icon */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-slate-500 tracking-tight">
          {title}
        </p>
        {icon && (
          <div className="text-slate-400 group-hover:text-slate-600 transition-colors duration-200">
            {icon}
          </div>
        )}
      </div>

      {/* Middle Section: Main Value */}
      <div className="mt-4 flex items-baseline gap-2">
        <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">
          {value}
        </h2>
        
        {/* Optional Trend Indicator */}
        {trend && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            trend.isPositive 
              ? "bg-emerald-50 text-emerald-700" 
              : "bg-rose-50 text-rose-700"
          }`}>
            {trend.value}
          </span>
        )}
      </div>

      {/* Optional Contextual Subtext */}
      {description && (
        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}