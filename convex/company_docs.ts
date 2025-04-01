import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/** 📌 Add a new company document */
export const addCompanyDoc = mutation({
  args: {
    name: v.string(),
    storageId: v.string(),
    uploadedBy: v.string(),
  },
  handler: async (ctx, { name, storageId, uploadedBy }) => {
    // Retrieve the file URL using the storageId
    const fileUrl = await ctx.storage.getUrl(storageId);

    // Insert the document record into the database
    return await ctx.db.insert("companyDocs", {
      name: name,
      url: fileUrl || "", // Use an empty string if the URL is not found
      storageId: storageId,
      uploadedBy: uploadedBy,
    });
  },
});

/** 📌 Get all company documents */
export const getCompanyDocs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("companyDocs").collect();
  },
});