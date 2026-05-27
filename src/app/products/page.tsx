import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import ProductSearch from "@/components/ProductSearch";
import { Box, ChevronRight, Package } from "lucide-react";

export const metadata = {
  title: "Products - SAADAT INDUSTRIES",
  description:
    "Browse our complete range of conveyor system components including idler rollers, drum pulleys, conveyor belts, and more.",
};

async function ProductGrid({
  category,
  q,
}: {
  category?: string;
  q?: string;
}) {
  const where: Record<string, unknown> = { active: true };

  if (category) {
    where.category = { slug: category };
  }
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { description: { contains: q } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });

  if (products.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
        <Package className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-4 text-lg font-semibold text-secondary-800">
          No products found
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Try adjusting your search or filter to find what you are looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.slug}`}
          className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-300"
        >
          <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
            {product.image ? (
              <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
            ) : (
              <Box className="h-14 w-14 text-gray-300 group-hover:text-primary-300 transition-colors" />
            )}
          </div>
          <div className="p-5">
            <span className="inline-block rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 mb-2">
              {product.category.name}
            </span>
            <h3 className="font-semibold text-secondary-800 group-hover:text-primary-700 transition-colors line-clamp-2">
              {product.name}
            </h3>
            <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">
              {product.description}
            </p>
            {product.features && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {product.features
                  .split("|")
                  .slice(0, 3)
                  .map((feat, i) => (
                    <span
                      key={i}
                      className="inline-block rounded bg-gray-50 px-2 py-0.5 text-xs text-gray-500"
                    >
                      {feat.trim()}
                    </span>
                  ))}
              </div>
            )}
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-700">
              View Details
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const category = typeof params.category === "string" ? params.category : undefined;
  const q = typeof params.q === "string" ? params.q : undefined;

  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { order: "asc" },
  });

  return (
    <>
      {/* Page header */}
      <section className="bg-secondary-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Our Products
            </h1>
            <p className="mt-3 text-lg text-gray-300">
              Explore our complete range of conveyor system components,
              manufactured with precision and built to last.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and grid */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={null}>
            <ProductSearch categories={categories} />
          </Suspense>

          <div className="mt-8">
            <ProductGrid category={category} q={q} />
          </div>
        </div>
      </section>
    </>
  );
}
