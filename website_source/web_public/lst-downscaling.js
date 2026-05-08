const LST_I18N = {
  zh_cn: {
    pageTitle: "30 米 LST 降尺度 | EcoEnvAtlas",
    navFusion: "交互地图",
    navAnalysis: "县域分析",
    navPca: "RSEI PCA",
    navBackground: "研究背景",
    navOptical: "光学指标",
    navLst: "30 米 LST",
    navStack: "技术栈",
    navTeam: "团队成员",
    eyebrow: "30 米 LST",
    title: "30 米地表温度降尺度",
    subtitle:
      "本页说明长期全国尺度 30 米 LST 构建所面临的主要方法学问题，并概述本研究基于 MODIS LST、多源环境变量和随机森林模型实现空间降尺度的总体思路。",
    section1Title: "LST 构建面临的主要方法学挑战",
    section1Body: [
      "相较于光学指标，LST 具有更强的时变性，对观测时相和数据覆盖条件更为敏感。虽然本研究在光学部分可以依托已经完成跨代 Landsat 协调、年度合成和全国无缝拼接的数据立方体，但热红外部分并不具备同等条件。",
      "如果直接依赖 Landsat 热红外观测构建全国年尺度 LST 产品，通常会面临三方面问题：第一，不同代 Landsat 热红外传感器存在显著差异；第二，热红外原生空间分辨率仅为 60-120 m，并非 30 m；第三，在 16 天重访周期及云、阴影、雪等因素共同影响下，可用热红外观测数在空间与时间上均不稳定，从而削弱长期序列的完整性与可比性。",
    ],
    tableHead1: "卫星",
    tableHead2: "热红外传感器",
    tableHead3: "热红外波段",
    tableHead4: "热红外原生分辨率",
    tableHead5: "时间覆盖",
    timeRevisit: "16 天重访",
    productModis: "MOD11A2 产品",
    timeComposite: "8 天合成",
    section2Title: "LST 降尺度的技术路线",
    section2List: [
      "第一步，在 DOY 150-300 范围内对 Terra MODIS LST 进行生长季合成，获得每年的 1 km 目标 LST。",
      "第二步，采用 30 m NDVI、WET、NDBSI 以及 DEM、SLOPE、经纬度共 7 个变量训练随机森林模型。",
      "第三步，在方法上假定光学与地形变量同 LST 的统计关系在尺度转换过程中具有相对稳定性，并将 1 km 尺度学习到的关系映射到 30 m 变量上，从而实现空间降尺度。",
      "第四步，在样本组织上仅使用 2000-2024 年样本参与训练，将 2025 年独立保留为时间外验证年份，以检验模型跨年份迁移能力。",
    ],
    section3Title: "输入变量",
    section3List: [
      "NDVI：表征植被绿度。",
      "WET：表征地表湿度条件。",
      "NDBSI：表征干燥度、裸地与建设用地特征。",
      "DEM：用于表征大尺度地形抬升效应。",
      "SLOPE：用于刻画地形起伏与局地地表条件差异。",
      "经度与纬度：用于补充大尺度气候背景梯度信息。",
    ],
    section4Title: "随机森林变量重要性",
    section5Title: "采用 MODIS 作为目标场的原因",
    caption1:
      "2000 年 Landsat 热红外有效观测数。可以看出，全国尺度下可用热红外观测数分布并不均衡，局部地区有效观测明显不足，难以直接支撑长期年尺度全国 LST 产品构建。",
    caption2:
      "2000 年 Terra MODIS LST 有效观测数。相较于 Landsat 热红外观测，MODIS 在时间覆盖上更稳定，因此更适合作为长期全国年尺度 LST 的基准目标场。",
    section6Title: "地形辅助变量",
    caption3: "中国 DEM。高程对大尺度温度空间格局具有稳定约束作用，也是模型中最重要的预测变量之一。",
    caption4: "中国坡度。坡度能够反映地形起伏特征，在山区和高原地区有助于补充局地环境差异信息。",
    section7Title: "模型评估",
    caption5: "基于 2000-2024 年样本的 70/30 基础评估结果，用于检验模型在常规样本划分条件下的拟合能力与泛化表现。",
    caption6: "2025 年时间外验证结果。由于 2025 年未参与模型训练，因此该检验更能反映模型的跨年份迁移能力。",
    section8Title: "聚合至 MODIS 尺度后的验证",
    caption7:
      "26 年全部像元汇总后的 30 米 LST 与 MODIS LST 相关性密度图。为保证评价尺度一致，本研究先将 30 米预测结果聚合至 MODIS 网格，再与年度 MODIS LST 产品进行对比。",
    chartValueLabel: "重要性",
    corrHeadYear: "年份",
    corrHeadValid: "有效像元数",
    corrHeadR: "Pearson r",
    corrHeadRmse: "RMSE (°C)",
    corrHeadBias: "Bias (°C)",
    allYearsLabel: "全部年份",
    featureNames: ["DEM", "NDVI", "NDBSI", "WET", "纬度", "经度", "SLOPE"],
  },
  zh_hant: {
    pageTitle: "30 米 LST 降尺度 | EcoEnvAtlas",
    navFusion: "互動地圖",
    navAnalysis: "縣域分析",
    navPca: "RSEI PCA",
    navBackground: "研究背景",
    navOptical: "光學指標",
    navLst: "30 米 LST",
    navStack: "技術棧",
    navTeam: "團隊成員",
    eyebrow: "30 米 LST",
    title: "30 米地表溫度降尺度",
    subtitle:
      "本頁說明長期全國尺度 30 米 LST 構建所面臨的主要方法學問題，並概述本研究基於 MODIS LST、多源環境變量與隨機森林模型實現空間降尺度的總體思路。",
    section1Title: "LST 構建面臨的主要方法學挑戰",
    section1Body: [
      "相較於光學指標，LST 具有更強的時變性，對觀測時相與數據覆蓋條件更為敏感。雖然本研究在光學部分可以依託已經完成跨代 Landsat 協調、年度合成與全國無縫拼接的數據立方體，但熱紅外部分並不具備同等條件。",
      "若直接依賴 Landsat 熱紅外觀測構建全國年尺度 LST 產品，通常會面臨三方面問題：第一，不同代 Landsat 熱紅外傳感器存在顯著差異；第二，熱紅外原生空間解析度僅為 60-120 m，並非 30 m；第三，在 16 天重訪週期及雲、陰影、雪等因素共同影響下，可用熱紅外觀測數在空間與時間上均不穩定，從而削弱長期序列的完整性與可比性。",
    ],
    tableHead1: "衛星",
    tableHead2: "熱紅外傳感器",
    tableHead3: "熱紅外波段",
    tableHead4: "熱紅外原生解析度",
    tableHead5: "時間覆蓋",
    timeRevisit: "16 天重訪",
    productModis: "MOD11A2 產品",
    timeComposite: "8 天合成",
    section2Title: "LST 降尺度的技術路線",
    section2List: [
      "第一步，在 DOY 150-300 範圍內對 Terra MODIS LST 進行生長季合成，獲得每年的 1 km 目標 LST。",
      "第二步，採用 30 m NDVI、WET、NDBSI 以及 DEM、SLOPE、經緯度共 7 個變量訓練隨機森林模型。",
      "第三步，在方法上假定光學與地形變量同 LST 的統計關係在尺度轉換過程中具有相對穩定性，並將 1 km 尺度學習到的關係映射到 30 m 變量上，從而實現空間降尺度。",
      "第四步，在樣本組織上僅使用 2000-2024 年樣本參與訓練，將 2025 年獨立保留為時間外驗證年份，以檢驗模型跨年份遷移能力。",
    ],
    section3Title: "輸入變量",
    section3List: [
      "NDVI：表徵植被綠度。",
      "WET：表徵地表濕度條件。",
      "NDBSI：表徵乾燥度、裸地與建設用地特徵。",
      "DEM：用於表徵大尺度地形抬升效應。",
      "SLOPE：用於刻畫地形起伏與局地地表條件差異。",
      "經度與緯度：用於補充大尺度氣候背景梯度資訊。",
    ],
    section4Title: "隨機森林變量重要性",
    section5Title: "採用 MODIS 作為目標場的原因",
    caption1:
      "2000 年 Landsat 熱紅外有效觀測數。可以看出，全國尺度下可用熱紅外觀測數分佈並不均衡，局部地區有效觀測明顯不足，難以直接支撐長期年尺度全國 LST 產品構建。",
    caption2:
      "2000 年 Terra MODIS LST 有效觀測數。相較於 Landsat 熱紅外觀測，MODIS 在時間覆蓋上更穩定，因此更適合作為長期全國年尺度 LST 的基準目標場。",
    section6Title: "地形輔助變量",
    caption3: "中國 DEM。高程對大尺度溫度空間格局具有穩定約束作用，也是模型中最重要的預測變量之一。",
    caption4: "中國坡度。坡度能夠反映地形起伏特徵，在山區和高原地區有助於補充局地環境差異資訊。",
    section7Title: "模型評估",
    caption5: "基於 2000-2024 年樣本的 70/30 基礎評估結果，用於檢驗模型在常規樣本劃分條件下的擬合能力與泛化表現。",
    caption6: "2025 年時間外驗證結果。由於 2025 年未參與模型訓練，因此該檢驗更能反映模型的跨年份遷移能力。",
    section8Title: "聚合至 MODIS 尺度後的驗證",
    caption7:
      "26 年全部像元匯總後的 30 米 LST 與 MODIS LST 相關性密度圖。為保證評價尺度一致，本研究先將 30 米預測結果聚合至 MODIS 網格，再與年度 MODIS LST 產品進行對比。",
    chartValueLabel: "重要性",
    corrHeadYear: "年份",
    corrHeadValid: "有效像元數",
    corrHeadR: "Pearson r",
    corrHeadRmse: "RMSE (°C)",
    corrHeadBias: "Bias (°C)",
    allYearsLabel: "全部年份",
    featureNames: ["DEM", "NDVI", "NDBSI", "WET", "緯度", "經度", "SLOPE"],
  },
  en: {
    pageTitle: "30 m LST Downscaling | EcoEnvAtlas",
    navFusion: "Interactive Map",
    navAnalysis: "County Analytics",
    navPca: "RSEI PCA",
    navBackground: "Background",
    navOptical: "Optical Indicators",
    navLst: "30 m LST",
    navStack: "Tech Stack",
    navTeam: "Team",
    eyebrow: "30 m LST",
    title: "30 m Land Surface Temperature Downscaling",
    subtitle:
      "This page explains the main methodological challenges in building a long-term national 30 m LST product and summarises the downscaling strategy based on MODIS LST, multiple environmental predictors, and a random forest model.",
    section1Title: "Main Methodological Challenges in LST Construction",
    section1Body: [
      "Compared with optical indicators, LST is more temporally dynamic and more sensitive to acquisition timing and data availability. Although the optical component of this study benefits from a harmonised, annual, and seamless national Landsat data cube, the thermal infrared component does not enjoy the same level of consistency.",
      "If Landsat thermal observations were used directly to build a national annual LST product, three problems would arise: substantial differences among Landsat thermal sensors, native thermal resolutions of only 60-120 m rather than 30 m, and highly uneven numbers of valid observations due to the 16-day revisit cycle and the effects of clouds, shadows, and snow. These factors weaken the completeness and temporal comparability of a long-term series.",
    ],
    tableHead1: "Satellite",
    tableHead2: "Thermal Sensor",
    tableHead3: "Thermal Band(s)",
    tableHead4: "Native Thermal Resolution",
    tableHead5: "Temporal Coverage",
    timeRevisit: "16-day revisit",
    productModis: "MOD11A2 product",
    timeComposite: "8-day composite",
    section2Title: "Technical Workflow for LST Downscaling",
    section2List: [
      "First, Terra MODIS LST is composited over DOY 150-300 to generate a 1 km annual target LST for each year.",
      "Second, a random forest model is trained using seven predictors: 30 m NDVI, WET, NDBSI, DEM, SLOPE, longitude, and latitude.",
      "Third, the workflow assumes that the statistical relationship between optical/topographic variables and LST remains relatively stable across scales, and then transfers the relationship learned at 1 km to 30 m predictors for spatial downscaling.",
      "Fourth, only samples from 2000-2024 are used for training, while 2025 is held out as an independent temporal validation year to test cross-year transferability.",
    ],
    section3Title: "Predictor Variables",
    section3List: [
      "NDVI: represents vegetation greenness.",
      "WET: represents surface moisture conditions.",
      "NDBSI: represents dryness as well as bare soil and built-up surface characteristics.",
      "DEM: represents large-scale elevation effects.",
      "SLOPE: captures terrain relief and local surface differences.",
      "Longitude and latitude: provide additional information on large-scale climatic gradients.",
    ],
    section4Title: "Random Forest Feature Importance",
    section5Title: "Why MODIS Is Used as the Target Field",
    caption1:
      "Valid Landsat thermal observations in 2000. The map shows that the number of usable thermal observations is uneven across China, and in some regions is insufficient to directly support a long-term national annual LST product.",
    caption2:
      "Valid Terra MODIS LST observations in 2000. Compared with Landsat thermal observations, MODIS provides more stable temporal coverage and is therefore more suitable as the baseline target field for a long-term national annual LST product.",
    section6Title: "Topographic Auxiliary Variables",
    caption3:
      "DEM of China. Elevation provides a stable constraint on large-scale temperature patterns and is also one of the most important predictors in the model.",
    caption4:
      "Slope of China. Slope reflects terrain variability and helps capture local environmental differences in mountains and plateaus.",
    section7Title: "Model Evaluation",
    caption5:
      "Basic 70/30 evaluation using samples from 2000-2024, used to assess model fit and generalisation under a conventional train-test split.",
    caption6:
      "Temporal hold-out validation in 2025. Because 2025 is excluded from model training, this test better reflects cross-year transferability.",
    section8Title: "Validation After Aggregation to the MODIS Scale",
    caption7:
      "Density plot of 30 m LST versus MODIS LST using all valid pixels from the full 26-year period. To ensure consistency in evaluation scale, the 30 m predictions are first aggregated to the MODIS grid before comparison with annual MODIS LST products.",
    chartValueLabel: "Importance",
    corrHeadYear: "Year",
    corrHeadValid: "Valid pixels",
    corrHeadR: "Pearson r",
    corrHeadRmse: "RMSE (°C)",
    corrHeadBias: "Bias (°C)",
    allYearsLabel: "All years",
    featureNames: ["DEM", "NDVI", "NDBSI", "WET", "Latitude", "Longitude", "SLOPE"],
  },
};

const featureImportanceBase = [
  { key: "DEM", value: 0.392 },
  { key: "NDVI", value: 0.269 },
  { key: "NDBSI", value: 0.154 },
  { key: "WET", value: 0.073 },
  { key: "LAT", value: 0.053 },
  { key: "LON", value: 0.037 },
  { key: "SLOPE", value: 0.022 },
];

const correlationSummary = [
  { year: "all", nValid: 341668345, r: 0.9698616104103709, rmse: 2.16162155523448, bias: 0.131825523136059 },
  { year: "2000", nValid: 13140822, r: 0.9738807917584669, rmse: 2.0452083385741107, bias: -0.07700210210460794 },
  { year: "2001", nValid: 13140966, r: 0.9714246118574759, rmse: 2.1277399106353965, bias: 0.24043712485831845 },
  { year: "2002", nValid: 13141202, r: 0.9697465925303149, rmse: 2.2193977695755773, bias: 0.25883008726168943 },
  { year: "2003", nValid: 13141128, r: 0.9712388134168983, rmse: 2.3000460248961025, bias: 0.9348192639230137 },
  { year: "2004", nValid: 13141201, r: 0.9715723220738821, rmse: 2.156485596117008, bias: 0.4409907121193031 },
  { year: "2005", nValid: 13141191, r: 0.976216688491926, rmse: 1.966086291119496, bias: 0.16170075964819358 },
  { year: "2006", nValid: 13141195, r: 0.9766080900935374, rmse: 1.878760955256245, bias: 0.07062362835401254 },
  { year: "2007", nValid: 13141193, r: 0.9674191230007259, rmse: 2.284903462044969, bias: -0.4946651656894507 },
  { year: "2008", nValid: 13140618, r: 0.9722525131217015, rmse: 2.115836684753028, bias: 0.20259915286248767 },
  { year: "2009", nValid: 13141166, r: 0.9699804530845233, rmse: 2.21647059866783, bias: 0.2017488161175092 },
  { year: "2010", nValid: 13141134, r: 0.972602618256972, rmse: 2.1315870775288075, bias: 0.1548741356103055 },
  { year: "2011", nValid: 13141107, r: 0.9767461501291814, rmse: 1.9281385303137752, bias: 0.14313749270413012 },
  { year: "2012", nValid: 13141188, r: 0.9756199003083638, rmse: 2.0568090242183583, bias: 0.5970145448063983 },
  { year: "2013", nValid: 13141202, r: 0.966927081636731, rmse: 2.213194852236373, bias: 0.012977130134360297 },
  { year: "2014", nValid: 13141060, r: 0.9735928850135934, rmse: 2.036175574979729, bias: -0.08622263209622881 },
  { year: "2015", nValid: 13141177, r: 0.9610491589186461, rmse: 2.3743029426214606, bias: -0.2129579281601975 },
  { year: "2016", nValid: 13140863, r: 0.9694151211948104, rmse: 2.1705259408439863, bias: -0.2850627866039092 },
  { year: "2017", nValid: 13141101, r: 0.9762878065095788, rmse: 1.993734431139121, bias: -0.05282682817757198 },
  { year: "2018", nValid: 13141165, r: 0.9738401339362172, rmse: 2.1245158675464983, bias: 0.2457143129146388 },
  { year: "2019", nValid: 13141205, r: 0.974901211289218, rmse: 2.016382788177395, bias: -0.13071938158594482 },
  { year: "2020", nValid: 13140986, r: 0.966241572490232, rmse: 2.2856321316599972, bias: -0.41572963732585555 },
  { year: "2021", nValid: 13140996, r: 0.9714958737567245, rmse: 2.1039856811505784, bias: -0.28590562590175894 },
  { year: "2022", nValid: 13141190, r: 0.9720446295188544, rmse: 2.2968396197790746, bias: -0.9330968538247087 },
  { year: "2023", nValid: 13140915, r: 0.9775747457581411, rmse: 1.954372340236104, bias: -0.04796549333534998 },
  { year: "2024", nValid: 13141195, r: 0.9746519379994825, rmse: 2.080251843508543, bias: 0.8600484519748328 },
  { year: "2025", nValid: 13141179, r: 0.9661400484083242, rmse: 2.8945162552875097, bias: 1.9131941631282998 },
];

let lstLang = localStorage.getItem("rsei-viewer-lang") || "zh_cn";
let lstChart = null;

const lstEl = {
  language: document.querySelector("#languageSelect"),
  correlationTable: document.querySelector("#correlationSummaryTable"),
  chart: document.querySelector("#featureImportanceChart"),
};

function lstT(key) {
  return LST_I18N[lstLang]?.[key] ?? LST_I18N.zh_cn[key] ?? key;
}

function lstSet(id, value) {
  const node = document.querySelector(`#${id}`);
  if (node) node.textContent = value;
}

function lstRenderParagraphs(id, items) {
  const node = document.querySelector(`#${id}`);
  if (node) node.innerHTML = items.map((text) => `<p>${text}</p>`).join("");
}

function lstRenderList(id, items, className = "") {
  const node = document.querySelector(`#${id}`);
  if (!node) return;
  node.innerHTML = items
    .map((text) => {
      if (className === "meta") return `<div class="meta-item">${text}</div>`;
      return `<li>${text}</li>`;
    })
    .join("");
}

function formatFixed(value, digits = 3) {
  return Number(value).toFixed(digits);
}

function formatCount(value) {
  if (lstLang === "en") return Number(value).toLocaleString("en-US");
  return Number(value).toLocaleString("zh-CN");
}

function renderFeatureChart() {
  if (!lstEl.chart || typeof echarts === "undefined") return;
  if (!lstChart) lstChart = echarts.init(lstEl.chart, null, { renderer: "canvas" });

  const names = lstT("featureNames");
  const data = featureImportanceBase.map((item, index) => ({ name: names[index], value: item.value }));

  lstChart.setOption(
    {
      animationDuration: 500,
      grid: { top: 8, right: 18, bottom: 10, left: 108, containLabel: true },
      xAxis: {
        type: "value",
        min: 0,
        max: 0.42,
        axisLabel: {
          color: "#64706a",
          formatter: (value) => value.toFixed(2),
        },
        splitLine: {
          lineStyle: {
            color: "rgba(23, 33, 27, 0.08)",
          },
        },
      },
      yAxis: {
        type: "category",
        inverse: true,
        data: data.map((item) => item.name),
        axisLabel: {
          color: "#17211b",
          fontWeight: 700,
        },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: (params) => {
          const item = params?.[0];
          if (!item) return "";
          return `${item.name}<br/>${lstT("chartValueLabel")}：${formatFixed(item.value, 3)}`;
        },
      },
      series: [
        {
          type: "bar",
          data: data.map((item) => item.value),
          barWidth: 18,
          itemStyle: {
            borderRadius: [0, 10, 10, 0],
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: "#23704f" },
              { offset: 1, color: "#d6e9a8" },
            ]),
          },
          label: {
            show: true,
            position: "right",
            color: "#17211b",
            fontWeight: 700,
            formatter: ({ value }) => formatFixed(value, 3),
          },
        },
      ],
    },
    true
  );
}

function renderCorrelationTable() {
  if (!lstEl.correlationTable) return;

  const header = `
    <thead>
      <tr>
        <th>${lstT("corrHeadYear")}</th>
        <th>${lstT("corrHeadValid")}</th>
        <th>${lstT("corrHeadR")}</th>
        <th>${lstT("corrHeadRmse")}</th>
        <th>${lstT("corrHeadBias")}</th>
      </tr>
    </thead>
  `;

  const body = correlationSummary
    .map((item) => {
      const yearLabel = item.year === "all" ? lstT("allYearsLabel") : item.year;
      return `
        <tr>
          <td>${yearLabel}</td>
          <td>${formatCount(item.nValid)}</td>
          <td>${formatFixed(item.r, 3)}</td>
          <td>${formatFixed(item.rmse, 3)}</td>
          <td>${formatFixed(item.bias, 3)}</td>
        </tr>
      `;
    })
    .join("");

  lstEl.correlationTable.innerHTML = `${header}<tbody>${body}</tbody>`;
}

function renderLstPage() {
  document.documentElement.lang = lstLang === "zh_hant" ? "zh-Hant" : lstLang === "zh_cn" ? "zh-Hans" : "en";
  document.title = lstT("pageTitle");

  ["navFusion", "navAnalysis", "navPca", "navBackground", "navOptical", "navLst", "navStack", "navTeam"].forEach((id) => {
    lstSet(id, lstT(id));
  });

  lstSet("lstEyebrow", lstT("eyebrow"));
  lstSet("lstTitle", lstT("title"));
  lstSet("lstSubtitle", lstT("subtitle"));
  lstSet("lstSection1Title", lstT("section1Title"));
  lstRenderParagraphs("lstSection1Body", lstT("section1Body"));
  lstSet("lstTableHead1", lstT("tableHead1"));
  lstSet("lstTableHead2", lstT("tableHead2"));
  lstSet("lstTableHead3", lstT("tableHead3"));
  lstSet("lstTableHead4", lstT("tableHead4"));
  lstSet("lstTableHead5", lstT("tableHead5"));
  lstSet("lstTime1", lstT("timeRevisit"));
  lstSet("lstTime2", lstT("timeRevisit"));
  lstSet("lstTime3", lstT("timeRevisit"));
  lstSet("lstProd4", lstT("productModis"));
  lstSet("lstTime4", lstT("timeComposite"));
  lstSet("lstSection2Title", lstT("section2Title"));
  lstRenderList("lstSection2List", lstT("section2List"), "meta");
  lstSet("lstSection3Title", lstT("section3Title"));
  lstRenderList("lstSection3List", lstT("section3List"));
  lstSet("lstSection4Title", lstT("section4Title"));
  lstSet("lstSection5Title", lstT("section5Title"));
  lstSet("lstCaption1", lstT("caption1"));
  lstSet("lstCaption2", lstT("caption2"));
  lstSet("lstSection6Title", lstT("section6Title"));
  lstSet("lstCaption3", lstT("caption3"));
  lstSet("lstCaption4", lstT("caption4"));
  lstSet("lstSection7Title", lstT("section7Title"));
  lstSet("lstCaption5", lstT("caption5"));
  lstSet("lstCaption6", lstT("caption6"));
  lstSet("lstSection8Title", lstT("section8Title"));
  lstSet("lstCaption7", lstT("caption7"));

  renderFeatureChart();
  renderCorrelationTable();
}

if (lstEl.language) {
  lstEl.language.value = lstLang;
  lstEl.language.addEventListener("change", () => {
    lstLang = lstEl.language.value;
    localStorage.setItem("rsei-viewer-lang", lstLang);
    renderLstPage();
  });
}

window.addEventListener("resize", () => lstChart?.resize());

renderLstPage();
