"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
// Remove unused Link import if you prefer buttons for scrolling.
import { motion } from "framer-motion";
import AboutPage from "./about/page";
import ProductsPage from "./services/page";
import CustomersPage from "./customers/page";
import ContactPage from "./contact/page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section with Background Image */}
      <section id="hero" className="relative overflow-hidden bg-background py-20 sm:py-32">
        <Image
          src="/home_bg.png"
          alt="Fabrication background"
          fill
          className="absolute inset-0 object-cover dark:opacity-20"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl text-white font-bold tracking-tighter sm:text-6xl">
              Empowering Industries with Innovative Engineering
            </h1>
            <p className="mt-6  text-white text-lg leading-8">
              YVS Mechatronics is a trusted name in industrial automation, special-purpose machines, and precision engineering solutions.
            </p>
            <div className="mt-10 flex flex-col lg:flex-row items-center justify-center gap-x-6 gap-3">
              <Button size="lg" onClick={() => {
                const section = document.getElementById('services')
                section?.scrollIntoView({ behavior: 'smooth' })
              }}>
                Explore Our Solutions
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => {
                const section = document.getElementById('contact')
                section?.scrollIntoView({ behavior: 'smooth' })
              }}>
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section id="about">
        <AboutPage/>
      </section>
      
      {/* Services Section */}
      <section id="services">
        <ProductsPage/>
      </section>
      
      {/* Customers Section */}
      <section id="customers">
        <CustomersPage/>
      </section>
      
      {/* Optionally, add a Contact Section with id "contact" if needed */}
      <section id="contact">
        <ContactPage/>
      </section>
    </div>
  );
}
