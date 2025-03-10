# 📖 About the Project

## HabitQuest: Habit-Tracking App

HabitQuest is a modern habit-tracking app designed to help users build daily and weekly habits through streaks, XP points, and badges. The app uses gamification to keep users engaged and motivated.

## 🚀 Features

- ✅ **Habit Streaks**: Maintain streaks for daily and weekly habits.
- ✅ **XP & Gamification**: Earn XP points and level up your progress.
- ✅ **Badges & Rewards**: Unlock 🥈 Silver, 🏆 Gold, and 🔥 Elite badges.
- ✅ **Habit Categories**: Organize habits by categories like Health, Productivity, Learning, etc.
- ✅ **Filter & Sort**: Quickly filter habits by frequency (Daily/Weekly) or badges (Gold/Silver/Elite).
- ✅ **Archive Habits**: Save old habits while keeping their streak and XP.

## ⚙️ How Streaks Work?

The streak system ensures users build habits consistently:

- If you miss a day (**Daily habit**) or a week (**Weekly habit**), the streak resets to 1.
- If you keep completing it, your streak increases and earns XP points.

## 🎯 XP and Badge System (How XP and Badge is Earned?)

Each Completion Day / Week  user earn  +10 XP 

XP Earned  |  Badge Earn  |  (Daily) Streak | (Weekly) Streak |  
|----------|--------------|-------------------|----------------|
|🎯 +50 XP  |🥈  Silver Badge | 7 Days        |   4 Weeks       |
|🏆 +200 XP | 🏆 Gold Badge  |   30 Days     | 12 Weeks         |  
|🔥 +500 XP | ⚜️ Elite Badge |   199 Days    | 40 Weeks         |  

## 📂 Project Structure
### Frontend
```plaintext
📦 HabitQuest (src)
 ┣ 📜 App.jsx
 ┣ 📜 index.css
 ┣ 📜 main.jsx
 ┣ 📂 assets
 ┃ ┗ 📂 Icons
 ┃   ┣ 📜 gold.svg
 ┃   ┣ 📜 Icons.jsx
 ┃   ┣ 📜 MaterialIcon.jsx
 ┃   ┗ 📜 Silver.jsx
 ┣ 📂 Components
 ┃ ┣ 📂 Calendar
 ┃ ┃   ┣ 📜 CalendarDaily.jsx
 ┃ ┃   ┗ 📜 CalendarWeek.jsx
 ┃ ┣ 📂 Context
 ┃ ┃   ┣ 📜 ArchiveContext.jsx
 ┃ ┃   ┣ 📜 AuthContext.jsx
 ┃ ┃   ┗ 📜 StreakXPContext.jsx
 ┃ ┣ 📂 Nav
 ┃ ┃   ┣ 📜 LoginModal.jsx
 ┃ ┃   ┣ 📜 LogOutPopUp.jsx
 ┃ ┃   ┣ 📜 Nav.jsx
 ┃ ┃   ┗ 📜 SignUp.jsx
 ┃ ┣ 📂 Pages
 ┃ ┃   ┣ 📂 AddHabit
 ┃ ┃   ┃   ┣ 📜 Category.jsx
 ┃ ┃   ┃   ┣ 📜 Frequency.jsx
 ┃ ┃   ┃   ┗ 📜 Habit.jsx
 ┃ ┃   ┣ 📂 Archive
 ┃ ┃   ┃   ┗ 📜 Archive.jsx
 ┃ ┃   ┣ 📂 Badges
 ┃ ┃   ┃   ┣ 📜 Badges.jsx
 ┃ ┃   ┃   ┣ 📜 BlackBadge.jsx
 ┃ ┃   ┃   ┗ 📜 BlankBadge.jsx
 ┃ ┃   ┣ 📂 Completed
 ┃ ┃   ┃   ┗ 📜 Completed.jsx
 ┃ ┃   ┣ 📂 HabitCard
 ┃ ┃   ┃   ┣ 📜 BlankHabitCard.jsx
 ┃ ┃   ┃   ┗ 📜 HabitCard.jsx
 ┃ ┃   ┣ 📂 Hero
 ┃ ┃   ┃   ┗ 📜 Hero.jsx
 ┃ ┃   ┣ 📂 Home
 ┃ ┃   ┃   ┗ 📜 Home.jsx
 ┃ ┃   ┣ 📂 Streak
 ┃ ┃   ┃   ┣ 📜 Filter.jsx
 ┃ ┃   ┃   ┣ 📜 Streak.jsx
 ┃ ┃   ┃   ┣ 📂 DeleteUI
 ┃ ┃   ┃   ┃   ┗ 📜 DeleteConfirmUI.jsx
 ┃ ┃   ┃   ┣ 📂 ExpandHabitCard
 ┃ ┃   ┃   ┃   ┣ 📜 CircularProgressBar.jsx
 ┃ ┃   ┃   ┃   ┗ 📜 ExpandCard.jsx
 ┃ ┃   ┃   ┗ 📂 MarkStreakDone
 ┃ ┃   ┃       ┣ 📜 settingColorForCalendar.js
 ┃ ┃   ┃       ┗ 📜 StreakUpdate.jsx
 ┃ ┃   ┗ 📂 TotalStreakXP
 ┃ ┃       ┗ 📜 TotalStreakXP.jsx
 ┃ ┗ 📂 Slider
 ┃     ┣ 📜 Slider.jsx
 ┃     ┗ 📜 SliderIcon.jsx
 ┗ 📂 URL
     ┗ 📜 Url.jsx

```

### Backend

📦 HabitQuest (Backend)
 ┣ 📜 .env
 ┣ 📜 .gitignore
 ┣ 📜 db.js
 ┣ 📜 index.js
 ┣ 📜 jwt.js
 ┣ 📜 package.json
 ┣ 📜 package-lock.json
 ┣ 📂 models
 ┃   ┣ 📜 archive.js
 ┃   ┣ 📜 habits.js
 ┃   ┗ 📜 user.js
 ┗ 📂 routes
     ┣ 📜 archive.js
     ┣ 📜 auth.js
     ┣ 📜 habit.js
     ┗ 📜 user.js

### **📌 Explanation:**
- **`index.js`** – Main entry point for the server.
- **`db.js`** – Database connection setup.
- **`jwt.js`** – Handles JWT authentication logic.
- **`models/`** – Contains Mongoose models for database collections (`user.js`, `habits.js`, etc.).
- **`routes/`** – Defines API routes for authentication, habits, users, and archives.

## 📜 License

MIT License © 2025 HabitQuest

