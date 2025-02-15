# **Mindflow - Mental Health & Journaling Platform**

## **Overview**

Mindflow is a full-stack web application designed to help users manage their mental well-being through guided journaling, personalized mood tracking, and mindfulness resources. It empowers users with tools for self-reflection, emotional awareness, and personal growth, making it a valuable companion for enhancing their mental health journey.

The application offers a seamless experience by integrating a journaling chatbot, sentiment analysis, and a mood-tracking dashboard. It also includes a mindfulness feature that provides random YouTube meditation videos tailored to the user's experience level.

---

## **Features**

- **User Authentication & Authorization**:
  - Secure user registration and login with JWT authentication.
  - Profile management (update name, email, and password).

- **Journaling Chatbot**:
  - An AI-driven journaling assistant to guide users through reflective writing.
  - Chat history storage for reviewing past entries.
  - Sentiment analysis for emotional insights on journal entries.

- **Mindfulness & Meditation**:
  - Recommends random YouTube meditation videos based on the user's experience level (beginner, intermediate, or advanced).
  - Encourages mindfulness practices for emotional regulation.

---

## **Tech Stack**

### **Frontend:**
- **React.js** - For building an interactive and responsive user interface.

### **Backend:**
- **Python** with **Flask** - For building RESTful APIs and server-side logic.
- **MongoDB** with **PyMongo** - NoSQL database for storing user data, chat history, and mood entries.
- **JWT Authentication** - For secure user login and session management.

### **APIs Integrated:**
- **OpenAI API** - For the journaling chatbot's conversational abilities.
- **YouTube Data API** - For fetching random meditation videos.

---

## **Installation & Setup**

### **Prerequisites**
Ensure you have the following installed:
- **Python** (v3.8 or later)
- **Node.js** (v14.x or later)
- **MongoDB** (Local or cloud instance)
- **npm** (Node Package Manager)
