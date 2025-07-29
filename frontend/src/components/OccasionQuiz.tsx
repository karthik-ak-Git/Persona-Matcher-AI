import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Gift, Briefcase, PartyPopper, Plane, GraduationCap, Heart, Coffee, Plus } from 'lucide-react';
import type { QuizData } from './StyleAdvisor';

interface OccasionQuizProps {
  onComplete: (data: QuizData) => void;
  onBack: () => void;
}

const OccasionQuiz = ({ onComplete, onBack }: OccasionQuizProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    occasion: '',
    who: '',
    colors: [] as string[],
    bagTypes: [] as string[]
  });

  const occasions = [
    { value: 'gift', label: 'Gift for Someone', icon: Gift },
    { value: 'everyday', label: 'Everyday Use', icon: Coffee },
    { value: 'work', label: 'Office/Work', icon: Briefcase },
    { value: 'party', label: 'Party/Event', icon: PartyPopper },
    { value: 'travel', label: 'Travel/Holiday', icon: Plane },
    { value: 'graduation', label: 'Graduation or Special Moment', icon: GraduationCap },
    { value: 'date', label: 'Romantic Date', icon: Heart },
    { value: 'other', label: 'Other', icon: Plus }
  ];

  const recipients = [
    'Myself', 'Mother', 'Wife', 'Friend', 'Daughter', 'Sister', 'Colleague', 'Unsure'
  ];

  const colorPalettes = [
    'Red', 'Black', 'Floral', 'Pastel', 'Earthy', 'Neutral', 'Vibrant', 'Gold', 'Abstract', 'Metallic'
  ];

  const bagTypes = [
    'Crossbody', 'Tote', 'Clutch', 'Backpack', 'Hobo', 'No Preference'
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
      type: 'occasion',
      occasion: formData.occasion,
      who: formData.who,
      colors: formData.colors,
      bagTypes: formData.bagTypes
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.occasion !== '';
      case 2: return formData.who !== '';
      case 3: return formData.colors.length > 0;
      case 4: return true; // Optional step
      default: return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-heading font-semibold text-primary mb-2">
          Occasion Finder
        </h2>
        <p className="text-muted-foreground">
          Step {currentStep} of 4 • Perfect for every special moment
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
          {/* Step 1: Occasion Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-semibold text-center text-primary">
                What's the occasion?
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {occasions.map((occasion) => {
                  const Icon = occasion.icon;
                  return (
                    <button
                      key={occasion.value}
                      onClick={() => setFormData(prev => ({ ...prev, occasion: occasion.value }))}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        formData.occasion === occasion.value
                          ? 'border-secondary bg-secondary/10 text-secondary'
                          : 'border-border hover:border-secondary/50 hover:bg-secondary/5'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium text-center">{occasion.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Recipient */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-semibold text-center text-primary">
                Who is this for?
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {recipients.map((recipient) => (
                  <button
                    key={recipient}
                    onClick={() => setFormData(prev => ({ ...prev, who: recipient }))}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.who === recipient
                        ? 'border-secondary bg-secondary/10 text-secondary'
                        : 'border-border hover:border-secondary/50 hover:bg-secondary/5'
                    }`}
                  >
                    <Heart className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-sm font-medium text-center">{recipient}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Color Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-semibold text-center text-primary">
                Preferred color palettes?
              </h3>
              <p className="text-center text-muted-foreground text-sm">
                Select all that would work well
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
                    <div className="w-6 h-6 mx-auto mb-2 bg-gradient-to-br from-primary to-secondary rounded-full" />
                    <div className="text-sm font-medium text-center">{color}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Bag Type Preference */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-semibold text-center text-primary">
                Any bag style preferences?
              </h3>
              <p className="text-center text-muted-foreground text-sm">
                Optional - helps narrow down the perfect options
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
                    <Briefcase className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-sm font-medium text-center">{type}</div>
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
          {currentStep === 4 ? 'Find Perfect Recommendations' : 'Next'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default OccasionQuiz;