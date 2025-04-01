import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/** 📌 Generate Upload URL (Common for all files) */
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});