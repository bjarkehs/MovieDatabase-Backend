# pnpm 12 needs Node 18+, so dependencies install in their own stage.
FROM node:24-bookworm-slim AS deps
WORKDIR /code
RUN corepack enable
COPY package.json pnpm-lock.yaml /code/
RUN pnpm install --frozen-lockfile

FROM node:16

# Create app directory
RUN mkdir -p /code
WORKDIR /code

# Install app dependencies
COPY --from=deps /code/node_modules /code/node_modules

# Bundle app source
COPY . /code

EXPOSE 3001
ENTRYPOINT [ "node", "index.js" ]
