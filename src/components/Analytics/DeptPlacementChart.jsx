import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  CartesianGrid 
} from 'recharts';
import { usePlacement } from '../../context/PlacementContext';
import { BarChart3 } from 'lucide-react';

export const DeptPlacementChart = () => {
  const { DEPARTMENT_STATS_MOCK } = usePlacement();

  const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 border border-gray-700 p-3 rounded-xl shadow-xl text-xs">
          <p className="font-bold text-white mb-1">{data.department} Department</p>
          <div className="space-y-1 text-gray-300">
            <p className="flex justify-between gap-4">
              <span>Placed Rate:</span> 
              <span className="font-semibold text-emerald-400">{data.rate}%</span>
            </p>
            <p className="flex justify-between gap-4">
              <span>Students Placed:</span> 
              <span className="font-semibold text-indigo-400">{data.placed} / {data.total}</span>
            </p>
            <p className="flex justify-between gap-4">
              <span>Average Package:</span> 
              <span className="font-semibold text-amber-400">{data.avgCtc} LPA</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-gray-800/80">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            Department Placement Rate (%)
          </h3>
          <p className="text-xs text-gray-400">Branch-wise candidate placement comparison</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
          Live Sync
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DEPARTMENT_STATS_MOCK} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis dataKey="department" stroke="#6b7280" tick={{ fontSize: 11 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
              {DEPARTMENT_STATS_MOCK.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
