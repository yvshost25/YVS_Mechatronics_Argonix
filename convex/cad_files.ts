import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/** 📌 Generate Upload URL (for all file types) */
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

/** 📌 Store CAD File Entry in Convex */
export const AddCADFileEntryToDb = mutation({
  args: {
    storageId: v.string(),
    fileName: v.string(),
    uploadedBy: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("cadFiles", {
      storageId:args.storageId,
      name: args.fileName,
      url: await ctx.storage.getUrl(args.storageId)??'',
      createdAt: Date.now(),
      uploadedBy: args.uploadedBy,
    });
    return "CAD file uploaded successfully!";
  },
});

/** 📌 Get File URL by Storage ID */
export const getCADFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});

/** 📌 Get All CAD Files Query */
export const GetAllCADFiles = query({
  handler: async (ctx) => {
    let q = ctx.db.query("cadFiles");
    return await q.collect();
  },
});
