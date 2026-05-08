const DATA = {
  geojson: "./data/district_web_simplified.geojson?v=highres001b",
  province: "./data/province_boundary.geojson?v=province002",
  metrics: "./data/county_metrics_for_app.json",
  names: "./data/county_names_i18n.json?v=i18n001",
};

const params = new URLSearchParams(window.location.search);

const I18N = {
  en: {
    pageTitle: "China County EcoSense GIS",
    mapEyebrow: "County-scale Web GIS Prototype",
    mapTitle: "China Eco-Environmental Indicator Explorer",
    mapSubtitle:
      "Explore 2000-2025 county-level RSEI, LST, NDVI, WET and NDBSI trends derived from 30 m national remote-sensing products.",
    interactiveMap: "Interactive Map",
    countyAnalytics: "County Analytics",
    rseiPca: "RSEI PCA",
    language: "Language",
    counties: "counties",
    loading: "Loading data...",
    ready: "Ready",
    failed: "Failed to load data",
    indicator: "Indicator",
    year: "Year",
    mapMode: "Map Mode",
    annualValue: "Annual value",
    sensSlope: "Sen's slope",
    changeRange: "Change 2025-2000",
    selectedCounty: "Selected County",
    clickCounty: "Click a county",
    countyMetaHint: "Province / Prefecture information will appear here.",
    current: "Current",
    slope: "Slope",
    mkP: "MK p",
    trend: "Trend",
    unknownCounty: "Unknown county",
    inYear: "in",
    changeTitle: "change 2025-2000",
    trendLabels: {
      "-2": "Significant decrease",
      "-1": "Decrease",
      0: "Stable",
      1: "Increase",
      2: "Significant increase",
    },
  },
  zh_cn: {
    pageTitle: "中国县域生态环境指标 GIS",
    mapEyebrow: "县域尺度 Web GIS 原型",
    mapTitle: "中国生态环境指标交互系统",
    mapSubtitle: "浏览基于 30 m 全国遥感产品生成的 2000-2025 年县域 RSEI、LST、NDVI、WET 与 NDBSI 趋势。",
    interactiveMap: "交互地图",
    countyAnalytics: "县域分析",
    rseiPca: "RSEI PCA",
    language: "语言",
    counties: "个县域",
    loading: "正在加载数据...",
    ready: "已就绪",
    failed: "数据加载失败",
    indicator: "指标",
    year: "年份",
    mapMode: "地图模式",
    annualValue: "年度数值",
    sensSlope: "Sen's slope 趋势斜率",
    changeRange: "2025-2000 变化量",
    selectedCounty: "选中县域",
    clickCounty: "点击一个县域",
    countyMetaHint: "省 / 市州信息将在这里显示。",
    current: "当前值",
    slope: "斜率",
    mkP: "MK p 值",
    trend: "趋势",
    unknownCounty: "未知县域",
    inYear: "年份",
    changeTitle: "2025-2000 变化量",
    trendLabels: {
      "-2": "显著下降",
      "-1": "下降",
      0: "稳定",
      1: "上升",
      2: "显著上升",
    },
  },
  zh_hant: {
    pageTitle: "中國縣域生態環境指標 GIS",
    mapEyebrow: "縣域尺度 Web GIS 原型",
    mapTitle: "中國生態環境指標互動系統",
    mapSubtitle: "瀏覽基於 30 m 全國遙感產品生成的 2000-2025 年縣域 RSEI、LST、NDVI、WET 與 NDBSI 趨勢。",
    interactiveMap: "互動地圖",
    countyAnalytics: "縣域分析",
    rseiPca: "RSEI PCA",
    language: "語言",
    counties: "個縣域",
    loading: "正在載入資料...",
    ready: "已就緒",
    failed: "資料載入失敗",
    indicator: "指標",
    year: "年份",
    mapMode: "地圖模式",
    annualValue: "年度數值",
    sensSlope: "Sen's slope 趨勢斜率",
    changeRange: "2025-2000 變化量",
    selectedCounty: "選中縣域",
    clickCounty: "點擊一個縣域",
    countyMetaHint: "省 / 市州資訊將在這裡顯示。",
    current: "目前值",
    slope: "斜率",
    mkP: "MK p 值",
    trend: "趨勢",
    unknownCounty: "未知縣域",
    inYear: "年份",
    changeTitle: "2025-2000 變化量",
    trendLabels: {
      "-2": "顯著下降",
      "-1": "下降",
      0: "穩定",
      1: "上升",
      2: "顯著上升",
    },
  },
};

const METRIC_META = {
  rsei: {
    label: "RSEI",
    unit: "",
    valueDomain: [0, 1],
    slopeDomain: [-0.01, 0.01],
    changeDomain: [-0.18, 0.18],
    palette: ["#8b2d22", "#d98247", "#f1df9a", "#9acb73", "#1f7a4f"],
  },
  lst: {
    label: "LST",
    unit: "°C",
    valueDomain: [15, 35],
    slopeDomain: [-0.12, 0.12],
    changeDomain: [-3, 3],
    palette: ["#2d6f8f", "#7fb9c8", "#f3e6a3", "#e69b52", "#9b2f2b"],
  },
  ndvi: {
    label: "NDVI",
    unit: "",
    valueDomain: [0, 0.9],
    slopeDomain: [-0.01, 0.01],
    changeDomain: [-0.18, 0.18],
    palette: ["#fde725", "#5ec962", "#21918c", "#3b528b", "#440154"],
  },
  wet: {
    label: "WET",
    unit: "",
    valueDomain: [-0.3, -0.05],
    slopeDomain: [-0.006, 0.006],
    changeDomain: [-0.12, 0.12],
    palette: ["#543005", "#bf812d", "#f6e8c3", "#80cdc1", "#003c30"],
  },
  ndbsi: {
    label: "NDBSI",
    unit: "",
    valueDomain: [-0.4, 0.2],
    slopeDomain: [-0.01, 0.01],
    changeDomain: [-0.2, 0.2],
    palette: ["#0d0887", "#7e03a8", "#cc4778", "#f89540", "#f0f921"],
  },
};

let map;
let districtLayer;
let provinceLayer;
let metricData;
let nameData;
let currentLang = localStorage.getItem("rsei-viewer-lang") || "en";
let selectedCode = null;
let chart;
const layerByCode = new Map();
let isEmbed = false;

const el = {
  language: document.querySelector("#languageSelect"),
  metric: document.querySelector("#metricSelect"),
  mode: document.querySelector("#modeSelect"),
  year: document.querySelector("#yearSlider"),
  yearLabel: document.querySelector("#yearLabel"),
  status: document.querySelector("#statusText"),
  countyCount: document.querySelector("#countyCount"),
  selectedName: document.querySelector("#selectedName"),
  selectedMeta: document.querySelector("#selectedMeta"),
  currentValue: document.querySelector("#currentValue"),
  slopeValue: document.querySelector("#slopeValue"),
  pValue: document.querySelector("#pValue"),
  trendValue: document.querySelector("#trendValue"),
  legend: document.querySelector("#legend"),
};

function t(key) {
  return I18N[currentLang]?.[key] ?? I18N.en[key] ?? key;
}

function nameFor(code, part = "county") {
  const item = nameData?.counties?.[code];
  if (!item) return code;
  return item[currentLang]?.[part] ?? item.en?.[part] ?? item.zh_cn?.[part] ?? code;
}

function applyLanguage() {
  currentLang = el.language?.value || currentLang;
  localStorage.setItem("rsei-viewer-lang", currentLang);
  document.documentElement.lang = currentLang === "zh_hant" ? "zh-Hant" : currentLang === "zh_cn" ? "zh-Hans" : "en";
  document.title = t("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  if (el.status) el.status.textContent = metricData ? t("ready") : t("loading");
}

function applyIncomingState(payload = {}) {
  const metric = payload.metric;
  const mode = payload.mode;
  const year = payload.year;
  const lang = payload.lang;

  if (metric && METRIC_META[metric]) {
    el.metric.value = metric;
  }
  if (mode && ["value", "slope", "change"].includes(mode)) {
    el.mode.value = mode;
  }
  if (year && Number(year) >= 2000 && Number(year) <= 2025) {
    el.year.value = String(year);
  }
  if (lang && I18N[lang] && el.language) {
    el.language.value = lang;
  }
}

function lerp(a, b, t) {
  return a + (b - a) * t;
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

function rampColor(value, domain, palette) {
  if (value === null || value === undefined || Number.isNaN(value)) return "#d7d2c7";
  const [min, max] = domain;
  const clamped = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const scaled = clamped * (palette.length - 1);
  const idx = Math.min(palette.length - 2, Math.floor(scaled));
  const localT = scaled - idx;
  const a = hexToRgb(palette[idx]);
  const b = hexToRgb(palette[idx + 1]);
  return rgbToHex({
    r: lerp(a.r, b.r, localT),
    g: lerp(a.g, b.g, localT),
    b: lerp(a.b, b.b, localT),
  });
}

function metricValue(code) {
  const county = metricData.counties[code];
  if (!county) return null;
  const metric = el.metric.value;
  const mode = el.mode.value;
  const yearIndex = metricData.years.indexOf(Number(el.year.value));

  if (mode === "slope") return county.trend?.[metric]?.slope ?? null;
  if (mode === "change") return county.summary?.[metric]?.change_2025_2000 ?? null;
  return county.series?.[metric]?.[yearIndex] ?? null;
}

function currentDomain() {
  const meta = METRIC_META[el.metric.value];
  const mode = el.mode.value;
  if (mode === "slope") return meta.slopeDomain;
  if (mode === "change") return meta.changeDomain;
  return meta.valueDomain;
}

function styleFeature(feature) {
  const code = String(feature.properties.dt_adcode).padStart(6, "0");
  const value = metricValue(code);
  const meta = METRIC_META[el.metric.value];
  const fillColor = rampColor(value, currentDomain(), meta.palette);
  return {
    color: selectedCode === code ? "#141914" : fillColor,
    weight: selectedCode === code ? 3.4 : 1.15,
    opacity: 1,
    fillColor,
    fillOpacity: value === null ? 0.25 : 0.88,
    lineJoin: "round",
    lineCap: "round",
  };
}

function raiseProvinceBoundary() {
  provinceLayer?.bringToFront();
}

function formatValue(value, metric = el.metric.value) {
  if (value === null || value === undefined || Number.isNaN(value)) return "--";
  if (metric === "lst") return `${value.toFixed(2)} °C`;
  if (Math.abs(value) < 0.001 && value !== 0) return value.toExponential(2);
  return value.toFixed(4);
}

function updateLegend() {
  const meta = METRIC_META[el.metric.value];
  const [min, max] = currentDomain();
  const title =
    el.mode.value === "value"
      ? currentLang === "en"
        ? `${meta.label} ${t("inYear")} ${el.year.value}`
        : `${el.year.value} ${t("inYear")} ${meta.label}`
      : el.mode.value === "slope"
        ? `${meta.label} ${t("sensSlope")}`
        : `${meta.label} ${t("changeTitle")}`;

  el.legend.innerHTML = `
    <strong>${title}</strong>
    <div class="legend-ramp" style="background: linear-gradient(90deg, ${meta.palette.join(",")})"></div>
    <div class="legend-row"><span>${formatValue(min)}</span><span>${formatValue(max)}</span></div>
  `;
}

function updateMap() {
  el.yearLabel.value = el.year.value;
  const yearEnabled = el.mode.value === "value";
  el.year.disabled = !yearEnabled;
  el.yearLabel.classList.toggle("year-output-disabled", !yearEnabled);
  if (districtLayer) districtLayer.setStyle(styleFeature);
  raiseProvinceBoundary();
  updateTooltips();
  updateLegend();
  if (selectedCode) updatePanel(selectedCode);
}

function updateTooltips() {
  layerByCode.forEach((layer, code) => {
    const county = metricData?.counties?.[code];
    if (county && layer.getTooltip()) {
      layer.setTooltipContent(`${nameFor(code, "province")} · ${nameFor(code, "county")}`);
    }
  });
}

function updatePanel(code, scrollIntoView = false) {
  selectedCode = code;
  const county = metricData.counties[code];
  const metric = el.metric.value;
  const meta = METRIC_META[metric];
  const value = metricValue(code);
  const trend = county?.trend?.[metric] ?? {};

  el.selectedName.textContent = county ? nameFor(code, "county") : t("unknownCounty");
  el.selectedMeta.textContent = county ? `${nameFor(code, "province")} / ${nameFor(code, "prefecture")} / ${code}` : "";
  el.currentValue.textContent = formatValue(value, metric);
  el.slopeValue.textContent = formatValue(trend.slope, metric);
  el.pValue.textContent = trend.mk_p === null || trend.mk_p === undefined ? "--" : Number(trend.mk_p).toExponential(2);
  el.trendValue.textContent =
    trend.trend_class === null || trend.trend_class === undefined ? "--" : t("trendLabels")[String(trend.trend_class)];

  const series = county?.series?.[metric] ?? [];
  chart.setOption({
    color: [meta.palette[4]],
    tooltip: {
      trigger: "axis",
      valueFormatter: (v) => formatValue(v, metric),
    },
    grid: { left: 52, right: 18, top: 32, bottom: 56, containLabel: true },
    xAxis: {
      type: "category",
      data: metricData.years,
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
        name: meta.label,
        type: "line",
        smooth: true,
        symbolSize: 5,
        data: series,
        areaStyle: { opacity: 0.12 },
        lineStyle: { width: 3 },
      },
    ],
  });

  districtLayer.setStyle(styleFeature);
  layerByCode.get(code)?.bringToFront();
  raiseProvinceBoundary();

  void scrollIntoView;
}

function initMap(geojson, provinceGeojson) {
  map = L.map("map", {
    zoomControl: false,
    attributionControl: false,
    preferCanvas: true,
    zoomSnap: 0.25,
    zoomDelta: 0.5,
    keyboard: false,
    boxZoom: false,
  }).setView([35.4, 104.6], 4);

  L.control.zoom({ position: "topleft" }).addTo(map);


  districtLayer = L.geoJSON(geojson, {
    smoothFactor: 0,
    style: styleFeature,
    onEachFeature: (feature, layer) => {
      const code = String(feature.properties.dt_adcode).padStart(6, "0");
      layer.on({
        mouseover: () => {
          layer.setStyle({ weight: selectedCode === code ? 3.4 : 1.8, color: "#111811", opacity: 1 });
          layer.bringToFront();
          raiseProvinceBoundary();
        },
        mouseout: () => {
          districtLayer.setStyle(styleFeature);
          if (selectedCode) layerByCode.get(selectedCode)?.bringToFront();
          raiseProvinceBoundary();
        },
        click: () => updatePanel(code),
      });
      layerByCode.set(code, layer);
      const county = metricData.counties[code];
      layer.bindTooltip(county ? `${nameFor(code, "province")} · ${nameFor(code, "county")}` : code, {
        sticky: true,
        direction: "top",
      });
    },
  }).addTo(map);

  provinceLayer = L.geoJSON(provinceGeojson, {
    interactive: false,
    smoothFactor: 0,
    style: {
      color: "rgba(24, 28, 24, 0.62)",
      weight: 1.15,
      opacity: 0.9,
      fillOpacity: 0,
      lineJoin: "round",
      lineCap: "round",
    },
  }).addTo(map);

  raiseProvinceBoundary();

  map.fitBounds(districtLayer.getBounds(), { padding: [2, 2] });
  map.setZoom(Math.min(map.getZoom() + 0.5, 5.25));
}

function bindEmbedMessaging() {
  window.addEventListener("message", (event) => {
    if (!event?.data || event.data.type !== "county-viewer:setState") return;
    applyIncomingState(event.data.payload || {});
    if (el.language) {
      currentLang = el.language.value;
      applyLanguage();
    }
    updateMap();
    if (selectedCode) updatePanel(selectedCode);
  });
}

async function boot() {
  chart = echarts.init(document.querySelector("#chart"));
  isEmbed = params.get("embed") === "1";
  if (isEmbed) {
    document.body.classList.add("embed-mode");
  }

  applyIncomingState({
    metric: params.get("metric"),
    mode: params.get("mode"),
    year: params.get("year"),
    lang: params.get("lang"),
  });

  if (el.language) el.language.value = currentLang;
  if (params.get("lang") && I18N[params.get("lang")]) {
    currentLang = params.get("lang");
    el.language.value = currentLang;
  }
  applyLanguage();

  const [geojson, provinceGeojson, metrics, names] = await Promise.all([
    fetch(DATA.geojson).then((r) => r.json()),
    fetch(DATA.province).then((r) => r.json()),
    fetch(DATA.metrics).then((r) => r.json()),
    fetch(DATA.names).then((r) => r.json()),
  ]);
  metricData = metrics;
  nameData = names;

  el.countyCount.textContent = Object.keys(metricData.counties).length.toLocaleString();
  el.status.textContent = t("ready");

  initMap(geojson, provinceGeojson);
  updateLegend();
  updatePanel("110101");
  updateMap();

  [el.metric, el.mode, el.year].forEach((control) => control.addEventListener("input", updateMap));
  el.language?.addEventListener("input", () => {
    applyLanguage();
    updateMap();
    if (selectedCode) updatePanel(selectedCode);
  });
  bindEmbedMessaging();
  window.addEventListener("resize", () => chart.resize());
}

boot().catch((error) => {
  console.error(error);
  el.status.textContent = t("failed");
});
