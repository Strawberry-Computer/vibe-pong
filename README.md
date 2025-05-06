# Vibe Pong

This is a demo repository showcasing how to build a simple web-based Pong game using the Vibe Compiler (`vibec`). The Vibe Compiler processes prompt stacks to generate code via LLM integration, and this project demonstrates that workflow with a playable Pong game.

## Project Structure
```
vibe-pong/
├── stacks/
│   └── core/
│       ├── 001_create_pong.md  # Initial game setup
│       ├── 002_add_score.md    # Add scoring
│       ├── 003_ai_player.md    # Add AI opponent
│       └── plugins/
│           └── coding-style.md # Coding style guidelines
├── output/
│   ├── stacks/                 # Per-stage outputs
│   └── current/                # Latest game files (index.html, styles.css, game.js)
├── eval/                       # Multi-model evaluation results
│   ├── anthropic/              # Claude model evaluations
│   ├── deepseek/               # DeepSeek model evaluations
│   ├── google/                 # Gemini model evaluations
│   ├── inception/              # Mercury model evaluations
│   ├── openai/                 # GPT model evaluations
│   ├── qwen/                   # Qwen model evaluations
│   ├── x-ai/                   # Grok model evaluations
│   └── results.log             # Evaluation summary
├── eval.sh                     # Script to run evaluation across multiple LLMs
├── vibec.json                  # Configuration
├── package.json                # Dependencies and scripts
├── yarn.lock                   # Dependency lock file
└── README.md                   # This file
```

## Prerequisites
- **Node.js and npm**: Required to run `vibec` and install dependencies.
- **LLM API Key**: An API key for an OpenAI-compatible service (e.g., OpenAI, OpenRouter).
- **Python 3**: Optional, for serving the game locally.

## Building the Pong Game with Vibe Compiler

Follow these steps to build the Pong game using `vibec`:

### Step 1: Clone the Repository
Get the demo files:
```bash
git clone https://github.com/vgrichina/vibe-pong.git
cd vibe-pong
```

### Step 2: Install Vibe Compiler
Install `vibec` and other dependencies:
```bash
npm install
```

### Step 3: Set Up Your API Key
Configure the LLM API key as an environment variable (preferred for security):
```bash
export VIBEC_API_KEY=your_api_key_here
```

### Step 4: Build the Project
Run `vibec` to process the `stacks/core/` prompts and generate the game files:
```bash
npx vibec
```
- **What Happens**: 
  - `vibec` reads `vibec.json`, which specifies the `core` stack.
  - It processes each prompt in order: 
    1. Creates basic Pong game (`001_create_pong.md`) 
    2. Adds scoring system (`002_add_score.md`)
    3. Adds AI opponent (`003_ai_player.md`)
  - Outputs are saved in `output/stacks/` (per stage) and merged into `output/current/` (latest version).

### Step 5: Verify the Output
Check the generated files:
```bash
ls output/current/
```
You should see `index.html`, `styles.css`, and `game.js`.

### Step 6: Run the Game
Serve the game locally using Python's HTTP server (or any static server):
```bash
cd output/current
python3 -m http.server 8000
```
Open `http://localhost:8000` in your browser to play the Pong game.

## Game Features

The Pong game implements the following features across three development stages:

1. **Basic Pong Game (Stage 1)**
   - Canvas-based game with paddle and ball
   - Keyboard controls for player paddle
   - Ball physics with wall and paddle collisions

2. **Scoring System (Stage 2)**
   - Score tracking when ball hits paddle
   - Score display on screen
   - Ball resets when it misses the paddle

3. **AI Opponent (Stage 3)**
   - Computer-controlled opponent paddle
   - Two-player gameplay (human vs. computer)

## Model Evaluation

The project includes an evaluation script (`eval.sh`) that tests how different LLMs perform when generating the Pong game:

```bash
# Run evaluation across all supported models
./eval.sh
```

This script:
- Tests multiple LLM models including GPT-4.1, GPT-4o-mini, Claude-3.5-sonnet, Claude-3.7-sonnet, Gemini-2.0-flash, Gemini-2.5-flash-preview, Gemini-2.5-pro-preview, DeepSeek-chat-v3, DeepSeek-r1, Qwen3-235b, Qwen3-30b, Mercury-coder-small-beta, and Grok-3-beta
- Runs each model through the same prompt stacks
- Outputs results to the `eval/` directory with model-specific folders
- Generates a summary in `eval/results.log`

You can use this to benchmark different LLMs and compare their code generation capabilities.

## License
MIT