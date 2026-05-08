# EcoEnvAtlas Web GIS

EcoEnvAtlas is a Web GIS platform for visualizing and exploring national-scale ecological environment information in China. It is designed around a seamless, multi-year, 30 m ecological data product, and turns large raster and vector datasets into an interactive browser-based system.

Live website: http://ecoenvatlas.com/

30 m data product on Google Earth Engine: https://code.earthengine.google.com/b0d2fc95b8bd7d44cc0c2553ed5dc979

## Highlights

- Interactive MapLibre map for national 30 m raster layers, county boundaries, and provincial boundaries.
- County analytics pages for RSEI, NDVI, WET, NDBSI, and LST indicators.
- Pixel-level query panel with annual time-series visualization.
- Year comparison view for exploring ecological change across time.
- Place search, shareable map views, and responsive layouts for desktop and mobile use.
- English, Traditional Chinese, and Simplified Chinese interface support.

## Repository Structure

- `website_source/raster_viewer_public/`: main interactive map interface, including layer controls, raster loading, pixel query, comparison mode, and share links.
- `website_source/web_public/`: county analytics page, explanatory pages, multilingual scripts, interface assets, and lightweight web data.
- `deployment_snapshot/`: online deployment inventory and mosaic registry snapshot used to document how the raster service is organized.
- `SUBMISSION_WORKFLOW.md`: notes for course submission and lightweight project sharing.

## Data Access

The full 30 m raster product is managed as an online geospatial dataset rather than a regular Git repository asset. The current public access point is provided through Google Earth Engine:

https://code.earthengine.google.com/b0d2fc95b8bd7d44cc0c2553ed5dc979

The deployed Web GIS also serves raster layers through cloud-optimized GeoTIFFs and tile-based requests, allowing users to browse large national data without downloading the full archive locally.

## Local Preview

Most source files are static HTML, CSS, JavaScript, JSON, and GeoJSON files. A quick local preview can be started with:

```bash
cd website_source/raster_viewer_public
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/fusion.html
```

Some raster layers depend on the deployed online tile service and therefore require internet access.

---

# EcoEnvAtlas 生态环境图谱 Web GIS

EcoEnvAtlas 是一个面向中国生态环境信息浏览、查询和展示的 Web GIS 平台。系统围绕一套多年期、全国尺度、30 m 分辨率生态环境数据产品构建，把大规模栅格数据、县域矢量边界和交互式图表组织成可以直接在浏览器中使用的地图系统。

在线网站：http://ecoenvatlas.com/

Google Earth Engine 中的 30 m 数据产品：https://code.earthengine.google.com/b0d2fc95b8bd7d44cc0c2553ed5dc979

## 主要功能

- 使用 MapLibre 展示全国 30 m 栅格图层、县域边界和省级边界。
- 提供 RSEI、NDVI、WET、NDBSI 和 LST 等指标的县域分析页面。
- 支持像元级查询，并展示多年时间序列图。
- 支持年份对比视图，用于观察不同时期的生态环境变化。
- 支持地名搜索、当前视图分享链接，以及电脑端和手机端响应式布局。
- 支持英文、繁体中文和简体中文三语界面。

## 仓库结构

- `website_source/raster_viewer_public/`：融合地图页面，包括图层控制、栅格加载、像元查询、年份对比和视图分享等功能。
- `website_source/web_public/`：县域分析页面、说明页面、多语言脚本、界面素材和轻量级网页数据。
- `deployment_snapshot/`：线上部署数据清单和 mosaic registry 快照，用于说明栅格服务的数据组织方式。
- `SUBMISSION_WORKFLOW.md`：课程提交和轻量化项目分享的说明。

## 数据访问

完整 30 m 栅格产品以在线地理数据的方式管理，不适合作为普通 Git 仓库文件存放。目前可以通过 Google Earth Engine 访问：

https://code.earthengine.google.com/b0d2fc95b8bd7d44cc0c2553ed5dc979

线上 Web GIS 同时通过 Cloud-Optimized GeoTIFF 和瓦片请求提供地图浏览能力，使用户无需下载完整数据集即可查看全国尺度的生态环境图层。

## 本地预览

本仓库主要由静态 HTML、CSS、JavaScript、JSON 和 GeoJSON 文件组成。可以用下面的方式快速启动本地预览：

```bash
cd website_source/raster_viewer_public
python3 -m http.server 8080
```

然后打开：

```text
http://localhost:8080/fusion.html
```

部分栅格图层依赖线上瓦片服务，因此本地预览时仍需要网络连接。
