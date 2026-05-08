const I18N = {
  en: {
    pageTitle: "Tech Stack | EcoEnvAtlas",
    interactiveMap: "Interactive Map",
    countyAnalytics: "County Analytics",
    rseiPca: "RSEI PCA",
    background: "Research Background",
    opticalIndicators: "Optical Indicators",
    lst30m: "LST 30 m",
    techStack: "Tech Stack",
    team: "Team",
    language: "Language",
    eyebrow: "Tech Stack",
    title: "Core Technologies",
    subtitle: "A concise overview of the main technologies used to build the EcoEnvAtlas system.",
    cards: [
      {
        title: "Frontend Interface",
        bullets: [
          "HTML, CSS, and vanilla JavaScript for the main web application",
          "Responsive layout for desktop and mobile access",
          "Shared multilingual interface in English, Traditional Chinese, and Simplified Chinese",
        ],
      },
      {
        title: "Interactive Mapping",
        bullets: [
          "MapLibre GL JS as the unified map engine",
          "Raster layers, county polygons, and province boundaries rendered in one map framework",
          "Single-map interaction for county click and raster value query",
        ],
      },
      {
        title: "Raster Publishing",
        bullets: [
          "Cloud Optimized GeoTIFF (COG) for national raster storage",
          "MosaicJSON to organize annual and trend tiles into logical national layers",
          "TiTiler for dynamic raster tiles and point query services",
        ],
      },
      {
        title: "Deployment and Data Delivery",
        bullets: [
          "Nginx for static page hosting and reverse proxy",
          "Uvicorn + TiTiler for raster service delivery",
          "Local cloud disks for COG, mosaic, vector, and JSON resources",
        ],
      },
    ],
  },
  zh_cn: {
    pageTitle: "技术栈 | EcoEnvAtlas",
    interactiveMap: "交互地图",
    countyAnalytics: "县域分析",
    rseiPca: "RSEI PCA",
    background: "研究背景",
    opticalIndicators: "光学指标",
    lst30m: "30 米 LST",
    techStack: "技术栈",
    team: "团队成员",
    language: "语言",
    eyebrow: "技术栈",
    title: "核心技术栈",
    subtitle: "这里简要列出 EcoEnvAtlas 系统构建过程中使用的主要技术组件。",
    cards: [
      {
        title: "前端界面",
        bullets: [
          "使用 HTML、CSS 和原生 JavaScript 构建主网页应用",
          "支持桌面端与手机端的响应式布局",
          "统一支持英文、繁体中文和简体中文三语界面",
        ],
      },
      {
        title: "交互地图",
        bullets: [
          "以 MapLibre GL JS 作为统一地图引擎",
          "栅格图层、县域面和省级边界共存于同一地图框架中",
          "在同一张地图上完成县域点击与栅格值查询",
        ],
      },
      {
        title: "栅格发布",
        bullets: [
          "使用 Cloud Optimized GeoTIFF (COG) 存储全国栅格成果",
          "使用 MosaicJSON 组织年度图层与趋势图层",
          "使用 TiTiler 提供动态瓦片与点查询服务",
        ],
      },
      {
        title: "部署与数据服务",
        bullets: [
          "Nginx 负责静态页面托管与反向代理",
          "Uvicorn + TiTiler 负责栅格服务发布",
          "本地云盘存放 COG、mosaic、矢量与 JSON 资源",
        ],
      },
    ],
  },
  zh_hant: {
    pageTitle: "技術棧 | EcoEnvAtlas",
    interactiveMap: "互動地圖",
    countyAnalytics: "縣域分析",
    rseiPca: "RSEI PCA",
    background: "研究背景",
    opticalIndicators: "光學指標",
    lst30m: "30 米 LST",
    techStack: "技術棧",
    team: "團隊成員",
    language: "語言",
    eyebrow: "技術棧",
    title: "核心技術棧",
    subtitle: "這裡簡要列出 EcoEnvAtlas 系統構建過程中使用的主要技術組件。",
    cards: [
      {
        title: "前端介面",
        bullets: [
          "使用 HTML、CSS 和原生 JavaScript 建構主網頁應用",
          "支援桌面端與手機端的響應式版面",
          "統一支援英文、繁體中文和簡體中文三語介面",
        ],
      },
      {
        title: "互動地圖",
        bullets: [
          "以 MapLibre GL JS 作為統一地圖引擎",
          "柵格圖層、縣域面和省級邊界共存於同一地圖框架中",
          "在同一張地圖上完成縣域點擊與柵格值查詢",
        ],
      },
      {
        title: "柵格發布",
        bullets: [
          "使用 Cloud Optimized GeoTIFF (COG) 儲存全國柵格成果",
          "使用 MosaicJSON 組織年度圖層與趨勢圖層",
          "使用 TiTiler 提供動態瓦片與點查詢服務",
        ],
      },
      {
        title: "部署與資料服務",
        bullets: [
          "Nginx 負責靜態頁面託管與反向代理",
          "Uvicorn + TiTiler 負責柵格服務發布",
          "本地雲碟存放 COG、mosaic、向量與 JSON 資源",
        ],
      },
    ],
  },
};

let currentLang = localStorage.getItem("rsei-viewer-lang") || "en";

const el = {
  language: document.querySelector("#languageSelect"),
  grid: document.querySelector("#stackGrid"),
};

function t(key) {
  return I18N[currentLang]?.[key] ?? I18N.en[key] ?? key;
}

function renderCards() {
  const cards = I18N[currentLang].cards
    .map(
      (card) => `
        <article class="content-card">
          <h2>${card.title}</h2>
          <ul class="bullet-list">
            ${card.bullets.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>`,
    )
    .join("");
  el.grid.innerHTML = cards;
}

function applyLanguage() {
  currentLang = el.language?.value || currentLang;
  localStorage.setItem("rsei-viewer-lang", currentLang);
  document.documentElement.lang = currentLang === "zh_hant" ? "zh-Hant" : currentLang === "zh_cn" ? "zh-Hans" : "en";
  document.title = t("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  renderCards();
}

if (el.language) {
  el.language.value = currentLang;
  el.language.addEventListener("change", applyLanguage);
}

applyLanguage();
