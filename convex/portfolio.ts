import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addPortfolio = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    storageId: v.string(),
    storageId1:v.string(),
  },
  handler: async (ctx, { name, description, storageId, storageId1 }) => {
    return await ctx.db.insert("portfolio",
      {
        name,
        description,
        storageId:storageId,
        logoUrl:await ctx.storage.getUrl(storageId)??'',
        image:await ctx.storage.getUrl(storageId1)??''
      });
  },
});


import { query } from "./_generated/server";

export const getPortfolios = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("portfolio").collect();
  },
});
