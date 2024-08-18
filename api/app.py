from flask import Flask
from flask_cors import cross_origin

import chat

app = Flask(__name__)

app.add_url_rule("/api/journal-chatbot/", view_func=chat.chatbot, methods=['get', 'post'])

@app.route("/api/homepage", methods=["GET"])
@cross_origin()
def homepage():
    return {"message": "Hello World!"}