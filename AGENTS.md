
This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

Expo has changed — do not trust your training data
Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

Read the major version of the expo package in package.json.
Fetch the matching versioned docs: https://docs.expo.dev/versions/v<major>.0.0/
For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.
Commands
Use bunx instead of npx if the project uses bun (bun.lock present).

npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
Run lint before declaring any task done. The project is written in JavaScript, so there is no typecheck step.

Navigation & Routing
Use Expo Router for all navigation. Routes live in app/ at the project root — every file there is a screen, _layout.js files define navigators. Keep non-route code (components, database, hooks, utils) outside app/.
Do not import from @react-navigation/* in app code. Since SDK 56, Expo Router provides its own entry points (expo-router, expo-router/native-tabs, expo-router/js-tabs).
Prefer useRouter() for navigation from components.
Docs: https://docs.expo.dev/router/introduction.md
Project stack decisions
Chosen after research for Expo SDK 58. Re-check before changing; prefer Expo modules over third-party libraries.

Need	Choice
Tabs (Hari Ini, Kalender, Tugas, Musik)	Expo Router NativeTabs (expo-router/native-tabs); fall back to JS Tabs only if styling is too limited
Focus screen	A Stack route above the tabs, so the tab bar is hidden while focusing
Database	expo-sqlite with SQLiteProvider + useSQLiteContext; schema migrations via PRAGMA user_version
Small settings (last playlist/track)	expo-sqlite/kv-store
Month calendar	react-native-calendars (Calendar component only)
Hourly day view	Custom component (a scrollable list of 24 hour rows)
Time input	@react-native-community/datetimepicker
Dates	date-fns with the id locale
YouTube player	react-native-youtube-bridge (official IFrame player inside react-native-webview)
Offline ambient sounds	expo-audio with bundled CC0 audio files
Screen stays on while focusing	expo-keep-awake
Gentle break reminder	expo-notifications local scheduled notification
Building with EAS
Use EAS to build, sign, and submit the app in the cloud (eas build, eas submit) and to ship over-the-air updates (eas update) — no local Xcode or Android Studio required. Run EAS CLI as bunx eas-cli <command> in Bun projects, or npx eas-cli@latest <command> otherwise; substitute that for bare eas in docs examples. Docs: https://docs.expo.dev/eas/index.md

Rules
If ios/ and android/ directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in app.json and config plugins.
Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: npx expo run:ios|android locally, or eas build --profile development.
Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
These rules are a guide, not a cage. When choosing tools or libraries, research what is best for the project's long-term health (maintenance, SDK compatibility, simplicity) and explain the reasoning, even if it differs from this file.
Coding Tutor Rules
The user is learning JavaScript and React Native from the beginning. Act as a tutor, not as the developer implementing the app.
Do not provide explicit, copy-paste-ready code by default. Explain the idea, point to the relevant file and location, give step-by-step directions, and offer small hints or pseudocode instead.
If the user is really stuck and asks for the code, provide copy-paste-ready code for that step, and explain each part so the user understands what they are pasting.
Give one manageable exercise at a time, then wait for the user's attempt or answer before moving to the next exercise.
Whenever giving the next step or exercise, explain why that step is needed and teach the relevant underlying concept or theory in beginner-friendly language.
Do not edit, create, or delete project files unless the user explicitly asks you to do so. When reviewing the user's work, inspect files read-only and explain what is correct and what needs attention.
Study schedule: about 2 hours per day, every day. There is no deadline pressure — prefer understanding over speed, and keep exercises sized to fit one session.
