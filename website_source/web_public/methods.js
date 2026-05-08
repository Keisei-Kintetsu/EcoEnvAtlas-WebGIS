const PCA_DATA_URL = "./data/latest_rsei_global_params.json?v=pca001";

const I18N = {
  en: {
    pageTitle: "RSEI PCA | China Eco-Environmental GIS",
    interactiveMap: "Interactive Map",
    countyAnalytics: "County Analytics",
    rseiPca: "RSEI PCA",
    background: "Research Background",
    opticalIndicators: "Optical Indicators",
    lst30m: "LST 30 m",
    techStack: "Tech Stack",
    team: "Team",
    language: "Language",
    loading: "Loading data...",
    ready: "Ready",
    failed: "Failed to load data",
    studyPeriod: "study period",
    methodsTitle: "RSEI PCA Summary",
    methodsSubtitle:
      "A compact summary of the principal component analysis used to derive the national 30 m RSEI product.",
    overview: "Overview",
    indicatorTable: "Indicator Standardization and PC1 Loadings",
    varianceTable: "Explained Variance by Principal Component",
    scalingTable: "RSEI Scaling and Clipping",
    summaryIndicators: "Indicators",
    summaryYears: "Study period",
    summaryPixels: "Valid non-water pixels",
    summarySamples: "PCA sample size",
    indicator: "Indicator",
    mean: "Mean",
    std: "Std. dev.",
    loading: "PC1 loading",
    weight: "Oriented weight",
    direction: "Ecological direction",
    positive: "Positive",
    negative: "Negative",
    component: "Component",
    eigenvalue: "Eigenvalue",
    explainedVariance: "Explained variance (%)",
    cumulativeVariance: "Cumulative variance (%)",
    clipLow: "Clip low (p02)",
    clipHigh: "Clip high (p98)",
    formula: "Formula",
    note: "",
  },
  zh_cn: {
    pageTitle: "RSEI PCA | 中国生态环境 GIS",
    interactiveMap: "交互地图",
    countyAnalytics: "县域分析",
    rseiPca: "RSEI PCA",
    background: "研究背景",
    opticalIndicators: "光学指标",
    lst30m: "30 米 LST",
    techStack: "技术栈",
    team: "团队成员",
    language: "语言",
    loading: "正在加载数据...",
    ready: "已就绪",
    failed: "数据加载失败",
    studyPeriod: "研究时段",
    methodsTitle: "RSEI PCA 摘要",
    methodsSubtitle: "这里简要整理了用于生成全国 30 m RSEI 产品的主成分分析结果。",
    overview: "概览",
    indicatorTable: "指标标准化与 PC1 载荷",
    varianceTable: "主成分解释方差",
    scalingTable: "RSEI 缩放与裁剪",
    summaryIndicators: "输入指标",
    summaryYears: "研究时段",
    summaryPixels: "有效非水体像元数",
    summarySamples: "PCA 样本数",
    indicator: "指标",
    mean: "均值",
    std: "标准差",
    loading: "PC1 载荷",
    weight: "定向权重",
    direction: "生态方向",
    positive: "正向",
    negative: "负向",
    component: "主成分",
    eigenvalue: "特征值",
    explainedVariance: "解释方差 (%)",
    cumulativeVariance: "累计解释方差 (%)",
    clipLow: "下裁剪值 (p02)",
    clipHigh: "上裁剪值 (p98)",
    formula: "公式",
    note: "",
  },
  zh_hant: {
    pageTitle: "RSEI PCA | 中國生態環境 GIS",
    interactiveMap: "互動地圖",
    countyAnalytics: "縣域分析",
    rseiPca: "RSEI PCA",
    background: "研究背景",
    opticalIndicators: "光學指標",
    lst30m: "30 米 LST",
    techStack: "技術棧",
    team: "團隊成員",
    language: "語言",
    loading: "正在載入資料...",
    ready: "已就緒",
    failed: "資料載入失敗",
    studyPeriod: "研究時段",
    methodsTitle: "RSEI PCA 摘要",
    methodsSubtitle: "這裡簡要整理了用於生成全國 30 m RSEI 產品的主成分分析結果。",
    overview: "概覽",
    indicatorTable: "指標標準化與 PC1 載荷",
    varianceTable: "主成分解釋方差",
    scalingTable: "RSEI 縮放與裁剪",
    summaryIndicators: "輸入指標",
    summaryYears: "研究時段",
    summaryPixels: "有效非水體像元數",
    summarySamples: "PCA 樣本數",
    indicator: "指標",
    mean: "均值",
    std: "標準差",
    loading: "PC1 載荷",
    weight: "定向權重",
    direction: "生態方向",
    positive: "正向",
    negative: "負向",
    component: "主成分",
    eigenvalue: "特徵值",
    explainedVariance: "解釋方差 (%)",
    cumulativeVariance: "累計解釋方差 (%)",
    clipLow: "下裁剪值 (p02)",
    clipHigh: "上裁剪值 (p98)",
    formula: "公式",
    note: "",
  },
};

let currentLang = localStorage.getItem("rsei-viewer-lang") || "en";
let pcaData = null;

const el = {
  language: document.querySelector("#languageSelect"),
  status: document.querySelector("#statusText"),
  yearSpan: document.querySelector("#yearSpan"),
  summaryGrid: document.querySelector("#summaryGrid"),
  loadingTable: document.querySelector("#loadingTable"),
  varianceTable: document.querySelector("#varianceTable"),
  scalingTable: document.querySelector("#scalingTable"),
  formulaNote: document.querySelector("#formulaNote"),
};

function t(key) {
  return I18N[currentLang]?.[key] ?? I18N.en[key] ?? key;
}

function fmt(value, digits = 4) {
  if (value === null || value === undefined || Number.isNaN(value)) return "--";
  if (Math.abs(value) >= 1e6) return Number(value).toLocaleString();
  return Number(value).toFixed(digits);
}

function pct(value) {
  return (value * 100).toFixed(2);
}

function applyLanguage() {
  currentLang = el.language?.value || currentLang;
  localStorage.setItem("rsei-viewer-lang", currentLang);
  document.documentElement.lang = currentLang === "zh_hant" ? "zh-Hant" : currentLang === "zh_cn" ? "zh-Hans" : "en";
  document.title = t("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  if (el.status) el.status.textContent = pcaData ? t("ready") : t("loading");
  if (pcaData) render();
}

function renderSummary() {
  if (el.yearSpan) el.yearSpan.textContent = `${pcaData.year_start}-${pcaData.year_end}`;
  el.summaryGrid.innerHTML = `
    <div class="summary-item"><span>${t("summaryIndicators")}</span><strong>${pcaData.feature_order.join(", ")}</strong></div>
    <div class="summary-item"><span>${t("summaryYears")}</span><strong>${pcaData.year_start}-${pcaData.year_end}</strong></div>
    <div class="summary-item"><span>${t("summaryPixels")}</span><strong>${Number(pcaData.count_valid_nonwater_pixels).toLocaleString()}</strong></div>
    <div class="summary-item"><span>${t("summarySamples")}</span><strong>${Number(pcaData.pc1_sample_size).toLocaleString()}</strong></div>
  `;
}

function renderLoadings() {
  const rows = pcaData.feature_order
    .map((name) => ({
      name,
      mean: pcaData.standardization_mean[name],
      std: pcaData.standardization_std[name],
      loading: pcaData.pc1_loading_oriented[name],
      weight: pcaData.pc1_weight_oriented[name],
    }))
    .map(
      (row) => `
        <tr>
          <td>${row.name}</td>
          <td>${fmt(row.mean, 4)}</td>
          <td>${fmt(row.std, 4)}</td>
          <td>${fmt(row.loading, 4)}</td>
          <td>${fmt(row.weight, 4)}</td>
          <td>${row.weight >= 0 ? t("positive") : t("negative")}</td>
        </tr>`,
    )
    .join("");

  el.loadingTable.innerHTML = `
    <thead>
      <tr>
        <th>${t("indicator")}</th>
        <th>${t("mean")}</th>
        <th>${t("std")}</th>
        <th>${t("loading")}</th>
        <th>${t("weight")}</th>
        <th>${t("direction")}</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  `;
}

function renderVariance() {
  const total = pcaData.eigenvalues.reduce((a, b) => a + b, 0);
  let cumulative = 0;
  const rows = pcaData.eigenvalues
    .map((value, idx) => {
      const explained = value / total;
      cumulative += explained;
      return `
        <tr>
          <td>PC${idx + 1}</td>
          <td>${fmt(value, 4)}</td>
          <td>${pct(explained)}</td>
          <td>${pct(cumulative)}</td>
        </tr>`;
    })
    .join("");

  el.varianceTable.innerHTML = `
    <thead>
      <tr>
        <th>${t("component")}</th>
        <th>${t("eigenvalue")}</th>
        <th>${t("explainedVariance")}</th>
        <th>${t("cumulativeVariance")}</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  `;
}

function renderScaling() {
  const scaling = pcaData.recommended_rsei_scaling;
  el.scalingTable.innerHTML = `
    <thead>
      <tr>
        <th>${t("clipLow")}</th>
        <th>${t("clipHigh")}</th>
        <th>${t("formula")}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${fmt(scaling.clip_low, 4)}</td>
        <td>${fmt(scaling.clip_high, 4)}</td>
        <td>${scaling.formula}</td>
      </tr>
    </tbody>
  `;
  el.formulaNote.textContent = t("note");
}

function render() {
  renderSummary();
  renderLoadings();
  renderVariance();
  renderScaling();
}

async function boot() {
  if (el.language) el.language.value = currentLang;
  applyLanguage();
  pcaData = await fetch(PCA_DATA_URL).then((r) => r.json());
  if (el.status) el.status.textContent = t("ready");
  render();
  el.language?.addEventListener("input", applyLanguage);
}

boot().catch((error) => {
  console.error(error);
  if (el.status) el.status.textContent = t("failed");
});
