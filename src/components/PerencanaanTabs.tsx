"use client";

import { useState } from "react";

interface PembangunanDoc {
  _id: string;
  title: string;
  tahun: string;
  jenisPerencanaan?: string;
  fileUrl?: string;
  url?: string;
}

export default function PerencanaanTabs({ docs }: { docs: PembangunanDoc[] }) {
  const [activeTab, setActiveTab] = useState<string>("Master Plan");

  const tabs = ["Master Plan", "RPJM", "RKP"];
  
  // Filter docs based on the active tab
  // If a doc doesn't have a specific type, we might want to put it somewhere or just ignore it.
  // We'll only show docs that match the active tab (or if it's the only one).
  const filteredDocs = docs.filter(
    (doc) => (doc.jenisPerencanaan || "Master Plan") === activeTab
  );

  return (
    <div>
      {/* Tabs Header */}
      <div className="flex space-x-2 md:space-x-8 border-b border-stone-200 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap py-4 px-2 font-medium text-sm transition-colors border-b-2 ${
              activeTab === tab
                ? "border-emerald-700 text-emerald-700"
                : "border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="prose prose-stone max-w-none">
        {filteredDocs.length === 0 ? (
          <p className="italic text-stone-500">Belum ada dokumen untuk {activeTab}.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-3">
            {filteredDocs.map((doc) => {
              const link = doc.fileUrl || doc.url || "#";
              return (
                <li key={doc._id} className="text-stone-700 marker:text-stone-400">
                  <span className="font-medium">{doc.tahun}</span> : {doc.title} |{' '}
                  <a 
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:text-emerald-800 hover:underline font-medium"
                  >
                    Unduh disini
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
