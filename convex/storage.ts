import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/** 📌 Generate Upload URL (Common for all files) */
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

/** 📌 Store Invoices in Convex */
export const AddInvoiceFile = mutation({
  args: {
    storageId: v.string(),
    fileName: v.string(),
    uploadedBy: v.string(),
    fileUrl: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("invoices", {
      type: "invoice",
      amount: 0, // Amount can be updated later
      createdAt: Date.now(),
    });

    return "Invoice file uploaded successfully!";
  },
});

/** 📌 Store Company Docs */
export const AddCompanyDoc = mutation({
  args: {
    storageId: v.string(),
    fileName: v.string(),
    uploadedBy: v.string(),
    fileUrl: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("companyDocs", {
      name: args.fileName,
      url: args.fileUrl,
      createdAt: Date.now(),
    });

    return "Company document uploaded successfully!";
  },
});

/** 📌 Store CAD Files */
export const AddCADFile = mutation({
  args: {
    storageId: v.string(),
    fileName: v.string(),
    uploadedBy: v.string(),
    fileUrl: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("cadFiles", {
      name: args.fileName,
      url: args.fileUrl,
      createdAt: Date.now(),
    });

    return "CAD file uploaded successfully!";
  },
});

/** 📌 Store Portfolio Logo */
export const AddPortfolioLogo = mutation({
  args: {
    storageId: v.string(),
    fileName: v.string(),
    uploadedBy: v.string(),
    fileUrl: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("portfolio", {
      name: args.fileName,
      description: "Portfolio Logo",
      logoUrl: args.fileUrl,
      createdAt: Date.now(),
    });

    return "Portfolio logo uploaded successfully!";
  },
});

/** 📌 Get File URL by Storage ID */
export const getFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

