# 东莞市南至巅传感器科技有限公司门户网站建设方案

## 公司基本信息

- ​**公司名称**: 东莞市南至巅传感器科技有限公司  
  DONGGUAN NANZHIDIAN TECHNOLOGY CO.,LTD
- ​**联系方式**:
  - 电话: +86-755-81491786/81491789
  - 传真: +86-755-33855909
  - 邮箱: <2733924602@qq.com>
  - QQ: 2733924602
  - 地址: 东莞市樟木头镇樟深大道南 2318 号三楼
- ​**品牌定位**: "高精密·高性能·长寿命·超小型·超短型·区域型"
- ​**核心业务**: 集研发、生产、销售于一体的传感器解决方案

---

## 一、项目技术架构

- **前端框架**：Next.js（App Router 模式，支持 SSR/SSG）
- **开发语言**：TypeScript
- **样式方案**：Tailwind CSS
- **响应式设计**：兼容 PC 与移动端
- **内容管理**：产品数据可采用 JSON/MDX/Markdown 结构化管理
- **静态资源**：产品图片、结构图等统一归档

## 二、推荐目录结构（src/app）

```
src/
  app/
    layout.tsx         // 全局布局
    page.tsx           // 首页
    products/          // 产品中心
      page.tsx         // 产品总览
      [category]/      // 产品分类（如 inductive、photoelectric 等）
        page.tsx       // 分类下产品列表
        [model]/       // 具体型号
          page.tsx     // 产品详情页
    about/             // 关于我们
      page.tsx
    contact/           // 联系我们
      page.tsx
    application/       // 应用场景
      page.tsx
    assets/            // 静态资源（产品图、结构图等）
    api/               // 数据接口（如有需要）
```

## 三、页面与内容设计

### 1. 首页（/）

- 公司简介、主营产品、核心优势、应用领域概览
- 轮播图（公司形象、主打产品、应用场景）
- 快速导航至产品中心、应用场景、联系我们等

### 2. 产品中心（/products）

- **产品分类导航**：如电感式接近开关、光电/激光、光纤、放大器、方形、插件式等
- **分类页**（如 /products/inductive）：
  - 分类简介
  - 型号列表（卡片式/表格式展示，含产品图、主要参数摘要、详情链接）
- **产品详情页**（如 /products/inductive/M12）：
  - 产品名称、型号
  - 产品实物图、结构图（图片占位，支持放大预览）
  - 详细参数表（严格按照《PRODUCT.md》格式，字段统一、单位规范）
  - 应用场景说明
  - 下载资料（如有）

### 3. 应用场景（/application）

- 各类传感器的典型应用场景介绍
- 场景图片/示意图
- 推荐产品型号

### 4. 关于我们（/about）

- 公司介绍、发展历程、资质荣誉、团队风采等

### 5. 联系我们（/contact）

- 联系方式、在线留言表单、地图导航

## 四、数据与内容管理

### 1. 产品数据结构设计

- **多级分类结构**：建议采用"产品大类 > 子类 > 型号"三级结构，便于扩展和检索。
- **标准化字段**：所有产品参数表字段统一命名、单位、顺序，便于前端渲染和后期维护。
- **图片与文档关联**：每个产品可关联多张图片（实物图、结构图、应用图），支持图片说明和排序。
- **应用场景结构**：每个产品可配置适用的典型应用场景，场景可单独维护并与产品多对多关联。
- **资料下载**：支持为每个产品配置资料下载链接（如 PDF 手册、认证证书等）。

#### TypeScript Interface 示例

```ts
export interface Product {
  model: string; // 型号，必填
  title: string; // 产品名称，必填
  category: string; // 产品大类，必填
  subcategory?: string; // 子类，可选
  parameters: Array<{
    参数: string; // 参数名，必填
    数值: string | number; // 参数值，必填
    单位?: string; // 单位，可选
  }>;
  images: Array<{
    type: "product" | "structure" | "application";
    url: string;
    desc?: string;
  }>;
  applications?: Array<{
    scene: string;
    desc: string;
  }>;
  downloads?: Array<{
    name: string;
    url: string;
  }>;
  i18n?: {
    zh: Partial<Product>;
    en: Partial<Product>;
  };
}
```

#### JSON Schema 示例

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Product",
  "type": "object",
  "required": ["model", "title", "category", "parameters", "images"],
  "properties": {
    "model": { "type": "string" },
    "title": { "type": "string" },
    "category": { "type": "string" },
    "subcategory": { "type": "string" },
    "parameters": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["参数", "数值"],
        "properties": {
          "参数": { "type": "string" },
          "数值": { "type": ["string", "number"] },
          "单位": { "type": "string" }
        }
      }
    },
    "images": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["type", "url"],
        "properties": {
          "type": { "type": "string" },
          "url": { "type": "string" },
          "desc": { "type": "string" }
        }
      }
    },
    "applications": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["scene", "desc"],
        "properties": {
          "scene": { "type": "string" },
          "desc": { "type": "string" }
        }
      }
    },
    "downloads": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["name", "url"],
        "properties": {
          "name": { "type": "string" },
          "url": { "type": "string" }
        }
      }
    },
    "i18n": {
      "type": "object",
      "properties": {
        "zh": { "$ref": "#/definitions/partialProduct" },
        "en": { "$ref": "#/definitions/partialProduct" }
      }
    }
  },
  "definitions": {
    "partialProduct": {
      "type": "object"
    }
  }
}
```

### 2. 内容维护与扩展流程建议

- **集中管理**：所有产品数据、图片、资料建议集中存放于 `/data`、`/public/assets` 等目录，便于版本控制。
- **结构化录入**：新增产品时，按统一 JSON/MDX 模板补充参数、图片、应用场景等，减少遗漏。
- **自动化校验**：可编写脚本校验数据完整性（如必填字段、图片路径、参数单位等），提升数据质量。
- **多语言支持**：如有国际化需求，建议参数、描述、应用场景等字段支持中英文双语。
- **内容更新流程**：

  1. 产品经理/技术人员补充或修改产品数据文件
  2. 前端开发同步数据，自动渲染页面
  3. 定期校验和备份数据，确保内容安全

- **版本管理**：所有内容变更建议通过 Git 进行版本管理，便于追溯和协作。

### 3. 数据持久化建议

- **本地文件存储**：

  - 适用于产品数量有限、内容变更频率较低的中小型项目。
  - 推荐将产品数据、应用场景等以 JSON、YAML 或 MDX 文件形式存放于 `/data` 目录，图片等资源存放于 `/public/assets`。
  - 结合 Next.js 的 `getStaticProps`/`getStaticPaths` 或 App Router 的 `fetch`/`fs` 读取本地数据，实现静态生成（SSG）或服务端渲染（SSR）。

- **数据库存储**：

  - 适用于产品线丰富、内容频繁变更、需支持后台管理或多用户协作的中大型项目。
  - 可选用 MongoDB、PostgreSQL、MySQL、SQLite 等数据库，结合 Prisma、Mongoose 等 ORM 工具进行数据建模和管理。
  - Next.js 可通过 API 路由（如 `/app/api/products`）实现数据的增删改查，支持前后端分离和动态内容渲染。

- **混合方案**：

  - 静态内容（如公司介绍、固定产品参数）用本地文件，动态内容（如新闻、客户留言）用数据库。

- **数据备份与安全**：

  - 定期备份本地数据文件或数据库，防止数据丢失。
  - 生产环境下数据库需做好权限管理和安全加固。

- **内容管理系统（CMS）扩展**：
  - 如需更友好的内容维护体验，可集成 Headless CMS（如 Strapi、Sanity、Contentful），通过 API 管理产品数据。

## 五、风格与交互建议

- 统一色彩与品牌视觉
- 响应式布局，兼容 PC 与移动端
- 产品参数表格可横向滚动，图片支持放大预览
- 支持中英文切换（如有国际化需求）

## 六、其他建议

- SEO 优化（产品型号、参数等信息结构化，利于搜索引擎收录）
- 站内搜索功能（支持按型号、参数、应用场景等检索）
- 资料下载区（如产品手册、认证证书等 PDF）

## 七、API 设计建议

### 1. 产品数据接口

- **获取产品分类列表**

  - 路径：`GET /api/products/categories`
  - 权限：公开
  - 返回：所有产品大类及子类信息
  - 响应码：200 成功，500 服务器错误

- **获取某分类下产品列表**

  - 路径：`GET /api/products?category=inductive&page=1&pageSize=20&keyword=M12`
  - 参数：category（如 inductive）、page、pageSize、keyword（支持模糊搜索）
  - 权限：公开
  - 返回：该分类下所有型号及摘要信息，支持分页
  - 响应码：200 成功，400 参数错误，500 服务器错误

- **获取产品详情**

  - 路径：`GET /api/products/[model]`
  - 参数：model（如 M12）
  - 权限：公开
  - 返回：产品详细参数、图片、应用场景、资料下载等
  - 响应码：200 成功，404 未找到，500 服务器错误

- **获取应用场景列表**

  - 路径：`GET /api/applications`
  - 权限：公开
  - 返回：所有应用场景及关联产品
  - 响应码：200 成功，500 服务器错误

- **在线留言**
  - 路径：`POST /api/contact`
  - 参数：姓名、联系方式、留言内容
  - 权限：公开，需防止垃圾信息（如验证码/频率限制）
  - 返回：提交状态
  - 响应码：200 成功，400 参数错误，429 频率限制，500 服务器错误

#### OpenAPI 风格接口注释示例（补全留言、资料下载等接口）

```yaml
paths:
  /api/products:
    get:
      summary: 获取产品列表
      parameters:
        - in: query
          name: category
          schema:
            type: string
        - in: query
          name: page
          schema:
            type: integer
        - in: query
          name: pageSize
          schema:
            type: integer
        - in: query
          name: keyword
          schema:
            type: string
      responses:
        "200":
          description: 成功
        "400":
          description: 参数错误
        "500":
          description: 服务器错误
  /api/contact:
    post:
      summary: 提交在线留言
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                contact:
                  type: string
                message:
                  type: string
      responses:
        "200":
          description: 提交成功
        "400":
          description: 参数错误
        "429":
          description: 频率限制
        "500":
          description: 服务器错误
  /api/downloads/{file}:
    get:
      summary: 下载资料文件
      parameters:
        - in: path
          name: file
          required: true
          schema:
            type: string
      responses:
        "200":
          description: 下载成功
        "404":
          description: 文件不存在
        "500":
          description: 服务器错误
```

### 2. API 安全与合规建议

- 对留言、资料下载等接口增加验证码、频率限制、XSS/SQL 注入防护。
- 对敏感数据（如联系方式）进行脱敏或加密存储。
- 日志记录所有 API 访问，便于追溯。
- 遵守数据隐私法规（如 GDPR/中国网络安全法）。

## 八、页面 UI 方案建议

### 1. 页面线框图与组件树结构（可视化示例）

#### 首页线框图（ASCII 示意）

```
+------------------------------------------------------+
| Logo | 导航菜单 | 语言切换 |
+------------------------------------------------------+
|                Banner 轮播区                       |
+------------------------------------------------------+
|   公司简介/品牌优势   |   产品分类快捷入口（卡片）   |
+------------------------------------------------------+
|   应用场景推荐（图文）                              |
+------------------------------------------------------+
|   页脚：联系方式 | 备案号 | 友情链接                |
+------------------------------------------------------+
```

#### 产品中心线框图（ASCII 示意）

```
+-------------------+----------------------------------+
| 分类导航（树形）  | 产品列表（卡片/表格，支持筛选） |
|                   |                                  |
+-------------------+----------------------------------+
```

#### 产品详情页结构树

- 产品大图/结构图（可放大）
- 详细参数表（横向滚动）
- 应用场景推荐
- 资料下载区
- 相关推荐

#### 设计稿建议

- Layout
  - Navbar
  - MainContent
    - HomePage | ProductsPage | ProductDetailPage | ApplicationPage | AboutPage | ContactPage
  - Footer

### 3. 视觉规范

- **主色**：#0052D9（品牌蓝，可根据实际品牌色调整）
- **辅助色**：#F5F7FA（浅灰背景）、#FFB300（高亮/警告）
- **字体**：思源黑体/微软雅黑/Arial，字号 14-18px
- **按钮**：圆角 4px，主色填充，悬停高亮
- **表格/卡片**：阴影、圆角、分隔线清晰
- **图片**：支持懒加载、点击放大
- **响应式**：移动端菜单折叠、卡片自适应宽度

## 九、自动化校验脚本建议

### 1. 校验目标（扩展）

- 检查产品数据文件字段完整性、必填项、单位规范、图片/资料路径有效性
- 检查多语言字段（如 i18n.zh/en）是否齐全
- 检查参数单位是否在允许列表内（如 mm、V、A、℃ 等）
- 检查图片、资料文件是否存在且可访问
- 检查跨文件引用（如应用场景与产品的关联）

### 2. 脚本实现思路（扩展）

- 使用 Node.js + ajv 校验 JSON Schema
- 校验所有必填字段、单位、图片/资料路径、i18n 字段
- 校验应用场景与产品的多对多引用关系
- 输出详细校验报告（JSON/HTML），标明缺失项、错误项

### 3. CI 集成示例（GitHub Actions）

```yaml
name: Data Validation
on:
  push:
    paths:
      - "data/**"
      - "public/assets/**"
      - ".github/workflows/validate.yml"
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
      - name: Install dependencies
        run: npm install
      - name: Run validation script
        run: node scripts/validate-data.js
```

### 4. ajv JSON Schema 校验与跨文件引用校验完整代码片段

```js
const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");
const schema = require("./product.schema.json");

const dataDir = path.join(__dirname, "../data/products");
const assetsDir = path.join(__dirname, "../public/assets/products");
const ajv = new Ajv();
const validate = ajv.compile(schema);

fs.readdirSync(dataDir).forEach((file) => {
  const product = JSON.parse(
    fs.readFileSync(path.join(dataDir, file), "utf-8")
  );
  if (!validate(product)) {
    console.error(`${file} schema 校验失败:`, validate.errors);
  }
  (product.images || []).forEach((img) => {
    if (!fs.existsSync(path.join(assetsDir, img.url))) {
      console.error(`${file} 图片不存在: ${img.url}`);
    }
  });
  // 跨文件引用校验示例
  (product.applications || []).forEach((app) => {
    // 假设有 application.json 维护所有场景
    const allApps = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../data/applications.json"),
        "utf-8"
      )
    );
    if (!allApps.find((a) => a.scene === app.scene)) {
      console.error(`${file} 应用场景不存在: ${app.scene}`);
    }
  });
});
```

## 十、内容维护与协作流程

### 1. 数据变更提交流程

- 所有产品数据、图片、资料等变更均通过 Pull Request（PR）提交
- PR 必须包含变更说明、影响范围、校验报告

### 2. 审核机制

- 指定产品/技术负责人进行代码和数据审核
- 自动化校验脚本通过后方可合并
- 审核关注点：字段完整性、图片/资料有效性、内容规范、无安全隐患

### 3. 发布与回滚策略

- 合并 PR 后自动部署到测试环境，人工验收后发布生产
- 保留历史版本，支持一键回滚
- 重大变更需提前通知相关团队成员

### 4. 协作建议

- 定期组织数据规范和内容维护培训
- 重要数据变更需双人复核
- 通过 issue 跟踪内容优化和 bug 修复

## 十一、安全与合规性建议

- **API 安全**：所有 POST/PUT/DELETE 接口需鉴权，防止未授权操作
- **留言防护**：留言接口需验证码、频率限制，防止垃圾信息
- **资料下载合规**：下载区仅开放公开资料，敏感/内部资料需鉴权
- **数据脱敏**：展示用户/客户信息时需脱敏处理
- **日志与追溯**：所有数据变更、API 访问均需日志记录，便于安全追溯
- **合规性**：遵守中国网络安全法、GDPR 等相关法规，用户数据需加密存储，隐私政策需公开

### 1. 境外业务本地化合规建议

- **欧盟 GDPR**：用户数据需获得明确同意，支持数据导出/删除请求，敏感数据加密存储，隐私政策需多语言公开。
- **美国 CCPA**：用户有权知晓、删除、拒绝出售个人信息，需提供便捷的用户请求通道。
- **其他地区**：根据业务覆盖地，遵守当地数据保护法规，必要时聘请法律顾问。

## 十二、性能优化建议

- **图片 CDN 加速**：所有产品图片、结构图等静态资源建议接入 CDN，提升全球访问速度。
- **接口缓存**：对产品列表、详情等接口启用服务端缓存（如 Redis），减少数据库压力。
- **前端懒加载**：图片、长列表等采用懒加载技术，提升首屏加载速度和用户体验。
- **静态资源压缩**：图片、JS、CSS 等资源启用压缩，减少带宽消耗。
- **SSR/SSG 优化**：合理利用 Next.js 的 SSR/SSG 能力，提升 SEO 和首屏渲染速度。
- **监控与预警**：接入前后端性能监控，及时发现并优化性能瓶颈。

---
