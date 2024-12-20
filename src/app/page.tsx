import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-10">
        <div className="container max-w-3xl">
          <div className="text-center space-y-8">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Discover Amazing Products for Your Lifestyle
            </h1>
            <p className="text-lg text-muted-foreground">
              Shop the latest trends and find everything you need, all in one
              place. Quality products, competitive prices, and exceptional
              service.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <Link href="/categories">
                <Button size="lg" className="gap-2">
                  Shop Now <ShoppingBag className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="gap-2">
                  Learn More <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
