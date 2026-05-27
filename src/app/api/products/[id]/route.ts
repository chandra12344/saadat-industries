import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const by = searchParams.get("by");

    let product;

    if (by === "slug") {
      product = await prisma.product.findUnique({
        where: { slug: id },
        include: { category: true },
      });
    } else {
      product = await prisma.product.findUnique({
        where: { id },
        include: { category: true },
      });
    }

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return Response.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    const product = await prisma.product.update({
      where: { id },
      data: body,
      include: { category: true },
    });

    return Response.json(product);
  } catch (error) {
    console.error("Failed to update product:", error);
    return Response.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({ where: { id } });

    return Response.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Failed to delete product:", error);
    return Response.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
