import { useState } from 'react';
import QuizSelector from './QuizSelector';
import PersonalityQuiz from './PersonalityQuiz';
import OccasionQuiz from './OccasionQuiz';
import ProductCarousel from './ProductCarousel';
import LoadingSpinner from './LoadingSpinner';

type QuizType = 'personality' | 'occasion' | null;

export interface QuizData {
  type: QuizType;
  personality?: string;
  occasion?: string;
  who?: string;
  colors: string[];
  bagTypes: string[];
  emotion?: string;
}

const StyleAdvisor = () => {
  const [currentStep, setCurrentStep] = useState<'selector' | 'quiz' | 'results'>('selector');
  const [quizType, setQuizType] = useState<QuizType>(null);
  const [quizData, setQuizData] = useState<QuizData>({
    type: null,
    colors: [],
    bagTypes: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const handleQuizTypeSelect = (type: QuizType) => {
    setQuizType(type);
    setQuizData(prev => ({ ...prev, type }));
    setCurrentStep('quiz');
  };

  const handleQuizComplete = async (data: QuizData) => {
    setQuizData(data);
    setIsLoading(true);
    
    try {
      // Build the input text based on quiz data
      let inputText = '';
      
      if (data.type === 'personality') {
        inputText = `Recommend a handbag for a ${data.personality} person who likes ${data.colors.join(', ')} colors`;
        if (data.bagTypes.length > 0) {
          inputText += ` and prefers ${data.bagTypes.join(', ')} style bags`;
        }
        if (data.emotion) {
          inputText += `. They want to feel ${data.emotion}`;
        }
        inputText += '.';
      } else if (data.type === 'occasion') {
        inputText = `Recommend a handbag for ${data.occasion}`;
        if (data.who) {
          inputText += ` for ${data.who}`;
        }
        inputText += ` in ${data.colors.join(', ')} colors`;
        if (data.bagTypes.length > 0) {
          inputText += ` and prefers ${data.bagTypes.join(', ')} style bags`;
        }
        inputText += '.';
      }

      const response = await fetch('http://localhost:8000/recommend/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_text: inputText
        })
      });

      if (response.ok) {
        const result = await response.json();
        // Map backend fields to frontend fields
        const mapped = (result.recommendations || []).map((p: any) => ({
          name: p.title,
          price: p.price,
          image: p.image_url,
          link: p.url,
          description: p.description,
        }));
        setRecommendations(mapped);
        setCurrentStep('results');
      } else {
        console.error('Failed to get recommendations');
        // Show mock data for demo
        setRecommendations([
          {
            name: "Artisan Floral Crossbody",
            price: "$189",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
            link: "https://www.anuschkaleather.com"
          }
        ]);
        setCurrentStep('results');
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
      // Show mock data for demo
      setRecommendations([
        {
          name: "Artisan Floral Crossbody",
          price: "$189",
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
          link: "https://www.anuschkaleather.com"
        }
      ]);
      setCurrentStep('results');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setCurrentStep('selector');
    setQuizType(null);
    setQuizData({
      type: null,
      colors: [],
      bagTypes: []
    });
    setRecommendations([]);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {currentStep === 'selector' && (
        <QuizSelector onSelect={handleQuizTypeSelect} />
      )}

      {currentStep === 'quiz' && quizType === 'personality' && (
        <PersonalityQuiz 
          onComplete={handleQuizComplete}
          onBack={() => setCurrentStep('selector')}
        />
      )}

      {currentStep === 'quiz' && quizType === 'occasion' && (
        <OccasionQuiz 
          onComplete={handleQuizComplete}
          onBack={() => setCurrentStep('selector')}
        />
      )}

      {currentStep === 'results' && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-semibold text-primary mb-2">
              Your Perfect Matches
            </h3>
            <p className="text-muted-foreground">
              Based on your style preferences, here are our AI recommendations:
            </p>
          </div>
          
          <ProductCarousel products={recommendations} />
          
          <div className="text-center">
            <button
              onClick={handleStartOver}
              className="btn-teal"
            >
              Start New Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StyleAdvisor;