import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];

    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: "File type not allowed. Accepted: JPEG, PNG, GIF, WebP, SVG" },
        { status: 400 }
      );
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return Response.json(
        { error: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || ".jpg";
    const sanitizedName = file.name
      .replace(ext, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase();
    const uniqueName = `${sanitizedName}-${Date.now()}${ext}`;

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, uniqueName);
    await writeFile(filePath, buffer);

    const publicPath = `/uploads/${uniqueName}`;

    return Response.json({ path: publicPath }, { status: 201 });
  } catch (error) {
    console.error("Failed to upload file:", error);
    return Response.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
