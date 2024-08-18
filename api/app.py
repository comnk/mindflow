from flask import Flask
from flask_cors import cross_origin, CORS

import chat

app = Flask(__name__)
CORS(app)

app.add_url_rule("/api/journal-chatbot/", view_func=chat.chatbot, methods=['get', 'post'])

@app.route("/api/homepage", methods=["GET"])
@cross_origin()
def homepage():
    return {"message": "Hello World!"}