# Hearts Score Tracker

A progressive web application (PWA) for tracking scores in the Hearts card game. This application allows players to easily keep track of scores across multiple rounds, with support for 3-6 players.

## Features

- **Player Management**: Set up games with 3-6 players
- **Score Tracking**: Keep track of scores across multiple rounds
- **Game Rules Support**: Built-in support for "shooting the moon" rule
- **Game History**: Undo last round if a mistake is made
- **Offline Support**: Works without internet connection
- **Mobile-Friendly**: Responsive design for all device sizes
- **Installable**: Can be installed as a standalone app on mobile devices
- **Local Storage**: Games are saved automatically and can be resumed later

## Usage

1. **Player Setup**

   - Select the number of players (3-6)
   - Enter player names
   - Set the target score (default: 100)
   - Enable/disable "shooting the moon" rule

2. **Game Play**

   - View the current score table
   - Add scores for each round
   - Track total scores and progress toward the winning condition

3. **Game Completion**
   - View final rankings when a player reaches the target score
   - See detailed results with player rankings
   - Start a new game

## Technical Details

The app is built with vanilla JavaScript, HTML, and CSS, with no external dependencies. It uses modern web technologies:

- **Progressive Web App (PWA)** capabilities for offline use
- **Service Worker** for caching assets and offline functionality
- **Local Storage** for saving game state
- **Responsive Design** for all screen sizes
- **Web App Manifest** for installability on mobile devices

## Installation

### Web Browser

Simply visit the hosted version of the app in any modern web browser.

### Mobile Installation

1. Open the app in your mobile browser
2. For iOS: Tap the Share button and select "Add to Home Screen"
3. For Android: Tap the menu button and select "Install App" or "Add to Home Screen"

## Development

### Prerequisites

- Basic web server for local development

### Setup

1. Clone the repository
2. Serve the directory with any web server
3. Access via localhost in your browser

### Docker

A Dockerfile is included for containerized deployment:

```bash
# Build the Docker image
docker build -t hearts-score-tracker .

# Run the container
docker run -p 8080:80 hearts-score-tracker
```

## License

Copyright © 2025 Hearts Score Tracker
