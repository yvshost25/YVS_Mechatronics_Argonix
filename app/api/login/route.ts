import { NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const isSimplifiedLogin = !body.name && !body.role;
    let response;

    // Handle simplified login (email and password only)
    if (isSimplifiedLogin) {
      if (!email || !password) {
        return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
      }

      const user = await convex.query(api.employees.getEmployeeByEmail, { email });

      if (!user || user.password !== password) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      response = NextResponse.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        imageUrl: user.imageUrl,
      });
    } 
    // Handle traditional login (with name and role)
    else {
      const { name, role } = body;
      
      if (!name || !email || !password || !role) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      const user = await convex.query(api.employees.getEmployeeByEmail, { email });

      if (!user || user.password !== password || user.role !== role || user.name !== name) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      response = NextResponse.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        imageUrl: user.imageUrl,
      });
    }

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
