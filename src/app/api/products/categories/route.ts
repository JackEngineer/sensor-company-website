import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// 获取所有产品分类（自动聚合）
export async function GET() {
  const dir = path.join(process.cwd(), "data/products");
  const files = await fs.readdir(dir);
  const products = await Promise.all(
    files
      .filter((file) => file.endsWith(".json"))
      .map(async (file) =>
        JSON.parse(await fs.readFile(path.join(dir, file), "utf-8"))
      )
  );
  // 聚合分类
  const categories: Record<string, Set<string>> = {};
  products.forEach((p) => {
    if (!categories[p.category]) categories[p.category] = new Set();
    if (p.subcategory) categories[p.category].add(p.subcategory);
  });
  // 转换为树形结构
  const result = Object.entries(categories).map(([name, subs]) => ({
    name,
    subcategories: Array.from(subs).map((sub) => ({ name: sub })),
  }));
  return NextResponse.json(result);
}
