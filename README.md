# Universal App Opener

A JavaScript library that converts standard HTTP URLs (YouTube, LinkedIn) into Native Mobile Deep Links (Custom Schemes & Android Intents).

## Goal

The goal of this project is to provide a lightweight, zero-dependency library that can detect platform-specific deep links from common web URLs. This enables web applications to seamlessly redirect users to native mobile apps when available, improving user experience across platforms.

## Local Setup

### Prerequisites

- Node.js >= 22.0.0
- PNPM >= 9.0.0

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd universal-app-opener
```

2. Install dependencies:

```bash
pnpm install
```

3. Start development:

```bash
pnpm dev
```

This will start:

- The core library in watch mode
- The demo app at `http://localhost:5173`

### Build

To build all packages:

```bash
pnpm build
```

## Contributing

Contributions are currently closed as we're setting up the project infrastructure. A detailed contribution guide will be available in the coming days.

If you're interested in joining the beta phase, you can join our private Discord community: [Discord Invite](https://discord.gg/placeholder)
