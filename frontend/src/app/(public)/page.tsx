"use client";

import Link from "next/link";

import { Calendar, Clock, DollarSign, Users, ArrowRight } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-foreground" />
              <span className="text-2xl font-bold text-foreground">
                MeetBook
              </span>
            </div>
            <Link href="/auth">
              <Button className="cursor-pointer">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Schedule Meetings, Simplified
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect providers and clients through seamless video meeting
            bookings. Set your availability, define your rates, and let clients
            book instantly.
          </p>
          <Link href="/auth">
            <Button size="lg" className="text-lg cursor-pointer">
              Start Booking Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-card">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">
          How MeetBook Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Users className="w-12 h-12 mx-auto mb-2 text-foreground" />
              <CardTitle className="text-center text-foreground">
                Two-Sided Marketplace
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-muted-foreground">
                Register as a Provider to offer time slots or as a Client to
                book meetings.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="w-12 h-12 mx-auto mb-2 text-foreground" />
              <CardTitle className="text-center text-foreground">
                Flexible Scheduling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-muted-foreground">
                Providers set availability, clients book any open slot that fits
                their schedule.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <DollarSign className="w-12 h-12 mx-auto mb-2 text-foreground" />
              <CardTitle className="text-center text-foreground">
                Dynamic Pricing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-muted-foreground">
                Costs calculated based on provider hourly rates and meeting
                duration.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>
            &copy; 2025 MeetBook. Built with Next.js, NestJS, and PostgreSQL.
          </p>
        </div>
      </footer>
    </div>
  );
}
