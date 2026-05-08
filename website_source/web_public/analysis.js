const METRIC_DATA_URLS = {
  rsei: "./data/county_metrics_rsei.json",
  lst: "./data/county_metrics_lst.json",
  ndvi: "./data/county_metrics_ndvi.json",
  wet: "./data/county_metrics_wet.json",
  ndbsi: "./data/county_metrics_ndbsi.json",
};
const NAMES_URL = "./data/county_names_i18n.json?v=i18n001";

const I18N = {
  en: {
    pageTitle: "County Analytics | China Eco-Environmental GIS",
    countyAnalytics: "County Analytics",
    analysisTitle: "Ranking and Provincial Summaries",
    analysisSubtitle:
      "Compare counties and provinces using annual means, long-term change and Sen's slope derived from 2000-2025 county-level indicator series.",
    interactiveMap: "Interactive Map",
    rseiPca: "RSEI PCA",
    background: "Research Background",
    opticalIndicators: "Optical Indicators",
    lst30m: "LST 30 m",
    techStack: "Tech Stack",
    team: "Team",
    language: "Language",
    counties: "counties",
    loading: "Loading data...",
    ready: "Ready",
    failed: "Failed to load data",
    indicator: "Indicator",
    measure: "Measure",
    year: "Year",
    annualValue: "Annual value",
    sensSlope: "Sen's slope",
    changeRange: "Change 2025-2000",
    meanRange: "Mean 2000-2025",
    topCounties: "Top Counties",
    bottomCounties: "Bottom Counties",
    provincialAverage: "Provincial Average",
    highest: "Highest",
    lowest: "Lowest",
    average: "Average",
  },
  zh_cn: {
    pageTitle: "县域分析 | 中国生态环境 GIS",
    countyAnalytics: "县域分析",
    analysisTitle: "县域排名与省级汇总",
    analysisSubtitle: "比较 2000-2025 年县域指标序列的年度均值、长期变化和 Sen's slope 趋势斜率。",
    interactiveMap: "交互地图",
    rseiPca: "RSEI PCA",
    background: "研究背景",
    opticalIndicators: "光学指标",
    lst30m: "30 米 LST",
    techStack: "技术栈",
    team: "团队成员",
    language: "语言",
    counties: "个县域",
    loading: "正在加载数据...",
    ready: "已就绪",
    failed: "数据加载失败",
    indicator: "指标",
    measure: "统计量",
    year: "年份",
    annualValue: "年度数值",
    sensSlope: "Sen's slope 趋势斜率",
    changeRange: "2025-2000 变化量",
    meanRange: "2000-2025 均值",
    topCounties: "最高县域",
    bottomCounties: "最低县域",
    provincialAverage: "省级平均",
    highest: "最高",
    lowest: "最低",
    average: "平均值",
  },
  zh_hant: {
    pageTitle: "縣域分析 | 中國生態環境 GIS",
    countyAnalytics: "縣域分析",
    analysisTitle: "縣域排名與省級匯總",
    analysisSubtitle: "比較 2000-2025 年縣域指標序列的年度均值、長期變化和 Sen's slope 趨勢斜率。",
    interactiveMap: "互動地圖",
    rseiPca: "RSEI PCA",
    background: "研究背景",
    opticalIndicators: "光學指標",
    lst30m: "30 米 LST",
    techStack: "技術棧",
    team: "團隊成員",
    language: "語言",
    counties: "個縣域",
    loading: "正在載入資料...",
    ready: "已就緒",
    failed: "資料載入失敗",
    indicator: "指標",
    measure: "統計量",
    year: "年份",
    annualValue: "年度數值",
    sensSlope: "Sen's slope 趨勢斜率",
    changeRange: "2025-2000 變化量",
    meanRange: "2000-2025 均值",
    topCounties: "最高縣域",
    bottomCounties: "最低縣域",
    provincialAverage: "省級平均",
    highest: "最高",
    lowest: "最低",
    average: "平均值",
  },
};

const METRIC_META = {
  rsei: { label: "RSEI", color: "#23704f" },
  lst: { label: "LST", color: "#c26a2e" },
  ndvi: { label: "NDVI", color: "#3b528b" },
  wet: { label: "WET", color: "#7b5d2c" },
  ndbsi: { label: "NDBSI", color: "#a53f76" },
};

const COUNTY_BAR_LIMIT = 15;

let nameData;
let currentLang = localStorage.getItem("rsei-viewer-lang") || "en";
let topChart;
let bottomChart;
let provinceChart;

const metricDataCache = {};
const metricLoadPromises = {};

const el = {
  status: document.querySelector("#statusText"),
  countyCount: document.querySelector("#countyCount"),
  language: document.querySelector("#languageSelect"),
  metric: document.querySelector("#metricSelect"),
  measure: document.querySelector("#measureSelect"),
  year: document.querySelector("#yearSlider"),
  yearLabel: document.querySelector("#yearLabel"),
};

function t(key) {
  return I18N[currentLang]?.[key] ?? I18N.en[key] ?? key;
}

function currentMetric() {
  return el.metric?.value || "rsei";
}

function currentData(metric = currentMetric()) {
  return metricDataCache[metric] ?? null;
}

function currentYears(metric = currentMetric()) {
  return currentData(metric)?.years ?? [];
}

function nameFor(code, part = "county") {
  const item = nameData?.counties?.[code];
  if (!item) return code;
  return item[currentLang]?.[part] ?? item.en?.[part] ?? item.zh_cn?.[part] ?? code;
}

function setStatus(ready = false) {
  if (!el.status) return;
  el.status.textContent = ready ? t("ready") : t("loading");
}

function applyLanguage() {
  currentLang = el.language?.value || currentLang;
  localStorage.setItem("rsei-viewer-lang", currentLang);
  document.documentElement.lang = currentLang === "zh_hant" ? "zh-Hant" : currentLang === "zh_cn" ? "zh-Hans" : "en";
  document.title = t("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  setStatus(Boolean(currentData()));
}

function formatValue(value, metric = currentMetric()) {
  if (value === null || value === undefined || Number.isNaN(value)) return "--";
  if (metric === "lst") return `${value.toFixed(2)} °C`;
  if (Math.abs(value) < 0.001 && value !== 0) return value.toExponential(2);
  return value.toFixed(4);
}

function getCountyValue(county, metric, measure, year) {
  if (measure === "slope") return county.trend?.[metric]?.slope ?? null;
  if (measure === "change") return county.summary?.[metric]?.change_2025_2000 ?? null;
  if (measure === "mean") return county.summary?.[metric]?.mean_2000_2025 ?? null;
  const idx = currentYears(metric).indexOf(Number(year));
  return idx >= 0 ? county.series?.[metric]?.[idx] ?? null : null;
}

function currentTitle(metric, measure, year) {
  const label = METRIC_META[metric].label;
  if (measure === "slope") return `${label} ${t("sensSlope")}`;
  if (measure === "change") return `${label} ${t("changeRange")}`;
  if (measure === "mean") return `${label} ${t("meanRange")}`;
  return currentLang === "en" ? `${label} in ${year}` : `${year} ${t("year")} ${label}`;
}

function buildCountyRows() {
  const metric = currentMetric();
  const measure = el.measure.value;
  const year = Number(el.year.value);
  const dataset = currentData(metric);
  if (!dataset) return [];
  return Object.values(dataset.counties)
    .map((county) => ({
      code: county.dt_adcode,
      name: nameFor(county.dt_adcode, "county"),
      province: nameFor(county.dt_adcode, "province"),
      prefecture: nameFor(county.dt_adcode, "prefecture"),
      value: getCountyValue(county, metric, measure, year),
    }))
    .filter((row) => row.value !== null && row.value !== undefined && Number.isFinite(row.value));
}

function barOption(rows, title, color, reverse = false) {
  const compact = window.innerWidth <= 640;
  const sorted = [...rows].sort((a, b) => (reverse ? a.value - b.value : b.value - a.value)).slice(0, COUNTY_BAR_LIMIT);
  const display = sorted.reverse();
  return {
    title: {
      text: title,
      left: 0,
      top: 0,
      textStyle: { fontSize: 14, color: "#64706a", fontWeight: 700 },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params) => {
        const p = params[0];
        const row = display[p.dataIndex];
        return `${row.province} · ${row.prefecture}<br/><b>${row.name}</b><br/>${formatValue(row.value)}`;
      },
    },
    grid: { left: compact ? 120 : 176, right: compact ? 12 : 24, top: 34, bottom: compact ? 34 : 24, containLabel: false },
    xAxis: {
      type: "value",
      splitNumber: compact ? 3 : 5,
      axisLabel: { color: "#64706a", fontSize: compact ? 10 : 12 },
      splitLine: { lineStyle: { color: "rgba(23,33,27,0.09)" } },
    },
    yAxis: {
      type: "category",
      data: display.map((row) => row.name),
      axisLabel: {
        color: "#17211b",
        interval: 0,
        overflow: "truncate",
        width: compact ? 96 : 152,
        fontSize: compact ? 10 : 12,
        lineHeight: 15,
      },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        data: display.map((row) => row.value),
        itemStyle: { color, borderRadius: [0, 8, 8, 0] },
      },
    ],
  };
}

function provinceRows(rows) {
  const groups = new Map();
  rows.forEach((row) => {
    if (!groups.has(row.province)) groups.set(row.province, []);
    groups.get(row.province).push(row.value);
  });
  return [...groups.entries()]
    .map(([province, values]) => ({
      province,
      value: values.reduce((a, b) => a + b, 0) / values.length,
      count: values.length,
    }))
    .sort((a, b) => b.value - a.value);
}

function provinceOption(rows, title, color) {
  const compact = window.innerWidth <= 640;
  const display = provinceRows(rows).reverse();
  return {
    title: {
      text: title,
      left: 0,
      top: 0,
      textStyle: { fontSize: 14, color: "#64706a", fontWeight: 700 },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params) => {
        const p = params[0];
        const row = display[p.dataIndex];
        return `<b>${row.province}</b><br/>${t("average")}: ${formatValue(row.value)}<br/>${t("counties")}: ${row.count}`;
      },
    },
    grid: { left: compact ? 104 : 148, right: compact ? 12 : 28, top: 34, bottom: compact ? 34 : 24, containLabel: false },
    xAxis: {
      type: "value",
      splitNumber: compact ? 3 : 5,
      axisLabel: { color: "#64706a", fontSize: compact ? 10 : 12 },
      splitLine: { lineStyle: { color: "rgba(23,33,27,0.09)" } },
    },
    yAxis: {
      type: "category",
      data: display.map((row) => row.province),
      axisLabel: { color: "#17211b", interval: 0, overflow: "truncate", width: compact ? 88 : 128, fontSize: compact ? 10 : 12, lineHeight: 15 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        data: display.map((row) => row.value),
        itemStyle: { color, borderRadius: [0, 8, 8, 0] },
      },
    ],
  };
}

function setChartHeight(chart, selector, rows, baseHeight, rowHeight, maxHeight = null) {
  const node = document.querySelector(selector);
  if (!node) return;
  const target = Math.max(baseHeight, rows * rowHeight + 96);
  node.style.height = `${maxHeight ? Math.min(maxHeight, target) : target}px`;
  chart.resize();
}

function updateCharts() {
  el.yearLabel.value = el.year.value;
  const yearEnabled = el.measure.value === "value";
  el.year.disabled = !yearEnabled;
  el.yearLabel.classList.toggle("year-output-disabled", !yearEnabled);

  const metric = currentMetric();
  const measure = el.measure.value;
  const year = Number(el.year.value);
  const rows = buildCountyRows();
  const title = currentTitle(metric, measure, year);
  const color = METRIC_META[metric].color;

  setChartHeight(topChart, "#topChart", Math.min(rows.length, COUNTY_BAR_LIMIT), 420, 24, 560);
  setChartHeight(bottomChart, "#bottomChart", Math.min(rows.length, COUNTY_BAR_LIMIT), 420, 24, 560);
  setChartHeight(provinceChart, "#provinceChart", provinceRows(rows).length, 520, 22, 860);

  topChart.setOption(barOption(rows, `${t("highest")} ${title}`, color, false), true);
  bottomChart.setOption(barOption(rows, `${t("lowest")} ${title}`, "#8b2d22", true), true);
  provinceChart.setOption(provinceOption(rows, `${t("provincialAverage")}: ${title}`, color), true);
}

async function ensureMetricData(metric) {
  if (metricDataCache[metric]) return metricDataCache[metric];
  if (!metricLoadPromises[metric]) {
    metricLoadPromises[metric] = fetch(METRIC_DATA_URLS[metric])
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${metric}: ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        metricDataCache[metric] = payload;
        return payload;
      })
      .catch((error) => {
        delete metricLoadPromises[metric];
        throw error;
      });
  }
  return metricLoadPromises[metric];
}

function scheduleMetricPrefetch() {
  const pending = Object.keys(METRIC_DATA_URLS).filter((metric) => metric !== currentMetric());
  if (!pending.length) return;

  const loadNext = () => {
    const metric = pending.shift();
    if (!metric) return;
    ensureMetricData(metric)
      .catch((error) => console.warn("Metric prefetch failed:", error))
      .finally(() => {
        window.setTimeout(loadNext, 180);
      });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadNext, { timeout: 2200 });
    return;
  }
  window.setTimeout(loadNext, 1200);
}

async function handleMetricInput() {
  setStatus(false);
  await ensureMetricData(currentMetric());
  setStatus(true);
  updateCharts();
}

async function boot() {
  [topChart, bottomChart, provinceChart] = ["#topChart", "#bottomChart", "#provinceChart"].map((id) =>
    echarts.init(document.querySelector(id)),
  );

  if (el.language) el.language.value = currentLang;
  applyLanguage();

  [nameData] = await Promise.all([fetch(NAMES_URL).then((response) => response.json())]);
  await ensureMetricData(currentMetric());

  if (el.countyCount) {
    el.countyCount.textContent = Object.keys(currentData().counties).length.toLocaleString();
  }
  setStatus(true);

  el.metric.addEventListener("input", () => {
    void handleMetricInput();
  });
  [el.measure, el.year].forEach((control) => control.addEventListener("input", updateCharts));
  el.language?.addEventListener("input", () => {
    applyLanguage();
    updateCharts();
  });
  window.addEventListener("resize", () => {
    topChart.resize();
    bottomChart.resize();
    provinceChart.resize();
  });

  updateCharts();
  scheduleMetricPrefetch();
}

boot().catch((error) => {
  console.error(error);
  if (el.status) el.status.textContent = t("failed");
});
