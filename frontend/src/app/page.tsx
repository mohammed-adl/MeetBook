import Link from "next/link";
import { Calendar, Clock, DollarSign, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-black" />
              <span className="text-2xl font-bold text-black">MeetBook</span>
            </div>
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-black mb-6">
            Schedule Meetings, Simplified
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect providers and clients through seamless video meeting
            bookings. Set your availability, define your rates, and let clients
            book instantly.
          </p>
          <Link href="/auth">
            <Button size="lg" className="text-lg">
              Start Booking Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-black mb-12">
          How MeetBook Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Users className="w-12 h-12 mx-auto mb-2 text-black" />
              <CardTitle className="text-center">
                Two-Sided Marketplace
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Register as a Provider to offer time slots or as a Client to
                book meetings.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="w-12 h-12 mx-auto mb-2 text-black" />
              <CardTitle className="text-center">Flexible Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Providers set availability, clients book any open slot that fits
                their schedule.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <DollarSign className="w-12 h-12 mx-auto mb-2 text-black" />
              <CardTitle className="text-center">Dynamic Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Costs calculated based on provider hourly rates and meeting
                duration.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>
            &copy; 2025 MeetBook. Built with Next.js, NestJS, and PostgreSQL.
          </p>
        </div>
      </footer>
    </div>
  );
}
