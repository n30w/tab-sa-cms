# Create payload production deployment here

# Stage 1: Build
FROM node:current-alpine AS builder

# Set working directory
WORKDIR /app

# Copy stuff
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the source code
COPY . .

# Build the application
RUN yarn build

# STAGE 2: Serve
FROM node:current-alpine

# Set working directory
WORKDIR /app

# Copy the built application from the build stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV production
ENV PAYLOAD_CONFIG_PATH dist/payload.config.js
ENV PORT 4000

# Expose the port the server will run on
EXPOSE 4000

# Run the server
CMD ["node", "./dist/server.js"]
