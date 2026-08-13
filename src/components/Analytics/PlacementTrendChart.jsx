import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import { usePlacement } from '../../context/PlacementContext';
import { TrendingUp } from 'lucide-react';

export const PlacementTrendChart = () => {
  const { PLACEMENT_TREND_MOCK } = usePlacement();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-gray-700 p-3 rounded-xl shadow-xl text-xs">
          <p className="font-bold text-white mb-1">{label} Season Progress</p>
          <div className="space-y-1">
            <p className="text-indigo-400 font-semibold">Total Offers: {payload[0].value}</p>
            <p className="text-amber-400 font-semibold">Avg Salary: {payload[1]?.value} LPA</p>
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
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Cumulative Offer Progression
          </h3>
          <p className="text-xs text-gray-400">Monthly breakdown of student offers issued</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PLACEMENT_TREND_MOCK} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="offersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 11 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="offers" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#offersGradient)" />
            <Area type="monotone" dataKey="avgSalary" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#salaryGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
