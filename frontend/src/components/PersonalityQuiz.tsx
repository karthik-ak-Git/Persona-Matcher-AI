import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Palette, Heart, Leaf, Crown, Sparkles, Music, Camera, Plus } from 'lucide-react';
import type { QuizData } from './StyleAdvisor';

interface PersonalityQuizProps {
  onComplete: (data: QuizData) => void;
  onBack: () => void;
}

const PersonalityQuiz = ({ onComplete, onBack }: PersonalityQuizProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personality: '',
    colors: [] as string[],
    bagTypes: [] as string[],
    emotion: ''
  });

  const personalityTypes = [
    { value: 'artistic', label: 'Artistic & Expressive', icon: Palette },
    { value: 'bold', label: 'Bold & Fearless', icon: Crown },
    { value: 'calm', label: 'Calm & Minimalist', icon: Leaf },
    { value: 'elegant', label: 'Elegant & Classic', icon: Heart },
    { value: 'nature', label: 'Nature Lover', icon: Leaf },
    { value: 'bohemian', label: 'Free-Spirited & Bohemian', icon: Music },
    { value: 'romantic', label: 'Romantic & Reflective', icon: Heart },
    { value: 'other', label: 'Other', icon: Plus }
  ];

  const colorPalettes = [
    'Red', 'Black', 'Floral', 'Pastel', 'Earthy', 'Neutral', 'Vibrant', 'Gold', 'Abstract', 'Metallic'
  ];

  const bagTypes = [
    'Crossbody', 'Tote', 'Clutch', 'Backpack', 'Hobo', 'No Preference'
  ];

  const emotions = [
    'Confident', 'Creative', 'Grounded', 'Romantic', 'Gift-worthy'
  ];

  const handleColorToggle = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const handleBagTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      bagTypes: prev.bagTypes.includes(type)
        ? prev.bagTypes.filter(t => t !== type)
        : [...prev.bagTypes, type]
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    onComplete({
      type: 'personality',
      personality: formData.personality,
      colors: formData.colors,
      bagTypes: formData.bagTypes,
      emotion: formData.emotion
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.personality !== '';
      case 2: return formData.colors.length > 0;
      case 3: return true; // Optional step
      case 4: return true; // Optional step
      default: return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-heading font-semibold text-primary mb-2">
          Personality Discovery
        </h2>
        <p className="text-muted-foreground">
          Step {currentStep} of 4 • Let's understand your unique style
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>

      <Card className="card-luxury">
        <CardContent className="p-8">
          {/* Step 1: Personality Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-semibold text-center text-primary">
                What describes your personality best?
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {personalityTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      onClick={() => setFormData(prev => ({ ...prev, personality: type.value }))}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        formData.personality === type.value
                          ? 'border-secondary bg-secondary/10 text-secondary'
                          : 'border-border hover:border-secondary/50 hover:bg-secondary/5'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium text-center">{type.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Color Preferences */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-semibold text-center text-primary">
                Which color palettes speak to you?
              </h3>
              <p className="text-center text-muted-foreground text-sm">
                Select all that you love
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {colorPalettes.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorToggle(color)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.colors.includes(color)
                        ? 'border-secondary bg-secondary/10 text-secondary'
                        : 'border-border hover:border-secondary/50 hover:bg-secondary/5'
                    }`}
                  >
                    <Sparkles className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-sm font-medium text-center">{color}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Bag Types */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-semibold text-center text-primary">
                Favorite bag styles?
              </h3>
              <p className="text-center text-muted-foreground text-sm">
                Optional - helps us refine your recommendations
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {bagTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleBagTypeToggle(type)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.bagTypes.includes(type)
                        ? 'border-secondary bg-secondary/10 text-secondary'
                        : 'border-border hover:border-secondary/50 hover:bg-secondary/5'
                    }`}
                  >
                    <Camera className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-sm font-medium text-center">{type}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Desired Emotion */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-semibold text-center text-primary">
                How do you want to feel when carrying your bag?
              </h3>
              <p className="text-center text-muted-foreground text-sm">
                Optional - helps us find the perfect emotional match
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {emotions.map((emotion) => (
                  <button
                    key={emotion}
                    onClick={() => setFormData(prev => ({ ...prev, emotion }))}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.emotion === emotion
                        ? 'border-secondary bg-secondary/10 text-secondary'
                        : 'border-border hover:border-secondary/50 hover:bg-secondary/5'
                    }`}
                  >
                    <Heart className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-sm font-medium text-center">{emotion}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={currentStep === 1 ? onBack : () => setCurrentStep(currentStep - 1)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="btn-gold flex items-center gap-2"
        >
          {currentStep === 4 ? 'Find My Perfect Bag' : 'Next'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default PersonalityQuiz;