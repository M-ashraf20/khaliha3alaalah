import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="container max-w-md mx-auto py-10">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-muted-foreground">
              We&apos;d love to hear from you. Get in touch with us.
            </p>
          </div>

          {/* Contact Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center gap-3 justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                  <a
                    href="mailto:Khaliha 3ala Allah@gmail.com"
                    className="text-lg hover:text-primary transition-colors"
                  >
                    Khaliha 3ala Allah@gmail.com
                  </a>
                </div>

                {/* Social Media */}
                <div className="space-y-4">
                  <h2 className="text-center font-semibold">Follow Us</h2>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="text-center text-sm text-muted-foreground">
                  <p>Business Hours</p>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
