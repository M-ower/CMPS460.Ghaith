# Location Journal

## About the App

Location Journal is a React Native app built with Expo and TypeScript. It lets users take pictures, save their current GPS location, and write notes about places or experiences.

## Features

- Take pictures using the device camera.
- Request camera permission when using the camera.
- Request foreground location permission to get GPS coordinates.
- Write a journal note for each entry.
- Save the photo, coordinates, note, and date and time.
- View saved journal entries in a scrollable list.
- Keep saved entries after closing and reopening the app.
- Display messages when permissions are denied or an operation fails.

## Requirements

- Node.js and npm
- Android emulator or Android device
- Expo Go

## Installation and Setup

1. Open a terminal in the LocationJournal folder.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the app on Android:

   ```bash
   npm run android
   ```

4. Wait for Expo to start and open the app on your Android device or emulator.

## Permissions

The app uses camera permission to take journal photos and foreground location permission to retrieve GPS coordinates. The app explains why these permissions are needed.

## Technologies

- React Native
- Expo
- TypeScript
- Expo Camera
- Expo Location
- Expo File System
- AsyncStorage

## Project

This project was created for CMPS460 Module 10: Mobile Device Features — Camera, GPS, and Permissions.