import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, X, Sparkles } from 'lucide-react';
import ProductCarousel from './ProductCarousel';
import LoadingSpinner from './LoadingSpinner';

const VisualMatch = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview('');
    setRecommendations([]);
    setHasSearched(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const formData = new FormData();
      formData.append('file', uploadedImage);

      const response = await fetch('http://localhost:8000/recommend/image', {
        method: 'POST',
        body: formData
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
      } else {
        console.error('Failed to get recommendations');
        // Show mock data for demo
        setRecommendations([
          {
            name: "Harmonious Floral Tote",
            price: "$239",
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
            link: "https://www.anuschkaleather.com"
          },
          {
            name: "Artistic Crossbody",
            price: "$189",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
            link: "https://www.anuschkaleather.com"
          }
        ]);
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Show mock data for demo
      setRecommendations([
        {
          name: "Harmonious Floral Tote",
          price: "$239",
          image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
          link: "https://www.anuschkaleather.com"
        },
        {
          name: "Artistic Crossbody",
          price: "$189",
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
          link: "https://www.anuschkaleather.com"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-heading font-semibold text-primary mb-4">
          Visual Style Match
        </h2>
        <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
          Upload an image of your outfit, mood, or inspiration and let our AI find 
          handbags that perfectly complement your aesthetic.
        </p>
      </div>

      {!uploadedImage && (
        <Card className="card-luxury">
          <CardContent className="p-8">
            <div
              className="border-2 border-dashed border-secondary/30 rounded-2xl p-12 text-center space-y-6 transition-all duration-300 hover:border-secondary/60 hover:bg-secondary/5 cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-secondary to-gold rounded-full flex items-center justify-center">
                <Upload className="w-10 h-10 text-foreground" />
              </div>
              
              <div>
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                  Drop your image here or click to browse
                </h3>
                <p className="text-muted-foreground">
                  Upload a photo of your outfit, style inspiration, or mood board
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  <span>JPG, PNG</span>
                </div>
                <div>•</div>
                <div>Max 10MB</div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {uploadedImage && (
        <div className="space-y-6">
          <Card className="card-luxury">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Uploaded style"
                    className="w-32 h-32 object-cover rounded-xl shadow-lg"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-primary">
                      Perfect! We've got your style
                    </h3>
                    <p className="text-muted-foreground">
                      Our AI will analyze the colors, patterns, and aesthetic to find matching handbags.
                    </p>
                  </div>
                  
                  {!hasSearched && (
                    <Button
                      onClick={handleAnalyze}
                      className="btn-gold"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Find Matching Handbags
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {hasSearched && recommendations.length > 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-heading font-semibold text-primary mb-2">
                  Perfect Visual Matches
                </h3>
                <p className="text-muted-foreground">
                  Based on your image, here are handbags that complement your style:
                </p>
              </div>
              
              <ProductCarousel products={recommendations} />
              
              <div className="text-center">
                <Button
                  onClick={removeImage}
                  variant="outline"
                  className="mr-4"
                >
                  Try Another Image
                </Button>
                <Button
                  onClick={handleAnalyze}
                  className="btn-teal"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Refine Results
                </Button>
              </div>
            </div>
          )}

          {hasSearched && recommendations.length === 0 && (
            <Card className="card-luxury">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2">
                    No matches found
                  </h3>
                  <p className="text-muted-foreground">
                    Try uploading a different image or use our Style Advisor for personalized recommendations.
                  </p>
                </div>
                <Button
                  onClick={removeImage}
                  className="btn-teal"
                >
                  Try Another Image
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default VisualMatch;