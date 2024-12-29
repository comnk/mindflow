from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required
from auth import auth
from flask_cors import CORS
import requests
from chat import chatbot_context, generate_response  # Directly import the chatbot function
import mindfulness

app = Flask(__name__)
CORS(app)

# user authentication
app.config["JWT_SECRET_KEY"] = "your_secret_key"  # Change to a strong secret key in production
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 3600  # Token expiration time (in seconds)
jwt = JWTManager(app)

app.register_blueprint(auth)

# Middleware to protect routes
def jwt_protected_function(fn):
    def wrapper(*args, **kwargs):
        return jwt_required()(fn)(*args, **kwargs)
    return wrapper

# chatbot
@app.route("/api/journal-chatbot/", methods=['POST'])
def chatbot():
    try:
        # Get the user input from the request
        user_input = request.json.get("user_input_jstr", "")
        print(f"Received request: {request.json}")

        if not user_input:
            print("No valid user input provided.")
            return jsonify({"message": "Please provide a valid input."}), 400

        # Initialize message history
        messages = [{"role": "system", "content": chatbot_context}]
        print(f"Initial messages: {messages}")

        # Generate response
        response_text = generate_response(user_input, messages)
        print(f"Generated response: {response_text}")

        # Return the response as JSON
        return jsonify({"message": response_text})

    except Exception as e:
        # Log the error and return an error message
        print(f"Error: {e}")
        return jsonify({"message": "An error occurred on the server."}), 500

# mindfulness
app.add_url_rule(
    "/api/mindfulness-level/",
    view_func=mindfulness.get_level, methods=['GET', 'POST'])

app.add_url_rule(
    "/api/mindfulness-video/",
    view_func=mindfulness.get_meditation_video, methods=['GET', 'POST'])

# zen quotes
@app.route("/api/quote", methods=["GET"])
def get_quote():
    try:
        response = requests.get("https://zenquotes.io/api/random")
        response.raise_for_status()
        data = response.json()
        return jsonify(data)
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)