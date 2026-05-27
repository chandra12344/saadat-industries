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

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          where: { active: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!category) {
      return Response.json({ error: "Category not found" }, { status: 404 });
    }

    return Response.json(category);
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return Response.json(
      { error: "Failed to fetch category" },
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

    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: "Category not found" }, { status: 404 });
    }

    const category = await prisma.category.update({
      where: { id },
      data: body,
    });

    return Response.json(category);
  } catch (error) {
    console.error("Failed to update category:", error);
    return Response.json(
      { error: "Failed to update category" },
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

    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: "Category not found" }, { status: 404 });
    }

    await prisma.category.delete({ where: { id } });

    return Response.json({ message: "Category deleted" });
  } catch (error) {
    console.error("Failed to delete category:", error);
    return Response.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
