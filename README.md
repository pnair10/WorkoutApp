# Workout App

A React Native application built with Expo for logging workouts and providing insights.

## Folder Structure

```
app/
  screens/    # Main application screens
  components/ # Reusable UI components
  store/      # State management (workout and target stores)
logic/
  rules/      # Business logic rules (e.g., undertrained, imbalance)
  policy/     # Policy-based logic (e.g., focus overlay, priority ranker)
  schemas/    # Data schemas and TypeScript interfaces
```

## Setup Instructions

Follow these steps to get the project running locally:

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Expo Go](https://expo.dev/go) app on your mobile device (for testing)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd WorkoutApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run on your device:**
   - Scan the QR code displayed in the terminal with the **Expo Go** app (Android) or the **Camera** app (iOS).
   - Alternatively, press `i` for iOS simulator or `a` for Android emulator if you have them set up.

## Development

- **TypeScript:** The project uses TypeScript for type safety.
- **Linting:** (To be configured)
- **Testing:** (To be configured)
