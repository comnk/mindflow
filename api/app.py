from flask import Flask
from flask_cors import CORS

import chat
import mindfulness

app = Flask(__name__)
CORS(app)

app.add_url_rule("/api/journal-chatbot/", view_func=chat.chatbot, methods=['get', 'post'])
app.add_url_rule("/api/mindfulness-level/",view_func=mindfulness.get_level, methods=['get', 'post'] )
app.add_url_rule("/api/mindfulness-video/",view_func=mindfulness.get_meditation_video, methods=['get', 'post'] )

if (__name__ == "__main__"):
    app.run(debug=True, port=5000)