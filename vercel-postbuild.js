const fs = require("fs");
const path = require("path");

function ensureRoutesManifest() {
  const manifestPath = path.join(".next", "routes-manifest.json");
  if (!fs.existsSync(manifestPath)) {
    fs.writeFileSync(
      manifestPath,
      JSON.stringify(
        {
          version: 3,
          pages404: false,
          basePath: "",
          redirects: [],
          rewrites: [],
          dynamicRoutes: [],
        },
        null,
        2
      )
    );
  }
}

ensureRoutesManifest();
