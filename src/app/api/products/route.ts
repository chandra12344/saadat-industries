import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const all = searchParams.get("all");

    const where: Record<string, unknown> = {};
    if (all !== "true") {
      where.active = true;
    }

    if (category) {
      where.category = { slug: category };
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { order: "asc" },
    });

    return Response.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, description, features, price, categoryId, featured, image } = body;

    if (!name || !categoryId) {
      return Response.json(
        { error: "Name and categoryId are required" },
        { status: 400 }
      );
    }

    const productSlug = slug || slugify(name, { lower: true, strict: true });

    const existing = await prisma.product.findUnique({
      where: { slug: productSlug },
    });

    if (existing) {
      return Response.json(
        { error: "A product with this slug already exists" },
        { status: 409 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug: productSlug,
        description: description || null,
        features: features || null,
        price: price || null,
        categoryId,
        featured: featured || false,
        image: image || null,
      },
      include: { category: true },
    });

    return Response.json(product, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);
    return Response.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
