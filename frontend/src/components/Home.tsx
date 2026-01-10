import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-primary-sky to-white">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-primary-indigo mb-6">
                Not sure what's next after Class 12?
                <span className="block text-accent-blue">Meet EFOS Buddy.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your personalised AI Career Mentor. Discover the right courses, exams, degrees, colleges, and career pathways — all in one beautiful platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <button className="btn-primary">Start My Journey</button>
                </Link>
                <Link to="/test">
                  <button className="btn-secondary">Take 5-Minute Career Test</button>
                </Link>
              </div>
            </div>
            <div className="relative">
              {/* AI Mentor Avatar with Animation - Medium Size */}
              <motion.div
                className="relative w-full flex flex-col items-center justify-center space-y-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Floating background elements */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-blue/10 to-primary-teal/10"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 1, -1, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Main avatar container - Medium size */}
                <motion.div
                  className="relative z-10 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.img
                    src="/ai-mentor-avatar.png"
                    alt="EFOS Buddy AI Mentor"
                    className="w-full h-full object-cover object-center"
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Glowing border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-accent-blue/50"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(64, 196, 255, 0.3)",
                        "0 0 40px rgba(64, 196, 255, 0.6)",
                        "0 0 20px rgba(64, 196, 255, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Text below avatar */}
                <motion.div
                  className="text-center z-10 space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Link to="/ai-mentor">
                    <motion.button
                      className="bg-gradient-to-r from-primary-indigo to-primary-teal text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        boxShadow: [
                          "0 4px 15px rgba(28, 31, 74, 0.3)",
                          "0 4px 25px rgba(28, 31, 74, 0.5)",
                          "0 4px 15px rgba(28, 31, 74, 0.3)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      EFOS Buddy
                    </motion.button>
                  </Link>
                  <p className="text-lg md:text-xl text-gray-600 font-medium max-w-sm">
                    Your AI Career Mentor
                  </p>
                </motion.div>

                {/* Floating particles */}
                <motion.div
                  className="absolute top-8 right-8 w-2 h-2 bg-accent-blue rounded-full"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0
                  }}
                />
                <motion.div
                  className="absolute bottom-16 left-8 w-1.5 h-1.5 bg-primary-teal rounded-full"
                  animate={{
                    y: [0, -12, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                <motion.div
                  className="absolute top-1/2 right-4 w-1 h-1 bg-accent-orange rounded-full"
                  animate={{
                    x: [0, 8, 0],
                    opacity: [0.4, 0.9, 0.4],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* What is EFOS Buddy Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-indigo mb-4">
              Your Career Future, Simplified with AI.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              EFOS Buddy is India's first AI-powered 3D career mentor built for Class 12 students.
              It analyses your strengths, interests, exam readiness, financial plans, and long-term goals to give you personalised guidance on:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📚</span>
              </div>
              <h3 className="font-semibold text-primary-indigo mb-2">Best courses after Class 12</h3>
              <p className="text-gray-600 text-sm">Science / Commerce / Arts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📝</span>
              </div>
              <h3 className="font-semibold text-primary-indigo mb-2">Entrance exams and timelines</h3>
              <p className="text-gray-600 text-sm">JEE, NEET, CUET & more</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎓</span>
              </div>
              <h3 className="font-semibold text-primary-indigo mb-2">The right degree or skill program</h3>
              <p className="text-gray-600 text-sm">B.Tech, MBBS, BBA & more</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-indigo rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-primary-indigo mb-2">Salary insights & future scope</h3>
              <p className="text-gray-600 text-sm">Career pathways & job roles</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-primary-indigo to-primary-teal p-6 rounded-xl text-white text-center">
              <div className="text-3xl mb-2">120+</div>
              <div className="font-semibold">Careers</div>
            </div>
            <div className="bg-gradient-to-br from-accent-blue to-primary-sky p-6 rounded-xl text-white text-center">
              <div className="text-3xl mb-2">70+</div>
              <div className="font-semibold">Exams</div>
            </div>
            <div className="bg-gradient-to-br from-accent-orange to-primary-teal p-6 rounded-xl text-white text-center">
              <div className="text-3xl mb-2">AI</div>
              <div className="font-semibold">Recommendations</div>
            </div>
            <div className="bg-gradient-to-br from-primary-teal to-accent-blue p-6 rounded-xl text-white text-center">
              <div className="text-3xl mb-2">📚</div>
              <div className="font-semibold">Study Roadmaps</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Min Career Test Section */}
      <section className="section-padding bg-gradient-to-r from-primary-sky to-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-indigo mb-4">
              Take the EFOS 5-Minute Career Test
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get instant recommendations powered by RIASEC + AI mapping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-12 h-12 bg-primary-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white">🎯</span>
              </div>
              <h3 className="font-semibold text-primary-indigo mb-2">Interest Analysis</h3>
              <p className="text-gray-600 text-sm">Discover your passions</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-12 h-12 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white">🧠</span>
              </div>
              <h3 className="font-semibold text-primary-indigo mb-2">Skill Assessment</h3>
              <p className="text-gray-600 text-sm">Evaluate your strengths</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-12 h-12 bg-accent-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white">📊</span>
              </div>
              <h3 className="font-semibold text-primary-indigo mb-2">Stream Mapping</h3>
              <p className="text-gray-600 text-sm">Find your perfect stream</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-12 h-12 bg-primary-indigo rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white">🎓</span>
              </div>
              <h3 className="font-semibold text-primary-indigo mb-2">Course & Job Match</h3>
              <p className="text-gray-600 text-sm">Get personalized matches</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-12 h-12 bg-primary-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white">💰</span>
              </div>
              <h3 className="font-semibold text-primary-indigo mb-2">Future Salary Projections</h3>
              <p className="text-gray-600 text-sm">Know your earning potential</p>
            </div>
          </div>

          <div className="text-center">
            <Link to="/test">
              <button className="btn-primary text-lg px-8 py-4">
                Start My Test →
              </button>
            </Link>
            <p className="text-gray-600 mt-4">No registration required • Takes only 5 minutes</p>
          </div>
        </div>
      </section>

      {/* Explore Careers Section */}
      <section id="careers" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-indigo mb-4">
              Discover Careers That Fit Your Passion
            </h2>
            <p className="text-xl text-gray-600">
              Explore 250+ career options with detailed insights and pathways
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Data Science', icon: '📊', desc: 'Analyze data to solve real-world problems' },
              { name: 'Biotechnology', icon: '🧬', desc: 'Innovate in healthcare and life sciences' },
              { name: 'Chartered Accountancy', icon: '💼', desc: 'Financial expertise and business advisory' },
              { name: 'Business Management', icon: '🏢', desc: 'Lead organizations and drive growth' },
              { name: 'Nursing & Healthcare', icon: '🏥', desc: 'Care for patients and save lives' },
              { name: 'Graphic Design', icon: '🎨', desc: 'Create visual stories and brands' },
              { name: 'AI & Robotics', icon: '🤖', desc: 'Build the future of technology' },
              { name: 'Cybersecurity', icon: '🔒', desc: 'Protect digital assets and privacy' },
              { name: 'Finance & Banking', icon: '💰', desc: 'Manage money and investments' },
              { name: 'Agriculture Science', icon: '🌾', desc: 'Sustainable farming and food security' },
              { name: 'Aviation', icon: '✈️', desc: 'Explore skies and aerospace engineering' },
              { name: 'Entrepreneurship', icon: '🚀', desc: 'Build your own business empire' }
            ].map((career, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
                <div className="text-4xl mb-4">{career.icon}</div>
                <h3 className="text-xl font-semibold text-primary-indigo mb-2">{career.name}</h3>
                <p className="text-gray-600 mb-4">{career.desc}</p>
                <button className="text-accent-blue font-semibold hover:text-primary-indigo transition-colors">
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses & Exams Hub Section */}
      <section id="courses" className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-indigo mb-4">
              Your One-Stop Hub for All Courses and Entrance Exams
            </h2>
            <p className="text-xl text-gray-600">
              Complete information on courses, eligibility, syllabus, and exam dates
            </p>
          </div>

          {/* Courses Tab */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary-indigo mb-8">Courses After Class 12</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'B.Tech', duration: '4 years', eligibility: 'PCM with 75%', difficulty: 'High' },
                { name: 'MBBS', duration: '5.5 years', eligibility: 'PCB with 50%', difficulty: 'Very High' },
                { name: 'B.Com', duration: '3 years', eligibility: 'Commerce with 50%', difficulty: 'Medium' },
                { name: 'BBA', duration: '3 years', eligibility: 'Any stream 50%', difficulty: 'Medium' },
                { name: 'B.Sc', duration: '3 years', eligibility: 'Science with 50%', difficulty: 'Medium' },
                { name: 'BCA', duration: '3 years', eligibility: 'Maths with 50%', difficulty: 'Low' },
                { name: 'BA', duration: '3 years', eligibility: 'Any stream 45%', difficulty: 'Low' },
                { name: 'Pharmacy', duration: '4 years', eligibility: 'PCM/B with 50%', difficulty: 'Medium' },
                { name: 'Nursing', duration: '4 years', eligibility: 'PCB with 50%', difficulty: 'Medium' }
              ].map((course, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <h4 className="text-xl font-semibold text-primary-indigo mb-2">{course.name}</h4>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><span className="font-medium">Duration:</span> {course.duration}</p>
                    <p><span className="font-medium">Eligibility:</span> {course.eligibility}</p>
                    <p><span className="font-medium">Difficulty:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${
                        course.difficulty === 'Very High' ? 'bg-red-100 text-red-800' :
                        course.difficulty === 'High' ? 'bg-orange-100 text-orange-800' :
                        course.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {course.difficulty}
                      </span>
                    </p>
                  </div>
                  <button className="text-accent-blue font-semibold hover:text-primary-indigo transition-colors">
                    Know More →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Exams Tab */}
          <div>
            <h3 className="text-2xl font-bold text-primary-indigo mb-8">Entrance Exams</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'JEE Main', nextDate: 'Jan 2025', syllabus: 'PCM', difficulty: 'High' },
                { name: 'NEET', nextDate: 'May 2025', syllabus: 'PCB', difficulty: 'Very High' },
                { name: 'CUET', nextDate: 'May-Jun 2025', syllabus: 'Subject-wise', difficulty: 'Medium' },
                { name: 'NDA', nextDate: 'Apr & Sep 2025', syllabus: 'PCM + GK', difficulty: 'High' },
                { name: 'CA Foundation', nextDate: 'May & Nov 2025', syllabus: 'Commerce', difficulty: 'Medium' },
                { name: 'CLAT', nextDate: 'Dec 2024', syllabus: 'Legal Aptitude', difficulty: 'High' },
                { name: 'NIFT', nextDate: 'Jan 2025', syllabus: 'Design Aptitude', difficulty: 'Medium' },
                { name: 'Polytechnic', nextDate: 'State-wise', syllabus: 'PCM', difficulty: 'Low' },
                { name: 'ITI Entrance', nextDate: 'State-wise', syllabus: 'Basic', difficulty: 'Low' }
              ].map((exam, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <h4 className="text-xl font-semibold text-primary-indigo mb-2">{exam.name}</h4>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><span className="font-medium">Next Exam:</span> {exam.nextDate}</p>
                    <p><span className="font-medium">Syllabus:</span> {exam.syllabus}</p>
                    <p><span className="font-medium">Difficulty:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${
                        exam.difficulty === 'Very High' ? 'bg-red-100 text-red-800' :
                        exam.difficulty === 'High' ? 'bg-orange-100 text-orange-800' :
                        exam.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {exam.difficulty}
                      </span>
                    </p>
                  </div>
                  <button className="text-accent-blue font-semibold hover:text-primary-indigo transition-colors">
                    Know More →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="section-padding bg-gray-50">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-center text-primary-indigo mb-12">EFOS Programs</h2>
          <p className="text-center text-gray-600">Coming soon...</p>
        </div>
      </section>

      {/* Counselling CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-indigo to-primary-teal text-white">
        <div className="container-max text-center">
          <h2 className="text-4xl font-bold mb-4">Talk to a Career Expert Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Get free guidance for admissions, courses, and career planning. No spam. No pressure.
          </p>
          <button className="bg-white text-primary-indigo px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors mb-8">
            Book My Free Counselling Call
          </button>
          <p className="mb-8 opacity-75">Or download our comprehensive career guide</p>
          <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-indigo transition-colors">
            Download Career Guide
          </button>

          {/* Contact Form */}
          <div className="mt-12 max-w-md mx-auto">
            <form className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <select className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white">
                  <option value="">Select Class/Stream</option>
                  <option value="12-science">Class 12 Science</option>
                  <option value="12-commerce">Class 12 Commerce</option>
                  <option value="12-arts">Class 12 Arts</option>
                </select>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button type="submit" className="w-full bg-accent-orange text-white py-3 rounded-lg font-semibold hover:bg-accent-orange/90 transition-colors">
                  Get Free Counselling
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* About EFOS Section */}
      <section id="about" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-indigo mb-4">About EFOS</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              EFOS is an advanced education & career platform helping millions of students choose the right path through programs, partnerships, and AI innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-teal mb-2">2,00,000+</div>
              <div className="text-gray-600">Students Guided</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-blue mb-2">200+</div>
              <div className="text-gray-600">Partner Institutions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-orange mb-2">50+</div>
              <div className="text-gray-600">Industry Programs</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary-sky to-white p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-primary-indigo mb-4">Our Mission</h3>
                <p className="text-gray-600 mb-6">
                  To empower every Class 12 student in India with personalized AI-driven career guidance,
                  ensuring they make informed decisions about their future education and career paths.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ AI-powered career recommendations</li>
                  <li>✓ Comprehensive course and exam database</li>
                  <li>✓ Expert counselling support</li>
                  <li>✓ Industry-relevant skill development</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="w-48 h-48 bg-gradient-to-br from-primary-indigo to-primary-teal rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white text-6xl">🎓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="blog" className="section-padding bg-gray-50">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-center text-primary-indigo mb-12">Blog & Resources</h2>
          <p className="text-center text-gray-600">Coming soon...</p>
        </div>
      </section>
    </main>
  );
};

export default Home;