"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export interface StatisticItem {
  _id: string;
  label: string;
  count: number;
  category?: string;
}

export default function StatisticSummary({ data }: { data?: StatisticItem[] }) {
  // If no data, use some brutalist fallback numbers for development
  const displayData = data && data.length > 0 ? data.slice(0, 4) : [
    { _id: '1', label: 'Total Penduduk', count: 2154 },
    { _id: '2', label: 'Laki-laki', count: 1082 },
    { _id: '3', label: 'Perempuan', count: 1072 },
    { _id: '4', label: 'Kepala Keluarga', count: 684 }
  ];

  return (
    <section className="w-full bg-white border-b border-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        
        {/* Brutalist Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-t border-stone-300 pt-12">
          <div className="max-w-2xl">
            <h2 className="text-5xl lg:text-7xl font-serif leading-[1.1] tracking-tight">
              <span className="text-stone-900 block">Data</span>
              <span className="text-emerald-700 block italic mt-1">Desa</span>
            </h2>
          </div>
          <Link 
            href="/profil/statistik" 
            className="inline-flex items-center text-xs font-bold text-stone-900 hover:text-emerald-700 transition-colors uppercase tracking-[0.2em] border-b-2 border-stone-900 hover:border-emerald-700 pb-1 mt-8 md:mt-0"
          >
            Lihat Detail Statistik <span className="ml-2">→</span>
          </Link>
        </div>

        {/* The Big Numbers Wireframe */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-stone-300 border-y border-stone-300">
          {displayData.map((stat, index) => (
            <motion.div 
              key={stat._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center py-16 px-4 group hover:bg-stone-50 transition-colors"
            >
              {/* Massive Serif Number */}
              <span className="text-5xl md:text-6xl lg:text-7xl font-serif text-stone-900 mb-4 group-hover:text-emerald-700 transition-colors">
                {stat.count != null ? Number(stat.count).toLocaleString('id-ID') : '0'}
              </span>
              
              {/* Micro-Label */}
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-stone-500">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
