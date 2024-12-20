"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { toast } from "sonner";
import { useState } from "react";

const sizes = ["S", "M", "L", "XL", "XXL"] as const;
type Size = (typeof sizes)[number];

type SizeGuide = {
  [key in Size]: {
    chest: string;
    length: string;
    shoulders: string;
  };
};

const sizeGuide: SizeGuide = {
  S: { chest: "36-38", length: "27", shoulders: "17" },
  M: { chest: "38-40", length: "28", shoulders: "18" },
  L: { chest: "40-42", length: "29", shoulders: "19" },
  XL: { chest: "42-44", length: "30", shoulders: "20" },
  XXL: { chest: "44-46", length: "31", shoulders: "21" },
};

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
    id: "cloth_1",
    name: "Classic Baseball T-Shirt",
    price: 29.99,
    description: "Stylish gray and white baseball raglan sleeve t-shirt",
    image: "/picture for clothing/Baseball-T-Shirt-PNG-Pic.png",
    category: "T-Shirts",
  },
  {
    id: "cloth_2",
    name: "Threadgill's Baseball Tee",
    price: 34.99,
    description: "Vintage-style baseball tee with Austin, Texas print",
    image: "/picture for clothing/Baseball-T-Shirt-Transparent-PNG.png",
    category: "T-Shirts",
  },
  {
    id: "cloth_3",
    name: "Stranger Things Christmas Sweater",
    price: 49.99,
    description: "Festive holiday sweater with unique alphabet design",
    image: "/picture for clothing/Christmas-Jumper-PNG-Free-Download.png",
    category: "Sweaters",
  },
  {
    id: "cloth_4",
    name: "Douchebag Graphic Tee",
    price: 24.99,
    description: "Gray cotton t-shirt with iconic Che graphic design",
    image: "/picture for clothing/Douche-Bag-Neck-T-Shirt-PNG-HD.png",
    category: "T-Shirts",
  },
  {
    id: "cloth_5",
    name: "Naruto Fan T-Shirt",
    price: 29.99,
    description: "White t-shirt featuring Naruto anime character",
    image: "/picture for clothing/Printed-T-Shirt-PNG-Clipart.png",
    category: "T-Shirts",
  },
];

export default function ClothingPage() {
  const { addItem } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [selectedSize, setSelectedSize] = useState<Size | "">("");

  const handleAddToCart = (product: Product) => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addItem({ ...product, selectedSize, quantity: 1 });
    toast.success(`Added ${product.name} (Size: ${selectedSize}) to cart`);
    setSelectedSize("");
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
            <h1 className="text-3xl font-bold">Clothing Collection</h1>
            <p className="text-muted-foreground">
              Browse our premium clothing collection
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
                <CardFooter className="flex flex-col gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Select Size
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] w-full sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>
                          Select Size for {product.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-6">
                        <div className="flex flex-wrap gap-2">
                          {sizes.map((size) => (
                            <Button
                              key={size}
                              variant={
                                selectedSize === size ? "default" : "outline"
                              }
                              onClick={() => setSelectedSize(size)}
                              className="flex-1 min-w-[60px]"
                            >
                              {size}
                            </Button>
                          ))}
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold">Size Guide (inches)</h4>
                          <div className="overflow-auto">
                            <div className="grid grid-cols-4 gap-2 text-sm min-w-[300px]">
                              <div className="font-medium">Size</div>
                              <div className="font-medium">Chest</div>
                              <div className="font-medium">Length</div>
                              <div className="font-medium">Shoulders</div>
                              {sizes.map((size) => (
                                <React.Fragment key={size}>
                                  <div>{size}</div>
                                  <div>{sizeGuide[size].chest}</div>
                                  <div>{sizeGuide[size].length}</div>
                                  <div>{sizeGuide[size].shoulders}</div>
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button
                          className="w-full gap-2"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
