# CMPS460 Module 6: Working with APIs and External Data

## Project Overview

This project is a React Native application built with TypeScript. The API Data Viewer screen retrieves posts from an external REST API and displays them in a list. It demonstrates how a mobile application can request remote data and handle loading and network errors.

## API Information

- **API:** JSONPlaceholder
- **Endpoint:** https://jsonplaceholder.typicode.com/posts
- **HTTP method:** GET
- **Data format:** JSON

Each post includes a user ID, post ID, title, and body. This public sample API is useful for practicing API integration without exposing private API keys.

## Implementation

The screen uses `fetch()` with `async/await` to request data. It checks the HTTP response, stores the results in React state, and uses a TypeScript interface to describe each post.

The post list uses React Native's `FlatList` and a unique post ID as its key. The screen includes a loading indicator, an error message, an empty state, a Retry button, and pull-to-refresh functionality.

## Requirements

- Node.js and npm
- Android Studio and Android SDK
- An Android emulator
- Project dependencies installed with npm

## How to Run

1. Open a terminal in the project directory.
2. Install dependencies if needed by running `npm install`.
3. Start the Android emulator.
4. Run the application with:

   ```powershell
   npm run android
   ```

The project uses React Native CLI, not Expo, so use the command above to launch it.

## Testing

1. Launch the app and open API Data Viewer.
2. Confirm that post titles and bodies load.
3. Pull down on the list to test refreshing.
4. Test the error screen by using an invalid endpoint or temporarily making the API unavailable.
5. Confirm that the error message and Retry button appear.
6. Restore the correct endpoint and verify that posts load again.

## Screenshots

Include screenshots of the successful API list and the error screen with the Retry button. These demonstrate the successful request and error-handling behavior.

## Network Troubleshooting

During development, the Android emulator could reach an internet IP address but could not resolve the API hostname. Restarting the Pixel_8 emulator with explicit DNS servers resolved the issue:

```powershell
adb emu kill
& "C:\2AndroidSDK\emulator\emulator.exe" -avd Pixel_8 -dns-server 8.8.8.8,8.8.4.4
```

After the emulator starts, run `npm run android` again if needed.

## Design Decisions

JSONPlaceholder provides sample data without requiring an API key. Remote retrieval demonstrates how an app can access shared data. Loading, error, retry, and refresh behavior help the user understand the current request state and recover when a request fails.