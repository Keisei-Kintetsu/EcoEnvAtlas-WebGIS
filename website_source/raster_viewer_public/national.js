const TITILER_ROOT = "/titiler";
const REGISTRY_URL = "./data/mosaic_registry.json";
const PROVINCE_URL = "./data/province_boundary.geojson";
const CHINA_BOUNDS = [
  [72.0, 18.0],
  [136.0, 54.0],
];

const DATASETS = {
  annual: {
    rsei: {
      label: "RSEI",
      registryLayer: "rsei",
      rescale: "0,10000",
      colormap: "rdylgn",
      legendMin: "0",
      legendMax: "1",
      ramp: "linear-gradient(90deg, #8b2d22, #d98247, #f1df9a, #9acb73, #1f7a4f)",
      pointFormat: (v) => (v === null ? "--" : (v / 10000).toFixed(4)),
    },
    lst: {
      label: "LST",
      registryLayer: "lst",
      rescale: "1500,3500",
      colormap: "rdylbu_r",
      legendMin: "15",
      legendMax: "35",
      ramp: "linear-gradient(90deg, #2d6f8f, #7fb9c8, #f3e6a3, #e69b52, #9b2f2b)",
      pointFormat: (v) => (v === null ? "--" : `${(v / 100).toFixed(2)} °C`),
    },
    ndvi: {
      label: "NDVI",
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
      label: "WET",
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
      label: "NDBSI",
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
    rsei_slope: {
      label: "RSEI Sen slope",
      registryLayer: "rsei",
      bidx: 1,
      rescale: "-0.02,0.02",
      colormap: "rdylgn",
      legendMin: "-0.02",
      legendMax: "0.02",
      ramp: "linear-gradient(90deg, #8b2d22, #d98247, #f1df9a, #9acb73, #1f7a4f)",
      pointFormat: (v) => (v === null ? "--" : v.toFixed(5)),
    },
    lst_slope: {
      label: "LST Sen slope",
      registryLayer: "lst",
      bidx: 1,
      rescale: "-0.5,0.5",
      colormap: "rdylbu_r",
      legendMin: "-0.5",
      legendMax: "0.5",
      ramp: "linear-gradient(90deg, #2d6f8f, #7fb9c8, #f3e6a3, #e69b52, #9b2f2b)",
      pointFormat: (v) => (v === null ? "--" : `${v.toFixed(4)} °C/yr`),
    },
    ndvi_slope: {
      label: "NDVI Sen slope",
      registryLayer: "optical",
      bidx: 1,
      rescale: "-0.02,0.02",
      colormap: "viridis_r",
      legendMin: "-0.02",
      legendMax: "0.02",
      ramp: "linear-gradient(90deg, #fde725, #5ec962, #21918c, #3b528b, #440154)",
      pointFormat: (v) => (v === null ? "--" : v.toFixed(5)),
    },
    wet_slope: {
      label: "WET Sen slope",
      registryLayer: "optical",
      bidx: 6,
      rescale: "-0.02,0.02",
      colormap: "brbg",
      legendMin: "-0.02",
      legendMax: "0.02",
      ramp: "linear-gradient(90deg, #543005, #bf812d, #f6e8c3, #c7eae5, #01665e)",
      pointFormat: (v) => (v === null ? "--" : v.toFixed(5)),
    },
    ndbsi_slope: {
      label: "NDBSI Sen slope",
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

let registry;
let map;
let currentMode = "annual";
let currentLayerKey = "rsei";
let currentYear = "2025";
let isEmbed = false;
let provinceGeojson = null;

const params = new URLSearchParams(window.location.search);

const el = {
  status: document.querySelector("#statusText"),
  statusYear: document.querySelector("#statusYear"),
  mode: document.querySelector("#modeSelect"),
  layer: document.querySelector("#layerSelect"),
  year: document.querySelector("#yearSelect"),
  opacity: document.querySelector("#opacitySlider"),
  coverageLabel: document.querySelector("#coverageLabel"),
  legendTitle: document.querySelector("#legendTitle"),
  legendRamp: document.querySelector("#legendRamp"),
  legendMin: document.querySelector("#legendMin"),
  legendMax: document.querySelector("#legendMax"),
  panelTitle: document.querySelector("#panelTitle"),
  panelMeta: document.querySelector("#panelMeta"),
  lon: document.querySelector("#lonValue"),
  lat: document.querySelector("#latValue"),
  value: document.querySelector("#pixelValue"),
  queryStatus: document.querySelector("#queryStatus"),
};

function setStatus(text) {
  el.status.textContent = text;
}

function applyIncomingState(payload = {}) {
  const mode = payload.mode;
  const layer = payload.layer || payload.metric;
  const year = payload.year;

  if (mode && DATASETS[mode]) {
    currentMode = mode;
  }

  if (layer && DATASETS[currentMode][layer]) {
    currentLayerKey = layer;
  } else if (!DATASETS[currentMode][currentLayerKey]) {
    currentLayerKey = Object.keys(DATASETS[currentMode])[0];
  }

  if (year) {
    currentYear = String(year);
  }

  if (el.mode) el.mode.value = currentMode;
  populateLayerOptions();
  populateYears();
}

function currentDataset() {
  return DATASETS[currentMode][currentLayerKey];
}

function sourceId() {
  return `national-${currentMode}-${currentLayerKey}`;
}

function layerId() {
  return `national-layer-${currentMode}-${currentLayerKey}`;
}

function mosaicUrl() {
  const dataset = currentDataset();
  if (currentMode === "annual") {
    return registry.annual[dataset.registryLayer][currentYear].mosaic;
  }
  return registry.trend[dataset.registryLayer].mosaic;
}

function currentAssetCount() {
  const dataset = currentDataset();
  if (currentMode === "annual") {
    return registry.annual[dataset.registryLayer][currentYear].asset_count;
  }
  return registry.trend[dataset.registryLayer].asset_count;
}

function populateLayerOptions() {
  const entries = Object.entries(DATASETS[currentMode]);
  el.layer.innerHTML = entries.map(([key, meta]) => `<option value="${key}">${meta.label}</option>`).join("");
  if (!DATASETS[currentMode][currentLayerKey]) {
    currentLayerKey = entries[0][0];
  }
  el.layer.value = currentLayerKey;
}

function populateYears() {
  if (currentMode !== "annual") {
    el.year.innerHTML = `<option value="trend">Trend</option>`;
    el.year.value = "trend";
    el.year.disabled = true;
    return;
  }

  el.year.disabled = false;
  const dataset = currentDataset();
  const years = Object.keys(registry.annual[dataset.registryLayer]).sort();
  el.year.innerHTML = years.map((year) => `<option value="${year}">${year}</option>`).join("");
  if (!years.includes(currentYear)) currentYear = years[years.length - 1];
  el.year.value = currentYear;
}

function buildTileTemplate() {
  const meta = currentDataset();
  const params = new URLSearchParams({
    url: mosaicUrl(),
    rescale: meta.rescale,
    colormap_name: meta.colormap,
  });
  if (meta.bidx) params.set("bidx", String(meta.bidx));
  return `${TITILER_ROOT}/mosaicjson/tiles/WebMercatorQuad/{z}/{x}/{y}@1x?${params.toString()}`;
}

function updateLegend() {
  const meta = currentDataset();
  el.legendTitle.textContent = currentMode === "annual" ? `${meta.label} ${currentYear}` : meta.label;
  el.legendRamp.style.background = meta.ramp;
  el.legendMin.textContent = meta.legendMin;
  el.legendMax.textContent = meta.legendMax;
}

function updatePanelHeader() {
  const meta = currentDataset();
  const assetCount = currentAssetCount();
  el.statusYear.textContent = currentMode === "annual" ? currentYear : "Trend";
  el.coverageLabel.textContent = `${assetCount} tiles`;
  el.panelTitle.textContent = currentMode === "annual" ? `${meta.label} ${currentYear}` : meta.label;
  el.panelMeta.textContent =
    currentMode === "annual"
      ? `National 30 m annual mosaic built from ${assetCount} masked COG tiles. Click the map to query the current layer.`
      : `National Sen-MK trend mosaic built from ${assetCount} COG tiles. Click the map to query the current slope layer.`;
}

function clearQuery() {
  el.lon.textContent = "--";
  el.lat.textContent = "--";
  el.value.textContent = "--";
  el.queryStatus.textContent = "Ready";
}

async function refreshRasterSource(refit = false) {
  const sid = sourceId();
  const lid = layerId();
  const tileTemplate = buildTileTemplate();

  if (map.getLayer(lid)) map.removeLayer(lid);
  if (map.getSource(sid)) map.removeSource(sid);

  map.addSource(sid, {
    type: "raster",
    tiles: [tileTemplate],
    tileSize: 256,
    bounds: [CHINA_BOUNDS[0][0], CHINA_BOUNDS[0][1], CHINA_BOUNDS[1][0], CHINA_BOUNDS[1][1]],
    minzoom: 3,
    maxzoom: 14,
  });

  map.addLayer({
    id: lid,
    type: "raster",
    source: sid,
    paint: {
      "raster-opacity": Number(el.opacity.value),
      "raster-resampling": "nearest",
    },
  });

  if (refit) {
    map.fitBounds(CHINA_BOUNDS, { padding: 36, duration: 0 });
  }

  updateLegend();
  updatePanelHeader();
  clearQuery();
}

function ensureProvinceBoundary() {
  if (!provinceGeojson || !map) return;

  if (!map.getSource("province-boundary")) {
    map.addSource("province-boundary", {
      type: "geojson",
      data: provinceGeojson,
    });
  }

  if (!map.getLayer("province-boundary-line")) {
    map.addLayer({
      id: "province-boundary-line",
      type: "line",
      source: "province-boundary",
      paint: {
        "line-color": "rgba(24, 28, 24, 0.72)",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          3, 0.8,
          5, 1.25,
          7, 1.75,
          10, 2.2,
        ],
      },
    });
  }

  map.moveLayer("province-boundary-line");
}

async function queryPoint(lon, lat) {
  const meta = currentDataset();
  const params = new URLSearchParams({
    url: mosaicUrl(),
  });
  if (meta.bidx) params.set("bidx", String(meta.bidx));

  const response = await fetch(`${TITILER_ROOT}/mosaicjson/point/${lon},${lat}?${params.toString()}`);
  if (!response.ok) throw new Error(`Point query failed: ${response.status}`);
  const data = await response.json();
  const entries = Array.isArray(data.values) ? data.values : [];

  for (const entry of entries) {
    if (!Array.isArray(entry) || entry.length < 2) continue;
    const values = entry[1];
    const raw = Array.isArray(values) ? values[0] : null;
    if (raw !== null && raw !== undefined && raw !== -32768) {
      return meta.pointFormat(raw);
    }
  }

  return "--";
}

function attachMapEvents() {
  map.on("click", async (event) => {
    const { lng, lat } = event.lngLat;
    el.lon.textContent = lng.toFixed(5);
    el.lat.textContent = lat.toFixed(5);
    el.queryStatus.textContent = "Querying...";

    try {
      const value = await queryPoint(lng, lat);
      el.value.textContent = value;
      el.queryStatus.textContent = value === "--" ? "No data" : "OK";
    } catch (error) {
      console.error(error);
      el.value.textContent = "--";
      el.queryStatus.textContent = "Failed";
    }
  });
}

function bindControls() {
  el.mode.addEventListener("input", async () => {
    currentMode = el.mode.value;
    currentLayerKey = Object.keys(DATASETS[currentMode])[0];
    populateLayerOptions();
    populateYears();
    await refreshRasterSource(false);
  });

  el.layer.addEventListener("input", async () => {
    currentLayerKey = el.layer.value;
    populateYears();
    await refreshRasterSource(false);
  });

  el.year.addEventListener("input", async () => {
    if (currentMode !== "annual") return;
    currentYear = el.year.value;
    await refreshRasterSource(false);
  });

  el.opacity.addEventListener("input", () => {
    const lid = layerId();
    if (map.getLayer(lid)) {
      map.setPaintProperty(lid, "raster-opacity", Number(el.opacity.value));
    }
  });
}

function bindEmbedMessaging() {
  window.addEventListener("message", async (event) => {
    if (!event?.data || event.data.type !== "raster-viewer:setState") return;
    applyIncomingState(event.data.payload || {});
    await refreshRasterSource(false);
  });
}

function initMap() {
  map = new maplibregl.Map({
    container: "map",
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
    center: [104.0, 35.5],
    zoom: 4.1,
    minZoom: 3,
    maxZoom: 14,
  });

  map.addControl(new maplibregl.NavigationControl(), "top-left");
  map.on("load", async () => {
    await refreshRasterSource(true);
    ensureProvinceBoundary();
    attachMapEvents();
    setStatus("Viewer ready");
  });
}

async function boot() {
  isEmbed = params.get("embed") === "1";
  if (isEmbed) {
    document.body.classList.add("embed-mode");
  }

  const [registryResp, provinceResp] = await Promise.all([
    fetch(REGISTRY_URL).then((r) => r.json()),
    fetch(PROVINCE_URL).then((r) => r.json()),
  ]);
  registry = registryResp;
  provinceGeojson = provinceResp;
  applyIncomingState({
    mode: params.get("mode") || currentMode,
    layer: params.get("layer") || currentLayerKey,
    year: params.get("year") || currentYear,
  });
  populateLayerOptions();
  populateYears();
  bindControls();
  bindEmbedMessaging();
  initMap();
}

boot().catch((error) => {
  console.error(error);
  setStatus("Failed to load viewer");
});
