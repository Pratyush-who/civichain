from flask import Flask, request, render_template, jsonify
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import joblib
import os
import numpy as np

app = Flask(__name__)

# Load Priority Model
priority_tokenizer = AutoTokenizer.from_pretrained("priority_model")
priority_model = AutoModelForSequenceClassification.from_pretrained("priority_model").to("cuda")

# Load Tagging Model
tag_tokenizer = AutoTokenizer.from_pretrained("tagging_model")
tag_model = AutoModelForSequenceClassification.from_pretrained("tagging_model").to("cuda")

# Load MultiLabelBinarizer
mlb = joblib.load("mlb.pkl")

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/predict', methods=["POST"])
def predict():
    data = request.get_json()
    description = data['description']

    # --- Predict Priority ---
    inputs_priority = priority_tokenizer(description, return_tensors="pt", truncation=True, padding=True).to("cuda")
    outputs_priority = priority_model(**inputs_priority)
    pred_priority = torch.argmax(outputs_priority.logits, dim=1).item()
    priority = {0: "low", 1: "medium", 2: "high"}[pred_priority]

    # --- Predict Tags ---
    inputs_tag = tag_tokenizer(description, return_tensors="pt", truncation=True, padding=True).to("cuda")
    outputs_tag = tag_model(**inputs_tag)
    probs = torch.sigmoid(outputs_tag.logits).detach().cpu().numpy()[0]
    tags = mlb.inverse_transform(np.array([probs > 0.5]))[0]

    return jsonify({
        "description": description,
        "priority": priority,
        "tags": tags,
    })

if __name__ == '__main__':
    app.run(debug=True)
