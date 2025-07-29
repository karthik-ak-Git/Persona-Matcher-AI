import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Camera } from 'lucide-react';
import StyleAdvisor from './StyleAdvisor';
import VisualMatch from './VisualMatch';

const AnuschkaStylist = () => {
  const [activeTab, setActiveTab] = useState('style-advisor');

  return (
    <div className="min-h-screen watercolor-bg">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-4">
            Anuschka AI Stylist
          </h1>
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            Discover your perfect hand-painted leather handbag through our AI-powered 
            personal shopping experience. Let us match your unique style.
          </p>
        </div>

        {/* Main Content Card */}
        <Card className="card-luxury animate-slide-up">
          <CardContent className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Tab Navigation */}
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/30 p-2 rounded-2xl">
                <TabsTrigger 
                  value="style-advisor" 
                  className="flex items-center gap-2 py-4 px-6 rounded-xl font-medium text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal data-[state=active]:to-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5" />
                  Style Advisor
                </TabsTrigger>
                <TabsTrigger 
                  value="visual-match" 
                  className="flex items-center gap-2 py-4 px-6 rounded-xl font-medium text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal data-[state=active]:to-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  <Camera className="w-5 h-5" />
                  Visual Match
                </TabsTrigger>
              </TabsList>

              {/* Tab Content */}
              <TabsContent value="style-advisor" className="mt-0">
                <StyleAdvisor />
              </TabsContent>

              <TabsContent value="visual-match" className="mt-0">
                <VisualMatch />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 animate-fade-in">
          <p className="text-muted-foreground font-body">
            Powered by AI • Hand-painted with love • 
            <a 
              href="https://www.anuschkaleather.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary transition-colors ml-1 font-medium"
            >
              Visit Anuschka Leather
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnuschkaStylist;