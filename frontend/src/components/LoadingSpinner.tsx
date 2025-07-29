import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Heart } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <Card className="card-luxury">
      <CardContent className="p-12">
        <div className="text-center space-y-6">
          {/* Animated Icons */}
          <div className="relative">
            <div className="w-20 h-20 mx-auto relative">
              {/* Rotating outer ring */}
              <div className="absolute inset-0 border-4 border-secondary/20 rounded-full animate-spin">
                <div className="w-3 h-3 bg-secondary rounded-full absolute -top-1.5 left-1/2 transform -translate-x-1/2"></div>
              </div>
              
              {/* Center icon */}
              <div className="absolute inset-2 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary-foreground animate-pulse" />
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h3 className="text-2xl font-heading font-semibold text-primary">
              Finding Your Perfect Match
            </h3>
            <p className="text-muted-foreground font-body">
              Our AI stylist is carefully selecting handbags that match your unique style...
            </p>
          </div>

          {/* Loading Steps */}
          <div className="space-y-3 max-w-md mx-auto">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">Analyzing your preferences</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-150"></div>
              <span className="text-muted-foreground">Matching with our collection</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-300"></div>
              <span className="text-muted-foreground">Curating personalized recommendations</span>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center gap-4 opacity-30">
            <Heart className="w-4 h-4 text-secondary animate-pulse" />
            <Sparkles className="w-4 h-4 text-primary animate-pulse delay-150" />
            <Heart className="w-4 h-4 text-secondary animate-pulse delay-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingSpinner;