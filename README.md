# 🏰 Tuzla Virtual Tour Guide

A premium, Android‑optimized tourism platform designed to guide visitors through the historic city of Tuzla, Bosnia and Herzegovina. The application features a high‑performance AR guide, gamified quests, and a modern “Android‑first” navigation shell.

## 🚀 Key Features

### 1. Immersive Navigation & UI
- **Android‑First Shell**: Fixed top bar with a left‑side sliding menu drawer, optimized for thumb reach and screen real‑estate.
- **Interactive Logo**: Bounce‑animated “TUZLA TOUR” logo acts as the primary menu trigger.
- **Multilingual Support**: Persistent 4‑flag language switcher for English, Bosnian (Latin), German, and Turkish.

### 2. High‑Performance AR Guide
- **AR View**: Projects points of interest (POI) into the physical world using device sensors.
- **Optimization**: To achieve smooth 30 FPS, AR tracking data skips the React render loop, using raw device orientation with direct DOM manipulation.

### 3. Gamified Content & Tools
- **Quests & Task Manager**: Interactive missions with location‑based triggers.
- **SMS Parking & Wallet**: Integrated utility tools for city travelers.
- **Minimalist Taxi Interface**: Fast access to local transport via a clean, one‑tap icon.

### 4. Media & Performance
- **Smart Hero Video**: Dual‑loop battery‑preservation logic pauses autoplay after 2 loops, revealing a manual play toggle.
- **FFmpeg Optimized**: All hero and showcase videos are compressed using x264/AAC slow presets to maintain quality at minimal file sizes.

## 🛠️ Technical Stack (Specifications)

- **Frontend**: React 19 + TypeScript (Vite 6)
- **Styling**: Tailwind CSS v4 (Glassmorphism & Mobile‑first layouts)
- **Animations**: Framer Motion 12
- **Mobile Foundation**: Ionic Capacitor 8 (Android Hybrid)
- **Mapping**: Maplibre with Jawn map (Hybrid Offline/Online strategy)
- **Integrations**: Solflare Solana Connect (Web3), Open‑Meteo API (Weather)

## 📦 Build & Development

### Local Setup

---

## 🎨 UI / UX Improvements (latest commit)

### ✅ White‑Background Fix for the Hero Video  
**Problem** – On Android/Capacitor the `<video>` element showed a brief gray flash before the first frame rendered, which broke the polished “white‑on‑black” hero design.  

**Solution** – A three‑step fix was added:

1. **White poster image** (`src/assets/white-poster.png`) – a 1 × 1 px white PNG used as the `poster` attribute.  
2. **Background colour on the video** – `background-color: #fff;` (or Tailwind’s `bg-white`) is applied directly to the `<video>` element, guaranteeing a white canvas even if the poster fails to load.  
3. **Optional overlay** – a thin white `<div>` (implemented with Framer Motion) that fades out as soon as the video fires `canplay`, completely masking any gray flash.

All of the above is encapsulated in the updated `src/components/LandingPage.tsx` and the corresponding CSS in `src/components/LandingPage.css` (or Tailwind utility classes).

### 📦 Android Project Tweaks
- **`android/app/proguard-rules.pro`** – added rules for the new Framer Motion animation classes to avoid them being stripped in release builds.  
- **`android/build.gradle` / `android/capacitor-cordova-android-plugins/build.gradle`** – upgraded the Android Gradle plugin version to 7.5 to stay compatible with Capacitor 8.  
- **`android/local.properties`** – ensured the SDK path is correctly set for CI environments.

---

## 📂 Project Structure (relevant parts)
Home Page
City Guide
 - History
 - Accommodation
 - Food
Map
Quest game
 - Mapping POI
 - GPS Navigation
 - QR Scan
 - AR Guide
SMS Parking payment
Task Manager
Wallet - Solana blockchain

Project is implementing privacy policy and Law on Personal Data Protection of Bosnia and Herzegovina (Zakon o zaštiti ličnih podataka BiH)**
Location data is processed localy on your device We do not track your location in background nor do we store your movement history.
