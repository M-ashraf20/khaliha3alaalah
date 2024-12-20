"use client";

import * as React from "react";
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

const products: Product[] = [
  {
    id: "acc_1",
    name: "Professional Camera Bag",
    price: 79.99,
    description:
      "Durable black camera bag with multiple compartments and shoulder strap",
    image: "/pictures-for-aceess/Camera-Bag-PNG-HD-Isolated.png",
    category: "Bags",
  },
  {
    id: "acc_2",
    name: "Round Reading Glasses",
    price: 49.99,
    description: "Classic round frame reading glasses in black",
    image: "/pictures-for-aceess/Glasses-Transparent-PNG.png",
    category: "Eyewear",
  },
  {
    id: "acc_3",
    name: "Designer Aviator Sunglasses",
    price: 159.99,
    description:
      "Premium gold-frame aviator sunglasses with blue mirrored lenses",
    image: "/pictures-for-aceess/Stylish-Sunglasses-PNG-Free-Download.png",
    category: "Eyewear",
  },
  {
    id: "acc_4",
    name: "Classic Leather Watch",
    price: 129.99,
    description: "Elegant brown leather strap watch with gold accents",
    image:
      "/pictures-for-aceess/—Pngtree—fathers day fatherly love watch_3884473.png",
    category: "Watches",
  },
];

export default function AccessoriesPage() {
  const { addItem } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleAddToCart = (product: Product) => {
    addItem({
      ...product,
      quantity: 1,
    });
    toast.success(`Added ${product.name} to cart`);
  };

  const handleFavoriteClick = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      toast.success(`Removed ${product.name} from favorites`);
    } else {
      addToFavorites(product);
      toast.success(`Added ${product.name} to favorites`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-10">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Accessories Collection</h1>
            <p className="text-muted-foreground">
              Browse our premium accessories
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative aspect-square bg-white">
                  <div className="absolute right-2 top-2 z-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 ${
                        isFavorite(product.id)
                          ? "text-red-500"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                      onClick={() => handleFavoriteClick(product)}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isFavorite(product.id)
                            ? "fill-current text-red-500"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      />
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
        </div>
      </div>
    </>
  );
}
