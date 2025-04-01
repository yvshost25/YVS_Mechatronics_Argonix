import { NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await convex.query(api.employees.getEmployeeByEmail, { email });

    if (!user || user.password !== password || user.role !== role || user.name !== name) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const response = NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      imageUrl: user.imageUrl,
    });

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}