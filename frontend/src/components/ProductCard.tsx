import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Heart } from 'lucide-react';
import { useState } from 'react';

interface Product {
  name: string;
  price: string;
  image: string;
  link: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="card-gold group hover:shadow-xl transition-all duration-300 w-80 animate-fade-in">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-2xl">
          {!imageError ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-secondary/30 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-muted-foreground font-medium">Anuschka Handbag</p>
              </div>
            </div>
          )}
          
          {/* Favorite Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full border-2 border-white/30 backdrop-blur-sm transition-all duration-300 flex items-center justify-center ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-heading font-semibold text-primary group-hover:text-secondary transition-colors">
              {product.name}
            </h3>
            <p className="text-2xl font-bold text-secondary mt-1">
              {product.price}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-medium">
                Hand-painted
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                Leather
              </span>
            </div>

            <Button
              onClick={() => window.open(product.link, '_blank', 'noopener,noreferrer')}
              className="btn-gold w-full group"
            >
              <span>Visit Product</span>
              <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;