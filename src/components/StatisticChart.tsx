'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

type StatisticData = {
  _id: string
  label: string
  count: number
  category: string
}

export default function StatisticChart({ data }: { data: StatisticData[] }) {
  // Container wrapper brutalist (sharp corners, heavy borders)
  const ChartContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full h-[400px] bg-stone-50 p-6 md:p-8 border border-stone-300 flex items-center justify-center">
      {children}
    </div>
  )

  if (!data || data.length === 0) {
    return (
      <ChartContainer>
        <p className="text-stone-400 font-medium uppercase tracking-widest text-xs">Data statistik belum tersedia.</p>
      </ChartContainer>
    )
  }

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="0" vertical={false} stroke="#d6d3d1" />
          <XAxis 
            dataKey="label" 
            tick={{ fontSize: 10, fill: '#57534e', fontWeight: 700 }} 
            axisLine={{ stroke: '#44403c', strokeWidth: 2 }} 
            tickLine={false} 
          />
          <YAxis 
            tick={{ fontSize: 10, fill: '#57534e', fontWeight: 700 }} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip 
            cursor={{ fill: '#e7e5e4' }}
            contentStyle={{ 
              borderRadius: '0px', 
              border: '2px solid #1c1917', 
              boxShadow: 'none',
              backgroundColor: '#fff',
              fontWeight: 700,
              fontSize: '12px',
              textTransform: 'uppercase'
            }}
          />
          <Bar dataKey="count" fill="#1c1917" radius={[0, 0, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}