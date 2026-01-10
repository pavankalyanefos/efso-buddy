import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import AIMentor from './components/AIMentor';
import Signup from './components/Signup';
import Login from './components/Login';
import Test from './components/Test';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Home />
              <Footer />
              <Chatbot />
            </>
          } />
          <Route path="/ai-mentor" element={<AIMentor />} />
          <Route path="/signup" element={
            <>
              <Header />
              <main className="pt-16">
                <Signup />
              </main>
              <Footer />
            </>
          } />
          <Route path="/login" element={
            <>
              <Header />
              <main className="pt-16">
                <Login />
              </main>
              <Footer />
            </>
          } />
          <Route path="/test" element={
            <>
              <Header />
              <main className="pt-16">
                <Test />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
