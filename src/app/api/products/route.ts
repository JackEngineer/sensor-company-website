import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// 获取所有产品数据
async function getAllProducts() {
  const dir = path.join(process.cwd(), "data/products");
  const files = await fs.readdir(dir);
  const products = await Promise.all(
    files
      .filter((file) => file.endsWith(".json"))
      .map(async (file) =>
        JSON.parse(await fs.readFile(path.join(dir, file), "utf-8"))
      )
  );
  return products;
}

// GET /api/products?category=&subcategory=&page=&pageSize=&keyword=
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category")
    ? decodeURIComponent(searchParams.get("category")!)
    : undefined;
  const subcategory = searchParams.get("subcategory")
    ? decodeURIComponent(searchParams.get("subcategory")!)
    : undefined;
  const keyword = searchParams.get("keyword")?.toLowerCase() || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "12", 10);

  let products = await getAllProducts();

  if (category) products = products.filter((p) => p.category === category);
  if (subcategory)
    products = products.filter((p) => p.subcategory === subcategory);
  if (keyword)
    products = products.filter(
      (p) =>
        p.model.toLowerCase().includes(keyword) ||
        p.title.toLowerCase().includes(keyword)
    );

  const total = products.length;
  const items = products.slice((page - 1) * pageSize, page * pageSize);

  return NextResponse.json({ items, total });
}
