FROM node:16-alpine

# Install nginx for serving the app
RUN apk add --no-cache nginx

# Install development tools
RUN apk add --no-cache git curl bash zsh sudo wget

# Create sudo group, add node user to sudo group, and configure sudo access
RUN addgroup sudo && \
    adduser node sudo && \
    echo "node ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/node

# # Set up working directory
# WORKDIR /workspace

# Install http-server for development (provides live reload)
RUN npm install -g http-server

# Expose ports for the web server
EXPOSE 80 8080 5500

# Copy nginx configuration
COPY nginx.dev.conf /etc/nginx/http.d/default.conf

# Start script to run development server or nginx
COPY .devcontainer/start-dev.sh /usr/local/bin/start-dev.sh
RUN chmod +x /usr/local/bin/start-dev.sh

# Setup ZSH for node user
WORKDIR /home/node
RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true
COPY --chown=node:node .devcontainer/.zshrc.example /home/node/.zshrc


CMD ["/usr/local/bin/start-dev.sh"]