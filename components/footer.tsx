"use client";

import { usePathname } from "next/navigation";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Main footer with simplified design */}
      <div className="relative z-10 py-10 border-b border-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Company Information */}
            <div>
              <div className="flex items-center space-x-3 mb-5">
                <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg">
                  <Image src="/logo.png" alt="YVS Mechatronics Logo" height={40} width={40} className="rounded-sm" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg leading-tight text-white">
                    YVS MECHATRONICS
                  </span>
                  <span className="text-xs text-slate-400">Precision Engineering Solutions</span>
                </div>
              </div>
              <p className="text-slate-300 mb-4 leading-relaxed text-sm">
                Leading provider of industrial automation, special-purpose machines, and precision engineering solutions.
              </p>
              <div className="flex space-x-3 mb-4">
                <a href="#" className="bg-slate-800/70 p-2 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110 shadow-lg">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="bg-slate-800/70 p-2 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110 shadow-lg">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="bg-slate-800/70 p-2 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110 shadow-lg">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="bg-slate-800/70 p-2 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110 shadow-lg">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            {/* Contact Information with simplified design */}
            <div>
              <h3 className="text-lg font-semibold mb-4 relative inline-block">
                <span className="bg-gradient-to-r from-purple-500 to-purple-700 h-1 w-10 absolute -bottom-2 left-0 rounded-full"></span>
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-8 w-8 mr-3 flex items-center justify-center bg-slate-800/70 rounded-lg text-blue-500 flex-shrink-0 mt-1">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-slate-300 text-sm">
                    Shed No. 19 &amp; 20, Phase-II, IDA, Cherlapally, Kapra, Hyderabad, Medchal Malkajgiri Dist- 500051, Telangana State
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="h-8 w-8 mr-3 flex items-center justify-center bg-slate-800/70 rounded-lg text-blue-500 flex-shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="text-slate-300 text-sm">+91 7995180016</span>
                </li>
                <li className="flex items-center">
                  <div className="h-8 w-8 mr-3 flex items-center justify-center bg-slate-800/70 rounded-lg text-blue-500 flex-shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <a href="mailto:info@yvsmechatronics.com" className="text-slate-300 hover:text-white text-sm">
                    info@yvsmechatronics.com
                  </a>
                </li>
                <li className="flex items-center">
                  <div className="h-8 w-8 mr-3 flex items-center justify-center bg-slate-800/70 rounded-lg text-blue-500 flex-shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="text-slate-300 text-sm">Mon - Sat: 9:00AM - 6:00PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright with simplified design */}
      <div className="py-4 bg-slate-950/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="mb-3 md:mb-0">
              <p className="text-slate-400">
                © {new Date().getFullYear()} YVS MECHATRONICS. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/privacy-policy" className="text-slate-400 hover:text-white text-xs">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-slate-400 hover:text-white text-xs">
                Terms of Service
              </Link>
              <div className="flex items-center">
                <p className="text-slate-400 text-xs">
                  Designed By <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent font-medium">Argonix Labs</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;