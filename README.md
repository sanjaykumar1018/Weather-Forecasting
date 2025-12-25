# Weather Forecasting

A simple, responsive weather forecasting web app built with vanilla HTML/CSS/JavaScript. It uses the OpenWeatherMap APIs to fetch current conditions and a 5‑day forecast by city search or your current location. The app also updates the background image dynamically based on the detected weather (Clear, Clouds, Rain, Snow, Drizzle, Mist/Haze/Fog, Thunderstorm).

## Features
- Search weather by city name
- Use browser geolocation to get local weather
- Show current temperature, wind, humidity, and feels-like
- 5‑day forecast (daily at 12:00)
- Dynamic background images that reflect the weather
- Clean, responsive, glassmorphism UI

## Tech Stack
- HTML, CSS, JavaScript (no frameworks)
- OpenWeatherMap Geocoding and 5‑day Forecast APIs

## Project Structure
```
weather/
├── index.html          # App entry point
├── style.css           # Styling and layout
├── script.js           # Weather logic + API calls
├── *.jpg               # Background images used by the app
└── README.md           # This documentation
```

Note: The file `index.js` appears to be a React bootstrap stub and isn’t used by this app. You can safely remove it before committing, or ignore it.

## Setup
1. Create a free account on OpenWeatherMap to get an API key: https://openweathermap.org/api
2. Open `script.js` and replace the value of `apiKey` at the top with your own key:
   ```js
   const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
   ```
3. Ensure all background images referenced in `script.js` (e.g. `sunny-bg1.jpg`, `cloudy-bg.jpg`) exist in the project folder.

## Run Locally
- Double‑click `index.html` to open it in your browser.
- OR serve the folder with a simple web server (recommended for consistent behavior):
  - Python: `python -m http.server 8000`
  - Node (http-server): `npx http-server -p 8000`
  - Open `http://localhost:8000/` and navigate to the project folder.

## Security Notes
- Don’t publish sensitive API keys. For public demos, consider creating a limited/restricted API key in OpenWeatherMap.
- In production, proxy API requests through a backend to avoid exposing keys in client code.

## How to Publish on GitHub
1. Create a new GitHub repository (public or private) on https://github.com/new. Use a name like `weather-forecasting`.
2. Initialize git in your local project (PowerShell in the project folder):
   ```powershell
   git init
   git add .
   git commit -m "Initial commit: Weather Forecasting app"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

### Optional: GitHub Pages Deployment
- Go to your repo Settings → Pages.
- Source: select `Deploy from a branch`.
- Branch: `main`, folder `/root` (because `index.html` is at the repo root).
- Save. GitHub Pages will give you a URL like `https://<username>.github.io/<repo>/`.

## Repo Description (copy for GitHub)
A responsive, vanilla JavaScript weather app using OpenWeatherMap. Search by city or use your current location to view current conditions and a 5‑day forecast. Background images change dynamically to match the weather. Built with HTML/CSS/JS.

## Screenshots
- Backgrounds change based on conditions (e.g., Clear, Clouds, Rain, Snow).
- 5‑day forecast cards show daily temperature, wind, humidity, and feels-like.

## Acknowledgements
- Weather data: OpenWeatherMap (Geocoding + Forecast APIs)
- Background images: Pexels/Pixabay assets included in the project

## License
Choose a license (MIT is common for web demos) or leave unlicensed if you prefer.
