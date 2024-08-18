from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_KEY = os.getenv("OPENAI_KEY")

client = OpenAI(api_key=OPENAI_KEY)
exit_message = "Thank you, see you soon!"

def generate_response(user_input, messages):
    messages.append({"role": "user", "content": user_input})
    chat = client.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
    response = chat.choices[0].message.content
    return response


def chatbot():
    messages = [{"role": "system", "content": "You are an intelligent assistant. You will provide the user a new random prompt to journal about, and then ask follow up questions as the user types out their responses."}]

    while True:
        user_input = input("User : ")
        if user_input.lower() == "exit":
            return exit_message
        elif user_input:
            chatbot_reply = generate_response(user_input, messages)
            print(f"ChatGPT: {chatbot_reply}")
        messages.append({"role": "assistant", "content": chatbot_reply})
        # need to figure out when we break...maybe with timer or if user enters "exit"?

if __name__ == "__main__":
    chatbot()