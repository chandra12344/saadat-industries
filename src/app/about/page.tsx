import {
  Factory,
  Target,
  Eye,
  Shield,
  Award,
  Wrench,
  Truck,
  Users,
  CheckCircle,
  Cog,
  Hammer,
  Gauge,
} from "lucide-react";

export const metadata = {
  title: "About Us - SAADAT INDUSTRIES",
  description:
    "Learn about SAADAT INDUSTRIES - a leading manufacturer of conveyor system components based in Panvel, Maharashtra, India.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-secondary-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              About SAADAT INDUSTRIES
            </h1>
            <p className="mt-3 text-lg text-gray-300">
              A trusted name in conveyor system component manufacturing,
              delivering quality and reliability since our inception.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">
                Our Story
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-secondary-800">
                Building India&apos;s Industrial Future
              </h2>
              <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  SAADAT INDUSTRIES was established with a clear vision: to
                  provide world-class conveyor system components to industries
                  across India. Based in Panvel, Maharashtra, we have grown to
                  become a trusted partner for businesses that depend on
                  efficient material handling solutions.
                </p>
                <p>
                  Our manufacturing facility is equipped with modern machinery
                  and staffed by skilled professionals who share our commitment
                  to quality. We take pride in our ability to deliver products
                  that meet the most demanding industrial requirements.
                </p>
                <p>
                  From idler rollers and drum pulleys to complete readymade
                  conveyor systems, every product that leaves our facility
                  undergoes rigorous quality checks to ensure it performs
                  reliably in the field.
                </p>
              </div>
            </div>

            {/* Visual placeholder */}
            <div className="rounded-2xl bg-gray-100 aspect-[4/3] flex items-center justify-center border border-gray-200">
              <div className="text-center">
                <Factory className="mx-auto h-20 w-20 text-gray-300" />
                <p className="mt-4 text-sm text-gray-400">
                  Manufacturing Facility
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50">
                <Target className="h-7 w-7 text-primary-700" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-secondary-800">
                Our Mission
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                To be the most reliable manufacturer of conveyor system
                components in India by consistently delivering products that
                exceed industry standards. We are committed to innovation,
                quality, and customer satisfaction in every product we
                manufacture.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Deliver superior quality products",
                  "Maintain competitive and fair pricing",
                  "Ensure on-time delivery commitments",
                  "Provide excellent customer support",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 shrink-0 text-primary-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent-50">
                <Eye className="h-7 w-7 text-accent-600" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-secondary-800">
                Our Vision
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                To become a nationally recognized leader in conveyor system
                manufacturing, known for engineering excellence, product
                innovation, and unwavering commitment to quality that drives
                India&apos;s industrial growth forward.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Expand product range with innovative solutions",
                  "Build long-term partnerships with clients",
                  "Contribute to Make in India initiative",
                  "Set new benchmarks in quality standards",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 shrink-0 text-accent-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">
              Our Strengths
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-secondary-800 sm:text-4xl">
              Why Choose Us
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              We combine engineering expertise with manufacturing excellence to
              deliver products you can trust.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Quality Assurance",
                description:
                  "Every product passes rigorous quality checks before dispatch. We maintain strict quality control at every stage of production.",
              },
              {
                icon: Award,
                title: "Industry Expertise",
                description:
                  "Our team brings years of experience in conveyor component manufacturing, ensuring products that meet real-world demands.",
              },
              {
                icon: Wrench,
                title: "Customization",
                description:
                  "We offer tailored solutions to meet your specific requirements. Custom dimensions, materials, and specifications available.",
              },
              {
                icon: Truck,
                title: "Pan India Delivery",
                description:
                  "Reliable and timely delivery across India. Our logistics network ensures your orders reach you on schedule.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50">
                  <item.icon className="h-7 w-7 text-primary-700" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-secondary-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities */}
      <section className="py-16 lg:py-24 bg-secondary-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-400">
              Our Facility
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Manufacturing Capabilities
            </h2>
            <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
              Our modern manufacturing facility is equipped with advanced
              machinery to produce high-precision conveyor components.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Cog,
                title: "CNC Machining",
                description:
                  "Precision CNC machines for accurate manufacturing of pulleys, shafts, and other critical components.",
              },
              {
                icon: Hammer,
                title: "Fabrication",
                description:
                  "Full fabrication capabilities including welding, cutting, bending, and assembly of conveyor frames and structures.",
              },
              {
                icon: Gauge,
                title: "Quality Testing",
                description:
                  "Comprehensive testing equipment for dimensional accuracy, load testing, and material verification.",
              },
              {
                icon: Factory,
                title: "Assembly Line",
                description:
                  "Dedicated assembly area for complete conveyor system assembly, testing, and quality verification before dispatch.",
              },
              {
                icon: Wrench,
                title: "Roller Manufacturing",
                description:
                  "Specialized roller manufacturing line for producing idler rollers, carrying rollers, and return rollers.",
              },
              {
                icon: Users,
                title: "Skilled Workforce",
                description:
                  "Experienced engineers and technicians who bring expertise and attention to detail to every product.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors"
              >
                <item.icon className="h-8 w-8 text-primary-400" />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "10+", label: "Years in Business" },
              { value: "18+", label: "Product Categories" },
              { value: "500+", label: "Happy Clients" },
              { value: "1000+", label: "Products Delivered" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-bold text-primary-700">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
