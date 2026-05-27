import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return Response.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return Response.json(
      { error: "Failed to fetch categories" },
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
    const { name, slug, description, image, order } = body;

    if (!name) {
      return Response.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const categorySlug = slug || slugify(name, { lower: true, strict: true });

    const existing = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (existing) {
      return Response.json(
        { error: "A category with this slug already exists" },
        { status: 409 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug: categorySlug,
        description: description || null,
        image: image || null,
        order: order ?? 0,
      },
    });

    return Response.json(category, { status: 201 });
  } catch (error) {
    console.error("Failed to create category:", error);
    return Response.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
