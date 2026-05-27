import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  ArrowLeft,
  Box,
  CheckCircle,
  ChevronRight,
  Phone,
  Tag,
  Mail,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    return { title: "Product Not Found - SAADAT INDUSTRIES" };
  }

  return {
    title: `${product.name} - SAADAT INDUSTRIES`,
    description: product.description || `${product.name} by SAADAT INDUSTRIES`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      active: true,
    },
    take: 4,
    orderBy: { order: "asc" },
    include: { category: true },
  });

  const features = product.features
    ? product.features.split("|").map((f) => f.trim())
    : [];

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href="/products"
              className="hover:text-primary-700 transition-colors"
            >
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href={`/products?category=${product.category.slug}`}
              className="hover:text-primary-700 transition-colors"
            >
              {product.category.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-secondary-800 font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </section>

      {/* Product detail */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary-700 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Product image placeholder */}
            <div className="aspect-square rounded-2xl bg-gray-100 flex items-center justify-center border border-gray-200">
              <div className="text-center">
                <Box className="mx-auto h-24 w-24 text-gray-300" />
                <p className="mt-4 text-sm text-gray-400">Product Image</p>
              </div>
            </div>

            {/* Product info */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                <Tag className="h-3.5 w-3.5" />
                {product.category.name}
              </span>

              <h1 className="mt-4 text-3xl font-bold text-secondary-800 sm:text-4xl">
                {product.name}
              </h1>

              {product.description && (
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Features */}
              {features.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-secondary-800 mb-4">
                    Key Features
                  </h2>
                  <ul className="space-y-2.5">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="mt-8 rounded-xl bg-gray-50 border border-gray-200 p-6">
                <h3 className="font-semibold text-secondary-800">
                  Interested in this product?
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Contact us for pricing, customization, and bulk orders.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/contact?product=${encodeURIComponent(product.name)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Send Inquiry
                  </Link>
                  <a
                    href="tel:+918850243463"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-secondary-700 hover:bg-gray-100 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="py-14 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-secondary-800 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.slug}`}
                  className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                    <Box className="h-12 w-12 text-gray-300 group-hover:text-primary-300 transition-colors" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-secondary-800 group-hover:text-primary-700 transition-colors line-clamp-2">
                      {related.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {related.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-700">
                      View Details
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
