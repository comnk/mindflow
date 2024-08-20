from flask import Flask
from flask_cors import cross_origin, CORS

import chat

app = Flask(__name__)
CORS(app)

# Define the routes for the chatbot API
app.add_url_rule("/api/journal-chatbot/", view_func=chat.chatbot, methods=['POST'])

@app.route("/api/homepage", methods=["GET"])
@cross_origin()

def homepage():
    return {"message": "hello"}

if (__name__ == "__main__"):
    app.run(debug=True, port=8080)