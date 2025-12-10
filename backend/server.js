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

    console.log('Received chat message:', message.toLowerCase().trim());

    const userMessage = message.toLowerCase().trim();

    // Career guidance responses based on common questions
    let response = '';

    if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
      response = "Hello! I'm EFOS Buddy, your AI career mentor. I'm here to help you with career guidance, course selection, and exam preparation. What would you like to know about your future career path?";
    }
    else if (userMessage.includes('jee') || userMessage.includes('engineering')) {
      response = "For JEE preparation and engineering careers:\n\n• Focus on Physics, Chemistry, Mathematics (PCM)\n• Take coaching from reputed institutes like Allen, FIITJEE, or Aakash\n• Practice daily with NCERT books and previous year papers\n• Target JEE Main first, then JEE Advanced\n• Good branches: Computer Science, Mechanical, Electrical, Civil Engineering\n• Average salary: ₹6-12 lakhs per year for freshers\n\nWould you like specific study tips or college recommendations?";
    }
    else if (userMessage.includes('neet') || userMessage.includes('medical') || userMessage.includes('doctor')) {
      response = "For NEET and medical careers:\n\n• Study Biology, Chemistry, Physics (PCB)\n• Focus on NCERT books thoroughly\n• Practice with previous year question papers\n• Join coaching if needed (Aakash, Allen, etc.)\n• Medical courses: MBBS, BDS, BAMS, BHMS\n• Average salary: ₹8-15 lakhs per year\n\nNEET requires dedication and consistent study. Which medical field interests you most?";
    }
    else if (userMessage.includes('commerce') || userMessage.includes('ca') || userMessage.includes('chartered accountant')) {
      response = "Commerce stream offers excellent career opportunities:\n\n• Subjects: Accountancy, Business Studies, Economics, Maths\n• Popular courses: B.Com, BBA, CA, CS, CMA\n• CA Foundation → CA Intermediate → CA Final\n• Average CA salary: ₹8-25 lakhs per year\n• Other options: Banking, Finance, MBA\n\nCommerce has great job prospects in corporate sector!";
    }
    else if (userMessage.includes('science') || userMessage.includes('pcm') || userMessage.includes('pcb')) {
      response = "Science stream opens many doors:\n\nPCM (Maths): Engineering, Architecture, Statistics, Research\nPCB (Biology): Medicine, Pharmacy, Biotechnology, Agriculture\nBoth streams: B.Sc, Integrated courses\n\nChoose based on your interests:\n• Love problem-solving? → PCM\n• Interested in life sciences? → PCB\n• Both? → Consider interdisciplinary courses\n\nWhat subjects do you enjoy most?";
    }
    else if (userMessage.includes('arts') || userMessage.includes('humanities')) {
      response = "Arts/Humanities stream has diverse career options:\n\n• Popular courses: BA, BBA, LLB, Journalism, Psychology\n• Career fields: Law, Journalism, Teaching, Civil Services\n• Competitive exams: UPSC, SSC, Banking\n• Creative fields: Design, Media, Advertising\n• Average salary: ₹4-8 lakhs per year initially\n\nArts offers flexibility and creativity in career choices!";
    }
    else if (userMessage.includes('cuet') || userMessage.includes('university')) {
      response = "CUET (Common University Entrance Test) is for central universities:\n\n• Replaces multiple university entrance exams\n• Subjects: Domain-specific + General Test\n• Universities: DU, JNU, BHU, etc.\n• Good scores needed for popular courses\n• Preparation: NCERT + practice tests\n\nCUET opens doors to prestigious central universities across India!";
    }
    else if (userMessage.includes('salary') || userMessage.includes('money') || userMessage.includes('pay')) {
      response = "Career salary insights (approximate for freshers):\n\n• Engineering: ₹4-8 lakhs/year\n• Medical: ₹8-15 lakhs/year\n• CA/CS: ₹6-12 lakhs/year\n• IT/Software: ₹5-10 lakhs/year\n• Teaching: ₹3-6 lakhs/year\n• Banking: ₹4-7 lakhs/year\n\nSalaries increase with experience and skills. Focus on gaining expertise in your field!";
    }
    else if (userMessage.includes('college') || userMessage.includes('university') || userMessage.includes('admission')) {
      response = "College admission tips:\n\n• Research colleges and courses thoroughly\n• Check eligibility criteria and fees\n• Prepare for entrance exams\n• Consider location, facilities, placements\n• Apply early for better options\n• Keep backup options ready\n\nTop colleges: IITs, NITs, AIIMS, DU, JNU, etc.\n\nWhich course are you interested in?";
    }
    else if (userMessage.includes('study') || userMessage.includes('prepare') || userMessage.includes('tips')) {
      response = "Effective study tips for Class 12:\n\n• Create a study schedule and stick to it\n• Focus on NCERT books first\n• Practice previous year papers\n• Take regular breaks (Pomodoro technique)\n• Join study groups for doubt clearing\n• Stay healthy: exercise, sleep, nutrition\n• Regular revision is key\n\nConsistency and smart work beats hard work!";
    }
    else if (userMessage.includes('career') || userMessage.includes('future') || userMessage.includes('job')) {
      response = "Career planning steps:\n\n1. Self-assessment: Know your interests and strengths\n2. Research: Explore different career options\n3. Education: Choose right course/stream\n4. Skills: Develop relevant skills\n5. Experience: Gain practical experience\n6. Network: Connect with professionals\n\nPopular careers: Software Engineer, Doctor, CA, Teacher, Entrepreneur, etc.\n\nWhat are your interests? Let's find the perfect career for you!";
    }
    else if (userMessage.includes('thank') || userMessage.includes('thanks')) {
      response = "You're welcome! I'm here whenever you need career guidance. Feel free to ask about courses, exams, colleges, or any career-related questions. Best of luck with your future! 🌟";
    }
    else {
      response = "I'm EFOS Buddy, your career guidance mentor! I can help you with:\n\n• Course selection after Class 12\n• Entrance exam preparation (JEE, NEET, CUET)\n• Career exploration and planning\n• College admissions guidance\n• Study tips and strategies\n• Salary insights for different careers\n\nWhat specific question do you have about your career path?";
    }

    console.log('Sending career guidance response');
    res.json({ response });

  } catch (error) {
    console.error('Chat processing error:', error);
    res.status(500).json({
      error: 'Sorry, I\'m having trouble processing your request right now. Please try again later.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});