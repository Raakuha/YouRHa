YouRHa
A personal task manager and music companion, built for a calm, Japanese-minimal experience.

YouRHa is a personal, local-first mobile app project built with React Native and Expo. Its visual direction uses warm neutrals and natural colors, with a simple task list as the primary task-management experience. The project is also a learning exercise: features are implemented step by step by the project owner, with an emphasis on understanding the JavaScript and React Native concepts behind the code.
Current status: Task Manager CRUD and local persistence are implemented and have passed the reported manual regression checks. UI polish is in progress. YouTube search/playback, Focus, Katalon automation, and final release checks are not yet complete.

Last updated: 24 October 2026
Product direction
- Tasks: The primary screen uses a mobile-friendly list of task cards rather than a desktop-style multi-column Kanban layout.
- Focus: A planned space for focus-oriented work and productivity features.
- Music: Planned YouTube video search and playback through an official embedded player where available.
- More: Planned supporting utilities such as Progress & Statistics, Appearance, Data & Backup, and About YouRHa.
- Task details: A task description/detail view is planned. Whether users open it with a long press, a tap, or an expandable card will be finalized during UI implementation.
The visual direction is Japanese minimal: warm ivory, cream, wood-brown, and muted natural greens. Color values can be adjusted during design work; this README does not prescribe a final palette.
Technology stack
Technology	Purpose	Current version / status
React Native	Mobile UI	0.86.3
Expo	App development and runtime	57.0.27
JavaScript	Application code	In use
expo-sqlite	Local task storage	57.0.4
expo-status-bar	Status bar styling	57.0.1
Katalon Studio	Planned Android/mobile automation	Not set up yet
YouTube Data API + official embedded player	Planned video search and playback	Not integrated yet


Version information above reflects the npm ls expo react-native output reported during development. Recheck the installed packages before making version-sensitive changes.
Implemented features
Task Manager
- Create a task and store it in the local SQLite database yourha.db.
- Read saved tasks from SQLite when the app starts.
- Edit a task's title without creating a second task record.
- Mark a task as completed or incomplete.
- Delete a task.
- Reject empty task titles after trimming whitespace and show a validation message.
- Display an empty-state message when there are no tasks.
- Show which task is currently being edited and allow the user to cancel edit mode.
- Automatically add a numeric suffix to duplicate titles, such as Study → Study (1) → Study (2), for both add and edit flows.
- Retain task data and completion state across app restarts, as verified in manual testing.
Early UI polish
- Scrollable task content has been added.
- The task form has custom styling for the input, primary submit button, and cancel button.
- The primary button has a pressed-state visual effect.
- The overall layout and the TaskItem card design are still being polished.
Current UI and implementation status
The main Task Manager flows are in place, but the app is not yet release-ready. The following work remains:
- Finish the TaskItem visual design and consistent spacing between task cards and their action buttons.
- Add a clear loading state while SQLite is initializing, so loading is not confused with the empty state.
- Extend database error handling to all operations (add/edit, toggle completion, and delete) and provide clear feedback if an operation fails.
- Consider a delete confirmation to reduce accidental deletion.
- Check keyboard behavior and scrolling on smaller screens.
- Add basic accessibility labels/roles and stable testID values for automated tests.
- Remove unused code/imports after reviewing the project (for example, the earlier initialTasks array if it remains unused).
- Run project health checks and record their actual results before release.
Development setup
Prerequisites
- Node.js and npm
- Android Studio / Android Emulator or a supported Android device
- The Android SDK and ADB configured if running on a local Android emulator/device
Install dependencies
From the project root:
npm install
Start the app on Android
Start an Android emulator or connect a device, then run:
npx expo start --android
If Metro is already running, avoid starting multiple dev servers on different ports. Confirm the target device is available with adb devices if Expo cannot connect to Android.
Project structure
YouRHa/
├── assets/                 # App assets
├── components/
│   ├── TaskFrom.jsx        # Shared add/edit task form
│   └── TaskItem.jsx        # Task row and task actions
├── database/
│   └── tasks.js            # SQLite table and task queries
├── App.js                  # App state, SQLite setup, task flows, and layout
├── AGENTS.md               # Repository and coding-tutor guidelines
├── README.md
└── package.json
The tree reflects the structure discussed during development; confirm it against the current working copy if files have since moved or been renamed.
Data and privacy notes
- Task data is stored locally in SQLite; cloud synchronization and multi-user accounts are not part of the current scope.
- Clearing the app's storage or uninstalling the app may remove local task data. Backup/export is planned, not implemented.
- Do not commit API keys, tokens, or other secrets when the YouTube integration is added. Configure and restrict the key appropriately and monitor API quota.
Testing status
The project owner reported that these manual checks passed:
- [x] Add a task and confirm that it remains after closing and reopening the app.
- [x] Toggle completion and confirm that the status and completed count persist after restart.
- [x] Edit a task and confirm that the existing task changes rather than a new task being added; verify persistence after restart.
- [x] Delete a task and confirm that it does not reappear after restart and other tasks remain.
- [x] Submit an empty title and confirm that validation appears without adding a task.
- [x] Add duplicate titles and confirm automatic numbering.
- [x] Edit a task to a duplicate title and confirm that the same record is updated with an available suffix.
These are reported manual test results, not automated Katalon results. The automated suite has not been implemented or verified yet.

Before release, run the repository's applicable health checks and record the actual output. The planned checks include:
npx expo lint
npx expo-doctor
Use npx tsc --noEmit only if TypeScript is configured in the project. Do not mark a check as passed until it has actually been run.
Roadmap
1. Finish Task Manager UX and resilience: polish task cards and form spacing; add loading and comprehensive database error states; consider delete confirmation; verify keyboard and small-screen behavior.
2. Regression and project health checks: rerun all manual scenarios, run lint/Expo Doctor, remove unused code, inspect the Git diff, and commit a verified change at a time.
3. Katalon automation: add stable test identifiers, verify locators on the target Android build/device, then automate task CRUD and persistence tests.
4. YouTube technical spike: verify a real YouTube Data API search and test an eligible video with the official embedded player on Android before building the full music UI.
5. Music experience: implement search results, video selection, playback, loading, empty, and error states; add automation for these flows.
6. Focus and More: implement agreed focus-oriented features and supporting utilities after the core task and music experiences are stable.
7. Finalization: update documentation, retain test evidence, review asset licensing/attribution, prepare an Android demo/build, and complete the final audit.
YouTube integration boundary
The planned music feature is YouTube video search and playback through an official embedded player where the selected video supports embedding. It is not a full replacement for the YouTube Music app. The project will not implement audio downloading, ad removal, background playback workarounds, or modifications to the official player's controls.
Learning workflow
This is a learning project. The project owner writes and runs the code. Guidance should explain the underlying JavaScript/React Native concept, give one manageable exercise at a time, and review the result before proceeding. Avoid large automatic refactors and add dependencies only when they support a confirmed MVP requirement.
Related project documents
- AGENTS.md — repository rules and coding-tutor workflow.
- docs/DEVELOPMENT_ROADMAP.md — planned development phases and progress checklist, if the roadmap has been copied into the repository's docs/ directory.
- YouRHa_Product_Technical_Blueprint.docx — product and technical blueprint, if included in the project documentation.
