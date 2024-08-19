from flask import Flask
from flask_cors import CORS
import chat

app = Flask(__name__)
CORS(app)

# Define the routes for the chatbot API
app.add_url_rule("/api/journal-chatbot/", view_func=chat.chatbot, methods=['POST'])

@app.route("/api/homepage", methods=["GET"])
def homepage():
    return {"message": "hello"}

if __name__ == "__main__":
    app.run(debug=True, port=8080)