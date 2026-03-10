# A Purrfect Day

An animated video app that brings your cat's daily life to story. Pick your cat, generate AI video clips for each scene, and watch a narrated day unfold — from morning commute to bedtime.

## How It Works

1. **Choose your cat** from 6 real cat avatars (Porky, Doubao, Rice Cake, Wanwan, Mochi, Mocha)
2. **Generate AI videos** using your cat's photo as reference — each scene gets a unique 5-second video clip via [fal.ai](https://fal.ai) + Kling v2.1
3. **Watch the video** — 11 animated scenes play in sequence, showing a grad student cat's day from 8:30 AM to 11:30 PM

## The Cast

| Cat | Breed |
|-----|-------|
| Porky | Ragdoll |
| Doubao | Blue British Shorthair |
| Rice Cake | Orange Tabby |
| Wanwan | White British Shorthair |
| Mochi | Grey and White |
| Mocha | Black and White |

## Scenes

| Time | Scene |
|------|-------|
| 8:30 AM | Morning Commute |
| 10:00 AM | Brainstorming |
| 11:30 AM | Deep Research |
| 2:00 PM | Lab Meeting |
| 5:30 PM | Gym Time |
| 7:00 PM | Commute Home |
| 8:30 PM | Vibe Coding |
| 10:30 PM | Bedtime Reading |
| 11:30 PM | Sleep |

## Tech Stack

**Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Framer Motion

**Backend:** Express server proxying fal.ai API calls

**Video Generation:** [fal.ai](https://fal.ai) Kling v2.1 (image-to-video) — uses the selected cat's photo as reference to maintain character consistency across scenes. 3 scenes generate in parallel.

## Setup

```bash
# Install dependencies
npm install

# Add your fal.ai API key
echo "FAL_KEY=your_key_here" > .env

# Start both server (port 3001) and client (port 5000)
npm run dev
```

Get a fal.ai API key at [fal.ai/dashboard](https://fal.ai/dashboard). Add $5-10 in credits — generating all 10 scenes costs roughly $2-3.

## Project Structure

```
client/
  src/
    assets/cats/          # Cat photos (background-removed PNGs)
    assets/images/        # Scene background images (fallback)
    components/
      CatSelection.tsx    # Cat picker UI
      VideoGenerationScreen.tsx  # Generation progress screen
      video/
        VideoTemplate.tsx        # Scene orchestrator
        video_scenes/            # Individual scene components
    lib/
      cats.ts             # Cat data definitions
      videoGeneration.ts  # Client-side generation service
      video/              # Video player hooks & animations
server/
  index.ts              # Express API server (fal.ai proxy)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server + client |
| `npm run dev:client` | Client only (port 5000) |
| `npm run dev:server` | Server only (port 3001) |
| `npm run build` | Production build |
| `npm run check` | TypeScript type check |
