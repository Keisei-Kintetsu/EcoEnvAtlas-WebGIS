const I18N = {
  en: {
    pageTitle: "Team | EcoEnvAtlas",
    interactiveMap: "Interactive Map",
    countyAnalytics: "County Analytics",
    rseiPca: "RSEI PCA",
    background: "Research Background",
    opticalIndicators: "Optical Indicators",
    lst30m: "LST 30 m",
    techStack: "Tech Stack",
    team: "Team",
    language: "Language",
    eyebrow: "Team",
    title: "Project Team",
    subtitle: "This page introduces the currently confirmed member and reserves positions for the remaining teammates.",
    profileTitle: "Member Profile",
    profileSubtitle: "Geographic Information Science / Geospatial Data Science",
    educationTitle: "Education",
    placeholderTitle: "Position Reserved",
    placeholderBody: "This card is reserved for another team member and will be updated later.",
    degree1: "2021.9-2025.6 Sun Yat-sen University, Bachelor of Science in Geographic Information Science",
    degree2: "2025.9-2026.11 The University of Hong Kong, Master of Science in Geospatial Data Science",
  },
  zh_cn: {
    pageTitle: "团队成员 | EcoEnvAtlas",
    interactiveMap: "交互地图",
    countyAnalytics: "县域分析",
    rseiPca: "RSEI PCA",
    background: "研究背景",
    opticalIndicators: "光学指标",
    lst30m: "30 米 LST",
    techStack: "技术栈",
    team: "团队成员",
    language: "语言",
    eyebrow: "团队成员",
    title: "项目团队",
    subtitle: "这里先展示目前已确认的一位成员，并为其余组员预留位置。",
    profileTitle: "成员信息",
    profileSubtitle: "地理信息科学 / 地理空间数据科学",
    educationTitle: "学历",
    placeholderTitle: "位置预留",
    placeholderBody: "这里预留给另一位组员，后续会继续补充。",
    degree1: "2021.9-2025.6 中山大学 地理信息科学 理学学士",
    degree2: "2025.9-2026.11 香港大学 地理空间数据科学 理学硕士",
  },
  zh_hant: {
    pageTitle: "團隊成員 | EcoEnvAtlas",
    interactiveMap: "互動地圖",
    countyAnalytics: "縣域分析",
    rseiPca: "RSEI PCA",
    background: "研究背景",
    opticalIndicators: "光學指標",
    lst30m: "30 米 LST",
    techStack: "技術棧",
    team: "團隊成員",
    language: "語言",
    eyebrow: "團隊成員",
    title: "項目團隊",
    subtitle: "這裡先展示目前已確認的一位成員，並為其餘組員預留位置。",
    profileTitle: "成員資訊",
    profileSubtitle: "地理資訊科學 / 地理空間數據科學",
    educationTitle: "學歷",
    placeholderTitle: "位置預留",
    placeholderBody: "這裡預留給另一位組員，後續會繼續補充。",
    degree1: "2021.9-2025.6 中山大學 地理資訊科學 理學學士",
    degree2: "2025.9-2026.11 香港大學 地理空間數據科學 理學碩士",
  },
};

let currentLang = localStorage.getItem("rsei-viewer-lang") || "en";

const MEMBER = {
  name_en: "Erzheng Liang",
  name_zh: "梁而正",
  photo: "./assets/erzheng_liang_cutout.png",
};

const el = {
  language: document.querySelector("#languageSelect"),
  grid: document.querySelector("#teamGrid"),
};

function t(key) {
  return I18N[currentLang]?.[key] ?? I18N.en[key] ?? key;
}

function renderTeam() {
  const primaryCard = `
    <article class="member-card">
      <div class="member-photo-wrap">
        <img class="member-photo" src="${MEMBER.photo}" alt="${MEMBER.name_en}" />
      </div>
      <h2>${MEMBER.name_en}</h2>
      <p class="member-subtitle">${MEMBER.name_zh}<br />${t("profileSubtitle")}</p>
      <h3>${t("educationTitle")}</h3>
      <ul class="education-list">
        <li>${t("degree1")}</li>
        <li>${t("degree2")}</li>
      </ul>
    </article>`;

  const placeholders = Array.from({ length: 3 }, () => `
    <article class="member-card">
      <h2>${t("placeholderTitle")}</h2>
      <div class="member-placeholder">${t("placeholderBody")}</div>
    </article>`)
    .join("");

  el.grid.innerHTML = primaryCard + placeholders;
}

function applyLanguage() {
  currentLang = el.language?.value || currentLang;
  localStorage.setItem("rsei-viewer-lang", currentLang);
  document.documentElement.lang = currentLang === "zh_hant" ? "zh-Hant" : currentLang === "zh_cn" ? "zh-Hans" : "en";
  document.title = t("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  renderTeam();
}

if (el.language) {
  el.language.value = currentLang;
  el.language.addEventListener("change", applyLanguage);
}

applyLanguage();
