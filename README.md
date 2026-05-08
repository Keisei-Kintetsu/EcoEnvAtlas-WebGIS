# EcoEnvAtlas Web GIS

EcoEnvAtlas is a Web GIS system for browsing and explaining national-scale ecological environment data for China. The system combines an interactive MapLibre map, county-level analytics, multilingual documentation pages, raster tile services, vector boundaries, pixel time-series queries, and map comparison tools.

Live website: http://ecoenvatlas.com/

## Repository Contents

- `website_source/raster_viewer_public/`: interactive map interface, including raster/vector layer controls, pixel query, comparison mode, and sharing links.
- `website_source/web_public/`: county analytics page, explanatory pages, multilingual text, UI assets, and lightweight web data.
- `deployment_snapshot/`: server-side data inventory and online mosaic registry snapshot.
- `SUBMISSION_WORKFLOW.md`: recommended course submission workflow.

## What Is Not Included

The full national 30 m COG/TIF raster archive is not included in this repository. It is about 2.9 TB and is served online from the deployed raster service. SSH keys, server credentials, and cloud account credentials are also excluded.

## Local Preview

Most pages are static HTML, CSS, JavaScript, JSON, and GeoJSON files. A quick local preview can be started with:

```bash
cd website_source/raster_viewer_public
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/fusion.html
```

Some raster layers depend on the deployed online tile service and therefore require internet access.

## Course Submission Note

For grading, the OneDrive submission package should include the report PDF and figures as well. This GitHub repository is intended to keep the code and representative web data readable, lightweight, and version-controlled.
