import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, ShieldCheck } from "lucide-react";

const team = [
  {
    name: "Mohamed Ashraf",
    role: "CEO",
  },
  {
    name: "Amir Mohamed",
    role: "CTO",
  },
  {
    name: "Aya Mohamed",
    role: "CFO",
  },
  {
    name: "Mohamed RezQ",
    role: "Creative Director",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description: "Every product meets our high standards",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction is our priority",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Dedicated fashion specialists at your service",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="container py-10">
        <div className="space-y-12">
          {/* Value Proposition */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">About Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Curating quality fashion that brings confidence to your everyday
              style.
            </p>
          </div>

          {/* Company Values */}
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Team Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Our Team</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {team.map((member) => (
                <Card key={member.name}>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
