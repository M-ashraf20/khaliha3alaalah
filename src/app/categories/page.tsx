"use client";

import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shirt, Watch } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "Clothing",
    description: "Discover our latest fashion collection",
    icon: Shirt,
    subcategories: ["T-Shirts"],
    href: "/categories/clothing",
  },
  {
    title: "Accessories",
    description: "Complete your look with our accessories",
    icon: Watch,
    subcategories: ["Watches"],
    href: "/categories/accessories",
  },
];

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <div className="container py-10">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Categories</h1>
            <p className="text-muted-foreground">
              Browse our collection by category
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((category) => (
              <Card
                key={category.title}
                className="border border-border bg-card"
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <category.icon className="h-6 w-6 text-foreground" />
                    <CardTitle className="text-foreground">
                      {category.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((subcategory) => (
                        <Button
                          key={subcategory}
                          variant="outline"
                          size="sm"
                          className="rounded-full border-border hover:bg-accent hover:text-accent-foreground"
                          asChild
                        >
                          <Link
                            href={`${
                              category.href
                            }/${subcategory.toLowerCase()}`}
                          >
                            {subcategory}
                          </Link>
                        </Button>
                      ))}
                    </div>
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      asChild
                    >
                      <Link href={category.href}>
                        View All {category.title}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
