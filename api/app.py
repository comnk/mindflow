from flask import Flask

import chat

app = Flask(__name__)

app.add_url_rule("/journal-chatbot/", view_func=chat.chatbot, methods=['get', 'post'])

@app.route("/api/homepage")
def homepage():
    return {"message": "Hello World!"}

if __name__ == "__main__":
    app.run(debug=True, port=8080)