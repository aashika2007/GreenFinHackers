
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CarbonFootprint } from '../types';

interface CarbonChartProps {
  data: CarbonFootprint;
}

const CarbonChart: React.FC<CarbonChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Manufacturing', value: data.manufacturing, color: '#16a34a' },
    { name: 'Packaging', value: data.packaging, color: '#22c55e' },
    { name: 'Delivery', value: data.delivery, color: '#86efac' },
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend iconType="circle" verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CarbonChart;
