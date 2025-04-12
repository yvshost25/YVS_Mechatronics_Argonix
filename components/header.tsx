"use client"

import { useState, useEffect } from 'react'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ScrollProgress } from './magicui/scroll-progress'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Define your navigation with target IDs
  const navigation = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Customers', id: 'customers' },
    { name: 'Contact', id: 'contact' },
  ]

  // Smooth scroll to a section by id
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle link click: if not on home page, redirect to "/" with hash.
  const handleLinkClick = (sectionId: string) => {
    if (!isHomePage) {
      window.location.href = `/#${sectionId}`
    } else {
      scrollToSection(sectionId)
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-900/80' 
          : 'bg-white dark:bg-slate-900'
      }`}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              {/* Logo */}
              {isHomePage ? (
                <a href="#hero" onClick={() => scrollToSection('hero')} className="flex items-center space-x-3">
                  <Image src="/logo.png" alt="YVS Mechatronics Logo" height={54} width={54} className="rounded-sm" />
                  <div className="flex flex-col">
                    <span className="font-bold text-xl leading-tight text-blue-600 dark:text-blue-400">
                      YVS MECHATRONICS
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">Precision Engineering Solutions</span>
                  </div>
                </a>
              ) : (
                <Link href="/" className="flex items-center space-x-3">
                  <Image src="/logo.png" alt="YVS Mechatronics Logo" height={54} width={54} className="rounded-sm" />
                  <div className="flex flex-col">
                    <span className="font-bold text-xl leading-tight text-blue-600 dark:text-blue-400">
                      YVS MECHATRONICS
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">Precision Engineering Solutions</span>
                  </div>
                </Link>
              )}
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleLinkClick(item.id)}
                  className="text-sm font-medium relative group"
                >
                  <span className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {item.name}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
              
              <Button 
                className="ml-2 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleLinkClick('contact')}
              >
                Get a Quote
              </Button>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="flex items-center md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t mt-2">
              <div className="py-4 space-y-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleLinkClick(item.id)}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
                
                <Button 
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => handleLinkClick('contact')}
                >
                  Get a Quote
                </Button>
                
                <div className="pt-4 border-t space-y-2">
                  <div className="flex items-center px-3 text-sm text-slate-700 dark:text-slate-200">
                    <Phone className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                    <span>+91 88888 88888</span>
                  </div>
                  <div className="flex items-center px-3 text-sm text-slate-700 dark:text-slate-200">
                    <Mail className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                    <span>info@yvsmechotronics.com</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
        {/* Scroll Progress Bar below the navbar */}
        <ScrollProgress className="h-0.5 bg-blue-600 dark:bg-blue-400" />
      </header>
    </>
  )
}

export default Header