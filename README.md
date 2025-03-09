# 📖 About the Project

## StreakMaster: Habit-Tracking App

StreakMaster is a modern habit-tracking app designed to help users build daily and weekly habits through streaks, XP points, and badges. The app uses gamification to keep users engaged and motivated.

## 🚀 Features

- ✅ **Habit Streaks**: Maintain streaks for daily and weekly habits.
- ✅ **XP & Gamification**: Earn XP points and level up your progress.
- ✅ **Badges & Rewards**: Unlock 🥈 Silver (7 days), 🏆 Gold (30 days), and 🔥 Elite (100 days) badges.
- ✅ **Habit Categories**: Organize habits by categories like Health, Productivity, Learning, etc.
- ✅ **Filter & Sort**: Quickly filter habits by frequency (Daily/Weekly) or badges (Gold/Silver/Elite).
- ✅ **Archive Habits**: Save old habits while keeping their streak and XP.
- ✅ **Dark Mode Support** 🌙.
- ✅ **Share Habit Achievements** 📤 (coming soon).

## ⚙️ How Streaks Work?

The streak system ensures users build habits consistently:

- If you miss a day (**Daily habit**) or a week (**Weekly habit**), the streak resets to 1.
- If you keep completing it, your streak increases and earns XP points.

### 📌 Streak Flow Diagram

```mermaid
graph TD;
    A[Start Habit] -->|Mark as Done| B[Increase Streak + XP];
    B -->|7 Days| C[🏅 Earn Silver Badge];
    C -->|30 Days| D[🏆 Earn Gold Badge];
    D -->|100 Days| E[🔥 Earn Elite Badge];
    A -->|Miss Day (Daily) or Miss Week (Weekly)| F[Reset Streak to 1];
```

## 🎯 XP System (How XP is Earned?)

| Streak Milestone  | Daily Habit XP | Weekly Habit XP |
|-------------------|---------------|---------------|
| Each Completion  | 10 XP         | 10 XP (per week) |
| 7-Day Streak     | 🎯 +50 XP     | 🎯 +50 XP |
| 30-Day Streak    | 🏆 +200 XP    | 🏆 +200 XP |
| 100-Day Streak   | 🔥 +500 XP    | 🔥 +500 XP |

## 📂 Project Structure

```plaintext
📦 StreakMaster
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 HabitList.jsx
 ┃ ┃ ┣ 📜 StreakUpdate.jsx
 ┃ ┃ ┣ 📜 BadgeDisplay.jsx
 ┃ ┃ ┗ 📜 ArchivePage.jsx
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 Home.jsx
 ┃ ┃ ┣ 📜 Badges.jsx
 ┃ ┃ ┣ 📜 Archived.jsx
 ┃ ┃ ┗ 📜 Settings.jsx
 ┃ ┣ 📜 App.jsx
 ┃ ┣ 📜 index.js
 ┃ ┗ 📜 styles.css
 ┣ 📜 package.json
 ┣ 📜 README.md
 ┗ 📜 .gitignore
```

## 💡 Future Enhancements

- 🔹 **Social Sharing** – Users can share streaks and XP on social media.
- 🔹 **Leaderboard System** – Compete with friends for the highest streaks.
- 🔹 **Push Notifications** – Daily reminders to keep up with habits.

## 🚀 Installation & Setup

```bash
git clone https://github.com/your-username/streakmaster.git
cd streakmaster
npm install
npm start
```

## 📜 License

MIT License © 2025 StreakMaster

