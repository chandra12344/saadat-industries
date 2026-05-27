import Link from "next/link";
import {
  Factory,
  Phone,
  Mail,
  MapPin,
  FileText,
  ArrowRight,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

const productCategories = [
  { href: "/products?category=idler-rollers", label: "Idler Rollers" },
  { href: "/products?category=drum-pulleys", label: "Drum Pulleys" },
  { href: "/products?category=conveyor-belts", label: "Conveyor Belts" },
  { href: "/products?category=idler-frames", label: "Idler Frames" },
  { href: "/products?category=gear-boxes", label: "Gear Boxes" },
  { href: "/products?category=readymade-conveyors", label: "Readymade Conveyors" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-gray-300">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700 text-white">
                <Factory className="h-6 w-6" />
              </div>
              <div className="leading-tight">
                <span className="block text-lg font-bold tracking-tight text-white">
                  SAADAT
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-primary-400">
                  Industries
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Manufacturer of Idler Roller, Drum Pulley, and Readymade Conveyor
              Systems. Trusted partner for industrial conveyor solutions, proudly
              made in India.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <FileText className="h-3.5 w-3.5" />
              <span>GST: 27ASQPM4073K1Z6</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-primary-600 group-hover:text-primary-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Products
            </h3>
            <ul className="mt-4 space-y-2.5">
              {productCategories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-primary-600 group-hover:text-primary-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:+918850243463"
                  className="flex items-start gap-2.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                  <span>
                    88502 43463
                    <br />
                    86938 33530
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:saadatindustries007@gmail.com"
                  className="flex items-start gap-2.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                  <span>saadatindustries007@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-sm text-gray-400">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                  <span>
                    Village Dongi, Po. Pargoan Tal,
                    <br />
                    Panvel, Dist. Raigod,
                    <br />
                    Maharashtra - 410 206
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} SAADAT INDUSTRIES. All rights
              reserved.
            </p>
            <p className="text-xs text-gray-500">
              Made with pride in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
