from flask import request
from googleapiclient.discovery import build
from dotenv import load_dotenv
import os
import random

load_dotenv()

YOUTUBE_KEY = os.getenv("YOUTUBE_KEY")
youtube = build('youtube', 'v3', developerKey=YOUTUBE_KEY)

def get_level():
    level = request.json.get("level")
    duration = ""

    if level == "beginner":
        duration = "short"
    elif level == "moderate":
        duration = "medium"
    elif level == "advanced":
        duration = "long"

    # Directly pass the video URL in the response
    video_url = get_meditation_video(videoDuration=duration)
    return {"url": video_url}

def get_meditation_video(videoDuration):
    request = youtube.search().list(
        part="snippet",
        maxResults=10,
        q="guided meditation",
        type="video",
        videoDuration=videoDuration,
        videoEmbeddable="true"
    )

    response = request.execute()
    
    if response["items"]:
        random_video = random.choice(response["items"])
        video_url = f"https://www.youtube.com/embed/{random_video['id']['videoId']}"
        return video_url
    else:
        return "No video found"
