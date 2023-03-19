FROM denoland/deno:alpine AS base
WORKDIR /home
COPY . .
CMD deno run --allow-env --allow-net --allow-read --import-map=vendor/import_map.json server.ts
