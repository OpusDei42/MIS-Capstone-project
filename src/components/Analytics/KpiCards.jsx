import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { 
  TrendingUp, 
  Award, 
  Building2, 
  DollarSign
} from 'lucide-react';

export const KpiCards = () => {
  const { metrics } = usePlacement();

  const cards = [
    {
      title: 'Placement Rate',
      value: `${metrics.placementRate}%`,
      subtitle: `${metrics.placedCount} of ${metrics.totalStudents} TCET Students Placed`,
      icon: TrendingUp,
      accent: 'from-amber-500 to-amber-600',
      glow: 'glow-gold',
      badge: '+12.4% vs 2025',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      title: 'Highest Salary Package',
      value: `${metrics.maxCtc} LPA`,
      subtitle: 'Google - Software Specialist',
      icon: Award,
      accent: 'from-emerald-500 to-teal-600',
      glow: 'glow-emerald',
      badge: 'TCET Benchmark',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      title: 'Average Package (CTC)',
      value: `${metrics.avgCtc} LPA`,
      subtitle: 'Across all engineering branches',
      icon: DollarSign,
      accent: 'from-blue-600 to-blue-800',
      glow: 'glow-royal',
      badge: '+18.2% YoY',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    },
    {
      title: 'Company Drives Conducted',
      value: metrics.totalDrives,
      subtitle: `${metrics.activeDrivesCount} Drives Currently Active`,
      icon: Building2,
      accent: 'from-cyan-500 to-blue-600',
      glow: 'glow-cyan',
      badge: 'Active Season',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div 
            key={idx} 
            className="glass-card p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/30 transition-all"
          >
            {/* Ambient Background Gradient Accent */}
            <div className={`absolute -right-6 -bottom-6 w-28 h-28 bg-gradient-to-tr ${card.accent} rounded-full blur-2xl opacity-20 group-hover:opacity-35 transition-opacity`} />
            
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl bg-gradient-to-tr ${card.accent} text-white shadow-lg`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${card.badgeColor}`}>
                {card.badge}
              </span>
            </div>

            <p className="text-xs text-gray-400 font-medium mb-1">{card.title}</p>
            <h4 className="text-2xl font-black text-white tracking-tight mb-1">{card.value}</h4>
            <p className="text-[11px] text-gray-400 font-normal">{card.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
};

