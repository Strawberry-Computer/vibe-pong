#! /bin/bash

# Create evaluation directory
mkdir -p eval

# Get models from environment variable or command line argument
# Priority: 1. Command line argument 2. Environment variable 3. Default list
if [ $# -gt 0 ]; then
    # If arguments provided, use them as models (space-separated)
    IFS=' ' read -r -a MODELS <<< "$@"
elif [ ! -z "${EVAL_MODELS}" ]; then
    # If EVAL_MODELS environment variable is set, use it
    IFS=' ' read -r -a MODELS <<< "${EVAL_MODELS}"
else
    # Default list of models
    MODELS=(
        "openai/gpt-4"
        "openai/gpt-4.1"
        "openai/gpt-4o-mini"
        "anthropic/claude-3.5-sonnet"
        "anthropic/claude-3.7-sonnet"
        "google/gemini-2.0-flash-001"
        "google/gemini-2.5-pro-exp-03-25:free"
        "deepseek/deepseek-chat-v3-0324:free"
        "deepseek/deepseek-r1:free"
        "qwen/qwen3-30b-a3b:free"
        "qwen/qwen3-235b-a22b:free"
    )
fi

# Function to run evaluation for a model
evaluate_model() {
    local model=$1
    echo "Evaluating model: $model"
    
    # Create output directory for this model
    mkdir -p "./eval/$model"
    
    # Run vibec with the specified model
    npx vibec --api-model "$model" --output "./eval/$model"
    
    # Store the exit code
    local exit_code=$?
    
    # Log the result
    if [ $exit_code -eq 0 ]; then
        echo "✓ Success: $model" >> eval/results.log
    else
        echo "✗ Failed: $model (exit code: $exit_code)" >> eval/results.log
    fi
    
    echo "----------------------------------------"
}

# Clear previous results
echo "Starting evaluation at $(date)" > eval/results.log

# Run evaluation for each model
for model in "${MODELS[@]}"; do
    evaluate_model "$model"
done

echo "Evaluation complete. Results saved in eval/results.log"
cat eval/results.log




