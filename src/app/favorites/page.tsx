"use client";

import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function FavoritesPage() {
  const { addItem } = useCart();
  const { favorites, removeFromFavorites } = useFavorites();

  const handleAddToCart = (product: Product) => {
    addItem({
      ...product,
      quantity: 1,
    });
    toast.success(`Added ${product.name} to cart`);
  };

  const handleRemoveFromFavorites = (product: Product) => {
    removeFromFavorites(product.id);
    toast.success(`Removed ${product.name} from favorites`);
  };

  return (
    <>
      <Navbar />
      <div className="container py-10 flex flex-col items-center">
        <div className="space-y-8 max-w-4xl w-full">
          <div className="text-center">
            <h1 className="text-3xl font-bold">My Favorites</h1>
            <p className="text-muted-foreground">
              Your favorite items collection
            </p>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No favorite items yet</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative aspect-square bg-white">
                    <div className="absolute right-2 top-2 z-10">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/80 hover:bg-white text-red-500"
                        onClick={() => handleRemoveFromFavorites(product)}
                      >
                        <Heart className="h-5 w-5 fill-current" />
                      </Button>
                    </div>
                    <div className="relative w-full h-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                        priority
                      />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <span className="font-bold">${product.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      className="w-full gap-2"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
