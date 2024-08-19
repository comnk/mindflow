from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import requests

import chat
import mindfulness

app = Flask(__name__)
CORS(app)

app.add_url_rule("/api/journal-chatbot/", view_func=chat.chatbot, methods=['get', 'post'])
app.add_url_rule("/api/mindfulness-level/",view_func=mindfulness.get_level, methods=['get', 'post'] )
app.add_url_rule("/api/mindfulness-video/",view_func=mindfulness.get_meditation_video, methods=['get', 'post'] )

@app.route("/api/quote", methods=["GET"])
@cross_origin()
def get_quote():
    try:
        response = requests.get("https://zenquotes.io/api/random")
        response.raise_for_status()
        data = response.json()
        return jsonify(data)
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)