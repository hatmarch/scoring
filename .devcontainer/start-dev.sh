#!/bin/bash

# Start development server
echo "Starting development server..."

# Choose between nginx or http-server based on DEV_SERVER env variable
if [ "$DEV_SERVER" = "nginx" ]; then
    echo "Using nginx to serve the application"
    nginx -g "daemon off;"
else
    echo "Using http-server for development with live reload"
    cd /workspaces/scoring
    # Using port 8080 explicitly, ensuring CORS is enabled and no caching
    http-server -p 8080 --cors -c-1 -a 0.0.0.0
fi