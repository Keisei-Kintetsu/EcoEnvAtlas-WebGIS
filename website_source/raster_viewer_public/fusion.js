const TITILER_ROOT = "/titiler";
const REGISTRY_URL = "./data/mosaic_registry.json";
const COUNTY_DATA_URLS = {
  names: "./counties/data/county_names_i18n.json",
  chunkIndex: "./counties/data/county_chunk_index.json",
  metrics: {
    rsei: "./counties/data/county_metrics_rsei.json",
    lst: "./counties/data/county_metrics_lst.json",
    ndvi: "./counties/data/county_metrics_ndvi.json",
    wet: "./counties/data/county_metrics_wet.json",
    ndbsi: "./counties/data/county_metrics_ndbsi.json",
  },
};
const PROVINCE_GEOJSON_URL = "./counties/data/province_boundary.geojson";
const COUNTY_CHUNK_VIEW_PADDING = 0.8;
const MAP_VIEW_STORAGE_KEY = "ecoenvatlas-last-map-view";
const DEFAULT_MAP_CENTER = [104.0, 35.5];
const DEFAULT_MAP_ZOOM = 4.1;

const CHINA_BOUNDS = [
  [72.0, 18.0],
  [136.0, 54.0],
];

const RSEI_RDYLGN_PALETTE = ["#d7191c", "#fdae61", "#ffffbf", "#a6d96a", "#1a9641"];
const RSEI_RDYLGN_RAMP =
  "linear-gradient(90deg, #a50026 0%, #d73027 10%, #f46d43 20%, #fdae61 30%, #fee08b 40%, #ffffbf 50%, #d9ef8b 60%, #a6d96a 70%, #66bd63 80%, #1a9850 90%, #006837 100%)";

const I18N = {
  en: {
    pageTitle: "Interactive Map | EcoEnvAtlas",
    eyebrow: "EcoEnvAtlas",
    title: "Integrated Eco-Environmental Atlas",
    subtitle:
      "Explore national raster layers, county statistics, and province boundaries within one unified map interface, with annual patterns, long-term change, and trend information linked in the same spatial framework.",
    fusionMap: "Interactive Map",
    countyAnalytics: "County Analytics",
    rseiPca: "RSEI PCA",
    background: "Research Background",
    opticalIndicators: "Optical Indicators",
    lst30m: "LST 30 m",
    techStack: "Tech Stack",
    team: "Team",
    language: "Language",
    indicator: "Indicator",
    display: "Display",
    annualValue: "Annual value",
    trendSlope: "Trend slope",
    changeValue: "Change 2025-2000",
    year: "Year",
    layer: "Layer",
    raster: "Raster",
    county: "County",
    selectedCounty: "Selected County",
    loadingCounty: "Loading county layer...",
    countyDataPending: "County boundaries and county statistics are loading in the background.",
    countyZoomPrompt: "Zoom in to load counties",
    countyZoomHint: "County boundaries are loaded on demand after you zoom in further.",
    clickCounty: "Click a county",
    countyHint: "County details will appear here.",
    current: "Current",
    slope: "Slope",
    change: "Change",
    rasterQuery: "Raster Query",
    pixelInformation: "Pixel Information",
    pixelHint: "Click anywhere on the map to query the active raster layer when raster rendering is on.",
    pixelSeries: "Pixel Time Series",
    pixelSeriesHint: "Click the map to load the 2000-2025 annual series for the selected pixel.",
    pixelSeriesLoading: "Loading pixel time series...",
    pixelSeriesEmpty: "No annual pixel data at this location.",
    selectedPixel: "Selected Pixel",
    status: "Status",
    ready: "Ready",
    querying: "Querying...",
    failed: "Failed",
    noData: "No data",
    rasterOff: "Raster off",
    countyOnly: "County-only mode",
    annual: "Annual",
    trend: "Trend",
    staticLabel: "Static",
    pixelMetaOff: "Raster rendering is disabled for the current mode, so map clicks will only update county information.",
    compareView: "Compare",
    compareOn: "Compare On",
    compareOff: "Compare Off",
    compareYear: "Compare Year",
    compareDisabled: "Compare view is available for annual county or raster layers.",
    search: "Search",
    searchPlaceholder: "Search province, prefecture, county, or code",
    searchHint: "Search a province, prefecture, county, or 6-digit county code.",
    searchBusy: "Searching...",
    searchNoMatch: "No matching location found.",
    locate: "Locate",
    locatedLabel: "Located",
    shareView: "Share View",
    shareCopied: "Share link copied.",
    shareFailed: "Unable to copy link.",
    longitude: "Longitude",
    latitude: "Latitude",
    value: "Value",
    mkP: "MK p",
    exportChart: "Export PNG",
    exportReady: "Chart exported.",
    exportFailed: "Unable to export chart.",
  },
  zh_cn: {
    pageTitle: "交互地图 | EcoEnvAtlas",
    eyebrow: "EcoEnvAtlas",
    title: "生态环境综合图谱",
    subtitle:
      "在同一张地图中联动浏览全国栅格、县域统计与省级边界，并将年度格局、长期变化与趋势信息统一在同一个空间框架中展示。",
    fusionMap: "交互地图",
    countyAnalytics: "县域分析",
    rseiPca: "RSEI PCA",
    background: "研究背景",
    opticalIndicators: "光学指标",
    lst30m: "30 米 LST",
    techStack: "技术栈",
    team: "团队成员",
    language: "语言",
    indicator: "指标",
    display: "显示方式",
    annualValue: "年度数值",
    trendSlope: "趋势斜率",
    changeValue: "2025-2000 变化量",
    year: "年份",
    layer: "图层",
    raster: "栅格",
    county: "县域",
    selectedCounty: "选中县域",
    loadingCounty: "正在加载县域图层...",
    countyDataPending: "县域边界和县域统计正在后台加载。",
    countyZoomPrompt: "放大后加载县域",
    countyZoomHint: "继续放大地图后，县域边界会按当前视野分块加载。",
    clickCounty: "点击一个县域",
    countyHint: "县域详情将在这里显示。",
    current: "当前值",
    slope: "斜率",
    change: "变化量",
    rasterQuery: "栅格查询",
    pixelInformation: "像元信息",
    pixelHint: "当栅格图层开启时，点击地图任意位置可查询当前栅格值。",
    pixelSeries: "像元时间序列",
    pixelSeriesHint: "点击地图后可加载该像元 2000-2025 年年度序列。",
    pixelSeriesLoading: "正在加载像元时间序列...",
    pixelSeriesEmpty: "该位置没有可用的年度像元数据。",
    selectedPixel: "选中像元",
    status: "状态",
    ready: "就绪",
    querying: "查询中...",
    failed: "失败",
    noData: "无数据",
    rasterOff: "栅格关闭",
    countyOnly: "仅县域模式",
    annual: "年度",
    trend: "趋势",
    staticLabel: "静态",
    pixelMetaOff: "当前模式未开启栅格渲染，因此地图点击只会更新县域信息。",
    compareView: "左右对比",
    compareOn: "对比开启",
    compareOff: "对比关闭",
    compareYear: "对比年份",
    compareDisabled: "左右对比仅支持年度县域或栅格图层。",
    search: "搜索定位",
    searchPlaceholder: "搜索省、市、县或行政区代码",
    searchHint: "可搜索省、市、县名称或 6 位县级代码。",
    searchBusy: "正在定位...",
    searchNoMatch: "未找到匹配位置。",
    locate: "定位",
    locatedLabel: "已定位",
    shareView: "分享视图",
    shareCopied: "已复制分享链接。",
    shareFailed: "复制分享链接失败。",
    longitude: "经度",
    latitude: "纬度",
    value: "数值",
    mkP: "MK p",
    exportChart: "导出 PNG",
    exportReady: "图表已导出。",
    exportFailed: "图表导出失败。",
  },
  zh_hant: {
    pageTitle: "互動地圖 | EcoEnvAtlas",
    eyebrow: "EcoEnvAtlas",
    title: "生態環境綜合圖譜",
    subtitle:
      "在同一張地圖中聯動瀏覽全國柵格、縣域統計與省級邊界，並將年度格局、長期變化與趨勢資訊統一在同一個空間框架中展示。",
    fusionMap: "互動地圖",
    countyAnalytics: "縣域分析",
    rseiPca: "RSEI PCA",
    background: "研究背景",
    opticalIndicators: "光學指標",
    lst30m: "30 米 LST",
    techStack: "技術棧",
    team: "團隊成員",
    language: "語言",
    indicator: "指標",
    display: "顯示方式",
    annualValue: "年度數值",
    trendSlope: "趨勢斜率",
    changeValue: "2025-2000 變化量",
    year: "年份",
    layer: "圖層",
    raster: "柵格",
    county: "縣域",
    selectedCounty: "選中縣域",
    loadingCounty: "正在載入縣域圖層...",
    countyDataPending: "縣域邊界與縣域統計正在背景載入。",
    countyZoomPrompt: "放大後載入縣域",
    countyZoomHint: "繼續放大地圖後，縣域邊界會依目前視野分塊載入。",
    clickCounty: "點擊一個縣域",
    countyHint: "縣域詳情將在這裡顯示。",
    current: "目前值",
    slope: "斜率",
    change: "變化量",
    rasterQuery: "柵格查詢",
    pixelInformation: "像元資訊",
    pixelHint: "當柵格圖層開啟時，點擊地圖任意位置可查詢目前柵格值。",
    pixelSeries: "像元時間序列",
    pixelSeriesHint: "點擊地圖後可載入該像元 2000-2025 年年度序列。",
    pixelSeriesLoading: "正在載入像元時間序列...",
    pixelSeriesEmpty: "該位置沒有可用的年度像元資料。",
    selectedPixel: "選中像元",
    status: "狀態",
    ready: "已就緒",
    querying: "查詢中...",
    failed: "失敗",
    noData: "無數據",
    rasterOff: "柵格關閉",
    countyOnly: "僅縣域模式",
    annual: "年度",
    trend: "趨勢",
    staticLabel: "靜態",
    pixelMetaOff: "目前模式未開啟柵格渲染，因此地圖點擊只會更新縣域資訊。",
    compareView: "左右對比",
    compareOn: "對比開啟",
    compareOff: "對比關閉",
    compareYear: "對比年份",
    compareDisabled: "左右對比僅支援年度縣域或柵格圖層。",
    search: "搜尋定位",
    searchPlaceholder: "搜尋省、市、縣或行政區代碼",
    searchHint: "可搜尋省、市、縣名稱或 6 位縣級代碼。",
    searchBusy: "正在定位...",
    searchNoMatch: "未找到匹配位置。",
    locate: "定位",
    locatedLabel: "已定位",
    shareView: "分享視圖",
    shareCopied: "已複製分享連結。",
    shareFailed: "複製分享連結失敗。",
    longitude: "經度",
    latitude: "緯度",
    value: "數值",
    mkP: "MK p",
    exportChart: "匯出 PNG",
    exportReady: "圖表已匯出。",
    exportFailed: "圖表匯出失敗。",
  },
};

const COUNTY_META = {
  rsei: {
    label: "RSEI",
    annualDomain: [0, 1],
    slopeDomain: [-0.01, 0.01],
    changeDomain: [-0.18, 0.18],
    palette: RSEI_RDYLGN_PALETTE,
    format: (v) => (v === null || v === undefined || Number.isNaN(v) ? "--" : v.toFixed(4)),
  },
  lst: {
    label: "LST",
    annualDomain: [15, 35],
    slopeDomain: [-0.12, 0.12],
    changeDomain: [-3, 3],
    palette: ["#2d6f8f", "#7fb9c8", "#f3e6a3", "#e69b52", "#9b2f2b"],
    format: (v) => (v === null || v === undefined || Number.isNaN(v) ? "--" : `${v.toFixed(2)} °C`),
  },
  ndvi: {
    label: "NDVI",
    annualDomain: [0, 0.9],
    slopeDomain: [-0.01, 0.01],
    changeDomain: [-0.18, 0.18],
    palette: ["#fde725", "#5ec962", "#21918c", "#3b528b", "#440154"],
    format: (v) => (v === null || v === undefined || Number.isNaN(v) ? "--" : v.toFixed(4)),
  },
  wet: {
    label: "WET",
    annualDomain: [-0.3, -0.05],
    slopeDomain: [-0.006, 0.006],
    changeDomain: [-0.12, 0.12],
    palette: ["#543005", "#bf812d", "#f6e8c3", "#80cdc1", "#003c30"],
    format: (v) => (v === null || v === undefined || Number.isNaN(v) ? "--" : v.toFixed(4)),
  },
  ndbsi: {
    label: "NDBSI",
    annualDomain: [-0.4, 0.2],
    slopeDomain: [-0.01, 0.01],
    changeDomain: [-0.2, 0.2],
    palette: ["#0d0887", "#7e03a8", "#cc4778", "#f89540", "#f0f921"],
    format: (v) => (v === null || v === undefined || Number.isNaN(v) ? "--" : v.toFixed(4)),
  },
};

const RASTER_META = {
  annual: {
    rsei: {
      registryLayer: "rsei",
      rescale: "0,10000",
      colormap: "rdylgn",
      legendMin: "0",
      legendMax: "1",
      ramp: RSEI_RDYLGN_RAMP,
      pointFormat: (v) => (v === null ? "--" : (v / 10000).toFixed(4)),
    },
    lst: {
      registryLayer: "lst",
      rescale: "1500,3500",
      colormap: "rdylbu_r",
      legendMin: "15",
      legendMax: "35",
      ramp: "linear-gradient(90deg, #2d6f8f, #7fb9c8, #f3e6a3, #e69b52, #9b2f2b)",
      pointFormat: (v) => (v === null ? "--" : `${(v / 100).toFixed(2)} °C`),
    },
    ndvi: {
      registryLayer: "optical",
      bidx: 1,
      rescale: "0,9000",
      colormap: "viridis_r",
      legendMin: "0",
      legendMax: "0.9",
      ramp: "linear-gradient(90deg, #fde725, #5ec962, #21918c, #3b528b, #440154)",
      pointFormat: (v) => (v === null ? "--" : (v / 10000).toFixed(4)),
    },
    wet: {
      registryLayer: "optical",
      bidx: 2,
      rescale: "-3000,-500",
      colormap: "brbg",
      legendMin: "-0.3",
      legendMax: "-0.05",
      ramp: "linear-gradient(90deg, #543005, #bf812d, #f6e8c3, #c7eae5, #01665e)",
      pointFormat: (v) => (v === null ? "--" : (v / 10000).toFixed(4)),
    },
    ndbsi: {
      registryLayer: "optical",
      bidx: 3,
      rescale: "-4000,2000",
      colormap: "plasma",
      legendMin: "-0.4",
      legendMax: "0.2",
      ramp: "linear-gradient(90deg, #0d0887, #7e03a8, #cc4778, #f89540, #f0f921)",
      pointFormat: (v) => (v === null ? "--" : (v / 10000).toFixed(4)),
    },
  },
  trend: {
    rsei: {
      registryLayer: "rsei",
      bidx: 1,
      rescale: "-0.02,0.02",
      colormap: "rdylgn",
      legendMin: "-0.02",
      legendMax: "0.02",
      ramp: RSEI_RDYLGN_RAMP,
      pointFormat: (v) => (v === null ? "--" : v.toFixed(5)),
    },
    lst: {
      registryLayer: "lst",
      bidx: 1,
      rescale: "-0.5,0.5",
      colormap: "rdylbu_r",
      legendMin: "-0.5",
      legendMax: "0.5",
      ramp: "linear-gradient(90deg, #2d6f8f, #7fb9c8, #f3e6a3, #e69b52, #9b2f2b)",
      pointFormat: (v) => (v === null ? "--" : `${v.toFixed(4)} °C/yr`),
    },
    ndvi: {
      registryLayer: "optical",
      bidx: 1,
      rescale: "-0.02,0.02",
      colormap: "viridis_r",
      legendMin: "-0.02",
      legendMax: "0.02",
      ramp: "linear-gradient(90deg, #fde725, #5ec962, #21918c, #3b528b, #440154)",
      pointFormat: (v) => (v === null ? "--" : v.toFixed(5)),
    },
    wet: {
      registryLayer: "optical",
      bidx: 6,
      rescale: "-0.02,0.02",
      colormap: "brbg",
      legendMin: "-0.02",
      legendMax: "0.02",
      ramp: "linear-gradient(90deg, #543005, #bf812d, #f6e8c3, #c7eae5, #01665e)",
      pointFormat: (v) => (v === null ? "--" : v.toFixed(5)),
    },
    ndbsi: {
      registryLayer: "optical",
      bidx: 11,
      rescale: "-0.02,0.02",
      colormap: "plasma",
      legendMin: "-0.02",
      legendMax: "0.02",
      ramp: "linear-gradient(90deg, #0d0887, #7e03a8, #cc4778, #f89540, #f0f921)",
      pointFormat: (v) => (v === null ? "--" : v.toFixed(5)),
    },
  },
};

const state = {
  metric: "rsei",
  display: "annual",
  year: "2025",
  compareOn: false,
  compareYear: "2000",
  rasterOn: true,
  countyOn: true,
  selectedCode: "110101",
  lang: localStorage.getItem("rsei-viewer-lang") || "en",
  pixelLon: null,
  pixelLat: null,
  searchStatusKey: "searchHint",
  searchStatusTone: "",
  searchStatusEntryCode: null,
};

const dataStore = {
  registry: null,
  provinceGeojson: null,
  provincePromise: null,
  countyNames: null,
  countyChunkIndex: null,
  countyMetricsByMetric: {},
  countyAssetPromise: null,
  countyMetricPromises: {},
  countyChunkPromises: {},
  countyChunkCache: {},
  activeCountyChunkCodes: [],
  searchIndex: null,
  pixelSeriesCache: {},
  pixelSeries: null,
  initialView: null,
};

let map;
let compareMap;
let countyChart;
let pixelChart;
const rasterLayerTemplates = {};
let initialRasterKickoffDone = false;
let pixelSeriesRequestSeq = 0;
let pixelPointRequestSeq = 0;
let syncingMapPair = false;
let compareRefreshSeq = 0;
let compareRefreshTimer = null;

const el = {
  language: document.querySelector("#languageSelect"),
  metric: document.querySelector("#metricSelect"),
  display: document.querySelector("#displaySelect"),
  year: document.querySelector("#yearSlider"),
  yearLabel: document.querySelector("#yearLabel"),
  toggleRaster: document.querySelector("#toggleRaster"),
  toggleCounty: document.querySelector("#toggleCounty"),
  toggleCompare: document.querySelector("#toggleCompare"),
  compareYear: document.querySelector("#compareYearSlider"),
  compareYearLabel: document.querySelector("#compareYearLabel"),
  locationSearch: document.querySelector("#locationSearch"),
  searchBtn: document.querySelector("#searchBtn"),
  shareViewBtn: document.querySelector("#shareViewBtn"),
  exportPixelChartBtn: document.querySelector("#exportPixelChartBtn"),
  searchStatus: document.querySelector("#searchStatus"),
  statusMode: document.querySelector("#fusionStatusMode"),
  statusText: document.querySelector("#fusionStatusText"),
  legendTitle: document.querySelector("#legendTitle"),
  legendRamp: document.querySelector("#legendRamp"),
  legendMin: document.querySelector("#legendMin"),
  legendMax: document.querySelector("#legendMax"),
  countyName: document.querySelector("#countyName"),
  countyMeta: document.querySelector("#countyMeta"),
  countyCurrent: document.querySelector("#countyCurrent"),
  countySlope: document.querySelector("#countySlope"),
  countyChange: document.querySelector("#countyChange"),
  countyP: document.querySelector("#countyP"),
  pixelTitle: document.querySelector("#pixelTitle"),
  pixelMeta: document.querySelector("#pixelMeta"),
  pixelLon: document.querySelector("#pixelLon"),
  pixelLat: document.querySelector("#pixelLat"),
  pixelPrimaryLabel: document.querySelector("#pixelPrimaryLabel"),
  pixelPrimaryValue: document.querySelector("#pixelPrimaryValue"),
  pixelCompareCard: document.querySelector("#pixelCompareCard"),
  pixelCompareLabel: document.querySelector("#pixelCompareLabel"),
  pixelCompareValue: document.querySelector("#pixelCompareValue"),
  pixelStatus: document.querySelector("#pixelStatus"),
  mapStage: document.querySelector("#mapStage"),
  primaryYearBadge: document.querySelector("#primaryYearBadge"),
  compareYearBadge: document.querySelector("#compareYearBadge"),
};

function t(key) {
  return I18N[state.lang]?.[key] ?? I18N.en[key] ?? key;
}

function compareAvailable() {
  return state.display === "annual" && (state.rasterOn || state.countyOn);
}

function compareViewEnabled() {
  return state.compareOn && compareAvailable();
}

function readNumberParam(params, key) {
  const raw = params.get(key);
  if (raw === null || raw === "") return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

function isValidMapView(center, zoom) {
  if (!Array.isArray(center) || center.length !== 2) return false;
  const [lng, lat] = center;
  if (![lng, lat, zoom].every(Number.isFinite)) return false;
  if (lng < 60 || lng > 150 || lat < 0 || lat > 60) return false;
  if (zoom < 3 || zoom > 14) return false;
  return true;
}

function readStoredMapView() {
  try {
    const payload = JSON.parse(localStorage.getItem(MAP_VIEW_STORAGE_KEY) || "null");
    if (!payload) return null;
    return isValidMapView(payload.center, payload.zoom) ? payload : null;
  } catch {
    return null;
  }
}

function storeMapView() {
  if (!map) return;
  const center = map.getCenter();
  const payload = {
    center: [Number(center.lng.toFixed(5)), Number(center.lat.toFixed(5))],
    zoom: Number(map.getZoom().toFixed(2)),
  };
  if (!isValidMapView(payload.center, payload.zoom)) return;
  localStorage.setItem(MAP_VIEW_STORAGE_KEY, JSON.stringify(payload));
}

function syncCompareControls() {
  if (el.compareYear) el.compareYear.value = state.compareYear;
  if (el.compareYearLabel) el.compareYearLabel.textContent = state.compareYear;
  if (el.toggleCompare) {
    el.toggleCompare.textContent = compareViewEnabled() ? t("compareOn") : t("compareOff");
    el.toggleCompare.classList.toggle("is-active", compareViewEnabled());
    el.toggleCompare.disabled = !compareAvailable();
  }
  if (el.compareYear) el.compareYear.disabled = !compareAvailable();
}

function syncCompareBadges() {
  if (el.primaryYearBadge) el.primaryYearBadge.textContent = state.year;
  if (el.compareYearBadge) el.compareYearBadge.textContent = state.compareYear;
  el.mapStage?.classList.toggle("compare-active", compareViewEnabled());
}

function syncPixelValueCards() {
  const compareActive = compareViewEnabled() && state.display === "annual";
  if (el.pixelPrimaryLabel) {
    el.pixelPrimaryLabel.textContent = compareActive ? `${state.year} ${t("value")}` : t("value");
  }
  if (el.pixelCompareCard) el.pixelCompareCard.hidden = !compareActive;
  if (el.pixelCompareLabel) el.pixelCompareLabel.textContent = `${state.compareYear} ${t("value")}`;
  if (!compareActive && el.pixelCompareValue) el.pixelCompareValue.textContent = "--";
}

function currentCountyMetrics(metric = state.metric) {
  return dataStore.countyMetricsByMetric[metric] ?? null;
}

function hasCountyAssets() {
  return Boolean(dataStore.countyChunkIndex && dataStore.countyNames);
}

function hasCountyData(metric = state.metric) {
  return hasCountyAssets() && Boolean(currentCountyMetrics(metric));
}

function countyZoomReady() {
  return Boolean(map && map.getZoom() >= (dataStore.countyChunkIndex?.min_zoom ?? 5.2));
}

function applyLanguage() {
  localStorage.setItem("rsei-viewer-lang", state.lang);
  document.documentElement.lang = state.lang === "zh_hant" ? "zh-Hant" : state.lang === "zh_cn" ? "zh-Hans" : "en";
  document.title = t("pageTitle");
  if (el.language) el.language.value = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  syncCompareControls();
  syncCompareBadges();
  syncPixelValueCards();
  renderSearchStatus();
  renderPixelSeriesChart();
}

function syncControlsFromState() {
  if (el.metric) el.metric.value = state.metric;
  if (el.display) el.display.value = state.display;
  if (el.year) el.year.value = state.year;
  if (el.yearLabel) el.yearLabel.textContent = state.year;
  if (el.compareYear) el.compareYear.value = state.compareYear;
  if (el.compareYearLabel) el.compareYearLabel.textContent = state.compareYear;
  syncCompareControls();
  syncPixelValueCards();
}

function setSearchStatus(key, tone = "", entryCode = null) {
  state.searchStatusKey = key;
  state.searchStatusTone = tone;
  state.searchStatusEntryCode = entryCode;
  renderSearchStatus();
}

function renderSearchStatus() {
  if (!el.searchStatus) return;
  let text = t(state.searchStatusKey || "searchHint");
  if (state.searchStatusKey === "locatedLabel" && state.searchStatusEntryCode) {
    const entry = findSearchEntryByCode(state.searchStatusEntryCode);
    text = entry ? `${t("locatedLabel")}: ${describeSearchEntry(entry)}` : t("locatedLabel");
  }
  el.searchStatus.textContent = text;
  el.searchStatus.classList.toggle("is-success", state.searchStatusTone === "success");
  el.searchStatus.classList.toggle("is-error", state.searchStatusTone === "error");
}

function normalizeSearchText(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function metricAnnualMeta(metric = state.metric) {
  return RASTER_META.annual?.[metric] ?? null;
}

function annualYearsForMetric(metric = state.metric) {
  const meta = metricAnnualMeta(metric);
  if (!meta || !dataStore.registry) return [];
  return Object.keys(dataStore.registry.annual?.[meta.registryLayer] ?? {})
    .sort((a, b) => Number(a) - Number(b));
}

function annualRasterMosaic(metric, year) {
  const meta = metricAnnualMeta(metric);
  if (!meta) return null;
  return dataStore.registry?.annual?.[meta.registryLayer]?.[year]?.mosaic ?? null;
}

function annualRasterValue(metric, raw) {
  if (raw === null || raw === undefined || raw === -32768) return null;
  return metric === "lst" ? raw / 100 : raw / 10000;
}

function emptyBBox() {
  return [Infinity, Infinity, -Infinity, -Infinity];
}

function extendBBox(bbox, coords) {
  if (!Array.isArray(coords)) return;
  if (typeof coords[0] === "number" && typeof coords[1] === "number") {
    bbox[0] = Math.min(bbox[0], coords[0]);
    bbox[1] = Math.min(bbox[1], coords[1]);
    bbox[2] = Math.max(bbox[2], coords[0]);
    bbox[3] = Math.max(bbox[3], coords[1]);
    return;
  }
  coords.forEach((item) => extendBBox(bbox, item));
}

function bboxFromGeometry(geometry) {
  const bbox = emptyBBox();
  extendBBox(bbox, geometry?.coordinates);
  return bbox;
}

function bboxFromFeatures(features) {
  const bbox = emptyBBox();
  features.forEach((feature) => extendBBox(bbox, feature.geometry?.coordinates));
  return bbox;
}

function bboxToMapBounds(bbox) {
  return [
    [bbox[0], bbox[1]],
    [bbox[2], bbox[3]],
  ];
}

function fitMapToBBox(bbox, maxZoom = 9.5) {
  if (!map || !bbox || !Number.isFinite(bbox[0]) || !Number.isFinite(bbox[2])) return;
  map.fitBounds(bboxToMapBounds(bbox), { padding: 42, duration: 420, maxZoom });
}

function extractPointRawValue(payload) {
  const entries = Array.isArray(payload?.values) ? payload.values : [];
  for (const entry of entries) {
    if (!Array.isArray(entry) || entry.length < 2) continue;
    const raw = Array.isArray(entry[1]) ? entry[1][0] : null;
    if (raw !== null && raw !== undefined && raw !== -32768) return raw;
  }
  return null;
}

async function fetchRasterPointRawValue(lon, lat, mosaic, bidx = null) {
  const params = new URLSearchParams({ url: mosaic });
  if (bidx) params.set("bidx", String(bidx));
  const response = await fetch(`${TITILER_ROOT}/mosaicjson/point/${lon},${lat}?${params.toString()}`);
  if (!response.ok) throw new Error(`Point query failed: ${response.status}`);
  const data = await response.json();
  return extractPointRawValue(data);
}

async function mapWithConcurrency(items, limit, iteratee) {
  const results = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const idx = cursor;
      cursor += 1;
      results[idx] = await iteratee(items[idx], idx);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

function countyNameFor(code, part = "county") {
  const item = dataStore.countyNames?.counties?.[code];
  if (!item) return code;
  return item[state.lang]?.[part] ?? item.en?.[part] ?? item.zh_cn?.[part] ?? code;
}

function provinceNameFor(code) {
  const item = dataStore.countyNames?.provinces?.[code];
  if (!item) return code;
  return item[state.lang] ?? item.en ?? item.zh_cn ?? code;
}

function prefectureNameFor(code) {
  const item = dataStore.countyNames?.prefectures?.[code];
  if (!item) return code;
  return item[state.lang] ?? item.en ?? item.zh_cn ?? code;
}

function buildSearchIndex() {
  if (dataStore.searchIndex || !dataStore.countyNames) return dataStore.searchIndex ?? [];

  const provinces = Object.entries(dataStore.countyNames.provinces ?? {}).map(([code, item]) => ({
    type: "province",
    code,
    provinceCode: code,
    labels: [code, item.en, item.zh_cn, item.zh_hant].filter(Boolean),
  }));

  const prefectures = Object.entries(dataStore.countyNames.prefectures ?? {}).map(([code, item]) => ({
    type: "prefecture",
    code,
    provinceCode: item.province_code ?? `${code.slice(0, 2)}0000`,
    labels: [code, item.en, item.zh_cn, item.zh_hant].filter(Boolean),
  }));

  const counties = Object.entries(dataStore.countyNames.counties ?? {}).map(([code, item]) => ({
    type: "county",
    code,
    provinceCode: `${code.slice(0, 2)}0000`,
    prefectureCode: `${code.slice(0, 4)}00`,
    labels: [
      code,
      item.en?.county,
      item.zh_cn?.county,
      item.zh_hant?.county,
      item.en?.prefecture,
      item.zh_cn?.prefecture,
      item.zh_hant?.prefecture,
      item.en?.province,
      item.zh_cn?.province,
      item.zh_hant?.province,
    ].filter(Boolean),
  }));

  dataStore.searchIndex = [...provinces, ...prefectures, ...counties].map((entry) => ({
    ...entry,
    normalizedLabels: Array.from(new Set(entry.labels.map((label) => normalizeSearchText(label)).filter(Boolean))),
  }));
  return dataStore.searchIndex;
}

function findSearchEntryByCode(code) {
  return (dataStore.searchIndex ?? []).find((entry) => entry.code === code) ?? null;
}

function scoreSearchEntry(entry, query) {
  let best = 0;
  for (const label of entry.normalizedLabels) {
    if (label === query) best = Math.max(best, /^\d+$/.test(query) ? 520 : 420);
    else if (label.startsWith(query)) best = Math.max(best, 280);
    else if (label.includes(query)) best = Math.max(best, 160);
  }
  if (entry.type === "province") best += 8;
  if (entry.type === "prefecture") best += 4;
  return best;
}

function searchEntries(query) {
  const normalized = normalizeSearchText(query);
  if (!normalized) return [];
  return buildSearchIndex()
    .map((entry) => ({ entry, score: scoreSearchEntry(entry, normalized) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.code.localeCompare(b.entry.code))
    .slice(0, 8)
    .map((item) => item.entry);
}

function describeSearchEntry(entry) {
  if (!entry) return "";
  if (entry.type === "province") return provinceNameFor(entry.code);
  if (entry.type === "prefecture") return `${prefectureNameFor(entry.code)} / ${provinceNameFor(entry.provinceCode)}`;
  return `${countyNameFor(entry.code, "county")} / ${countyNameFor(entry.code, "prefecture")} / ${countyNameFor(entry.code, "province")}`;
}

async function ensureCountyAssets() {
  if (hasCountyAssets()) return;
  if (!dataStore.countyAssetPromise) {
    dataStore.countyAssetPromise = Promise.all([
      fetch(COUNTY_DATA_URLS.chunkIndex).then((response) => {
        if (!response.ok) throw new Error(`Failed to load county chunk index: ${response.status}`);
        return response.json();
      }),
      fetch(COUNTY_DATA_URLS.names).then((response) => {
        if (!response.ok) throw new Error(`Failed to load county names: ${response.status}`);
        return response.json();
      }),
    ])
      .then(([countyChunkIndex, countyNames]) => {
        dataStore.countyChunkIndex = countyChunkIndex;
        dataStore.countyNames = countyNames;
      })
      .catch((error) => {
        dataStore.countyAssetPromise = null;
        throw error;
      });
  }
  await dataStore.countyAssetPromise;
}

async function ensureCountyMetric(metric = state.metric) {
  if (currentCountyMetrics(metric)) return currentCountyMetrics(metric);
  if (!dataStore.countyMetricPromises[metric]) {
    dataStore.countyMetricPromises[metric] = fetch(COUNTY_DATA_URLS.metrics[metric])
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${metric} county metrics: ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        dataStore.countyMetricsByMetric[metric] = payload;
        return payload;
      })
      .catch((error) => {
        delete dataStore.countyMetricPromises[metric];
        throw error;
      });
  }
  return dataStore.countyMetricPromises[metric];
}

async function ensureCountyData(metric = state.metric) {
  await Promise.all([ensureCountyAssets(), ensureCountyMetric(metric)]);
}

function expandMapBounds(bounds, padding = COUNTY_CHUNK_VIEW_PADDING) {
  return [
    bounds.getWest() - padding,
    bounds.getSouth() - padding,
    bounds.getEast() + padding,
    bounds.getNorth() + padding,
  ];
}

function bboxIntersects(a, b) {
  return !(a[0] > b[2] || a[2] < b[0] || a[1] > b[3] || a[3] < b[1]);
}

function targetCountyChunkCodes() {
  if (!map || !dataStore.countyChunkIndex) return [];
  const bounds = expandMapBounds(map.getBounds());
  return Object.entries(dataStore.countyChunkIndex.chunks)
    .filter(([, info]) => bboxIntersects(info.bbox, bounds))
    .map(([code]) => code)
    .sort();
}

async function ensureCountyChunk(code) {
  if (dataStore.countyChunkCache[code]) return dataStore.countyChunkCache[code];
  if (!dataStore.countyChunkPromises[code]) {
    const path = dataStore.countyChunkIndex?.chunks?.[code]?.path;
    if (!path) throw new Error(`County chunk path not found for ${code}`);
    dataStore.countyChunkPromises[code] = fetch(path)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load county chunk ${code}: ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        dataStore.countyChunkCache[code] = payload;
        return payload;
      })
      .catch((error) => {
        delete dataStore.countyChunkPromises[code];
        throw error;
      });
  }
  return dataStore.countyChunkPromises[code];
}

async function ensureVisibleCountyChunks() {
  if (!hasCountyData() || !state.countyOn || !countyZoomReady()) {
    dataStore.activeCountyChunkCodes = [];
    return;
  }

  const activeCodes = targetCountyChunkCodes();
  await Promise.all(activeCodes.map((code) => ensureCountyChunk(code)));
  dataStore.activeCountyChunkCodes = activeCodes;
}

async function ensureProvinceGeojson() {
  if (dataStore.provinceGeojson) return dataStore.provinceGeojson;
  if (!dataStore.provincePromise) {
    dataStore.provincePromise = fetch(PROVINCE_GEOJSON_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load province boundaries: ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        dataStore.provinceGeojson = payload;
        return payload;
      })
      .catch((error) => {
        dataStore.provincePromise = null;
        throw error;
      });
  }
  return dataStore.provincePromise;
}

function scheduleCountyPrefetch() {
  const pending = Object.keys(COUNTY_DATA_URLS.metrics).filter((metric) => metric !== state.metric);
  if (!pending.length) return;

  const loadNext = () => {
    const metric = pending.shift();
    if (!metric) return;
    ensureCountyMetric(metric)
      .catch((error) => console.warn("County metric prefetch failed:", error))
      .finally(() => {
        window.setTimeout(loadNext, 180);
      });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadNext, { timeout: 2400 });
    return;
  }
  window.setTimeout(loadNext, 1200);
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  const toHex = (x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function lerp(a, b, p) {
  return a + (b - a) * p;
}

function rampColor(value, domain, palette) {
  if (value === null || value === undefined || Number.isNaN(value)) return "#d7d2c7";
  const [min, max] = domain;
  const ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const scaled = ratio * (palette.length - 1);
  const idx = Math.min(palette.length - 2, Math.floor(scaled));
  const localP = scaled - idx;
  const a = hexToRgb(palette[idx]);
  const b = hexToRgb(palette[idx + 1]);
  return rgbToHex({
    r: lerp(a.r, b.r, localP),
    g: lerp(a.g, b.g, localP),
    b: lerp(a.b, b.b, localP),
  });
}

function getCountyMetricValue(code, options = {}) {
  const { year = state.year, display = state.display, metric = state.metric } = options;
  const countyMetrics = currentCountyMetrics();
  const county = countyMetrics?.counties?.[code];
  if (!county) return null;
  if (display === "trend") return county.trend?.[metric]?.slope ?? null;
  if (display === "change") return county.summary?.[metric]?.change_2025_2000 ?? null;
  const idx = countyMetrics.years.indexOf(Number(year));
  return county.series?.[metric]?.[idx] ?? null;
}

function getCountyDomain(display = state.display, metric = state.metric) {
  const meta = COUNTY_META[metric];
  if (display === "trend") return meta.slopeDomain;
  if (display === "change") return meta.changeDomain;
  return meta.annualDomain;
}

function buildCountyGeojson(options = {}) {
  const { year = state.year, display = state.display, metric = state.metric } = options;
  if (!hasCountyData()) return null;
  const domain = getCountyDomain(display, metric);
  const palette = COUNTY_META[metric].palette;
  const activeFeatures = dataStore.activeCountyChunkCodes.flatMap((code) => dataStore.countyChunkCache[code]?.features ?? []);
  return {
    type: "FeatureCollection",
    features: activeFeatures.map((feature) => {
      const code = String(feature.properties.dt_adcode).padStart(6, "0");
      const value = getCountyMetricValue(code, { year, display, metric });
      return {
        type: "Feature",
        properties: {
          ...feature.properties,
          code,
          fill_color: rampColor(value, domain, palette),
        },
        geometry: feature.geometry,
      };
    }),
  };
}

function shouldRenderRaster() {
  return state.rasterOn && state.display !== "change";
}

function rasterMetaFor(metric = state.metric, display = state.display) {
  return RASTER_META[display]?.[metric] ?? null;
}

function currentRasterMeta() {
  if (!shouldRenderRaster()) return null;
  return rasterMetaFor();
}

function currentRasterMosaic() {
  const meta = currentRasterMeta();
  if (!meta) return null;
  if (state.display === "annual") return dataStore.registry.annual[meta.registryLayer][state.year].mosaic;
  return dataStore.registry.trend[meta.registryLayer].mosaic;
}

function rasterMosaicFor({ metric = state.metric, display = state.display, year = state.year } = {}) {
  const meta = rasterMetaFor(metric, display);
  if (!meta) return null;
  if (display === "annual") return dataStore.registry?.annual?.[meta.registryLayer]?.[year]?.mosaic ?? null;
  return dataStore.registry?.trend?.[meta.registryLayer]?.mosaic ?? null;
}

function currentRasterAssetCount() {
  const meta = currentRasterMeta();
  if (!meta) return 0;
  if (state.display === "annual") return dataStore.registry.annual[meta.registryLayer][state.year].asset_count;
  return dataStore.registry.trend[meta.registryLayer].asset_count;
}

function buildRasterTileTemplate({ metric = state.metric, display = state.display, year = state.year } = {}) {
  const meta = rasterMetaFor(metric, display);
  if (!meta) return null;
  const params = new URLSearchParams({
    url: rasterMosaicFor({ metric, display, year }),
    rescale: meta.rescale,
    colormap_name: meta.colormap,
  });
  if (meta.bidx) params.set("bidx", String(meta.bidx));
  return `${TITILER_ROOT}/mosaicjson/tiles/WebMercatorQuad/{z}/{x}/{y}@1x?${params.toString()}`;
}

function applyUrlState() {
  const params = new URLSearchParams(window.location.search);
  const metric = params.get("metric");
  const display = params.get("display");
  const year = params.get("year");
  const compare = params.get("compare");
  const compareYear = params.get("compareYear");
  const code = params.get("code");
  const lang = params.get("lang");
  const raster = params.get("raster");
  const county = params.get("county");
  const lng = readNumberParam(params, "lng");
  const lat = readNumberParam(params, "lat");
  const zoom = readNumberParam(params, "z");
  const pixelLon = readNumberParam(params, "px");
  const pixelLat = readNumberParam(params, "py");

  if (metric && COUNTY_META[metric]) state.metric = metric;
  if (display && ["annual", "trend", "change"].includes(display)) state.display = display;
  if (year && Number(year) >= 2000 && Number(year) <= 2025) state.year = String(year);
  if (compareYear && Number(compareYear) >= 2000 && Number(compareYear) <= 2025) state.compareYear = String(compareYear);
  if (compare === "1") state.compareOn = true;
  if (compare === "0") state.compareOn = false;
  if (code && /^\d{6}$/.test(code)) state.selectedCode = code;
  if (lang && I18N[lang]) state.lang = lang;
  if (raster === "0") state.rasterOn = false;
  if (raster === "1") state.rasterOn = true;
  if (county === "0") state.countyOn = false;
  if (county === "1") state.countyOn = true;
  if (state.display === "change") {
    state.rasterOn = false;
    state.compareOn = false;
  }
  if (!compareAvailable()) state.compareOn = false;

  if (lng !== null && lat !== null && zoom !== null) {
    const candidate = { center: [lng, lat], zoom };
    if (isValidMapView(candidate.center, candidate.zoom)) dataStore.initialView = candidate;
  } else {
    dataStore.initialView = readStoredMapView();
  }
  if (pixelLon !== null && pixelLat !== null) {
    state.pixelLon = pixelLon;
    state.pixelLat = pixelLat;
  }
}

function updateUrlState() {
  const params = new URLSearchParams();
  params.set("metric", state.metric);
  params.set("display", state.display);
  params.set("year", state.year);
  params.set("compare", compareViewEnabled() ? "1" : "0");
  params.set("compareYear", state.compareYear);
  params.set("lang", state.lang);
  params.set("raster", state.rasterOn ? "1" : "0");
  params.set("county", state.countyOn ? "1" : "0");
  if (state.selectedCode) params.set("code", state.selectedCode);
  if (Number.isFinite(state.pixelLon) && Number.isFinite(state.pixelLat)) {
    params.set("px", state.pixelLon.toFixed(5));
    params.set("py", state.pixelLat.toFixed(5));
  }
  if (map) {
    const center = map.getCenter();
    params.set("lng", center.lng.toFixed(5));
    params.set("lat", center.lat.toFixed(5));
    params.set("z", map.getZoom().toFixed(2));
    storeMapView();
  }
  const nextUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, "", nextUrl);
}

function updateLegend() {
  if (shouldRenderRaster()) {
    const meta = currentRasterMeta();
    el.legendTitle.textContent =
      state.display === "annual"
        ? compareViewEnabled()
          ? `${COUNTY_META[state.metric].label} ${state.year} | ${state.compareYear}`
          : `${COUNTY_META[state.metric].label} ${state.year}`
        : `${COUNTY_META[state.metric].label} ${t("trend").toLowerCase()}`;
    el.legendRamp.style.background = meta.ramp;
    el.legendMin.textContent = meta.legendMin;
    el.legendMax.textContent = meta.legendMax;
    return;
  }

  const meta = COUNTY_META[state.metric];
  const [min, max] = getCountyDomain();
  el.legendTitle.textContent =
    state.display === "change"
      ? `${meta.label} ${t("changeValue")}`
      : `${meta.label} ${state.display === "trend" ? t("trend").toLowerCase() : state.year}`;
  el.legendRamp.style.background = `linear-gradient(90deg, ${meta.palette.join(",")})`;
  el.legendMin.textContent = meta.format(min);
  el.legendMax.textContent = meta.format(max);
}

function updateStatus() {
  const parts = [];
  if (shouldRenderRaster()) parts.push(t("raster"));
  if (state.countyOn && hasCountyData() && countyZoomReady()) parts.push(t("county"));
  if (el.statusMode) {
    el.statusMode.textContent = parts.length ? parts.join(" + ") : t("county");
  }
  const displayLabel =
    state.display === "annual" ? t("annual") : state.display === "trend" ? t("trend") : t("changeValue");
  if (el.statusText) {
    el.statusText.textContent = `${COUNTY_META[state.metric].label} ${displayLabel.toLowerCase()} ${state.display === "annual" ? state.year : t("staticLabel").toLowerCase()}`;
  }
  el.year.disabled = state.display !== "annual";
  el.yearLabel.classList.toggle("year-output-disabled", state.display !== "annual");
  el.yearLabel.textContent = state.display === "annual" ? state.year : t("staticLabel");
  el.toggleRaster.classList.toggle("is-active", state.rasterOn);
  el.toggleCounty.classList.toggle("is-active", state.countyOn);
  el.toggleRaster.disabled = state.display === "change";
  if (el.compareYearLabel) {
    el.compareYearLabel.classList.toggle("year-output-disabled", !compareAvailable());
    el.compareYearLabel.textContent = state.compareYear;
  }
  syncCompareControls();
  syncCompareBadges();
  syncPixelValueCards();
}

function ensureProvinceSource(targetMap = map, prefix = "main") {
  if (!targetMap || !dataStore.provinceGeojson) return;
  const sourceId = `${prefix}-province-boundary`;
  const layerId = `${prefix}-province-boundary-line`;
  if (!targetMap.getSource(sourceId)) {
    targetMap.addSource(sourceId, { type: "geojson", data: dataStore.provinceGeojson });
  }
  if (!targetMap.getLayer(layerId)) {
    targetMap.addLayer({
      id: layerId,
      type: "line",
      source: sourceId,
      paint: {
        "line-color": "rgba(24, 28, 24, 0.72)",
        "line-width": ["interpolate", ["linear"], ["zoom"], 3, 0.8, 5, 1.25, 7, 1.75, 10, 2.2],
      },
    });
  }
}

function ensureCountyLayers(targetMap = map, prefix = "main", options = {}) {
  if (!targetMap || !hasCountyData()) return;
  const countyData = buildCountyGeojson(options);
  if (!countyData) return;
  const sourceId = `${prefix}-county-data`;
  const fillId = `${prefix}-county-fill`;
  const lineId = `${prefix}-county-line`;
  const selectedId = `${prefix}-county-selected-line`;

  if (!targetMap.getSource(sourceId)) {
    targetMap.addSource(sourceId, { type: "geojson", data: countyData, promoteId: "code" });
  } else {
    targetMap.getSource(sourceId).setData(countyData);
  }

  if (!targetMap.getLayer(fillId)) {
    targetMap.addLayer({
      id: fillId,
      type: "fill",
      source: sourceId,
      paint: { "fill-color": ["get", "fill_color"], "fill-opacity": 0.08 },
    });
  }

  if (!targetMap.getLayer(lineId)) {
    targetMap.addLayer({
      id: lineId,
      type: "line",
      source: sourceId,
      paint: { "line-color": "rgba(35, 38, 35, 0.35)", "line-width": ["interpolate", ["linear"], ["zoom"], 3, 0.25, 5, 0.4, 8, 0.8] },
    });
  }

  if (!targetMap.getLayer(selectedId)) {
    targetMap.addLayer({
      id: selectedId,
      type: "line",
      source: sourceId,
      filter: ["==", ["get", "code"], ""],
      paint: { "line-color": "#111811", "line-width": 3 },
    });
  }
}

function clearRasterLayer(targetMap = map, prefix = "main") {
  if (!targetMap) return;
  const sourceId = `${prefix}-fusion-raster`;
  const layerId = `${prefix}-fusion-raster-layer`;
  if (targetMap.getLayer(layerId)) targetMap.removeLayer(layerId);
  if (targetMap.getSource(sourceId)) targetMap.removeSource(sourceId);
  delete rasterLayerTemplates[layerId];
}

function refreshRasterLayer(refit = false, targetMap = map, options = {}) {
  if (!targetMap) return;
  const { prefix = "main", metric = state.metric, display = state.display, year = state.year } = options;
  const sourceId = `${prefix}-fusion-raster`;
  const layerId = `${prefix}-fusion-raster-layer`;
  const tileTemplate = buildRasterTileTemplate({ metric, display, year });
  const hasLayer = Boolean(targetMap.getLayer(layerId));
  const hasSource = Boolean(targetMap.getSource(sourceId));

  if (!tileTemplate) {
    clearRasterLayer(targetMap, prefix);
    if (refit) targetMap.fitBounds(CHINA_BOUNDS, { padding: 30, duration: 0 });
    return;
  }

  if (!hasLayer || !hasSource || rasterLayerTemplates[layerId] !== tileTemplate) {
    if (hasLayer) targetMap.removeLayer(layerId);
    if (hasSource) targetMap.removeSource(sourceId);
    targetMap.addSource(sourceId, {
      type: "raster",
      tiles: [tileTemplate],
      tileSize: 256,
      bounds: [CHINA_BOUNDS[0][0], CHINA_BOUNDS[0][1], CHINA_BOUNDS[1][0], CHINA_BOUNDS[1][1]],
      minzoom: 3,
      maxzoom: 14,
    });
    targetMap.addLayer({
      id: layerId,
      type: "raster",
      source: sourceId,
      paint: { "raster-opacity": 0.92, "raster-resampling": "nearest" },
    });
    rasterLayerTemplates[layerId] = tileTemplate;
  } else {
    targetMap.setLayoutProperty(layerId, "visibility", "visible");
    targetMap.setPaintProperty(layerId, "raster-opacity", 0.92);
  }

  if (refit) targetMap.fitBounds(CHINA_BOUNDS, { padding: 30, duration: 0 });
}

function scheduleInitialRasterKickoff() {
  if (initialRasterKickoffDone) return;
  initialRasterKickoffDone = true;

  const kick = () => {
    if (!map || !map.isStyleLoaded()) return;
    if (shouldRenderRaster()) {
      refreshRasterLayer(false, map, { prefix: "main" });
    } else {
      clearRasterLayer(map, "main");
    }
    syncLayerAppearance(map, "main");
    refreshCompareMap();
  };

  map.once("idle", kick);
  window.setTimeout(kick, 180);
}

function syncLayerAppearance(targetMap = map, prefix = "main") {
  if (!targetMap) return;
  const rasterActive = shouldRenderRaster();
  const countyVisible = state.countyOn && hasCountyData() && countyZoomReady() && dataStore.activeCountyChunkCodes.length > 0;
  const countyFillOpacity = countyVisible ? (rasterActive ? 0.08 : 0.84) : 0;
  const countyLineOpacity = countyVisible ? (rasterActive ? 0.18 : 0.32) : 0;
  const fillId = `${prefix}-county-fill`;
  const lineId = `${prefix}-county-line`;
  const selectedId = `${prefix}-county-selected-line`;
  const provinceId = `${prefix}-province-boundary-line`;

  if (targetMap.getLayer(fillId)) {
    targetMap.setPaintProperty(fillId, "fill-opacity", countyFillOpacity);
    targetMap.setLayoutProperty(fillId, "visibility", countyVisible ? "visible" : "none");
  }
  if (targetMap.getLayer(lineId)) {
    targetMap.setPaintProperty(lineId, "line-color", `rgba(35, 38, 35, ${countyLineOpacity})`);
    targetMap.setLayoutProperty(lineId, "visibility", countyVisible ? "visible" : "none");
  }
  if (targetMap.getLayer(selectedId)) {
    targetMap.setLayoutProperty(selectedId, "visibility", countyVisible ? "visible" : "none");
    targetMap.setFilter(selectedId, ["==", ["get", "code"], state.selectedCode || ""]);
  }
  if (targetMap.getLayer(lineId)) targetMap.moveLayer(lineId);
  if (targetMap.getLayer(selectedId)) targetMap.moveLayer(selectedId);
  if (targetMap.getLayer(provinceId)) targetMap.moveLayer(provinceId);
}

function refreshCompareMap() {
  const refreshSeq = ++compareRefreshSeq;
  if (compareRefreshTimer) {
    window.clearTimeout(compareRefreshTimer);
    compareRefreshTimer = null;
  }
  syncCompareBadges();
  if (!compareMap || !compareMap.isStyleLoaded()) return;

  const applyCompareRefresh = () => {
    if (refreshSeq !== compareRefreshSeq || !compareMap || !compareMap.isStyleLoaded()) return;
    map?.resize();
    compareMap.resize();

    if (!compareViewEnabled()) {
      clearRasterLayer(compareMap, "compare");
      ensureCountyLayers(compareMap, "compare", { year: state.compareYear, display: state.display, metric: state.metric });
      syncLayerAppearance(compareMap, "compare");
      return;
    }

    syncMapPair(map, compareMap);
    if (state.rasterOn) {
      clearRasterLayer(compareMap, "compare");
      refreshRasterLayer(false, compareMap, {
        prefix: "compare",
        metric: state.metric,
        display: "annual",
        year: state.compareYear,
      });
    } else {
      clearRasterLayer(compareMap, "compare");
    }
    ensureProvinceSource(compareMap, "compare");
    ensureCountyLayers(compareMap, "compare", { year: state.compareYear, display: state.display, metric: state.metric });
    syncLayerAppearance(compareMap, "compare");
  };

  window.requestAnimationFrame(applyCompareRefresh);
  compareRefreshTimer = window.setTimeout(() => {
    compareRefreshTimer = null;
    applyCompareRefresh();
  }, 120);
}

function queueCompareRefresh(delay = 80) {
  ++compareRefreshSeq;
  syncCompareBadges();
  syncCompareControls();
  updateUrlState();
  if (!compareMap || !compareMap.isStyleLoaded()) return;
  if (compareRefreshTimer) {
    window.clearTimeout(compareRefreshTimer);
    compareRefreshTimer = null;
  }
  if (delay <= 0) {
    refreshCompareMap();
    return;
  }
  compareRefreshTimer = window.setTimeout(() => {
    compareRefreshTimer = null;
    refreshCompareMap();
  }, delay);
}

function updateCountyPanel() {
  const countyMetrics = currentCountyMetrics();
  const meta = COUNTY_META[state.metric];
  const county = countyMetrics?.counties?.[state.selectedCode];

  if (!hasCountyData()) {
    el.countyName.textContent = t("loadingCounty");
    el.countyMeta.textContent = t("countyDataPending");
    el.countyCurrent.textContent = "--";
    el.countySlope.textContent = "--";
    el.countyChange.textContent = "--";
    el.countyP.textContent = "--";
    countyChart.clear();
    return;
  }

  if (state.countyOn && !countyZoomReady()) {
    el.countyName.textContent = t("countyZoomPrompt");
    el.countyMeta.textContent = t("countyZoomHint");
    el.countyCurrent.textContent = "--";
    el.countySlope.textContent = "--";
    el.countyChange.textContent = "--";
    el.countyP.textContent = "--";
    countyChart.clear();
    return;
  }

  if (!county) {
    el.countyName.textContent = t("clickCounty");
    el.countyMeta.textContent = t("countyHint");
    el.countyCurrent.textContent = "--";
    el.countySlope.textContent = "--";
    el.countyChange.textContent = "--";
    el.countyP.textContent = "--";
    countyChart.clear();
    return;
  }

  el.countyName.textContent = countyNameFor(state.selectedCode, "county");
  el.countyMeta.textContent = `${countyNameFor(state.selectedCode, "province")} / ${countyNameFor(state.selectedCode, "prefecture")} / ${state.selectedCode}`;

  const yearIndex = countyMetrics.years.indexOf(Number(state.year));
  el.countyCurrent.textContent = meta.format(county.series?.[state.metric]?.[yearIndex]);
  el.countySlope.textContent = meta.format(county.trend?.[state.metric]?.slope);
  el.countyChange.textContent = meta.format(county.summary?.[state.metric]?.change_2025_2000);
  el.countyP.textContent =
    county.trend?.[state.metric]?.mk_p === null || county.trend?.[state.metric]?.mk_p === undefined
      ? "--"
      : Number(county.trend[state.metric].mk_p).toExponential(2);

  countyChart.setOption({
    color: [meta.palette[4]],
    grid: { left: 52, right: 18, top: 24, bottom: 44, containLabel: true },
    tooltip: {
      trigger: "axis",
      valueFormatter: (v) => meta.format(v),
    },
    xAxis: {
      type: "category",
      data: countyMetrics.years,
      axisLabel: { color: "#64706a" },
      axisLine: { lineStyle: { color: "#c7bda9" } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#64706a" },
      splitLine: { lineStyle: { color: "rgba(23,33,27,0.09)" } },
    },
    series: [
      {
        type: "line",
        smooth: true,
        symbolSize: 4,
        data: county.series?.[state.metric] ?? [],
        lineStyle: { width: 3 },
        areaStyle: { opacity: 0.12 },
      },
    ],
  });
}

function renderPixelChartPlaceholder(messageKey) {
  if (!pixelChart) return;
  pixelChart.clear();
  pixelChart.setOption({
    title: {
      text: t(messageKey),
      left: "center",
      top: "middle",
      textStyle: { color: "#64706a", fontSize: 13, fontWeight: 700 },
    },
    xAxis: { show: false },
    yAxis: { show: false },
    series: [],
  });
}

function renderPixelSeriesChart() {
  if (!pixelChart) return;
  const payload = dataStore.pixelSeries;
  if (!payload || payload.metric !== state.metric) {
    renderPixelChartPlaceholder(state.pixelLon === null ? "pixelSeriesHint" : "pixelSeriesLoading");
    return;
  }

  const validCount = payload.values.filter((value) => value !== null).length;
  if (!validCount) {
    renderPixelChartPlaceholder("pixelSeriesEmpty");
    return;
  }

  const meta = COUNTY_META[state.metric];
  pixelChart.clear();
  pixelChart.setOption({
    color: [meta.palette[4]],
    grid: { left: 52, right: 18, top: 28, bottom: 44, containLabel: true },
    tooltip: {
      trigger: "axis",
      valueFormatter: (value) => meta.format(value),
    },
    xAxis: {
      type: "category",
      data: payload.years,
      axisLabel: { color: "#64706a" },
      axisLine: { lineStyle: { color: "#c7bda9" } },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#64706a",
        formatter: (value) => {
          if (state.metric === "lst") return `${value.toFixed(1)}°`;
          return Number(value).toFixed(2);
        },
      },
      splitLine: { lineStyle: { color: "rgba(23,33,27,0.09)" } },
    },
    series: [
      {
        type: "line",
        smooth: true,
        symbolSize: 4,
        connectNulls: false,
        data: payload.values,
        lineStyle: { width: 3 },
        areaStyle: { opacity: 0.12 },
      },
    ],
  });
}

async function queryPixelAnnualSeries(lon, lat, metric = state.metric) {
  const requestId = ++pixelSeriesRequestSeq;
  const cacheKey = `${metric}:${lon.toFixed(5)}:${lat.toFixed(5)}`;
  if (!dataStore.pixelSeriesCache[cacheKey]) {
    const meta = metricAnnualMeta(metric);
    const years = annualYearsForMetric(metric);
    dataStore.pixelSeriesCache[cacheKey] = (async () => {
      const values = await mapWithConcurrency(years, 6, async (year) => {
        try {
          const raw = await fetchRasterPointRawValue(lon, lat, annualRasterMosaic(metric, year), meta?.bidx ?? null);
          return annualRasterValue(metric, raw);
        } catch (error) {
          console.warn("Pixel annual series query failed:", metric, year, error);
          return null;
        }
      });
      return { metric, lon, lat, years, values };
    })();
  }

  renderPixelChartPlaceholder("pixelSeriesLoading");
  const payload = await dataStore.pixelSeriesCache[cacheKey];
  if (requestId !== pixelSeriesRequestSeq) return;
  dataStore.pixelSeries = payload;
  renderPixelSeriesChart();
}

async function queryRasterPoint(lon, lat) {
  const requestId = ++pixelPointRequestSeq;
  state.pixelLon = lon;
  state.pixelLat = lat;
  el.pixelLon.textContent = lon.toFixed(5);
  el.pixelLat.textContent = lat.toFixed(5);
  updatePixelHeader();
  syncPixelValueCards();
  updateUrlState();
  void queryPixelAnnualSeries(lon, lat, state.metric);

  if (!shouldRenderRaster()) {
    el.pixelStatus.textContent = t("rasterOff");
    el.pixelPrimaryValue.textContent = "--";
    if (el.pixelCompareValue) el.pixelCompareValue.textContent = "--";
    return;
  }

  el.pixelStatus.textContent = t("querying");

  try {
    const mainMeta = rasterMetaFor(state.metric, state.display);
    const compareMeta = rasterMetaFor(state.metric, "annual");
    const mainMosaic = rasterMosaicFor({ metric: state.metric, display: state.display, year: state.year });
    const compareMosaic =
      compareViewEnabled() && state.display === "annual"
        ? rasterMosaicFor({ metric: state.metric, display: "annual", year: state.compareYear })
        : null;

    const [mainResult, compareResult] = await Promise.all([
      (async () => {
        try {
          const raw = await fetchRasterPointRawValue(lon, lat, mainMosaic, mainMeta?.bidx ?? null);
          return { ok: true, output: raw === null ? "--" : mainMeta.pointFormat(raw) };
        } catch (error) {
          console.error(error);
          return { ok: false, output: "--" };
        }
      })(),
      compareMosaic
        ? (async () => {
            try {
              const raw = await fetchRasterPointRawValue(lon, lat, compareMosaic, compareMeta?.bidx ?? null);
              return { ok: true, output: raw === null ? "--" : compareMeta.pointFormat(raw) };
            } catch (error) {
              console.error(error);
              return { ok: false, output: "--" };
            }
          })()
        : Promise.resolve({ ok: true, output: "--" }),
    ]);

    if (requestId !== pixelPointRequestSeq) return;

    el.pixelPrimaryValue.textContent = mainResult.output;
    if (el.pixelCompareValue) el.pixelCompareValue.textContent = compareResult.output;

    if (mainResult.output === "--" && (!compareMosaic || compareResult.output === "--")) {
      el.pixelStatus.textContent = mainResult.ok || compareResult.ok ? t("noData") : t("failed");
      return;
    }
    el.pixelStatus.textContent = "OK";
  } catch (error) {
    console.error(error);
    if (requestId !== pixelPointRequestSeq) return;
    el.pixelPrimaryValue.textContent = "--";
    if (el.pixelCompareValue) el.pixelCompareValue.textContent = "--";
    el.pixelStatus.textContent = t("failed");
  }
}

function updatePixelHeader() {
  if (state.pixelLon !== null && state.pixelLat !== null) {
    el.pixelTitle.textContent = t("selectedPixel");
    el.pixelMeta.textContent = `${t("pixelSeries")}: ${state.pixelLon.toFixed(5)}, ${state.pixelLat.toFixed(5)}`;
    return;
  }
  el.pixelTitle.textContent = t("pixelInformation");
  el.pixelMeta.textContent = shouldRenderRaster() ? t("pixelHint") : t("pixelMetaOff");
}

async function syncCountyViewport() {
  if (!map || !map.isStyleLoaded()) return;
  if (!hasCountyData() || !state.countyOn || !countyZoomReady()) {
    dataStore.activeCountyChunkCodes = [];
    ensureCountyLayers(map, "main", { year: state.year, display: state.display, metric: state.metric });
    ensureCountyLayers(compareMap, "compare", { year: state.compareYear, display: state.display, metric: state.metric });
    syncLayerAppearance(map, "main");
    syncLayerAppearance(compareMap, "compare");
    updateStatus();
    updateCountyPanel();
    return;
  }

  await ensureVisibleCountyChunks();
  ensureCountyLayers(map, "main", { year: state.year, display: state.display, metric: state.metric });
  ensureCountyLayers(compareMap, "compare", { year: state.compareYear, display: state.display, metric: state.metric });
  syncLayerAppearance(map, "main");
  syncLayerAppearance(compareMap, "compare");
  updateStatus();
  updateCountyPanel();
}

async function refreshAll(refit = false) {
  updateStatus();
  updateLegend();
  updateCountyPanel();
  updatePixelHeader();
  if (!map || !map.isStyleLoaded()) {
    updateUrlState();
    return;
  }
  if (shouldRenderRaster()) {
    refreshRasterLayer(refit, map, { prefix: "main" });
  } else {
    clearRasterLayer(map, "main");
  }
  await syncCountyViewport();
  refreshCompareMap();
  updateUrlState();
}

async function locateProvince(code) {
  await ensureProvinceGeojson();
  const feature = dataStore.provinceGeojson?.features?.find((item) => String(item.properties?.pr_adcode) === code);
  if (!feature) return false;
  fitMapToBBox(bboxFromGeometry(feature.geometry), 6.8);
  return true;
}

async function locatePrefecture(code) {
  const chunkCode = code.slice(0, 2);
  await ensureCountyAssets();
  await ensureCountyChunk(chunkCode);
  const features = (dataStore.countyChunkCache[chunkCode]?.features ?? []).filter((feature) =>
    String(feature.properties?.dt_adcode).padStart(6, "0").startsWith(code.slice(0, 4)),
  );
  if (!features.length) return false;
  state.countyOn = true;
  state.selectedCode = String(features[0].properties?.dt_adcode).padStart(6, "0");
  fitMapToBBox(bboxFromFeatures(features), 8.4);
  return true;
}

async function locateCounty(code) {
  const chunkCode = code.slice(0, 2);
  await ensureCountyAssets();
  await ensureCountyChunk(chunkCode);
  if (!currentCountyMetrics(state.metric)) await ensureCountyMetric(state.metric);
  const feature = (dataStore.countyChunkCache[chunkCode]?.features ?? []).find(
    (item) => String(item.properties?.dt_adcode).padStart(6, "0") === code,
  );
  if (!feature) return false;
  state.countyOn = true;
  state.selectedCode = code;
  fitMapToBBox(bboxFromGeometry(feature.geometry), 9.4);
  syncLayerAppearance(map, "main");
  syncLayerAppearance(compareMap, "compare");
  updateCountyPanel();
  return true;
}

async function locateSearchEntry(entry) {
  if (!entry) return false;
  if (entry.type === "province") return locateProvince(entry.code);
  if (entry.type === "prefecture") return locatePrefecture(entry.code);
  return locateCounty(entry.code);
}

async function handleSearchSubmit() {
  const query = el.locationSearch?.value?.trim() ?? "";
  if (!query) {
    setSearchStatus("searchHint");
    return;
  }

  setSearchStatus("searchBusy");
  await ensureCountyAssets();
  const [entry] = searchEntries(query);
  if (!entry) {
    setSearchStatus("searchNoMatch", "error");
    return;
  }

  const located = await locateSearchEntry(entry);
  if (!located) {
    setSearchStatus("searchNoMatch", "error");
    return;
  }

  setSearchStatus("locatedLabel", "success", entry.code);
  await refreshAll(false);
}

async function copyText(text) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "readonly");
  input.style.position = "absolute";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(input);
  if (!copied) throw new Error("Copy command failed");
}

function exportPixelChart() {
  if (!pixelChart) throw new Error("Pixel chart not ready");
  const dataUrl = pixelChart.getDataURL({
    type: "png",
    pixelRatio: 2,
    backgroundColor: "#fffaf0",
  });
  const link = document.createElement("a");
  const lon = state.pixelLon === null ? "na" : state.pixelLon.toFixed(3);
  const lat = state.pixelLat === null ? "na" : state.pixelLat.toFixed(3);
  link.href = dataUrl;
  link.download = `ecoenvatlas_${state.metric}_pixel_series_${lon}_${lat}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function handleShareView() {
  updateUrlState();
  try {
    await copyText(window.location.href);
    setSearchStatus("shareCopied", "success");
  } catch (error) {
    console.error(error);
    setSearchStatus("shareFailed", "error");
  }
}

function handleExportPixelChart() {
  try {
    exportPixelChart();
    setSearchStatus("exportReady", "success");
  } catch (error) {
    console.error(error);
    setSearchStatus("exportFailed", "error");
  }
}

function bindControls() {
  el.language.addEventListener("input", async () => {
    state.lang = el.language.value;
    applyLanguage();
    await refreshAll(false);
    if (state.pixelLon !== null && state.pixelLat !== null) {
      void queryRasterPoint(state.pixelLon, state.pixelLat);
    }
  });

  el.metric.addEventListener("input", async () => {
    state.metric = el.metric.value;
    await refreshAll(false);
    if (state.countyOn) {
      await ensureCountyData(state.metric);
    }
    await refreshAll(false);
    if (state.pixelLon !== null && state.pixelLat !== null) {
      void queryRasterPoint(state.pixelLon, state.pixelLat);
    }
  });

  el.display.addEventListener("input", async () => {
    state.display = el.display.value;
    if (state.display !== "annual") state.compareOn = false;
    if (state.display === "change") state.rasterOn = false;
    await refreshAll(false);
    if (state.pixelLon !== null && state.pixelLat !== null) {
      void queryRasterPoint(state.pixelLon, state.pixelLat);
    }
  });

  el.year.addEventListener("input", async () => {
    state.year = el.year.value;
    if (state.compareYear === state.year) {
      state.compareYear = state.year === "2025" ? "2000" : "2025";
      if (el.compareYear) el.compareYear.value = state.compareYear;
    }
    await refreshAll(false);
    if (state.pixelLon !== null && state.pixelLat !== null) {
      void queryRasterPoint(state.pixelLon, state.pixelLat);
    }
  });

  el.toggleRaster.addEventListener("click", async () => {
    if (state.display === "change") return;
    state.rasterOn = !state.rasterOn;
    if (!compareAvailable()) state.compareOn = false;
    await refreshAll(false);
    if (compareViewEnabled()) queueCompareRefresh(0);
    if (state.pixelLon !== null && state.pixelLat !== null) {
      void queryRasterPoint(state.pixelLon, state.pixelLat);
    }
  });

  el.toggleCounty.addEventListener("click", async () => {
    state.countyOn = !state.countyOn;
    if (state.countyOn) {
      await refreshAll(false);
      await ensureCountyData(state.metric);
    }
    await refreshAll(false);
  });

  el.toggleCompare?.addEventListener("click", async () => {
    if (!compareAvailable()) {
      setSearchStatus("compareDisabled", "error");
      return;
    }
    state.compareOn = !state.compareOn;
    updateLegend();
    updateStatus();
    syncCompareControls();
    syncCompareBadges();
    queueCompareRefresh(0);
    if (state.pixelLon !== null && state.pixelLat !== null) {
      void queryRasterPoint(state.pixelLon, state.pixelLat);
    }
  });

  el.compareYear?.addEventListener("input", () => {
    state.compareYear = el.compareYear.value;
    if (state.compareYear === state.year) {
      const fallbackYear = state.year === "2025" ? "2000" : "2025";
      state.compareYear = fallbackYear;
      el.compareYear.value = fallbackYear;
    }
    if (el.compareYearLabel) el.compareYearLabel.textContent = state.compareYear;
    updateLegend();
    queueCompareRefresh(90);
    if (state.pixelLon !== null && state.pixelLat !== null) {
      void queryRasterPoint(state.pixelLon, state.pixelLat);
    }
  });

  el.compareYear?.addEventListener("change", () => {
    state.compareYear = el.compareYear.value;
    if (state.compareYear === state.year) {
      const fallbackYear = state.year === "2025" ? "2000" : "2025";
      state.compareYear = fallbackYear;
      el.compareYear.value = fallbackYear;
    }
    if (el.compareYearLabel) el.compareYearLabel.textContent = state.compareYear;
    updateLegend();
    queueCompareRefresh(0);
    if (state.pixelLon !== null && state.pixelLat !== null) {
      void queryRasterPoint(state.pixelLon, state.pixelLat);
    }
  });

  el.locationSearch?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    void handleSearchSubmit();
  });

  el.searchBtn?.addEventListener("click", () => {
    void handleSearchSubmit();
  });

  el.shareViewBtn?.addEventListener("click", () => {
    void handleShareView();
  });

  el.exportPixelChartBtn?.addEventListener("click", () => {
    handleExportPixelChart();
  });
}

function syncMapPair(sourceMap, targetMap) {
  if (!sourceMap || !targetMap || syncingMapPair) return;
  syncingMapPair = true;
  targetMap.jumpTo({
    center: sourceMap.getCenter(),
    zoom: sourceMap.getZoom(),
    bearing: sourceMap.getBearing(),
    pitch: sourceMap.getPitch(),
  });
  syncingMapPair = false;
}

function bindMapEvents(targetMap, prefix = "main") {
  if (!targetMap) return;

  targetMap.on("click", async (event) => {
    const { lng, lat } = event.lngLat;
    const countyLayerId = `${prefix}-county-fill`;
    const countyFeatures = targetMap.getLayer(countyLayerId) ? targetMap.queryRenderedFeatures(event.point, { layers: [countyLayerId] }) : [];
    if (countyFeatures.length) {
      state.selectedCode = String(countyFeatures[0].properties.code).padStart(6, "0");
      syncLayerAppearance(map, "main");
      syncLayerAppearance(compareMap, "compare");
      updateCountyPanel();
    }

    await queryRasterPoint(lng, lat);
  });

  targetMap.on("mousemove", (event) => {
    const countyLayerId = `${prefix}-county-fill`;
    const countyFeatures = targetMap.getLayer(countyLayerId) ? targetMap.queryRenderedFeatures(event.point, { layers: [countyLayerId] }) : [];
    targetMap.getCanvas().style.cursor = countyFeatures.length ? "pointer" : "";
  });

  targetMap.on("move", () => {
    if (targetMap === map) syncMapPair(map, compareMap);
    if (targetMap === compareMap) syncMapPair(compareMap, map);
  });

  targetMap.on("moveend", () => {
    void syncCountyViewport();
    updateUrlState();
  });
}

function createMap(container, withControls = false) {
  const initialCenter = dataStore.initialView?.center ?? DEFAULT_MAP_CENTER;
  const initialZoom = dataStore.initialView?.zoom ?? DEFAULT_MAP_ZOOM;
  const targetMap = new maplibregl.Map({
    container,
    attributionControl: false,
    style: {
      version: 8,
      sources: {
        osm: {
          type: "raster",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
          attribution: "&copy; OpenStreetMap contributors",
        },
      },
      layers: [
        {
          id: "osm",
          type: "raster",
          source: "osm",
          paint: { "raster-opacity": 0.52, "raster-saturation": -0.4 },
        },
      ],
    },
    center: initialCenter,
    zoom: initialZoom,
    minZoom: 3,
    maxZoom: 14,
  });

  if (withControls) {
    targetMap.addControl(new maplibregl.NavigationControl(), "top-left");
    targetMap.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");
  }
  return targetMap;
}

function initMap() {
  map = createMap("fusionMap", true);
  compareMap = createMap("compareMap", false);

  map.on("load", async () => {
    ensureProvinceSource(map, "main");
    bindMapEvents(map, "main");
    await refreshAll(!dataStore.initialView);
    scheduleInitialRasterKickoff();
    if (state.pixelLon !== null && state.pixelLat !== null) {
      void queryRasterPoint(state.pixelLon, state.pixelLat);
    } else {
      renderPixelChartPlaceholder("pixelSeriesHint");
    }
  });

  compareMap.on("load", async () => {
    ensureProvinceSource(compareMap, "compare");
    bindMapEvents(compareMap, "compare");
    refreshCompareMap();
  });
}

async function boot() {
  applyUrlState();
  applyLanguage();
  syncControlsFromState();
  pixelChart = echarts.init(document.querySelector("#pixelChart"));
  countyChart = echarts.init(document.querySelector("#countyChart"));
  renderPixelSeriesChart();
  updateCountyPanel();
  const [registry] = await Promise.all([fetch(REGISTRY_URL).then((r) => r.json())]);

  dataStore.registry = registry;

  bindControls();
  initMap();
  window.addEventListener("resize", () => {
    countyChart.resize();
    pixelChart.resize();
    map?.resize();
    compareMap?.resize();
  });
  void ensureProvinceGeojson()
    .then(async () => {
      if (map && map.isStyleLoaded()) {
        ensureProvinceSource(map, "main");
        ensureProvinceSource(compareMap, "compare");
        syncLayerAppearance(map, "main");
        syncLayerAppearance(compareMap, "compare");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  void ensureCountyData(state.metric)
    .then(async () => {
      await refreshAll(false);
      scheduleCountyPrefetch();
    })
    .catch((error) => {
      console.error(error);
      el.countyName.textContent = t("failed");
      el.countyMeta.textContent = t("countyDataPending");
    });
}

boot().catch((error) => {
  console.error(error);
  el.pixelStatus.textContent = t("failed");
});
