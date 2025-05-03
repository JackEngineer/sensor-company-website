import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: Request, context: any) {
  const { params } = context;
  const dir = path.join(process.cwd(), "data/products");
  const files = await fs.readdir(dir);
  for (const file of files) {
    if (file.endsWith(".json")) {
      const product = JSON.parse(
        await fs.readFile(path.join(dir, file), "utf-8")
      );
      if (product.model === params.model) {
        return NextResponse.json(product);
      }
    }
  }
  return NextResponse.json({ error: "未找到该产品" }, { status: 404 });
}
