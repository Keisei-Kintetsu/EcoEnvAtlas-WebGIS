const BG_I18N = {
  zh_cn: {
    pageTitle: "研究背景 | EcoEnvAtlas",
    navFusion: "交互地图",
    navAnalysis: "县域分析",
    navPca: "RSEI PCA",
    navBackground: "研究背景",
    navOptical: "光学指标",
    navLst: "30 米 LST",
    navStack: "技术栈",
    navTeam: "团队成员",
    eyebrow: "研究背景",
    title: "全国生态环境质量监测的研究背景与总体框架",
    subtitle:
      "本页概述本研究的科学背景、研究意义与总体技术路线，用于说明全国尺度、长时间序列和 30 米空间分辨率生态环境指标系统的建设逻辑。",
    section1Title: "研究意义",
    section1Body: [
      "生态文明建设与美丽中国建设已经成为国家战略的重要组成部分。对于中国这样一个地域辽阔、区域差异显著的发展中大国而言，生态环境质量的持续监测不仅是科学研究问题，也与国土空间治理、生态保护修复、区域协调发展和高质量发展评估密切相关。",
      "中国自然地理分异显著，森林、平原、高原、干旱区、丘陵和快速城市化地区在全国范围内广泛并存，使得生态环境质量在空间上表现出强烈异质性，在时间上又受到气候波动、土地利用变化和人类活动共同驱动。仅依赖局部样点或短时间序列资料，难以系统刻画全国生态环境质量的时空格局、变化过程及其区域差异。",
      "因此，本研究的目标不是提供单一年份或局部区域的生态质量快照，而是尝试构建一套兼顾全国覆盖、长期连续性、跨年可比性与较高空间细节的生态环境指标系统，以支持全国尺度总体格局识别、县域尺度差异分析以及长期变化监测。",
    ],
    section2Title: "现有研究的主要不足",
    section2Body: [
      "从现有研究看，覆盖全国尺度的生态环境质量研究往往依赖 MODIS 等中低分辨率产品，虽然有利于形成长期连续序列，但对县域尺度和局地生态差异的刻画能力有限。另一方面，部分高分辨率研究虽然能够达到 Landsat 尺度，但研究范围通常局限于城市群、流域、省域或少数年份，在全国长期连续监测方面仍存在明显不足。",
      "此外，部分基于高分辨率影像的研究在年度去云合成、跨代 Landsat 传感器协调以及全国无缝拼接方面缺乏足够严谨的一致性处理，使得结果在不同年份之间的可比性受到影响。这意味着，真正同时具备高空间分辨率、全国无缝覆盖和长时间序列连续可比性的生态环境产品仍然相对稀缺。",
      "本研究的核心目标正在于此：尽可能在全国尺度上实现生态环境质量的系统性刻画，使研究结果在时间上保持连续与可比，在空间上兼顾细节与无缝性，从而为中国生态环境质量的时空格局分析提供更完整的遥感证据基础。",
    ],
    section3Title: "RSEI 作为综合指标的适用性",
    section3List: [
      "RSEI 能够在统一框架下综合表征植被、湿度、干燥度和热环境信息。",
      "相较于单一指标，RSEI 更适合用于刻画生态环境质量的综合状态。",
      "在长期序列构建稳定的前提下，RSEI 便于开展趋势分析、县域统计和区域比较。",
    ],
    section4Title: "总体技术路线",
    section4List: [
      "利用年度无缝 Landsat 光学合成产品稳定提取 NDVI、WET 和 NDBSI。",
      "结合 MODIS LST 与多源变量构建随机森林模型，生成长期 30 米 LST 产品。",
      "对四个基础指标实施统一标准化处理，并通过 PCA 构建年度 RSEI。",
      "在成果展示层面，同时提供全国栅格浏览、县域统计分析与方法说明模块。",
    ],
    section5Title: "研究区与整体背景",
    caption: "图为 2024 年中国 MODIS 土地覆盖图。",
    section6Title: "我们依托的数据基础",
    section6Body: [
      "本研究在光学指标构建阶段主要依托中国年度叶盛期 Landsat 无缝合成数据立方体。该数据集已完成多代 Landsat 传感器间的协调处理，并能够按年度提供全国无缝的叶盛期光学合成结果，从而为长期序列分析提供较好的空间完整性与时间可比性。",
    ],
    sourceLabel:
      "China Earth Observation Data Cube: The 30-m Seamless Annual Leaf-On Landsat Composites from 1985 to 2023",
  },
  zh_hant: {
    pageTitle: "研究背景 | EcoEnvAtlas",
    navFusion: "互動地圖",
    navAnalysis: "縣域分析",
    navPca: "RSEI PCA",
    navBackground: "研究背景",
    navOptical: "光學指標",
    navLst: "30 米 LST",
    navStack: "技術棧",
    navTeam: "團隊成員",
    eyebrow: "研究背景",
    title: "全國生態環境質量監測的研究背景與總體框架",
    subtitle:
      "本頁概述本研究的科學背景、研究意義與總體技術路線，用於說明全國尺度、長時間序列與 30 米空間解析度生態環境指標系統的建設邏輯。",
    section1Title: "研究意義",
    section1Body: [
      "生態文明建設與美麗中國建設已成為國家戰略的重要組成部分。對於中國這樣一個地域遼闊、區域差異顯著的發展中大國而言，生態環境質量的持續監測不僅是科學研究問題，也與國土空間治理、生態保護修復、區域協調發展與高質量發展評估密切相關。",
      "中國自然地理分異顯著，森林、平原、高原、乾旱區、丘陵與快速城市化地區在全國範圍內廣泛並存，使得生態環境質量在空間上呈現強烈異質性，在時間上又受到氣候波動、土地利用變化與人類活動共同驅動。僅依賴局部樣點或短時間序列資料，難以系統刻畫全國生態環境質量的時空格局、變化過程及其區域差異。",
      "因此，本研究的目標不是提供單一年份或局部區域的生態質量快照，而是嘗試構建一套兼顧全國覆蓋、長期連續性、跨年可比性與較高空間細節的生態環境指標系統，以支持全國尺度總體格局識別、縣域尺度差異分析以及長期變化監測。",
    ],
    section2Title: "現有研究的主要不足",
    section2Body: [
      "從現有研究看，覆蓋全國尺度的生態環境質量研究往往依賴 MODIS 等中低解析度產品，雖然有利於形成長期連續序列，但對縣域尺度與局地生態差異的刻畫能力有限。另一方面，部分高解析度研究雖然能夠達到 Landsat 尺度，但研究範圍通常局限於城市群、流域、省域或少數年份，在全國長期連續監測方面仍存在明顯不足。",
      "此外，部分基於高解析度影像的研究在年度去雲合成、跨代 Landsat 傳感器協調以及全國無縫拼接方面缺乏足夠嚴謹的一致性處理，使得結果在不同年份之間的可比性受到影響。這意味著，真正同時具備高空間解析度、全國無縫覆蓋與長時間序列連續可比性的生態環境產品仍然相對稀缺。",
      "本研究的核心目標正在於此：盡可能在全國尺度上實現生態環境質量的系統性刻畫，使研究結果在時間上保持連續與可比，在空間上兼顧細節與無縫性，從而為中國生態環境質量的時空格局分析提供更完整的遙感證據基礎。",
    ],
    section3Title: "RSEI 作為綜合指標的適用性",
    section3List: [
      "RSEI 能夠在統一框架下綜合表徵植被、濕度、乾燥度與熱環境資訊。",
      "相較於單一指標，RSEI 更適合用於刻畫生態環境質量的綜合狀態。",
      "在長期序列構建穩定的前提下，RSEI 便於開展趨勢分析、縣域統計與區域比較。",
    ],
    section4Title: "總體技術路線",
    section4List: [
      "利用年度無縫 Landsat 光學合成產品穩定提取 NDVI、WET 與 NDBSI。",
      "結合 MODIS LST 與多源變量構建隨機森林模型，生成長期 30 米 LST 產品。",
      "對四個基礎指標實施統一標準化處理，並通過 PCA 構建年度 RSEI。",
      "在成果展示層面，同時提供全國柵格瀏覽、縣域統計分析與方法說明模組。",
    ],
    section5Title: "研究區與整體背景",
    caption: "圖為 2024 年中國 MODIS 土地覆蓋圖。",
    section6Title: "我們依託的數據基礎",
    section6Body: [
      "本研究在光學指標構建階段主要依託中國年度葉盛期 Landsat 無縫合成數據立方體。該數據集已完成多代 Landsat 傳感器之間的協調處理，並能按年度提供全國無縫的葉盛期光學合成結果，從而為長期序列分析提供較好的空間完整性與時間可比性。",
    ],
    sourceLabel:
      "China Earth Observation Data Cube: The 30-m Seamless Annual Leaf-On Landsat Composites from 1985 to 2023",
  },
  en: {
    pageTitle: "Research Background | EcoEnvAtlas",
    navFusion: "Interactive Map",
    navAnalysis: "County Analytics",
    navPca: "RSEI PCA",
    navBackground: "Background",
    navOptical: "Optical Indicators",
    navLst: "30 m LST",
    navStack: "Tech Stack",
    navTeam: "Team",
    eyebrow: "Research Background",
    title: "Research Background and Overall Framework for National Eco-Environmental Monitoring",
    subtitle:
      "This page summarises the scientific background, research significance, and overall workflow of this study, explaining why a national, long-term, and 30 m eco-environmental indicator system is needed.",
    section1Title: "Research Significance",
    section1Body: [
      "Ecological civilisation and the Beautiful China initiative have become important components of national development strategy. For a country as large and geographically diverse as China, sustained monitoring of eco-environmental quality is not only a scientific issue, but is also closely related to territorial governance, ecological restoration, regional coordination, and high-quality development assessment.",
      "China contains forests, plains, plateaus, arid regions, hilly landscapes, and rapidly urbanising areas within the same national territory. Eco-environmental quality therefore shows strong spatial heterogeneity and is jointly shaped over time by climate variability, land-use change, and human activities. Local case studies or short time series alone are insufficient for systematically characterising national patterns and long-term dynamics.",
      "Accordingly, the aim of this study is not to provide a single-year snapshot or a local assessment, but to construct an indicator system that combines national coverage, long-term continuity, interannual comparability, and relatively high spatial detail, thereby supporting pattern recognition at the national scale, differentiation at the county scale, and long-term change monitoring.",
    ],
    section2Title: "Main Limitations of Existing Studies",
    section2Body: [
      "Many studies at the national scale rely on medium- to low-resolution products such as MODIS. While these products are useful for building long time series, they have limited ability to resolve county-level and local eco-environmental differences. By contrast, some high-resolution studies can reach the Landsat scale, but they are usually restricted to urban agglomerations, river basins, provinces, or a small number of years.",
      "In addition, some high-resolution studies do not apply sufficiently rigorous and consistent processing in annual cloud removal, cross-sensor harmonisation among Landsat generations, or seamless national mosaicking, which weakens interannual comparability. As a result, eco-environmental products that are simultaneously high-resolution, seamless at the national scale, and temporally comparable over the long term remain relatively scarce.",
      "The core objective of this study is to address this gap by providing a more systematic characterisation of China’s eco-environmental quality, with temporal continuity, spatial detail, and seamless national coverage considered together.",
    ],
    section3Title: "Why RSEI Is Appropriate as an Integrated Indicator",
    section3List: [
      "RSEI integrates vegetation, humidity, dryness, and thermal information within a single framework.",
      "Compared with a single indicator, RSEI is more suitable for representing the overall state of eco-environmental quality.",
      "When a stable long-term time series is available, RSEI is well suited to trend analysis, county-level statistics, and regional comparison.",
    ],
    section4Title: "Overall Technical Workflow",
    section4List: [
      "Stable annual NDVI, WET, and NDBSI are derived from seamless yearly Landsat optical composites.",
      "A random forest model is trained with MODIS LST and multiple environmental predictors to produce a long-term 30 m LST product.",
      "The four basic indicators are standardised and combined through PCA to generate annual RSEI.",
      "At the presentation layer, the results are organised into a national raster viewer, county-based analytics, and method-oriented pages.",
    ],
    section5Title: "Study Area and Overall Context",
    caption: "Figure: MODIS land cover map of China in 2024.",
    section6Title: "Data Foundation Used in This Study",
    section6Body: [
      "The optical component of this study primarily relies on the annual leaf-on Landsat seamless data cube for China. This dataset has been harmonised across Landsat generations and provides annual seamless leaf-on optical composites at the national scale, offering a strong basis for spatial completeness and temporal comparability in long-term analysis.",
    ],
    sourceLabel:
      "China Earth Observation Data Cube: The 30-m Seamless Annual Leaf-On Landsat Composites from 1985 to 2023",
  },
};

let bgLang = localStorage.getItem("rsei-viewer-lang") || "zh_cn";

const bgEl = {
  language: document.querySelector("#languageSelect"),
  title: document.querySelector("#bgTitle"),
  subtitle: document.querySelector("#bgSubtitle"),
  eyebrow: document.querySelector("#bgEyebrow"),
  section1Title: document.querySelector("#bgSection1Title"),
  section1Body: document.querySelector("#bgSection1Body"),
  section2Title: document.querySelector("#bgSection2Title"),
  section2Body: document.querySelector("#bgSection2Body"),
  section3Title: document.querySelector("#bgSection3Title"),
  section3List: document.querySelector("#bgSection3List"),
  section4Title: document.querySelector("#bgSection4Title"),
  section4List: document.querySelector("#bgSection4List"),
  section5Title: document.querySelector("#bgSection5Title"),
  caption: document.querySelector("#bgCaption"),
  section6Title: document.querySelector("#bgSection6Title"),
  section6Body: document.querySelector("#bgSection6Body"),
  sources: document.querySelector("#bgSources"),
};

function bgT(key) {
  return BG_I18N[bgLang]?.[key] ?? BG_I18N.zh_cn[key] ?? key;
}

function renderParagraphs(target, items) {
  if (!target) return;
  target.innerHTML = items.map((text) => `<p>${text}</p>`).join("");
}

function renderBullets(target, items) {
  if (!target) return;
  target.innerHTML = items.map((text) => `<li>${text}</li>`).join("");
}

function renderMeta(target, items) {
  if (!target) return;
  target.innerHTML = items.map((text) => `<div class="meta-item">${text}</div>`).join("");
}

function renderSources() {
  if (!bgEl.sources) return;
  bgEl.sources.innerHTML = `
    <li><a href="https://doi.org/10.34133/remotesensing.0698" target="_blank" rel="noreferrer">${bgT("sourceLabel")}</a></li>
  `;
}

function renderBackgroundPage() {
  document.documentElement.lang = bgLang === "zh_hant" ? "zh-Hant" : bgLang === "zh_cn" ? "zh-Hans" : "en";
  document.title = bgT("pageTitle");

  ["navFusion", "navAnalysis", "navPca", "navBackground", "navOptical", "navLst", "navStack", "navTeam"].forEach((id) => {
    const node = document.querySelector(`#${id}`);
    if (node) node.textContent = bgT(id);
  });

  if (bgEl.eyebrow) bgEl.eyebrow.textContent = bgT("eyebrow");
  if (bgEl.title) bgEl.title.textContent = bgT("title");
  if (bgEl.subtitle) bgEl.subtitle.textContent = bgT("subtitle");
  if (bgEl.section1Title) bgEl.section1Title.textContent = bgT("section1Title");
  renderParagraphs(bgEl.section1Body, bgT("section1Body"));
  if (bgEl.section2Title) bgEl.section2Title.textContent = bgT("section2Title");
  renderParagraphs(bgEl.section2Body, bgT("section2Body"));
  if (bgEl.section3Title) bgEl.section3Title.textContent = bgT("section3Title");
  renderBullets(bgEl.section3List, bgT("section3List"));
  if (bgEl.section4Title) bgEl.section4Title.textContent = bgT("section4Title");
  renderMeta(bgEl.section4List, bgT("section4List"));
  if (bgEl.section5Title) bgEl.section5Title.textContent = bgT("section5Title");
  if (bgEl.caption) bgEl.caption.textContent = bgT("caption");
  if (bgEl.section6Title) bgEl.section6Title.textContent = bgT("section6Title");
  renderParagraphs(bgEl.section6Body, bgT("section6Body"));
  renderSources();
}

if (bgEl.language) {
  bgEl.language.value = bgLang;
  bgEl.language.addEventListener("change", () => {
    bgLang = bgEl.language.value;
    localStorage.setItem("rsei-viewer-lang", bgLang);
    renderBackgroundPage();
  });
}

renderBackgroundPage();
