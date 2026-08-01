import React from 'react';
import { client } from '../../../../../sanity/lib/client';

export const revalidate = 60;

export interface AgendaItem {
  _id: string;
  eventName: string;
  eventDate: string;
  location: string;
}

const AGENDA_QUERY = `
  *[_type == "agenda"] | order(eventDate asc) {
    _id,
    eventName,
    eventDate,
    location
  }
`;

export default async function AgendaPage() {
  let agendas: AgendaItem[] = [];

  try {
    agendas = await client.fetch(AGENDA_QUERY);
  } catch (error) {
    console.error("Error fetching agendas:", error);
  }

  // Filter out past events if needed, but for now we show all
  // Or we can just let it display everything that is queried.

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-emerald-700 selection:text-white pt-24 md:pt-32 pb-32">
      
      {/* 1. The Masthead Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-none tracking-tighter text-stone-900 mb-8">
          AGENDA<br />
          <span className="italic text-emerald-700 block -mt-2 md:-mt-6">DESA</span>
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-stone-300 pt-6">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-stone-500 max-w-md leading-relaxed">
            Jadwal kegiatan, musyawarah, dan acara resmi Pemerintah serta masyarakat Desa Podosoko.
          </p>
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-stone-900 mt-6 md:mt-0">
            TOTAL AGENDA: {agendas.length.toString().padStart(2, '0')}
          </p>
        </div>
      </section>

      {/* 2. Agenda Ledger List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {agendas.length === 0 ? (
          <div className="w-full border-y border-stone-300 py-32 flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight mb-4">
              Jadwal <span className="italic text-emerald-700">Kosong</span>
            </h2>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400">
              Belum ada agenda yang dijadwalkan.
            </p>
          </div>
        ) : (
          <div className="border-t border-stone-900">
            <ul className="flex flex-col">
              {agendas.map((agenda) => {
                const dateObj = new Date(agenda.eventDate);
                const tanggal = dateObj.getDate().toString().padStart(2, '0');
                const bulan = dateObj.toLocaleString('id-ID', { month: 'short' }).toUpperCase();
                const waktu = dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

                return (
                  <li 
                    key={agenda._id} 
                    className="group flex flex-col md:flex-row md:items-center border-b border-stone-300 py-12 hover:bg-stone-50 transition-colors cursor-pointer px-4 -mx-4 md:px-8 md:-mx-8"
                  >
                    {/* Left Block (Date) */}
                    <div className="md:w-40 flex-shrink-0 flex flex-col mb-6 md:mb-0">
                      <span className="text-6xl md:text-7xl font-serif text-stone-900 group-hover:text-emerald-700 transition-colors leading-none">
                        {tanggal}
                      </span>
                      <span className="text-sm tracking-[0.3em] font-bold uppercase text-stone-400 mt-4">
                        {bulan}
                      </span>
                    </div>

                    {/* Right Block (Content) */}
                    <div className="flex-1 md:pl-8 md:border-l border-stone-300">
                      <h3 className="text-2xl md:text-3xl font-serif text-stone-900 mb-4 group-hover:text-emerald-700 transition-colors">
                        {agenda.eventName}
                      </h3>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400">WAKTU:</span>
                          <span className="text-xs font-bold tracking-widest uppercase text-stone-900">{waktu}</span>
                        </div>
                        <div className="hidden md:block w-px h-4 bg-stone-300"></div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400">LOKASI:</span>
                          <span className="text-xs font-bold tracking-widest uppercase text-stone-900">{agenda.location}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
