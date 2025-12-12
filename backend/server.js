const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
// const admin = require('firebase-admin');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase Admin (commented out for now)
// const serviceAccount = require('./firebase-service-account.json'); // You'll need to add this file
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: process.env.FIREBASE_DATABASE_URL
// });

// const db = admin.firestore();

// Initialize OpenAI
console.log('Initializing OpenAI client...');
console.log('API Key present:', !!process.env.OPENAI_API_KEY);
console.log('API Key starts with:', process.env.OPENAI_API_KEY?.substring(0, 10));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log('OpenAI client initialized successfully');

// Mock data for now
const mockCareers = [
  { id: 1, name: 'Data Science', description: 'Analyze data to solve real-world problems' },
  { id: 2, name: 'Biotechnology', description: 'Innovate in healthcare and life sciences' }
];

const mockCourses = [
  { id: 1, name: 'B.Tech', duration: '4 years', eligibility: 'PCM with 75%' },
  { id: 2, name: 'MBBS', duration: '5.5 years', eligibility: 'PCB with 50%' }
];

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/careers', (req, res) => {
  res.json(mockCareers);
});

app.get('/api/courses', (req, res) => {
  res.json(mockCourses);
});

app.post('/api/counselling', (req, res) => {
  const { name, phone, class: studentClass, city } = req.body;
  console.log('Counselling request:', { name, phone, studentClass, city });
  res.json({ message: 'Counselling request submitted successfully' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Received chat message:', message);

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Use OpenAI for streaming AI responses
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // or gpt-4 if available
      messages: [
        {
          role: 'system',
          content: `You are EFOS Buddy, an AI career mentor for Class 12 students in India. You help students with career guidance, course selection, exam preparation, and future planning. Be friendly, helpful, and provide accurate information about Indian education system, careers, colleges, and entrance exams. Keep responses concise but informative.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
      stream: true
    });

    let fullResponse = '';

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullResponse += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: [DONE]\n\n`);
    res.end();

  } catch (error) {
    console.error('Chat processing error:', error);
    res.write(`data: ${JSON.stringify({ error: 'Sorry, I\'m having trouble processing your request right now. Please try again later.' })}\n\n`);
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});