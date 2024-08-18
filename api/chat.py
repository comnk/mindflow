from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_KEY = os.getenv("OPENAI_KEY")
print(f"OpenAI API Key: {OPENAI_KEY}")
client = OpenAI(api_key=OPENAI_KEY)

welcome_message = "Hey, there! I'm JotBot––your journaling buddy! Here is your prompt for today:\n\n"
prompt_request = "what is today\'s journaling prompt?"

exit_input = "exit"
exit_message = "Happy journaling, and see you soon!"

chatbot_context = "You are an intelligent assistant that helps the user with journaling more puposefully. At the start of each session, you will provide a new random prompt in the form of a question for the user to journal about. As the user journals and enters their response(s), you ask follow up questions to further improve the quality of their journaling. The goal is to educate the user as well so they learn the importance of mindfulness––therefore, in your discussions/prompts include some educational aspects."

def generate_response(user_input, messages):
    messages.append({"role": "user", "content": user_input})
    chat = client.chat.completions.create(model="gpt-3.5-turbo", messages=messages)
    response = chat.choices[0].message.content
    return response

# need to figure out if we want to break using timer as well or only "exit"
# need a message somewhere that indicates how the user exits

def chatbot():
    messages = [{"role": "system", "content": chatbot_context}]
    prompt = generate_response(prompt_request, messages)
    print(f"JotBot: {welcome_message}{prompt}")

    while True:
        user_input = input("User : ")
        if user_input.lower() == exit_input:
            return exit_message
        elif user_input:
            chatbot_reply = generate_response(user_input, messages)
            print(f"JotBot: {chatbot_reply}")
            messages.append({"role": "assistant", "content": chatbot_reply})

if __name__ == "__main__":
    chatbot()