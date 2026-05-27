import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json(inquiries);
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    return Response.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: "Name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        subject,
        message,
      },
    });

    return Response.json(inquiry, { status: 201 });
  } catch (error) {
    console.error("Failed to create inquiry:", error);
    return Response.json(
      { error: "Failed to create inquiry" },
      { status: 500 }
    );
  }
}
