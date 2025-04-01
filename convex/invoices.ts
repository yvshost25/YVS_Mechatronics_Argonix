import { convexToJson, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addInvoice = mutation({
  args: {
    type: v.string(),
    storageId: v.string(),
    uploadedBy: v.string(),
  },
  handler: async (ctx, { type, storageId, uploadedBy }) => {
    // Retrieve the file URL using the storageId
    const fileUrl = await ctx.storage.getUrl(storageId);

    // Insert the invoice record into the database
    return await ctx.db.insert("invoices", {
      type: type,
      storageId: storageId,
      uploadedBy: uploadedBy,
      fileUrl: fileUrl || "", // Use an empty string if the URL is not found
    });
  },
});

export const getInvoices = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("invoices").collect();
  },
});