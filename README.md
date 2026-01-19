# **Please note that this is a WIP Project **
Using React + TypeScript and WebSpatial SDK to build up a website allowing Spotify Premium Users to log in, and play random music in Apple Vision Pro's Shared Space.

# Spotify Liked Songs (WebSpatial Enhanced)

A modern web application built with **React**, **TypeScript**, and **Vite** that allows users to log in with Spotify, view their liked songs, and control playback directly in the browser.

🚀 **Key Highlight**: This project is enhanced with the **WebSpatial SDK**, enabling a native-like spatial computing experience on **Apple Vision Pro (visionOS)**. It features a transparent, glassmorphic UI that floats in 3D space when running in a spatial environment.

## ✨ Features

### 🎵 Core Functionality (2D & Spatial)
* **Spotify Authentication**: Secure login using OAuth 2.0 with PKCE flow.
* **User Library Access**: Fetches and displays the user's "Liked Songs" and profile information.
* **Web Playback SDK**: Integrated Spotify Web Playback SDK for high-quality in-browser music streaming.
* **Smart Controls**:
    * Play/Pause toggle.
    * **Random Next**: One-click functionality to randomly play the next track from your liked list.
* **Session Management**: Auto-refresh token logic and secure logout flow.

### 🥽 WebSpatial Experience (visionOS)
* **Spatial UI**: The interface adapts when running on the WebSpatial App Shell (Apple Vision Pro).
* **Immersive Design**:
    * **Transparent Background**: The main window becomes fully transparent, blending seamlessly with the user's physical environment.
    * **Glassmorphism**: Player controls use a frosted glass effect (`translucent` material).
    * **Floating Elements**: The logout button and player controls float elegantly in 3D space.
* **Environment Awareness**: Uses `XR_ENV` injection to detect spatial modes and apply specific styles dynamically.

## 🛠️ Tech Stack

* **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Package Manager**: [pnpm](https://pnpm.io/)
* **Spatial SDK**: `@webspatial/react-sdk`, `@webspatial/core-sdk`, `@webspatial/vite-plugin`.
* **Build Tooling**: `@webspatial/builder` for packaging visionOS apps.

## 🚀 Getting Started

### Prerequisites
1.  **Spotify Premium**: Required for the Web Playback SDK to function.
2.  **Spotify Client ID**: Create an app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and set the Redirect URI to `http://127.0.0.1:5173/callback`.

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
pnpm install
  },
])
```


[![License: PolyForm Noncommercial](https://img.shields.io/badge/License-PolyForm%20Noncommercial-blue.svg)](https://polyformproject.org/licenses/noncommercial/1.0.0/)
