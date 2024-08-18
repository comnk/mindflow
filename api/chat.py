from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_KEY = os.getenv("OPENAI_KEY")

client = OpenAI(api_key=OPENAI_KEY)

def chatbot():
    messages = [{"role": "assistant", "content": "You are an intelligent assistant. You will provide the user a new random prompt to journal about, and then ask follow up questions as the user types out their responses."}]

    while True:
        message = input("User : ")
        if message:
            messages.append(
                {"role": "user", "content": message},
            )
            chat = client.chat.completions.create(model="gpt-3.5-turbo", messages=messages)
        reply = chat.choices[0].message.content
        print(f"ChatGPT: {reply}")
        messages.append({"role": "assistant", "content": reply})

if __name__ == "__main__":
    chatbot()