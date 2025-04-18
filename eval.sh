#! /bin/bash

# Create evaluation directory
mkdir -p eval

# List of models to evaluate
# Using common OpenRouter and OpenAI compatible models
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
)

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




