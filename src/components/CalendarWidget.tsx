'use client'

import { useEffect, useState } from 'react'

type Agenda = {
  _id: string
  eventName: string
  eventDate: string
  location: string
}

export default function CalendarWidget({ agendas }: { agendas: Agenda[] }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <div className="h-64 animate-pulse bg-stone-100 rounded-3xl" />

  const currentDate = new Date()

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  const blanks = Array.from({ length: firstDayOfMonth }, () => null)
  const days = Array.from({ length: daysInMonth }, (v, i) => i + 1)
  const cells = [...blanks, ...days]

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  // Helper to check if a day has an event
  const hasEvent = (day: number) => {
    return agendas.some(agenda => {
      const d = new Date(agenda.eventDate)
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year
    })
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl shadow-stone-200/40 border border-stone-200/50">
      <h2 className="text-2xl font-serif text-stone-800 mb-6 font-bold">Agenda Desa</h2>
      
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-sans font-semibold text-stone-700">
          {monthNames[month]} {year}
        </h3>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center mb-6">
        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
          <div key={day} className="text-xs font-semibold text-stone-400 py-2">
            {day}
          </div>
        ))}
        {cells.map((day, index) => {
          if (day === null) {
            return <div key={`blank-${index}`} className="py-2"></div>
          }
          const isToday = day === currentDate.getDate()
          const eventExists = hasEvent(day)

          return (
            <div key={day} className="relative flex justify-center items-center py-2">
              <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-sans ${isToday ? 'bg-emerald-700 text-white font-bold' : 'text-stone-600'}`}>
                {day}
              </span>
              {eventExists && (
                <span className="absolute bottom-1 w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              )}
            </div>
          )
        })}
      </div>

      {/* Upcoming Events List */}
      <div className="space-y-4 pt-4 border-t border-stone-100">
        <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-2">Terdekat</h4>
        {agendas.slice(0, 3).map((agenda) => (
          <div key={agenda._id} className="flex gap-4 items-start">
            <div className="flex flex-col items-center justify-center w-12 h-12 bg-stone-50 rounded-xl border border-stone-100 shrink-0">
              <span className="text-xs font-bold text-emerald-700">
                {new Date(agenda.eventDate).getDate()}
              </span>
              <span className="text-[10px] text-stone-400 uppercase">
                {monthNames[new Date(agenda.eventDate).getMonth()].substring(0, 3)}
              </span>
            </div>
            <div>
              <h5 className="font-serif font-bold text-stone-800 text-sm">{agenda.eventName}</h5>
              <p className="font-sans text-xs text-stone-500 mt-0.5">{agenda.location}</p>
            </div>
          </div>
        ))}
        {agendas.length === 0 && (
          <p className="text-stone-400 text-sm font-sans">Belum ada agenda bulan ini.</p>
        )}
      </div>
    </div>
  )
}
