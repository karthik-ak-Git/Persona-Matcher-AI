import { Card, CardContent } from '@/components/ui/card';
import ProductCard from './ProductCard';

interface Product {
  name: string;
  price: string;
  image: string;
  link: string;
}

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  if (products.length === 0) {
    return (
      <Card className="card-luxury">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No recommendations available at the moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto scrollbar-luxury">
        <div className="flex gap-6 pb-4 min-w-max">
          {products.map((product, index) => (
            <div key={index} className="flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      
      {products.length > 3 && (
        <p className="text-center text-sm text-muted-foreground">
          Scroll horizontally to see more recommendations
        </p>
      )}
    </div>
  );
};

export default ProductCarousel;