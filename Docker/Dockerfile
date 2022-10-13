# Install all dependencies
FROM node:16-alpine3.15 AS dependencies

ENV NODE_ENV=development

WORKDIR /app

COPY package.json yarn.lock .

RUN yarn 

# Build the app and clean node_modules
FROM node:16-alpine3.15 AS builder

WORKDIR /app

ARG CORS_ORIGIN
ENV APP_PORT=3000 \
    NODE_ENV=development \
    ENV_CONFIGURATION=production \
    CORS_ORIGIN=${CORS_ORIGIN}
    
COPY package.json yarn.lock .
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN yarn run build

ENV NODE_ENV production

# clean up node_modules to have only production dependencies
RUN yarn --prod && yarn cache clean

# Runner
FROM node:16-alpine3.15 AS runner

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist 
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json .

USER nextjs

ARG CORS_ORIGIN
ENV APP_PORT=3000 \
    NODE_ENV=production \
    ENV_CONFIGURATION=production \
    CORS_ORIGIN=${CORS_ORIGIN}

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
