from flask import Flask, request, jsonify
from flask_cors import CORS
from vertexai.preview.language_models import TextGenerationModel
import vertexai

app = Flask(__name__)
CORS(app)

vertexai.init(project="sorry it's my project id", location="us-central1")

@app.route('/analyze', methods=['POST'])
def analyze():
    user_input = request.json['text']

    prompt = f"""
Classify the sentiment of this sentence as positive, negative, or neutral.

Sentence: {user_input}
Sentiment:
"""

    model = TextGenerationModel.from_pretrained("text-bison@001")
    response = model.predict(prompt=prompt, temperature=0.2, max_output_tokens=10)
    sentiment = response.text.strip()

    return jsonify({"sentiment": sentiment})

if __name__ == '__main__':
    app.run(debug=True)
