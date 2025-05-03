import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import type { Application } from "@/app/application/application.types";

const getApplications = (): Application[] => {
  const filePath = path.join(
    process.cwd(),
    "data/applications/applications.json"
  );
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

export default function ApplicationListPage() {
  const applications = getApplications();
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-brand">应用场景</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {applications.map((app) => (
          <Link
            key={app.scene}
            href={`/application/${encodeURIComponent(app.scene)}`}
            tabIndex={0}
            aria-label={`查看${app.scene}详情`}
            className="group rounded-lg shadow bg-white hover:shadow-lg focus:ring-2 focus:ring-brand transition outline-none flex flex-col cursor-pointer"
          >
            <div className="relative w-full h-48">
              <Image
                src={app.image}
                alt={app.scene}
                fill
                className="rounded-t-lg object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={false}
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h2
                className="text-lg font-semibold mb-1 text-brand"
                tabIndex={-1}
              >
                {app.scene}
              </h2>
              <p className="text-gray-600 flex-1">{app.desc}</p>
              <div className="mt-2 text-sm text-blue-600">
                推荐产品：{app.products.join("、")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

// tailwind.config.js 需配置 theme.extend.colors.brand = '#0052D9'
