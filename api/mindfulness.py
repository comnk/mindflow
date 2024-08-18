from googleapiclient.discovery import build
from dotenv import load_dotenv
import os
import random

load_dotenv()

YOUTUBE_KEY=os.getenv("YOUTUBE_KEY")
youtube = build('youtube', 'v3', developerKey=YOUTUBE_KEY)

def get_meditation_video():
    request = youtube.search().list(
        part="snippet",
        maxResults=20,
        q="guided meditation",
        type="video",
        videoDuration="medium",
        videoEmbeddable="true"
    )

    response = request.execute()
    
    if response["items"]:
        random_video = random.choice(response["items"])
        video_url = f"https://www.youtube.com/watch?v={random_video['id']['videoId']}"
        return video_url
    else:
        return "No video found"

random_video_url = get_meditation_video()
print(random_video_url)