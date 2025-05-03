import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Application } from "@/app/application/application.types";

export default function ApplicationDetailPage({
  params,
}: {
  params: { scene: string };
}) {
  const applications = getApplications();
  const app = applications.find(
    (a) => a.scene === decodeURIComponent(params.scene)
  );
  if (!app) return notFound();

  return (
    <main className="container mx-auto py-8 px-4">
      <Link
        href="/application"
        className="text-brand mb-4 inline-block focus:underline"
        tabIndex={0}
        aria-label="返回应用场景列表"
      >
        ← 返回应用场景列表
      </Link>
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow p-4">
        <div className="relative w-full md:w-1/2 h-64 md:h-80">
          <Image
            src={app.image}
            alt={app.scene}
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-bold mb-2 text-brand">{app.scene}</h1>
          <p className="mb-4 text-gray-700">{app.details}</p>
          <div className="mb-4">
            <span className="font-semibold">推荐产品：</span>
            {app.products.map((model) => (
              <Link
                key={model}
                href={`/products/${model}`}
                className="text-blue-600 underline mr-2 focus:underline"
                tabIndex={0}
                aria-label={`跳转到产品${model}详情`}
              >
                {model}
              </Link>
            ))}
          </div>
          {app.downloads && app.downloads.length > 0 && (
            <div className="mb-4">
              <span className="font-semibold">相关资料：</span>
              {app.downloads.map((d) => (
                <a
                  key={d.url}
                  href={d.url}
                  className="text-blue-600 underline mr-2 focus:underline"
                  target="_blank"
                  rel="noopener"
                  tabIndex={0}
                  aria-label={`下载${d.name}`}
                >
                  {d.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const getApplications = (): Application[] => {
  const filePath = path.join(
    process.cwd(),
    "data/applications/applications.json"
  );
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};
