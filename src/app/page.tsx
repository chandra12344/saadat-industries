import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  ArrowRight,
  Phone,
  Factory,
  Shield,
  Truck,
  Award,
  Users,
  Package,
  Layers,
  Wrench,
  CheckCircle,
  ChevronRight,
  Cog,
  Box,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true, active: true },
    include: { category: true },
    take: 8,
    orderBy: { order: "asc" },
  });

  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { order: "asc" },
  });

  const totalProducts = await prisma.product.count({ where: { active: true } });
  const totalCategories = await prisma.category.count();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary-900)_0%,_transparent_50%)] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-secondary-800)_0%,_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-700/20 px-4 py-1.5 text-sm font-medium text-primary-300 mb-6">
                <Factory className="h-4 w-4" />
                Make in India Manufacturer
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Industrial{" "}
                <span className="text-primary-500">Conveyor System</span>{" "}
                Components
              </h1>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-xl">
                SAADAT INDUSTRIES is a trusted manufacturer of high-quality
                conveyor system components including idler rollers, drum pulleys,
                conveyor belts, and complete readymade conveyor systems.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-700 px-6 py-3 text-base font-semibold text-white hover:bg-primary-800 transition-colors"
                >
                  View Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-600 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Get a Quote
                </Link>
              </div>
            </div>

            {/* Hero visual placeholder */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="h-80 w-80 rounded-full bg-primary-700/10 flex items-center justify-center">
                  <div className="h-60 w-60 rounded-full bg-primary-700/15 flex items-center justify-center">
                    <div className="h-40 w-40 rounded-full bg-primary-700/20 flex items-center justify-center">
                      <Cog className="h-20 w-20 text-primary-500" />
                    </div>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute top-4 right-0 rounded-lg bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-medium text-white">
                  <span className="text-accent-400 font-bold">{totalCategories}+</span> Categories
                </div>
                <div className="absolute bottom-8 left-0 rounded-lg bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-medium text-white">
                  <span className="text-accent-400 font-bold">{totalProducts}+</span> Products
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-8 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Layers,
                value: `${totalCategories}+`,
                label: "Product Categories",
              },
              {
                icon: Package,
                value: `${totalProducts}+`,
                label: "Products",
              },
              {
                icon: Users,
                value: "500+",
                label: "Happy Clients",
              },
              {
                icon: Award,
                value: "10+",
                label: "Years Experience",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-xl bg-white p-6 shadow-lg border border-gray-100 text-center"
              >
                <stat.icon className="mx-auto h-8 w-8 text-primary-700" />
                <p className="mt-2 text-2xl font-bold text-secondary-800">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">
                Our Products
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-secondary-800 sm:text-4xl">
                Featured Products
              </h2>
              <p className="mt-3 text-gray-500 max-w-2xl">
                Explore our range of high-quality conveyor system components
                engineered for durability and performance.
              </p>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-300"
              >
                <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <Box className="h-12 w-12 text-gray-300 group-hover:text-primary-300 transition-colors" />
                  )}
                </div>
                <div className="p-4">
                  <span className="inline-block rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 mb-2">
                    {product.category.name}
                  </span>
                  <h3 className="font-semibold text-secondary-800 group-hover:text-primary-700 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-700">
                    View Details
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">
              What We Offer
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-secondary-800 sm:text-4xl">
              Product Categories
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              We manufacture a comprehensive range of conveyor system components
              for diverse industrial applications.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group rounded-xl bg-white border border-gray-200 p-5 text-center hover:shadow-md hover:border-primary-200 transition-all duration-300"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 group-hover:bg-primary-100 transition-colors">
                  <Cog className="h-6 w-6 text-primary-700" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-secondary-800 group-hover:text-primary-700 transition-colors">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  {category._count.products}{" "}
                  {category._count.products === 1 ? "product" : "products"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">
              Our Advantages
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-secondary-800 sm:text-4xl">
              Why Choose SAADAT INDUSTRIES?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Premium Quality",
                description:
                  "Every product undergoes rigorous quality checks to ensure it meets the highest industrial standards and delivers reliable performance.",
              },
              {
                icon: Factory,
                title: "In-House Manufacturing",
                description:
                  "Our state-of-the-art manufacturing facility in Panvel, Maharashtra enables us to maintain complete control over product quality.",
              },
              {
                icon: Truck,
                title: "Timely Delivery",
                description:
                  "We understand the importance of deadlines. Our streamlined production process ensures on-time delivery every time.",
              },
              {
                icon: Wrench,
                title: "Custom Solutions",
                description:
                  "We offer customized conveyor components tailored to your specific industrial requirements and applications.",
              },
              {
                icon: Award,
                title: "Industry Expertise",
                description:
                  "With years of experience in conveyor system manufacturing, we bring deep technical knowledge to every project.",
              },
              {
                icon: CheckCircle,
                title: "After-Sales Support",
                description:
                  "Our commitment does not end at delivery. We provide comprehensive after-sales support and technical assistance.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 group-hover:bg-primary-100 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary-700" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-secondary-800">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Need Conveyor Components?
              </h2>
              <p className="mt-3 text-lg text-primary-100 max-w-2xl">
                Get in touch with us for high-quality conveyor system components.
                We offer competitive pricing and prompt delivery across India.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary-700 hover:bg-gray-100 transition-colors"
              >
                Send Inquiry
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+918850243463"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <Phone className="h-4 w-4" />
                88502 43463
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
