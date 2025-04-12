import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    invoices: defineTable({
        storageId:v.string(),
        uploadedBy:v.string(),
        type: v.string(),
        fileUrl:v.string(),
    }),
    companyDocs: defineTable({
        name: v.string(),
        url: v.string(),
        storageId:v.string(),
        uploadedBy:v.string(),
    }),

    employees: defineTable({
        name: v.string(),
        role: v.string(),
        password: v.string(),
        imageUrl: v.optional(v.string()),
        email: v.string(),
        createdAt: v.number(),
        storageId:v.optional(v.string())
    }),

    portfolio: defineTable({
        name: v.string(),
        description: v.string(),
        logoUrl: v.optional(v.string()),
        storageId:v.optional(v.string()),
        image:v.optional(v.string())
    }),

    cadFiles: defineTable({
        storageId:v.string(),
        name: v.string(),
        url: v.string(),
        createdAt: v.number(),
        uploadedBy: v.string()
    }),
});
