const TITILER_ROOT = "/titiler";

const DATASETS = {
  rsei: {
    label: "RSEI",
    tile: "X112_Y22",
    unit: "",
    years: {
      "2020": {
        url: "/mnt/data6/raster-viewer/cogs/rsei/2020/RSEI_2020_X112_Y22_masked_cog.tif",
        bounds: [111.97265625, 21.9430455334, 116.015625, 26.0370418865],
        center: [113.994140625, 23.99004371],
        minzoom: 6,
        maxzoom: 12,
        rescale: "0,10000",
        colormap: "rdylgn",
        legendMin: "0",
        legendMax: "1",
        ramp: "linear-gradient(90deg, #8b2d22, #d98247, #f1df9a, #9acb73, #1f7a4f)",
        pointFormat: (v) => (v === null ? "--" : (v / 10000).toFixed(4)),
      },
    },
  },
  lst: {
    label: "LST",
    tile: "X112_Y22",
    unit: "°C",
    years: {
      "2020": {
        url: "/mnt/data6/raster-viewer/cogs/lst/2020/LST_2020_X112_Y22_masked_cog.tif",
        bounds: [111.97265625, 21.9430455334, 116.015625, 26.0370418865],
        center: [113.994140625, 23.99004371],
        minzoom: 6,
        maxzoom: 12,
        rescale: "1500,3500",
        colormap: "rdylbu_r",
        legendMin: "15",
        legendMax: "35",
        ramp: "linear-gradient(90deg, #2d6f8f, #7fb9c8, #f3e6a3, #e69b52, #9b2f2b)",
        pointFormat: (v) => (v === null ? "--" : `${(v / 100).toFixed(2)} °C`),
      },
    },
  },
};

let map;
let currentLayerKey = "rsei";
let currentYear = "2020";

const el = {
  status: document.querySelector("#statusText"),
  layer: document.querySelector("#layerSelect"),
  year: document.querySelector("#yearSelect"),
  opacity: document.querySelector("#opacitySlider"),
  tileName: document.querySelector("#tileName"),
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

function datasetConfig() {
  return DATASETS[currentLayerKey].years[currentYear];
}

function sourceId() {
  return `raster-${currentLayerKey}`;
}

function layerId() {
  return `raster-layer-${currentLayerKey}`;
}

function setStatus(text) {
  el.status.textContent = text;
}

function populateYears() {
  const years = Object.keys(DATASETS[currentLayerKey].years);
  el.year.innerHTML = years.map((year) => `<option value="${year}">${year}</option>`).join("");
  if (!years.includes(currentYear)) currentYear = years[0];
  el.year.value = currentYear;
}

function buildTileTemplate(cfg) {
  const params = new URLSearchParams({
    url: cfg.url,
    rescale: cfg.rescale,
    colormap_name: cfg.colormap,
  });
  return `${TITILER_ROOT}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x?${params.toString()}`;
}

function updateLegend() {
  const cfg = datasetConfig();
  el.legendTitle.textContent = `${DATASETS[currentLayerKey].label} ${currentYear}`;
  el.legendRamp.style.background = cfg.ramp;
  el.legendMin.textContent = cfg.legendMin;
  el.legendMax.textContent = cfg.legendMax;
}

function updatePanelHeader() {
  const layer = DATASETS[currentLayerKey];
  const cfg = datasetConfig();
  el.tileName.textContent = layer.tile;
  el.panelTitle.textContent = `${layer.label} ${currentYear}`;
  el.panelMeta.textContent = `30 m sample tile ${layer.tile}, with water masked out. Click the map to query the current layer.`;
  el.legendTitle.textContent = `${layer.label} ${currentYear}`;
  void cfg;
}

function clearQuery() {
  el.lon.textContent = "--";
  el.lat.textContent = "--";
  el.value.textContent = "--";
  el.queryStatus.textContent = "Ready";
}

async function refreshRasterSource(refit = false) {
  const cfg = datasetConfig();
  const sid = sourceId();
  const lid = layerId();
  const tileTemplate = buildTileTemplate(cfg);

  if (map.getLayer(lid)) map.removeLayer(lid);
  if (map.getSource(sid)) map.removeSource(sid);

  map.addSource(sid, {
    type: "raster",
    tiles: [tileTemplate],
    tileSize: 256,
    bounds: cfg.bounds,
    minzoom: cfg.minzoom,
    maxzoom: cfg.maxzoom,
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
    map.fitBounds(
      [
        [cfg.bounds[0], cfg.bounds[1]],
        [cfg.bounds[2], cfg.bounds[3]],
      ],
      { padding: 40, duration: 0 }
    );
  }

  updateLegend();
  updatePanelHeader();
  clearQuery();
}

async function queryPoint(lon, lat) {
  const cfg = datasetConfig();
  const url = `${TITILER_ROOT}/cog/point/${lon},${lat}?${new URLSearchParams({ url: cfg.url }).toString()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Point query failed: ${response.status}`);
  const data = await response.json();
  const raw = Array.isArray(data.values) ? data.values[0] : null;
  return raw === null || raw === undefined || raw === -32768 ? null : raw;
}

function attachMapEvents() {
  map.on("click", async (event) => {
    const { lng, lat } = event.lngLat;
    el.lon.textContent = lng.toFixed(5);
    el.lat.textContent = lat.toFixed(5);
    el.queryStatus.textContent = "Querying...";

    try {
      const raw = await queryPoint(lng, lat);
      const formatted = datasetConfig().pointFormat(raw);
      el.value.textContent = formatted;
      el.queryStatus.textContent = raw === null ? "No data" : "OK";
    } catch (error) {
      console.error(error);
      el.value.textContent = "--";
      el.queryStatus.textContent = "Failed";
    }
  });
}

function bindControls() {
  el.layer.addEventListener("input", async () => {
    currentLayerKey = el.layer.value;
    populateYears();
    await refreshRasterSource(false);
  });

  el.year.addEventListener("input", async () => {
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

function initMap() {
  const cfg = datasetConfig();
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
          paint: { "raster-opacity": 0.55, "raster-saturation": -0.35 },
        },
      ],
    },
    center: cfg.center,
    zoom: 7.2,
    minZoom: 5,
    maxZoom: 14,
  });

  map.addControl(new maplibregl.NavigationControl(), "top-left");
  map.on("load", async () => {
    await refreshRasterSource(true);
    attachMapEvents();
    setStatus("Viewer ready");
  });
}

function boot() {
  populateYears();
  bindControls();
  initMap();
}

boot();
