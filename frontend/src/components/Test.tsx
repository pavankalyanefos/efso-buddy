import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface Question {
  id: number;
  section: string;
  question: {
    en: string;
    hi: string;
  };
  options: {
    en: string[];
    hi: string[];
  };
}

const questions: Question[] = [
  {
    id: 1,
    section: "CAREER FEELING",
    question: {
      en: "How clear are you about your career right now?",
      hi: "इस समय आप अपने करियर को लेकर कितने स्पष्ट हैं?"
    },
    options: {
      en: ["A. Very clear", "B. Somewhat clear", "C. Confused", "D. Very confused"],
      hi: ["A. बहुत स्पष्ट हूँ", "B. थोड़ा-बहुत स्पष्ट हूँ", "C. भ्रमित हूँ", "D. बहुत ज़्यादा भ्रमित हूँ"]
    }
  },
  {
    id: 2,
    section: "CAREER FEELING",
    question: {
      en: "What matters most to you in a future career?",
      hi: "भविष्य के करियर में आपके लिए सबसे ज़्यादा क्या मायने रखता है?"
    },
    options: {
      en: ["A. Good income", "B. Stability & security", "C. Interest & passion", "D. Helping others", "E. I don't know yet"],
      hi: ["A. अच्छी कमाई", "B. स्थिरता और सुरक्षा", "C. रुचि और जुनून", "D. दूसरों की मदद करना", "E. अभी पता नहीं"]
    }
  },
  {
    id: 3,
    section: "WHAT YOU LIKE DOING (RIASEC-LITE)",
    question: {
      en: "Which activity sounds most interesting to you?",
      hi: "इनमें से कौन-सी गतिविधि आपको सबसे ज़्यादा पसंद आएगी?"
    },
    options: {
      en: ["A. Fixing or building things", "B. Solving problems or puzzles", "C. Drawing, writing, creating", "D. Teaching or helping people", "E. Leading, selling, convincing", "F. Organizing data or records"],
      hi: ["A. चीज़ें ठीक करना या बनाना", "B. समस्याएँ या पहेलियाँ सुलझाना", "C. ड्रॉइंग, लिखना, कुछ नया बनाना", "D. पढ़ाना या लोगों की मदद करना", "E. लीड करना, बेचना, समझाना", "F. डेटा, रिकॉर्ड या फाइलें संभालना"]
    }
  },
  {
    id: 4,
    section: "WHAT YOU LIKE DOING (RIASEC-LITE)",
    question: {
      en: "In school/college, you enjoyed most:",
      hi: "स्कूल/कॉलेज में आपको सबसे ज़्यादा क्या पसंद था?"
    },
    options: {
      en: ["A. Practical work / labs", "B. Maths or science questions", "C. Presentations, art, writing", "D. Group discussions/helping others", "E. Events, leadership roles", "F. Notes, accounts, reports"],
      hi: ["A. प्रैक्टिकल काम / लैब", "B. गणित या विज्ञान के सवाल", "C. प्रेज़ेंटेशन, आर्ट, लेखन", "D. ग्रुप डिस्कशन / दूसरों की मदद", "E. इवेंट्स, लीडरशिप रोल", "F. नोट्स, अकाउंट्स, रिपोर्ट्स"]
    }
  },
  {
    id: 5,
    section: "WHAT YOU LIKE DOING (RIASEC-LITE)",
    question: {
      en: "Friends usually come to you for:",
      hi: "आपके दोस्त आमतौर पर किस बात के लिए आपके पास आते हैं?"
    },
    options: {
      en: ["A. Technical help", "B. Solving tricky problems", "C. Creative ideas", "D. Emotional support", "E. Decision making", "F. Planning & organizing"],
      hi: ["A. टेक्निकल मदद", "B. मुश्किल समस्याएँ सुलझाने के लिए", "C. क्रिएटिव आइडियाज़ के लिए", "D. भावनात्मक सपोर्ट के लिए", "E. फैसले लेने में मदद के लिए", "F. प्लानिंग और ऑर्गनाइज़ करने के लिए"]
    }
  },
  {
    id: 6,
    section: "WHAT YOU FEEL YOU ARE GOOD AT",
    question: {
      en: "How comfortable are you with numbers and calculations?",
      hi: "नंबर और कैलकुलेशन के साथ आप कितने सहज हैं?"
    },
    options: {
      en: ["A. Very comfortable", "B. Okay", "C. Not comfortable"],
      hi: ["A. बहुत सहज", "B. ठीक-ठाक", "C. सहज नहीं"]
    }
  },
  {
    id: 7,
    section: "WHAT YOU FEEL YOU ARE GOOD AT",
    question: {
      en: "How comfortable are you with people communication (speaking, explaining)?",
      hi: "लोगों से बात करने और समझाने में आप कितने सहज हैं?"
    },
    options: {
      en: ["A. Very comfortable", "B. Okay", "C. Not comfortable"],
      hi: ["A. बहुत सहज", "B. ठीक-ठाक", "C. सहज नहीं"]
    }
  },
  {
    id: 8,
    section: "REALITY CHECK",
    question: {
      en: "Which statement fits you best right now?",
      hi: "इस समय कौन-सा कथन आप पर सबसे ज़्यादा लागू होता है?"
    },
    options: {
      en: ["A. I need to earn soon", "B. I can study for a few years", "C. I have limited money/resources", "D. I am flexible"],
      hi: ["A. मुझे जल्दी कमाना शुरू करना है", "B. मैं कुछ साल पढ़ाई कर सकता/सकती हूँ", "C. मेरे पास सीमित पैसा/संसाधन हैं", "D. मैं फ्लेक्सिबल हूँ"]
    }
  }
];

const Test = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'hi' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [testCompleted, setTestCompleted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [testAlreadyTaken, setTestAlreadyTaken] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Check if user has already taken the test
        const testDoc = await getDoc(doc(db, 'test_results', currentUser.uid));
        if (testDoc.exists()) {
          setTestAlreadyTaken(true);
        }
      } else {
        navigate('/signup');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (language && !testCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [language, testCompleted]);

  const handleLanguageSelect = (lang: 'en' | 'hi') => {
    setLanguage(lang);
  };

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setTestCompleted(true);

    // Store test results
    if (user) {
      await setDoc(doc(db, 'test_results', user.uid), {
        userId: user.uid,
        language,
        answers,
        completedAt: new Date(),
        timeSpent: 300 - timeLeft
      }, { merge: true });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-br from-primary-sky to-white">
        <div className="container-max">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-indigo mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!user) {
    return null; // Will redirect to signup
  }

  if (testAlreadyTaken) {
    return (
      <section className="section-padding bg-gradient-to-br from-primary-sky to-white">
        <div className="container-max">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-primary-indigo mb-4">
              Test Already Completed
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              You have already taken the 5-Minute Career Test. Each user can take the test only once.
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Go to Home
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!language) {
    return (
      <section className="section-padding bg-gradient-to-br from-primary-sky to-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-indigo mb-4">
              5-Minute Career Test
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Choose your preferred language to begin the test
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleLanguageSelect('en')}
                className="btn-primary py-4"
              >
                English
              </button>
              <button
                onClick={() => handleLanguageSelect('hi')}
                className="btn-primary py-4"
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (testCompleted) {
    return (
      <section className="section-padding bg-gradient-to-br from-primary-sky to-white">
        <div className="container-max">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-primary-indigo mb-4">
              {language === 'en' ? 'Thank you!' : 'धन्यवाद!'}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {language === 'en'
                ? 'Now we understand you a little better. Let\'s begin your Career Compass.'
                : 'अब हम आपको थोड़ा बेहतर समझ पाए हैं। आइए अब आपका Career Compass शुरू करते हैं।'
              }
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              {language === 'en' ? 'Continue' : 'जारी रखें'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  const question = questions[currentQuestion];

  return (
    <section className="section-padding bg-gradient-to-br from-primary-sky to-white">
      <div className="container-max">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary-indigo">
                {language === 'en' ? '5-Minute Pre-Test' : '5-Minute पूर्व परीक्षण'}
              </h2>
              <div className="text-lg font-semibold text-primary-indigo">
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 italic">
                {language === 'en'
                  ? '"Answer honestly. There are no right or wrong answers."'
                  : '"ईमानदारी से उत्तर दें। यहाँ कोई सही या गलत जवाब नहीं है।"'
                }
              </p>
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-2">
                {language === 'en' ? `Question ${currentQuestion + 1} of ${questions.length}` : `प्रश्न ${currentQuestion + 1} का ${questions.length}`}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-indigo h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-primary-indigo mb-2">
                {question.section}
              </h3>
              <p className="text-gray-700 mb-4">
                {question.question[language]}
              </p>
              <div className="space-y-3">
                {question.options[language].map((option, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={index}
                      checked={answers[question.id] === index}
                      onChange={() => handleAnswer(question.id, index)}
                      className="w-4 h-4 text-primary-indigo focus:ring-primary-indigo"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {language === 'en' ? 'Previous' : 'पिछला'}
              </button>
              <button
                onClick={handleNext}
                disabled={answers[question.id] === undefined}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === questions.length - 1
                  ? (language === 'en' ? 'Submit' : 'सबमिट')
                  : (language === 'en' ? 'Next' : 'अगला')
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Test;