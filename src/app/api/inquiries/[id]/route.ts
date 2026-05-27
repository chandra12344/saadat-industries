import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const inquiry = await prisma.inquiry.findUnique({ where: { id } });

    if (!inquiry) {
      return Response.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return Response.json(inquiry);
  } catch (error) {
    console.error("Failed to fetch inquiry:", error);
    return Response.json(
      { error: "Failed to fetch inquiry" },
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

    const existing = await prisma.inquiry.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: "Inquiry not found" }, { status: 404 });
    }

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        read: body.read ?? existing.read,
      },
    });

    return Response.json(inquiry);
  } catch (error) {
    console.error("Failed to update inquiry:", error);
    return Response.json(
      { error: "Failed to update inquiry" },
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

    const existing = await prisma.inquiry.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: "Inquiry not found" }, { status: 404 });
    }

    await prisma.inquiry.delete({ where: { id } });

    return Response.json({ message: "Inquiry deleted" });
  } catch (error) {
    console.error("Failed to delete inquiry:", error);
    return Response.json(
      { error: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
