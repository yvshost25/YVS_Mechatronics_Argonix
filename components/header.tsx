"use client"

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ScrollProgress } from './magicui/scroll-progress' 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname();
  const isServicePage = pathname.includes("/service");

  // Define your navigation with target IDs (instead of routes)
  const navigation = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Customers', id: 'customers' },
  ]

  // Smooth scroll to a section by id
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    // Close mobile menu after clicking
    setIsMenuOpen(false);
  }

  const handleLinkClick = (sectionId: string) => {
    if (isServicePage) {
      window.location.href = "/";
    } else {
      scrollToSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {isServicePage ? (
              <Link href="/" className="flex items-center space-x-2">
                <Image src="/logo.png" alt="logo" height={65} width={65} className="rounded-sm" />
                <span className="hidden text-xl font-bold sm:inline-block">
                  YVS MECHATRONICS
                </span>
              </Link>
            ) : (
              <a href="#hero" onClick={() => scrollToSection('hero')} className="flex items-center space-x-2">
                <Image src="/logo.png" alt="logo" height={65} width={65} className="rounded-sm" />
                <span className="hidden text-xl font-bold sm:inline-block">
                  YVS MECHATRONICS
                </span>
              </a>
            )}
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => { scrollToSection(item.id); handleLinkClick(item.name) }}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              className="ml-2"
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
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => { scrollToSection(item.id); handleLinkClick(item.name) }}
                  className="block px-3 py-2 text-base font-medium text-foreground hover:bg-accent"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      {/* Scroll Progress Bar below the navbar */}
      <ScrollProgress className="top-[65px] h-0.5" />
    </header>
  )
}

export default Header
