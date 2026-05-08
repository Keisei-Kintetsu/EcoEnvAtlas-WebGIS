const VIEW_CONFIG = {
  raster: {
    label: "Raster",
    frameTitle: "National Raster View",
    frameSubtitle: "Continuous national 30 m raster browsing with annual and trend layers in one persistent map frame.",
    summaryText:
      "Raster view is active. The raster engine stays mounted in the same map slot, so switching back does not feel like opening a new app again.",
    standaloneHref: "./national.html",
    analyticsHref: "./counties/analysis.html",
    displays: [
      { value: "annual", label: "Annual" },
      { value: "trend", label: "Trend" },
    ],
    defaultDisplay: "annual",
    defaultMetric: "rsei",
    postType: "raster-viewer:setState",
  },
  county: {
    label: "County",
    frameTitle: "County Vector View",
    frameSubtitle: "Interactive county choropleth browsing with the same indicator and year logic, kept in the same visual workspace.",
    summaryText:
      "County view is active. The county engine is already loaded behind the same map frame, so the transition feels much closer to one integrated GIS interface.",
    standaloneHref: "./counties/",
    analyticsHref: "./counties/analysis.html",
    displays: [
      { value: "value", label: "Annual" },
      { value: "slope", label: "Sen slope" },
      { value: "change", label: "Change 2025-2000" },
    ],
    defaultDisplay: "value",
    defaultMetric: "rsei",
    postType: "county-viewer:setState",
  },
};

const METRIC_LABELS = {
  rsei: "RSEI",
  lst: "LST",
  ndvi: "NDVI",
  wet: "WET",
  ndbsi: "NDBSI",
};

const DISPLAY_LABELS = {
  annual: "Annual",
  trend: "Trend",
  value: "Annual",
  slope: "Sen slope",
  change: "Change 2025-2000",
};

const state = {
  view: "raster",
  metric: "rsei",
  display: "annual",
  year: 2025,
};

const el = {
  tabs: Array.from(document.querySelectorAll(".seg-btn")),
  metric: document.querySelector("#metricSelect"),
  display: document.querySelector("#displaySelect"),
  year: document.querySelector("#yearSlider"),
  yearLabel: document.querySelector("#yearLabel"),
  rasterFrame: document.querySelector("#rasterFrame"),
  countyFrame: document.querySelector("#countyFrame"),
  frameTitle: document.querySelector("#frameTitle"),
  frameSubtitle: document.querySelector("#frameSubtitle"),
  openStandaloneLink: document.querySelector("#openStandaloneLink"),
  openAnalyticsLink: document.querySelector("#openAnalyticsLink"),
  statusMode: document.querySelector("#statusMode"),
  statusDetail: document.querySelector("#statusDetail"),
  panelSummary: document.querySelector("#panelSummary"),
  summaryMode: document.querySelector("#summaryMode"),
  summaryMetric: document.querySelector("#summaryMetric"),
  summaryDisplay: document.querySelector("#summaryDisplay"),
  summaryYear: document.querySelector("#summaryYear"),
};

function currentView() {
  return VIEW_CONFIG[state.view];
}

function activeFrame() {
  return state.view === "raster" ? el.rasterFrame : el.countyFrame;
}

function syncDisplayOptions() {
  const cfg = currentView();
  el.display.innerHTML = cfg.displays
    .map((item) => `<option value="${item.value}">${item.label}</option>`)
    .join("");
  if (!cfg.displays.some((item) => item.value === state.display)) {
    state.display = cfg.defaultDisplay;
  }
  el.display.value = state.display;
}

function canUseYear() {
  return (state.view === "raster" && state.display === "annual") || (state.view === "county" && state.display === "value");
}

function syncYearControl() {
  const enabled = canUseYear();
  el.year.disabled = !enabled;
  el.yearLabel.classList.toggle("year-output-disabled", !enabled);
  el.yearLabel.textContent = enabled ? String(state.year) : "Static";
}

function updateText() {
  const cfg = currentView();
  const metricLabel = METRIC_LABELS[state.metric];
  const displayLabel = DISPLAY_LABELS[state.display];
  const yearLabel = canUseYear() ? String(state.year) : "Static";

  el.frameTitle.textContent = cfg.frameTitle;
  el.frameSubtitle.textContent = cfg.frameSubtitle;
  el.openStandaloneLink.href = cfg.standaloneHref;
  el.openAnalyticsLink.href = cfg.analyticsHref;
  el.statusMode.textContent = cfg.label;
  el.statusDetail.textContent = `${metricLabel} ${displayLabel.toLowerCase()} ${yearLabel.toLowerCase()}`;
  el.panelSummary.textContent = cfg.summaryText;
  el.summaryMode.textContent = cfg.label;
  el.summaryMetric.textContent = metricLabel;
  el.summaryDisplay.textContent = displayLabel;
  el.summaryYear.textContent = yearLabel;

  el.rasterFrame.classList.toggle("is-active", state.view === "raster");
  el.countyFrame.classList.toggle("is-active", state.view === "county");

  for (const tab of el.tabs) {
    tab.classList.toggle("is-active", tab.dataset.view === state.view);
  }
}

function postStateToFrames() {
  const rasterPayload = {
    type: VIEW_CONFIG.raster.postType,
    payload: {
      mode: state.view === "raster" ? state.display : "annual",
      metric: state.metric,
      layer: state.metric,
      year: String(state.year),
    },
  };

  const countyPayload = {
    type: VIEW_CONFIG.county.postType,
    payload: {
      mode: state.view === "county" ? state.display : "value",
      metric: state.metric,
      year: String(state.year),
    },
  };

  if (el.rasterFrame?.contentWindow) {
    el.rasterFrame.contentWindow.postMessage(rasterPayload, "*");
  }
  if (el.countyFrame?.contentWindow) {
    el.countyFrame.contentWindow.postMessage(countyPayload, "*");
  }
}

function render() {
  syncDisplayOptions();
  el.metric.value = state.metric;
  el.year.value = String(state.year);
  syncYearControl();
  updateText();
  postStateToFrames();
}

for (const tab of el.tabs) {
  tab.addEventListener("click", () => {
    state.view = tab.dataset.view;
    const cfg = currentView();
    state.display = cfg.defaultDisplay;
    render();
  });
}

el.metric.addEventListener("input", () => {
  state.metric = el.metric.value;
  render();
});

el.display.addEventListener("input", () => {
  state.display = el.display.value;
  render();
});

el.year.addEventListener("input", () => {
  state.year = Number(el.year.value);
  render();
});

el.rasterFrame.addEventListener("load", postStateToFrames);
el.countyFrame.addEventListener("load", postStateToFrames);

render();
