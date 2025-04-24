FROM node:16-alpine AS build

WORKDIR /app

# Copy application files
COPY . .

# Install any dependencies (if needed in the future)
# RUN npm install

# Production stage
FROM nginx:alpine

# Copy the built app to nginx serving directory
COPY --from=build /app /usr/share/nginx/html

# Copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]