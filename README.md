# CMPS460 React Native Projects

## Project Overview

This project is a React Native application built with TypeScript. It includes features developed throughout the course, including an API Data Viewer and a Personal Mobile Organizer.

The application demonstrates mobile navigation, working with external APIs, managing tasks, local data storage, and handling loading and error states.

---

# Module 6: Working with APIs and External Data

## API Information

- **API:** JSONPlaceholder
- **Endpoint:** https://jsonplaceholder.typicode.com/posts
- **HTTP method:** GET
- **Data format:** JSON

Each post includes a user ID, post ID, title, and body. This public sample API is useful for practicing API integration without exposing private API keys.

## Implementation

The API Data Viewer screen uses `fetch()` with `async/await` to request data. It checks the HTTP response, stores the results in React state, and uses a TypeScript interface to describe each post.

The post list uses React Native's `FlatList` and a unique post ID as its key. The screen includes a loading indicator, an error message, an empty state, a Retry button, and pull-to-refresh functionality.

## Requirements

- Node.js and npm
- Android Studio and Android SDK
- An Android emulator
- Project dependencies installed with npm

## How to Run

1. Open a terminal in the project directory.
2. Install dependencies if needed:

   ```powershell
   npm install
   ```

3. Start the Android emulator.
4. Run the application:

   ```powershell
   npm run android
   ```

The project uses React Native CLI, not Expo.

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

During development, the Android emulator could