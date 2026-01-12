# VoiceFlow AI – Conversational Voice AI Platform (MVP)

## Overview
VoiceFlow AI is a web-based Voice AI platform that allows users to create AI voice bots, configure them, and interact via browser-based conversations.

## Tech Stack
- Frontend: React + Vite
- Styling: Tailwind CSS
- Backend: Spring Boot
- Database: MongoDB Atlas
- AI: Google Gemini (Text)
- Voice: Web Speech API
- Deployment: Vercel (Frontend)

## Features
- Email authentication
- AI voice bot creation
- Text + voice conversation
- Persistent conversation logs
- Dark mode dashboard

## Architecture
Frontend → REST API → MongoDB  
AI abstraction layer allows easy switch to real-time voice agents.

## How to Run
```bash
npm install
npm run dev
