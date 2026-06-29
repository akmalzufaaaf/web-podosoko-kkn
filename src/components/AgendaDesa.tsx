import React from 'react';

const DUMMY_AGENDA = [
  {
    id: "1",
    tanggal: "24",
    bulan: "OCT",
    waktu: "08:00 - 12:00 WIB",
    lokasi: "Balai Desa Podosoko",
    judulAcara: "Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes)",
  },
  {
    id: "2",
    tanggal: "12",
    bulan: "NOV",
    waktu: "09:00 - Selesai",
    lokasi: "Lapangan Utama",
    judulAcara: "Festival Panen Raya & UMKM Desa",
  },
  {
    id: "3",
    tanggal: "05",
    bulan: "DEC",
    waktu: "19:30 - 22:00 WIB",
    lokasi: "Masjid Baiturrahman",
    judulAcara: "Pengajian Akbar Tahunan",
  }
];

export interface AgendaItem {
  _id: string;
  eventName: string;
  eventDate: string;
  location: string;
}

export default function AgendaDesa({ agendas }: { agendas?: AgendaItem[] }) {
  // Fallback to dummy data if database is empty
  const displayAgendas = agendas && agendas.length > 0 ? agendas : DUMMY_AGENDA;

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 md:py-20">
      
      <div className="mb-12 border-b border-stone-900 pb-6 flex items-end justify-between">
        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight">
          Agenda <span className="italic text-emerald-700">Mendatang</span>
        </h2>
      </div>

      <ul className="flex flex-col">
        {displayAgendas.map((agenda: any) => {
          // Parse date if it comes from Sanity (eventDate) or fallback to dummy data
          let tanggal = agenda.tanggal;
          let bulan = agenda.bulan;
          let waktu = agenda.waktu;
          
          if (agenda.eventDate) {
            const dateObj = new Date(agenda.eventDate);
            tanggal = dateObj.getDate().toString().padStart(2, '0');
            bulan = dateObj.toLocaleString('id-ID', { month: 'short' }).toUpperCase();
            waktu = dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
          }

          return (
            <li 
              key={agenda.id || agenda._id} 
              className="group flex flex-col md:flex-row md:items-center border-b border-stone-300 py-8 last:border-b-0 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              {/* Left Block (Date) */}
              <div className="md:w-32 flex-shrink-0 flex flex-col mb-4 md:mb-0">
                <span className="text-5xl font-serif text-stone-900 group-hover:text-emerald-700 transition-colors">
                  {tanggal}
                </span>
                <span className="text-sm tracking-widest uppercase text-stone-500 mt-1">
                  {bulan}
                </span>
              </div>

              {/* Right Block (Content) */}
              <div className="flex-1 mt-4 md:mt-0">
                <h3 className="text-xl font-medium text-stone-900">
                  {agenda.judulAcara || agenda.eventName}
                </h3>
                <div className="text-stone-500 text-sm mt-2 flex items-center">
                  <span>{waktu}</span>
                  <span className="mx-3 text-stone-300">|</span>
                  <span>{agenda.lokasi || agenda.location}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      
    </section>
  );
}
