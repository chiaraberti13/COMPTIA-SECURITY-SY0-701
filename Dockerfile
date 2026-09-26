# syntax=docker/dockerfile:1
#
# Production image: multi-stage build, minimal runtime without shell or package
# manager, non-root user. Both base images are pinned by digest (a tag can be
# moved to other content); Dependabot proposes updates (.github/dependabot.yml).
#
#   docker build -t comptia-sy0701 .
#   docker run --rm -p 3000:3000 --read-only --cap-drop=ALL \
#     --security-opt=no-new-privileges -e GEMINI_API_KEY=... comptia-sy0701
#
# See the "Container" section of README.md for the variables and the hardening
# flags.

# --- Build: install, compile the front end and bundle the server ------------
FROM node:24.21.0-bookworm-slim@sha256:0e0ff40c39bc087845bfb27465a0df4ea419520094bc35842ff83dd8cbe6f9b6 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# build: the front end in dist/. build:standalone: the server bundled together
# with the libraries it uses (express, helmet, @google/genai, ...), so the
# runtime image needs no node_modules at all: about 130 MB instead of 480 MB
# and only the code that actually runs.
RUN npm run build && npm run build:standalone

# --- Runtime: distroless C runtime (glibc, libstdc++, CA certificates), user
# 65532 (nonroot), plus the Node.js binary of the build stage. Distroless ships
# its own Node image, but it trails the Node 24 security releases; copying the
# binary keeps Node patched while the base stays minimal (no shell, no npm).
FROM gcr.io/distroless/cc-debian12:nonroot@sha256:9dac0a79194e45a7da0158a9c6da57b217585af0786db3845d1f0ec1a0dd182f
COPY --from=build /usr/local/bin/node /nodejs/bin/node
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000
COPY --from=build --chown=0:0 /app/dist ./dist
# Files belong to root and the process runs as nonroot: the app cannot modify
# its own code even without --read-only.
USER nonroot
EXPOSE 3000
# No shell or curl in the image: the probe uses Node's own fetch.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["/nodejs/bin/node", "-e", "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/healthz').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"]
ENTRYPOINT ["/nodejs/bin/node"]
CMD ["dist/server.cjs"]
