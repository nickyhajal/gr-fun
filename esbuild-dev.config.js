#!/usr/bin/env node

const path = require("path");
const http = require("http");
const chokidar = require("chokidar");

const watch = process.argv.includes("--watch");
const clients = [];

const watchOptions = {
  onRebuild: (error, result) => {
    if (error) {
      console.error("Build failed:", error);
    } else {
      console.log("Build succeeded");
      clients.forEach((res) => res.write("data: update\n\n"));
      clients.length = 0;
    }
  },
};

async function builder() {
  let result = await require("esbuild").build({
    entryPoints: ["application.js"],
    bundle: true,
    outdir: path.join(process.cwd(), "app/assets/builds"),
    absWorkingDir: path.join(process.cwd(), "app/javascript"),
    incremental: true,
    banner: {
      js: ' (() => new EventSource("http://localhost:8082").onmessage = () => location.reload())();',
    },
  });
  chokidar
    .watch([
      "./app/javascript/**/*.js",
      "./app/javascript/**/*.ts",
      "./app/javascript/**/*.jsx",
      "./app/javascript/**/*.tsx",
      "./app/views/**/*.html.erb",
      "./app/assets/builds/*.css",
      "./app/assets/stylesheets/*.css",
    ])
    .on("all", (event, path) => {
      if (path.includes("javascript")) {
        result.rebuild();
      }
      clients.forEach((res) => res.write("data: update\n\n"));
      clients.length = 0;
    });
}
builder();

http
  .createServer((req, res) => {
    return clients.push(
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        Connection: "keep-alive",
      })
    );
  })
  .listen(8082);
