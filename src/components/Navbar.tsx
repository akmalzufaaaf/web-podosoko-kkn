"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navData = [
  {
    name: "Profil Desa",
    dropdown: [
      { name: "Tentang Podosoko", href: "/profil/tentang" },
      { name: "Data Statistik", href: "/profil/statistik" },
      { name: "Sarana & Prasarana", href: "/profil/sarana" },
    ],
  },
  {
    name: "Informasi",
    dropdown: [
      { name: "Kabar Terbaru", href: "/informasi/kabar" },
      { name: "Etalase UMKM", href: "/umkm" },
      { name: "Agenda", href: "/informasi/agenda" },
    ],
  },
  {
    name: "Peta Digital",
    href: "/peta",
  },
  {
    name: "Layanan Publik",
    href: "/layanan",
  },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: 5,
    scale: 0.98,
    transition: { duration: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 350, damping: 35 },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.2 },
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 50);
    };
    
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav
        className={`w-full transition-all duration-300 ease-in-out border-b ${
          scrolled 
            ? "py-3 bg-white/90 backdrop-blur-md shadow-sm border-stone-100" 
            : "py-4 bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center z-50 group">
              <Image
                src="/logo_kab_mgl.png"
                alt="Logo Kabupaten Magelang"
                width={48}
                height={58}
                className={`h-11 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                  !scrolled ? "drop-shadow-md" : ""
                }`}
                priority
              />
            </Link>

            {/* Desktop Navigation (Ultra Minimalist) */}
            <div className="hidden md:flex items-center justify-end space-x-8 flex-1">
              {navData.map((item) => {
                const isActiveLink = pathname === item.href;
                const isDropdownActive = item.dropdown?.some((d) => d.href === pathname);
                const isActive = isActiveLink || isDropdownActive;
                const isHoveredDropdown = activeDropdown === item.name;

                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={`group relative text-sm font-medium transition-colors duration-300 ease-in-out py-2 ${
                          scrolled
                            ? isActive
                              ? "text-emerald-600"
                              : "text-stone-600 hover:text-emerald-600"
                            : isActive
                            ? "text-white"
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        {item.name}
                        <span 
                          className={`absolute left-0 bottom-1 w-full h-[2px] rounded-full transition-transform duration-300 ease-out origin-left ${
                            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          } ${scrolled ? "bg-emerald-600" : "bg-white"}`} 
                        />
                      </Link>
                    ) : (
                      <button
                        className={`group relative flex items-center gap-1 text-sm font-medium transition-colors duration-300 ease-in-out focus:outline-none py-2 ${
                          scrolled
                            ? isActive || isHoveredDropdown
                              ? "text-emerald-600"
                              : "text-stone-600 hover:text-emerald-600"
                            : isActive || isHoveredDropdown
                            ? "text-white"
                            : "text-white/80 hover:text-white"
                        }`}
                        aria-expanded={isHoveredDropdown}
                      >
                        {item.name}
                        <svg
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            isHoveredDropdown ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span 
                          className={`absolute left-0 bottom-1 w-full h-[2px] rounded-full transition-transform duration-300 ease-out origin-left ${
                            isActive || isHoveredDropdown ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          } ${scrolled ? "bg-emerald-600" : "bg-white"}`} 
                        />
                      </button>
                    )}

                    {/* Desktop Dropdown */}
                    {item.dropdown && (
                      <AnimatePresence>
                        {isHoveredDropdown && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute top-full right-0 mt-0 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black/5 overflow-hidden origin-top-right"
                          >
                            <div className="py-1.5">
                              {item.dropdown.map((subItem) => (
                                <motion.div key={subItem.name} variants={itemVariants}>
                                  <Link
                                    href={subItem.href}
                                    className={`block px-4 py-2 text-[13px] transition-colors ${
                                      pathname === subItem.href
                                        ? "text-emerald-600 font-semibold bg-stone-50/50"
                                        : "text-stone-600 hover:text-emerald-600 hover:bg-stone-50"
                                    }`}
                                  >
                                    {subItem.name}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Hamburger Menu Button */}
            <div className="md:hidden flex items-center z-50">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 -mr-2 focus:outline-none transition-colors duration-300 ${
                  mobileMenuOpen 
                    ? "text-stone-900" 
                    : scrolled
                      ? "text-stone-900"
                      : "text-white"
                }`}
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                  <motion.span
                    animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    className="w-full h-[1.5px] rounded-full origin-center transition-all duration-300 bg-current"
                  />
                  <motion.span
                    animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-full h-[1.5px] rounded-full transition-all duration-300 bg-current"
                  />
                  <motion.span
                    animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    className="w-full h-[1.5px] rounded-full origin-center transition-all duration-300 bg-current"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay & Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl z-40 md:hidden overflow-y-auto"
            >
              <div className="pt-20 px-6 pb-8 flex flex-col h-full">
                <div className="flex flex-col gap-1 flex-1">
                  {navData.map((item) => (
                    <div key={item.name} className="border-b border-stone-100 last:border-0 pb-2 mb-2">
                      {item.href ? (
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block py-3 text-sm font-medium transition-colors ${
                            pathname === item.href ? "text-emerald-600" : "text-stone-800"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <div className="py-1">
                          <button
                            onClick={() =>
                              setActiveDropdown(activeDropdown === item.name ? null : item.name)
                            }
                            className="flex items-center justify-between w-full py-2 text-sm font-medium text-stone-800 transition-colors"
                          >
                            {item.name}
                            <motion.svg
                              animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                              className="w-4 h-4 text-stone-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </motion.svg>
                          </button>
                          <AnimatePresence>
                            {activeDropdown === item.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 py-1 flex flex-col gap-2 border-l-2 border-stone-100 mt-1">
                                  {item.dropdown?.map((subItem) => (
                                    <Link
                                      key={subItem.name}
                                      href={subItem.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className={`text-[13px] py-1.5 transition-colors ${
                                        pathname === subItem.href
                                          ? "text-emerald-600 font-medium"
                                          : "text-stone-500 hover:text-emerald-600"
                                      }`}
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
