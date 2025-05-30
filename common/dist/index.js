"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogObject = exports.createBlogObject = exports.signInObject = exports.signUpObject = void 0;
const zod_1 = require("zod");
exports.signUpObject = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    name: zod_1.z.string().optional()
});
exports.signInObject = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
exports.createBlogObject = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string()
});
exports.updateBlogObject = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string()
});
