import { useState, useEffect } from 'react';

const ONBOARDING_STORAGE_KEY = 'eva-onboarding-completed';
const ONBOARDING_STEP_KEY = 'eva-onboarding-step';

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState('welcome');

  const showTour = () => {
    setShowOnboarding(true);
  };

  useEffect(() => {
    // Check if onboarding has been completed
    const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'true';
    const savedStep = localStorage.getItem(ONBOARDING_STEP_KEY);
    
    if (!hasCompletedOnboarding) {
      // First time user - show onboarding
      setShowOnboarding(true);
      setCurrentStep(savedStep || 'welcome');
    } else {
      // Returning user - don't show onboarding
      setShowOnboarding(false);
    }
    
    setIsLoading(false);
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    localStorage.removeItem(ONBOARDING_STEP_KEY);
    setShowOnboarding(false);
  };

  const resetOnboarding = () => {
    localStorage.removeItem(ONBOARDING_STORAGE_KEY);
    localStorage.removeItem(ONBOARDING_STEP_KEY);
    setShowOnboarding(true);
    setCurrentStep('welcome');
  };

  const setOnboardingStep = (step: string) => {
    localStorage.setItem(ONBOARDING_STEP_KEY, step);
    setCurrentStep(step);
  };

  return {
    showOnboarding,
    setShowOnboarding: showTour,
    isLoading,
    currentStep,
    completeOnboarding,
    resetOnboarding,
    setOnboardingStep
  };
}