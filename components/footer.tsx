import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              YVS Mechotronics is a leading manufacturer of special purpose machines,
              CNC, and precision machining solutions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/customers" className="text-sm text-muted-foreground hover:text-foreground">
                  Customers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-muted-foreground">
                123 Industrial Area
              </li>
              <li className="text-sm text-muted-foreground">
                Hyd, Telangana
              </li>
              <li className="text-sm text-muted-foreground">
                Phone: +91 123 456 7890
              </li>
              <li className="text-sm text-muted-foreground">
                Email: info@yvsmechotronics.com
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} YVS Mechotronics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer