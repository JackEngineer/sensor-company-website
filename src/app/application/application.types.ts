export interface ApplicationDownload {
  name: string;
  url: string;
}

export interface ApplicationI18n {
  zh?: Partial<Application>;
  en?: Partial<Application>;
}

export interface Application {
  scene: string; // 场景名称，唯一
  desc: string; // 简要描述
  image: string; // 场景图片路径
  products: string[]; // 推荐产品型号
  details: string; // 详细描述
  downloads?: ApplicationDownload[]; // 相关资料
  i18n?: ApplicationI18n; // 国际化
}
