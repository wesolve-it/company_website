FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Build-time value only; runtime must provide a new, persistent secret.
RUN PAYLOAD_SECRET=build-only-placeholder-not-for-runtime npm run build

FROM node:24-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV DATABASE_URL=file:/app/data/payload.db
ENV MEDIA_DIR=/app/data/media
COPY --from=build /app /app
RUN mkdir -p /app/data/media && chown -R node:node /app/data /app/.next
USER node
EXPOSE 3000
CMD ["npm", "run", "start"]
