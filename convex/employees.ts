import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addEmployee = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.string(),
    password: v.string(),
    storageId: v.optional(v.string()),
  },
  handler: async (ctx, { name, email, role, password, storageId }) => {
    const imageUrl = storageId ? await ctx.storage.getUrl(storageId) : "";
    return await ctx.db.insert("employees", {
      name,
      email,
      role,
      password,
      imageUrl:imageUrl??'',
      createdAt: Date.now(),
    });
  },
});

export const getEmployees = query({
  handler: async (ctx) => {
    return await ctx.db.query("employees").collect();
  },
});

export const getEmployeeByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    return await ctx.db.query("employees").filter((q) => q.eq(q.field("email"), email)).first();
  },
});

export const updateEmployee = mutation({
  args: {
    email: v.string(),
    role: v.string(),
    password: v.string(),
    name: v.string(),
    storageId: v.optional(v.string()),
  },
  handler: async (ctx, { email, role, password, name, storageId }) => {
    const employee = await ctx.db.query("employees").filter((q) => q.eq(q.field("email"), email)).first();
    const imageUrl = storageId ? await ctx.storage.getUrl(storageId) : "";
    if (!employee) throw new Error("Employee not found");

    return await ctx.db.patch(employee._id, { role, email, password, name, imageUrl:imageUrl??'' });
  },
});

export const deleteEmployee = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const employee = await ctx.db.query("employees").filter((q) => q.eq(q.field("email"), email)).first();
    if (!employee) throw new Error("Employee not found");
    return await ctx.db.delete(employee._id);
  },
});