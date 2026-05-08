# Recommended Submission Workflow

## Recommended Setup

Use OneDrive as the official submission bundle and GitHub as the clean code repository.

OneDrive should contain this whole package as a `.zip` file. It is suitable for grading because it includes the report, figures, source code, representative data files, and deployment inventory.

GitHub should contain only the lightweight engineering part of the project. A clean GitHub repository can include:

- `website_source/raster_viewer_public/`
- `website_source/web_public/`
- `deployment_snapshot/mosaic_registry_server.json`
- `deployment_snapshot/online_data_inventory.txt`
- `README.md`
- `.gitignore`

If the repository becomes too large, remove heavy screenshots, report PDFs, and large GeoJSON files from GitHub, while keeping them in the OneDrive submission package.

## Why The Full Raster Data Is Not Uploaded

The online COG/TIF archive is about 2.9 TB. Uploading it to OneDrive or GitHub is unnecessary and impractical. The report and server inventory describe the storage strategy, while the live system demonstrates that the raster service is available.

## Local Inspection

The source files are static HTML, CSS, JavaScript, JSON, and GeoJSON files. They can be inspected directly in an editor. For a quick local static preview, run a local HTTP server inside one of the public directories, for example:

```bash
cd website_source/raster_viewer_public
python3 -m http.server 8080
```

Then open `http://localhost:8080/fusion.html`.

Some raster layers still depend on the deployed online tile service and registry. This is expected because the full raster archive is not bundled locally.

## Suggested GitHub Commands

```bash
git init
git add README.md SUBMISSION_WORKFLOW.md .gitignore website_source deployment_snapshot
git commit -m "Add EcoEnvAtlas Web GIS source snapshot"
```

Do not commit private keys, credentials, or full raster data.
