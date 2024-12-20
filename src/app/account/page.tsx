"use client";

import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import Image from "next/image";

// Mock data for orders
const mockOrders = [
  {
    id: 1,
    date: "2024-01-15",
    status: "Delivered",
    total: 289.97,
    items: [
      {
        id: 1,
        name: "Professional Camera Bag",
        price: 79.99,
        quantity: 1,
        image: "/pictures-for-aceess/Camera-Bag-PNG-HD-Isolated.png",
      },
      {
        id: 2,
        name: "Designer Aviator Sunglasses",
        price: 159.99,
        quantity: 1,
        image: "/pictures-for-aceess/Glasses-Transparent-PNG.png",
      },
    ],
  },
  {
    id: 2,
    date: "2024-01-10",
    status: "Delivered",
    total: 49.99,
    items: [
      {
        id: 3,
        name: "Round Reading Glasses",
        price: 49.99,
        quantity: 1,
        image: "/pictures-for-aceess/Stylish-Sunglasses-PNG-Free-Download.png",
      },
    ],
  },
];

export default function AccountPage() {
  // Mock user data
  const [userData] = useState({
    name: "Sha3ban Abelrehem",
    email: "sha3bola@sha3bola.com",
  });

  return (
    <>
      <Navbar />
      <div className="container py-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* User Information Section */}
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-muted-foreground">
              Manage your account and view orders
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Personal Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">Name</p>
                  <p className="text-muted-foreground">{userData.name}</p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{userData.email}</p>
                </div>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Account Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle>Account Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">Total Orders</p>
                  <p className="text-muted-foreground">{mockOrders.length}</p>
                </div>
                <div>
                  <p className="font-medium">Member Since</p>
                  <p className="text-muted-foreground">January 2024</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order History Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Order History</h2>
            {mockOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Order #{order.id}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Order Status and Total */}
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {order.status}
                      </span>
                      <span className="font-bold">
                        Total: ${order.total.toFixed(2)}
                      </span>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4 items-center">
                          <div className="relative w-20 h-20 bg-white rounded">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                            <p className="text-sm font-medium">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
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
