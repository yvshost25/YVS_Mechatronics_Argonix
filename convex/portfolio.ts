import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Add Portfolio Mutation
export const addPortfolio = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    storageId: v.string(),
    storageId1: v.string(),
  },
  handler: async (ctx, { name, description, storageId, storageId1 }) => {
    return await ctx.db.insert("portfolio", {
      name,
      description,
      storageId: storageId,
      logoUrl: await ctx.storage.getUrl(storageId) ?? '',
      image: await ctx.storage.getUrl(storageId1) ?? '',
    });
  },
});

// Get Portfolios Query
import { query } from "./_generated/server";

export const getPortfolios = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("portfolio").collect();
  },
});

// Update Portfolio Mutation
export const updatePortfolio = mutation({
  args: {
    _id: v.string(),
    name: v.string(),
    description: v.string(),
    storageId: v.string(),
    storageId1: v.string(),
  },
  handler: async (ctx, { _id, name, description, storageId, storageId1 }) => {
    const logoUrl = await ctx.storage.getUrl(storageId) ?? '';
    const imageUrl = await ctx.storage.getUrl(storageId1) ?? '';

    const portfolio = await ctx.db.query("portfolio").filter((q) => q.eq(q.field("_id"), _id)).first();
    if (!portfolio) throw new Error("Employee not found");

    await ctx.db.patch(portfolio?._id, {
      name,
      description,
      storageId:storageId1,
      logoUrl,
      image: imageUrl,
    });

    return { success: true };
  },
});

// Delete Portfolio Mutation
export const deletePortfolio = mutation({
  args: {
    _id: v.string(),
  },
  handler: async (ctx, { _id }) => {
    const portfolio = await ctx.db.query("portfolio").filter((q) => q.eq(q.field("_id"), _id)).first();
    if (!portfolio) throw new Error("Employee not found");
    await ctx.db.delete(portfolio._id);
    return { success: true };
  },
});