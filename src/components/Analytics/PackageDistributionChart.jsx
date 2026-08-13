import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { usePlacement } from '../../context/PlacementContext';
import { PieChart as PieIcon } from 'lucide-react';

export const PackageDistributionChart = () => {
  const { PACKAGE_DISTRIBUTION_MOCK } = usePlacement();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 border border-gray-700 p-3 rounded-xl shadow-xl text-xs">
          <p className="font-bold text-white">{data.range}</p>
          <p className="text-gray-300 font-medium">{data.count} Students Placed</p>
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
            <PieIcon className="w-4 h-4 text-cyan-400" />
            Salary Package (CTC) Distribution
          </h3>
          <p className="text-xs text-gray-400">Offers count split by LPA ranges</p>
        </div>
      </div>

      <div className="h-64 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={PACKAGE_DISTRIBUTION_MOCK}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={5}
              dataKey="count"
              nameKey="range"
            >
              {PACKAGE_DISTRIBUTION_MOCK.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} stroke="#111827" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
