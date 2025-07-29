import { Card, CardContent } from '@/components/ui/card';
import { Heart, Calendar, Sparkles, Gift } from 'lucide-react';

interface QuizSelectorProps {
  onSelect: (type: 'personality' | 'occasion') => void;
}

const QuizSelector = ({ onSelect }: QuizSelectorProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-heading font-semibold text-primary mb-4">
          Choose Your Path
        </h2>
        <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
          Let's find your perfect handbag. How would you like to discover your match?
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Personality Path */}
        <Card 
          className="card-gold cursor-pointer group hover:scale-105 transition-all duration-300"
          onClick={() => onSelect('personality')}
        >
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-teal rounded-full flex items-center justify-center group-hover:animate-pulse">
              <Heart className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <div>
              <h3 className="text-2xl font-heading font-semibold text-primary mb-3">
                Discover by Personality
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                Match your inner vibe and personal style. Let us understand who you are 
                and find handbags that reflect your unique personality.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-secondary">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">Express Yourself</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>

        {/* Occasion Path */}
        <Card 
          className="card-gold cursor-pointer group hover:scale-105 transition-all duration-300"
          onClick={() => onSelect('occasion')}
        >
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-secondary to-gold rounded-full flex items-center justify-center group-hover:animate-pulse">
              <Calendar className="w-10 h-10 text-foreground" />
            </div>
            
            <div>
              <h3 className="text-2xl font-heading font-semibold text-primary mb-3">
                Choose by Occasion
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                Perfect for specific events, gifts, or daily needs. Tell us the occasion 
                and we'll find the ideal handbag for that special moment.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-secondary">
              <Gift className="w-4 h-4" />
              <span className="font-medium">Perfect for the Moment</span>
              <Gift className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-sm text-muted-foreground font-body">
        Both paths lead to personalized recommendations tailored just for you
      </div>
    </div>
  );
};

export default QuizSelector;