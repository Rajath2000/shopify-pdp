"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import styles from './PDPEnhancement.module.css';

type Step = 'hero' | 'questionnaire' | 'loading' | 'result';

export default function PDPEnhancement() {
  const [currentStep, setCurrentStep] = useState<Step>('hero');
  const [answers, setAnswers] = useState({
    primaryGoal: '',
    skinType: '',
    familiarity: ''
  });
  const [result, setResult] = useState<any>(null);

  const startQuestionnaire = () => setCurrentStep('questionnaire');
  
  const handleAnswer = (key: string, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    
    if (newAnswers.primaryGoal && newAnswers.skinType && newAnswers.familiarity) {
      submitAnswers(newAnswers);
    }
  };

  const submitAnswers = async (finalAnswers: any) => {
    setCurrentStep('loading');
    try {
      const res = await fetch('/api/generate-routine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalAnswers)
      });
      const data = await res.json();
      setResult(data);
      setCurrentStep('result');
    } catch (error) {
      console.error(error);
      setCurrentStep('hero'); // Reset on error for now
    }
  };

  const reset = () => {
    setAnswers({ primaryGoal: '', skinType: '', familiarity: '' });
    setResult(null);
    setCurrentStep('hero');
  };

  // Content for questions
  const currentQuestionIndex = !answers.primaryGoal ? 0 : !answers.skinType ? 1 : !answers.familiarity ? 2 : -1;
  
  const questions = [
    {
      key: 'primaryGoal',
      title: "What is your primary skincare goal?",
      options: [
        { label: 'Radiant Glow', value: 'glow' },
        { label: 'Anti-aging', value: 'anti-aging' },
        { label: 'Deep Hydration', value: 'hydration' },
        { label: 'Reduce Pigmentation', value: 'pigmentation' }
      ]
    },
    {
      key: 'skinType',
      title: "How would you describe your skin type?",
      options: [
        { label: 'Dry', value: 'dry' },
        { label: 'Oily', value: 'oily' },
        { label: 'Combination', value: 'combination' },
        { label: 'Sensitive', value: 'sensitive' }
      ]
    },
    {
      key: 'familiarity',
      title: "How familiar are you with Ayurvedic routines?",
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' }
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.productLayout}>
        {/* Left Side: Product Imagery (Sticky) */}
        <div className={styles.imageColumn}>
          <div className={styles.stickyWrapper}>
            <Image 
              src="/kumkumadi-tailam.png" 
              alt="Kumkumadi Tailam Bottle" 
              width={600} 
              height={600} 
              className={styles.productImage}
              priority
            />
          </div>
        </div>

        {/* Right Side: Content Area */}
        <div className={styles.contentColumn}>
          <AnimatePresence mode="wait">
            
            {/* HERO STEP */}
            {currentStep === 'hero' && (
              <motion.div 
                key="hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={styles.heroContent}
              >
                <div className={styles.breadcrumbs}>Home / Face Care / Kumkumadi Tailam</div>
                <h1 className={styles.title}>Kumkumadi Tailam</h1>
                <p className={styles.subtitle}>Miraculous Skin Brightening Oil</p>
                <div className={styles.priceRow}>
                  <span className={styles.price}>₹ 1,299</span>
                  <span className={styles.volume}>50ml</span>
                </div>
                
                <p className={styles.description}>
                  An authentic Ayurvedic blend of pure Saffron, Sandalwood, and Indian Madder. 
                  Renowned for imparting a golden glow and improving skin texture.
                </p>

                <div className={styles.benefits}>
                  <div className={styles.benefitItem}><CheckCircle2 size={16} /> Visibly brightens skin</div>
                  <div className={styles.benefitItem}><CheckCircle2 size={16} /> Reduces pigmentation</div>
                  <div className={styles.benefitItem}><CheckCircle2 size={16} /> 100% Natural Ayurvedic formulation</div>
                </div>

                <div className={styles.actions}>
                  <button className={styles.primaryButton}>Add to Cart</button>
                </div>

                <div className={styles.decisionSupportWrapper}>
                  <div className={styles.decisionSupportCard} onClick={startQuestionnaire}>
                    <div className={styles.decisionText}>
                      <h3>Not sure if this is right for you?</h3>
                      <p>Take our 3-step routine finder</p>
                    </div>
                    <ChevronRight className={styles.chevron} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* QUESTIONNAIRE STEP */}
            {currentStep === 'questionnaire' && currentQuestionIndex >= 0 && (
              <motion.div 
                key={`q-${currentQuestionIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={styles.questionContainer}
              >
                <button className={styles.backButton} onClick={() => setCurrentStep('hero')}>← Back</button>
                <div className={styles.progressText}>Step {currentQuestionIndex + 1} of 3</div>
                
                <h2 className={styles.questionTitle}>{questions[currentQuestionIndex].title}</h2>
                
                <div className={styles.optionsList}>
                  {questions[currentQuestionIndex].options.map((opt) => (
                    <motion.button
                      key={opt.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={styles.optionButton}
                      onClick={() => handleAnswer(questions[currentQuestionIndex].key, opt.value)}
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* LOADING STEP */}
            {currentStep === 'loading' && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.loadingContainer}
              >
                <div className={styles.spinner}></div>
                <p>Personalizing your routine...</p>
              </motion.div>
            )}

            {/* RESULT STEP */}
            {currentStep === 'result' && result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={styles.resultContainer}
              >
                <div className={styles.matchScoreBadge}>
                  {result.matchScore}% Match
                </div>
                <h2 className={styles.resultTitle}>{result.verdict}</h2>
                
                <div className={styles.tipsSection}>
                  {result.tips.map((tip: string, i: number) => (
                    <p key={i} className={styles.tipText}>✨ {tip}</p>
                  ))}
                </div>

                <div className={styles.routineSection}>
                  <h3 className={styles.routineHeading}>Your Personalized Routine</h3>
                  <div className={styles.routineTimeline}>
                    {result.routine.map((step: any, i: number) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 + 0.3 }}
                        className={styles.routineStep}
                      >
                        <div className={styles.stepIndicator}>{step.step}</div>
                        <div className={styles.stepContent}>
                          <span className={styles.stepTime}>{step.timeOfDay}</span>
                          <h4>{step.action}</h4>
                          <p>{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className={styles.resultActions}>
                  <button className={styles.primaryButton}>Add to Cart - ₹ 1,299</button>
                  <button className={styles.secondaryButton} onClick={reset}>
                    <RefreshCcw size={16} /> Retake Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
