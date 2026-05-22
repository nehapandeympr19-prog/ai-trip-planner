import os
import requests

def test_hf_api():
    HF_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
    if not HF_API_KEY:
        print("⚠️ Please set your HUGGINGFACE_API_KEY environment variable")
        return

    HF_MODEL_ENDPOINT = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill"

    headers = {
        "Authorization": f"Bearer {HF_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "inputs": {
            "text": "Hello, how are you?"
        },
        "parameters": {
            "max_new_tokens": 50,
            "temperature": 0.7,
        }
    }

    try:
        response = requests.post(HF_MODEL_ENDPOINT, headers=headers, json=payload, timeout=10)
        response.raise_for_status()
        data = response.json()
        print("API Response:", data)

        if isinstance(data, list) and "generated_text" in data[0]:
            reply = data[0]["generated_text"]
        elif isinstance(data, dict) and "generated_text" in data:
            reply = data["generated_text"]
        else:
            reply = "Unexpected response format"
        print("Bot reply:", reply)

    except Exception as e:
        print("❌ Error calling Hugging Face API:", e)

if __name__ == "__main__":
    test_hf_api()
