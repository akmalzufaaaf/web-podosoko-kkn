import React from 'react';
import { client } from '../../../../../sanity/lib/client';
import StatisticChart from '@/components/StatisticChart';

export const revalidate = 60;

const STATISTIC_QUERY = `*[_type == "statistic"] { _id, label, count, category }`;

type StatisticData = {
  _id: string;
  label: string;
  count: number;
  category: string;
};

export default async function DataStatistikPage() {
  const statistics: StatisticData[] = await client.fetch(STATISTIC_QUERY);

  // Fallback to dummy data if database is empty for development purposes
  const data = statistics && statistics.length > 0 ? statistics : [
    // Pendidikan
    { _id: '1', label: 'Tidak Sekolah', count: 276, category: 'Pendidikan' },
    { _id: '2', label: 'Tamat SD', count: 1850, category: 'Pendidikan' },
    { _id: '3', label: 'Tamat SLTP', count: 539, category: 'Pendidikan' },
    { _id: '4', label: 'Tamat SLTA', count: 327, category: 'Pendidikan' },
    { _id: '5', label: 'Perguruan Tinggi', count: 43, category: 'Pendidikan' },
    
    // Pekerjaan
    { _id: '6', label: 'Petani/Pekebun', count: 1689, category: 'Pekerjaan' },
    { _id: '7', label: 'Belum Bekerja', count: 752, category: 'Pekerjaan' },
    { _id: '8', label: 'Karyawan Swasta', count: 623, category: 'Pekerjaan' },
    { _id: '9', label: 'Pelajar', count: 620, category: 'Pekerjaan' },
    { _id: '10', label: 'Wiraswasta', count: 181, category: 'Pekerjaan' },
    { _id: '11', label: 'Lainnya', count: 1220, category: 'Pekerjaan' },

    // Agama
    { _id: '12', label: 'Islam', count: 4714, category: 'Agama' },
    { _id: '13', label: 'Kristen', count: 70, category: 'Agama' },
    { _id: '14', label: 'Katolik', count: 44, category: 'Agama' },
  ];

  // Extract unique categories (exclude Demografi from the bar charts since it's displayed as big numbers elsewhere)
  const categories = Array.from(new Set(data.map(item => item.category))).filter(c => c !== 'Demografi');

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-emerald-700 selection:text-white pt-24 md:pt-32 pb-16">
      
      {/* 1. The Masthead Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-none tracking-tighter text-stone-900 mb-8">
          DATA<br />
          <span className="italic text-emerald-700 block -mt-2 md:-mt-6">STATISTIK</span>
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-stone-300 pt-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-stone-500 max-w-sm">
            Visualisasi data kependudukan, pendidikan, pekerjaan, dan infrastruktur Desa Podosoko.
          </p>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-stone-900 mt-4 md:mt-0">
            DIPERBARUI: {new Date().getFullYear()}
          </p>
        </div>
      </section>

      {/* 2. Dynamic Category Charts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-24 md:gap-32">
          {categories.map((category) => {
            const categoryData = data.filter((item) => item.category === category);
            
            return (
              <div key={category} className="w-full">
                {/* Brutalist Category Header */}
                <div className="mb-12 border-b-2 border-stone-900 pb-4">
                  <h2 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight">
                    <span className="text-stone-400 font-sans text-xl md:text-2xl font-bold tracking-widest uppercase mr-4">
                      DATA
                    </span>
                    {category}
                  </h2>
                </div>
                
                {/* The Brutalist Chart */}
                <StatisticChart data={categoryData} />
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}
