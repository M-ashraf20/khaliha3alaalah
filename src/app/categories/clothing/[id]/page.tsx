"use client";

import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/context/cart-context";

// This would typically come from an API or database
const product = {
  id: "cloth_1",
  name: "Classic Baseball T-Shirt",
  price: 29.99,
  description: "Stylish gray and white baseball raglan sleeve t-shirt.",
  image: "/picture for clothing/Baseball-T-Shirt-PNG-Pic.png",
  category: "T-Shirts",
  sizes: ["S", "M", "L", "XL"],
  colors: ["White", "Black", "Gray"],
};

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select both size and color");
      return;
    }

    const cartItem = {
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    };

    addItem(cartItem);
    toast.success("Added to cart!");
  };

  return (
    <>
      <Navbar />
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-2xl font-bold mt-2">${product.price}</p>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            {/* Size Selection */}
            <div className="space-y-2">
              <h3 className="font-semibold">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className="w-12"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <h3 className="font-semibold">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <h3 className="font-semibold">Quantity</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <Button className="flex-1 gap-2" onClick={handleAddToCart}>
                Add to Cart
                <ShoppingCart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
