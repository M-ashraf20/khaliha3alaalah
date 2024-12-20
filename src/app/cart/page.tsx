"use client";

import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Minus, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, ValidationError } from "@formspree/react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } =
    useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [state, handleSubmit] = useForm("myzyrrwn");

  const handleQuantityChange = (
    id: string,
    size: string | undefined,
    color: string | undefined,
    newQuantity: number
  ) => {
    if (newQuantity < 1) {
      removeItem(id, size, color);
      toast.success("Item removed from cart");
      return;
    }
    updateQuantity(id, size, color, newQuantity);
  };

  const handleRemoveItem = (
    id: string,
    size: string | undefined,
    color: string | undefined
  ) => {
    removeItem(id, size, color);
    toast.success("Item removed from cart");
  };

  if (state.succeeded) {
    toast.success("Order placed successfully!");
    clearCart();
    setShowCheckout(false);
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some items to your cart to see them here
          </p>
          <Button asChild>
            <a href="/categories">Continue Shopping</a>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="flex gap-4 border rounded-lg p-4"
              >
                <div className="relative aspect-square w-24">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 96px) 100vw, 96px"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-muted-foreground">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleRemoveItem(
                          item.id,
                          item.selectedSize,
                          item.selectedColor
                        )
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.selectedSize && `Size: ${item.selectedSize}`}
                    {item.selectedSize && item.selectedColor && " | "}
                    {item.selectedColor && `Color: ${item.selectedColor}`}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1
                          )
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1
                          )
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} × {formatPrice(item.price)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 space-y-4 sticky top-20">
              {!showCheckout ? (
                <>
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(getCartTotal())}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(getCartTotal())}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => setShowCheckout(true)}
                  >
                    Proceed to Checkout
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Checkout</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowCheckout(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="hidden"
                      name="order_details"
                      value={JSON.stringify({
                        items,
                        total: getCartTotal(),
                      })}
                    />
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        required
                      />
                      <ValidationError
                        prefix="Name"
                        field="name"
                        errors={state.errors}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        required
                      />
                      <ValidationError
                        prefix="Phone"
                        field="phone"
                        errors={state.errors}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Enter your delivery address"
                        required
                      />
                      <ValidationError
                        prefix="Address"
                        field="address"
                        errors={state.errors}
                      />
                    </div>
                    <div className="pt-4 space-y-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total to Pay</span>
                        <span>{formatPrice(getCartTotal())}</span>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={state.submitting}
                    >
                      Place Order
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
