"use client";

import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const watches = [
  {
    id: 1,
    name: "Classic Chronograph",
    price: "$129",
    description: "Elegant brown leather strap watch with gold accents",
    imagePlaceholder:
      "/pictures-for-aceess/—Pngtree—fathers day fatherly love watch_3884473.png",
  },
];

export default function WatchesPage() {
  return (
    <>
      <Navbar />
      <div className="container py-10">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Watches Collection
            </h1>
            <p className="text-muted-foreground">
              Discover our premium watch selection
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {watches.map((watch) => (
              <Card key={watch.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={watch.imagePlaceholder}
                    alt={watch.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-semibold text-lg">{watch.name}</h2>
                    <span className="text-primary font-medium">
                      {watch.price}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {watch.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
