import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const uploadedBy = formData.get("uploadedBy") as string;
    const storageId = formData.get("storageId") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 3. Store file metadata in Convex using the AddCADFileEntryToDb mutation.
    const addResult = await convex.mutation(api.cad_files.AddCADFileEntryToDb, {
      storageId:storageId,
      fileName: file.name,
      uploadedBy
    });
    console.log("Add CAD file result:", addResult);

    return NextResponse.json({
      message: "File uploaded successfully",
      file: addResult,
    });
  } catch (error) {
    console.error("Error in CAD file upload:", error);
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
}
