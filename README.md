# YouRHa — Your App, Your Harmony

> Your own path, your own rhythm.

YouRHa is a personal mobile application designed to bring daily task management and music into one calm, cozy space. Inspired by Japanese minimalism and personal philosophies of finding one's own path, YouRHa aims to make everyday routines feel more intentional, comfortable, and personal.

Built as a learning project, YouRHa is also a journey to understand mobile application development, local data persistence, and automated software testing step by step.

## Table of Contents

- [Vision & Philosophy](#vision--philosophy)
- [Core Features](#core-features)
- [Design Direction](#design-direction)
- [Technology Stack](#technology-stack)
- [Project Status](#project-status)
- [Getting Started](#getting-started)
- [Development Roadmap](#development-roadmap)
- [Testing Strategy](#testing-strategy)
- [Project Principles](#project-principles)

## Vision & Philosophy

YouRHa is a personal space for managing responsibilities without turning everyday life into a productivity competition.

Its concept is inspired by:

- **Dokkōdō:** an inspiration for walking one's own path and making independent choices.
- **Ikigai:** an inspiration for reflecting on purpose and meaningful everyday activities.
- **NieR:Automata:** a creative reference for personal journeys, identity, and the possibility of beginning again.

These references inform the project's creative direction; YouRHa is an independent project with its own visual identity and product design.

The central idea is simple: you are more than the tasks you complete. You can work, listen to music, take a break, and start again at your own pace.

## Core Features

### Daily Tasks
- Create tasks with a title and optional details.
- View a list of tasks.
- Update task information.
- Mark tasks as completed or incomplete.
- Delete tasks with appropriate confirmation.
- Preserve task data locally using SQLite.

### Music Corner
- Search for music videos by title or artist.
- Display search results and relevant video information.
- Play selected videos through the official embedded YouTube player.
- Explore a local list of favorites, if implemented.

Search and playback require an internet connection. This project plans to use the YouTube Data API and an embedded player; it does not claim to provide an independent YouTube Music streaming service.

### Personal Experience
- A calm, Japanese-minimalist interface.
- A simple daily overview.
- A comfortable experience without unnecessary productivity pressure.

## Design Direction

YouRHa follows a cozy Japanese-minimalist visual language.

| Color | Hex | Intended use |
|---|---|---|
| Ivory | `#F7F4ED` | Main background |
| Natural Wood | `#B8A084` | Warm accents and surfaces |
| Soft Sage | `#AAB6A0` | Primary accents and task status |
| Soft Charcoal | `#393A34` | Main text and strong contrast |
| Muted Clay | `#C58D6D` | Occasional secondary accents |

Design principles:
- Use whitespace to keep screens calm and readable.
- Prefer restrained colors, simple shapes, and consistent spacing.
- Make primary actions easy to understand.
- Communicate unfinished tasks neutrally.
- Prefer reusable components over duplicated UI code.

These colors are the initial design palette and may be refined during implementation.

## Technology Stack

| Technology | Purpose |
|---|---|
| React Native | Cross-platform mobile UI |
| Expo | Development tooling and application runtime |
| JavaScript | Application logic and learning foundation |
| SQLite via `expo-sqlite` | Local task storage |
| YouTube Data API | Planned video search |
| YouTube embedded player | Planned in-app video playback |
| Katalon Studio | Planned Android automation testing |
| Git and GitHub | Version control and project history |

The initial target platform is Android. A custom backend, user accounts, and cloud synchronization are outside the initial MVP scope.

## Project Status

**Current phase: Early development and learning**

The project has been initialized with Expo and runs through Expo Go on an Android emulator.

Current learning progress:
- A basic React Native screen.
- A task array rendered with `.map()`.
- Unique task identifiers using `key`.
- State-based task completion toggling.
- A prototype for adding and removing tasks.
- Initial exploration of SQLite database setup.

The in-memory task interactions and SQLite persistence are separate concerns. Full, verified CRUD persistence in SQLite is still under development. YouTube integration and Katalon automation have not yet been completed.

## Getting Started

### Prerequisites

- Node.js and npm.
- Git.
- VS Code or another code editor.
- Android Studio with an Android emulator, or a compatible Android device.

### Installation

Clone the repository if you have not already checked it out:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd YouRHa
```

Install dependencies:

```bash
npm install
```

Start Expo in Expo Go mode:

```bash
npx expo start --go
```

With an Android emulator running, press `a` in the Expo terminal to open the application.

For diagnostics:

```bash
npx expo-doctor
```

Use the package versions and instructions associated with the Expo SDK installed in this repository.

## Development Roadmap

The first development milestone is intentionally small and focused on learning.

| Day | Focus | Expected outcome |
|---|---|---|
| 1 | Render a task list | Understand arrays, objects, JSX, and `.map()` |
| 2 | Toggle task completion | Understand React state and user interaction |
| 3 | Add tasks | Learn controlled inputs and validation |
| 4 | Delete tasks | Learn filtering, confirmation, and empty states |
| 5 | SQLite persistence | Store and retrieve task data locally |
| 6 | UI polish and testing | Verify key flows and explain the implementation |

The music feature follows after the task-management foundation is stable. The six-day plan is a learning target, not a guarantee that every feature will be finished within the available time.

## Testing Strategy

YouRHa will use Katalon Studio for Android automation testing.

Planned scenarios include:
- Create a task with valid input.
- Reject an empty task title.
- Read task details.
- Update an existing task.
- Toggle completion status.
- Delete a task.
- Cancel a deletion.
- Verify task persistence after restarting the app.
- Search for and play a YouTube video when the integration is available.

Each test should include preconditions, test steps, expected results, actual results, and a verifiable assertion. Test outcomes must be recorded from real executions rather than assumed in advance.

## Project Principles

1. **Learn before automating:** understand the code before relying on generated implementations.
2. **Small, verifiable steps:** complete and test one feature at a time.
3. **Local-first:** keep personal task data on the device for the initial MVP.
4. **Respect platform requirements:** use supported YouTube APIs and playback methods.
5. **Use assets responsibly:** prefer open-source assets or resources with clear licenses; verify attribution requirements.
6. **Keep the identity original:** take inspiration from philosophies and fictional narratives without copying protected game assets or branding.

---

YouRHa is a work in progress. The goal is not only to build an application, but to understand how it is designed, implemented, tested, and improved.
