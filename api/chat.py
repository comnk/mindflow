from openai import OpenAI
from dotenv import load_dotenv
from flask import request, Flask, jsonify
import os

# Load environment variables
load_dotenv()

# Initialize OpenAI and Flask
OPENAI_KEY = os.getenv("OPENAI_KEY")
client = OpenAI(api_key=OPENAI_KEY)
app = Flask(__name__)

# Chatbot context
chatbot_context = "You are an intelligent assistant that helps the user with journaling more purposefully. At the start of each session, you will provide a new random prompt in the form of a question for the user to journal about. As the user journals and enters their response(s), you ask follow-up questions to further improve the quality of their journaling. The goal is to educate the user as well so they learn the importance of mindfulness––therefore, in your discussions/prompts include some educational aspects."

# global vars
# welcome_message = "Hey, there! I'm JotBot––your journaling buddy! Are you ready to start journaling today?\n\n"

def generate_response(user_input, messages):
    messages.append({"role": "user", "content": user_input})
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages)
    chatbot_reply = response.choices[0].message.content.strip()
    return chatbot_reply