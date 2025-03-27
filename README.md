# Pong Game Demo with Vibe Compiler

This is a demo repository showcasing how to build a simple web-based Pong game using the Vibe Compiler (`vibec`). The Vibe Compiler processes prompt stacks to generate code via LLM integration, and this project demonstrates that workflow with a playable Pong game.

## Project Structure
```
pong-game-demo/
├── stacks/
│   └── pong/
│       ├── 001_create_pong.md  # Initial game setup
│       └── 002_add_score.md    # Add scoring
├── output/
│   ├── stages/                 # Per-stage outputs
│   └── current/                # Latest game files (index.html, styles.css, game.js)
├── vibec.json                  # Configuration
├── package.json                # Dependencies and scripts
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
git clone https://github.com/your-username/pong-game-demo.git
cd pong-game-demo
```

### Step 2: Install Vibe Compiler
Install `vibec` and other dependencies:
```bash
npm install
```
This installs `vibec` as specified in `package.json`. If you prefer not to install locally, you can use `npx vibec` directly, assuming `vibec` is available on npm.

### Step 3: Set Up Your API Key
Configure the LLM API key as an environment variable (preferred for security):
```bash
export VIBEC_API_KEY=your_api_key_here
```
Alternatively, you can set it in a `.env` file if your `vibec` setup supports it, but for this demo, the env var is sufficient.

### Step 4: Build the Project
Run `vibec` to process the `stacks/pong/` prompts and generate the game files:
```bash
npx vibec
```
- **What Happens**: 
  - `vibec` reads `vibec.json`, which specifies the `pong` stack.
  - It processes `stacks/pong/001_create_pong.md` to generate `index.html`, `styles.css`, and `game.js` in `output/current/`.
  - It then processes `stacks/pong/002_add_score.md`, updating `index.html` and `game.js` with scoring features.
  - Outputs are saved in `output/stages/` (per stage) and merged into `output/current/` (latest version).
- **Configuration**: The `vibec.json` file sets `"stacks": ["pong"]` and `"output": "output"`, but you can override these with CLI flags (e.g., `--stacks=pong --output=custom_dir`).

### Step 5: Verify the Output
Check the generated files:
```bash
ls output/current/
```
You should see `index.html`, `styles.css`, and `game.js`. The `output/stages/` directory will contain subfolders (e.g., `1/`, `2/`) with individual stage outputs.

### Step 6: Run the Game
Serve the game locally using Python’s HTTP server (or any static server):
```bash
cd output/current
python3 -m http.server 8000
```
Open `http://localhost:8000` in your browser to play the Pong game. Use arrow keys to move the paddle and hit the ball; the score increases with each successful hit.

### Step 7 (Optional): Debug the Build
If something goes wrong (e.g., no files generated):
- Enable debug mode:
  ```bash
  export VIBEC_DEBUG=1
  npx vibec
  ```
- Check the logs for errors (e.g., missing API key, prompt syntax issues).

## Customizing the Build
- **Change Stacks**: Edit `vibec.json` or use `--stacks=pong` to target specific stacks.
- **Dry Run**: Test without writing files:
  ```bash
  npx vibec --dry-run
  ```
- **Retries**: Retry failed LLM calls:
  ```bash
  npx vibec --retries=2
  ```
- **Custom Output**: Change the output directory:
  ```bash
  npx vibec --output=custom_output
  ```
See the full list of options with:
```bash
npx vibec --help
```

## How It Works
- **`001_create_pong.md`**: Sets up the basic game with a paddle, ball, and movement.
- **`002_add_score.md`**: Adds a score display and logic, building on the initial files.
- **`vibec`**: Processes these Markdown prompts in order, using an LLM to generate code based on the descriptions and outputs them as specified.

## Troubleshooting
- **No Output Files**: Ensure `VIBEC_API_KEY` is set and prompts have valid `## Output:` sections.
- **`vibec` Not Found**: Verify installation (`npm install vibec`) or use `npx vibec`.
- **API Errors**: Check your API key and endpoint (`VIBEC_API_URL` if not default).
- **Debug Logs**: Use `VIBEC_DEBUG=1` to diagnose issues.

## License
MIT
