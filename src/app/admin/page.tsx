// src/app/admin/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CarIcon, Palette, Settings, Users } from "lucide-react"; // Placeholder icons

export default function AdminDashboardPage() {
  // In the future, this page would fetch and display stats or quick actions.
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CarIcon className="mr-2 h-6 w-6 text-primary" />
              Manage Cars
            </CardTitle>
            <CardDescription>Add, edit, or remove car listings.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Control the inventory of cars available on the platform. Update details, images, and pricing.
            </p>
            <Button disabled className="w-full">Go to Car Management (Coming Soon)</Button>
            {/* <Link href="/admin/cars">
              <Button className="w-full">Go to Car Management</Button>
            </Link> */}
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-6 w-6 text-primary" />
              Site Settings
            </CardTitle>
            <CardDescription>Configure site-wide settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Update contact information (like WhatsApp number), "About Us" details, and other general settings.
            </p>
            <Button disabled className="w-full">Manage Site Settings (Coming Soon)</Button>
            {/* <Link href="/admin/settings">
               <Button className="w-full">Manage Site Settings</Button>
            </Link> */}
          </CardContent>
        </Card>
        
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="mr-2 h-6 w-6 text-primary" />
              Appearance
            </CardTitle>
            <CardDescription>Customize colors and typography.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Modify the look and feel of the website (colors, fonts). This feature is complex and planned for a future update.
            </p>
            <Button disabled className="w-full">Customize Appearance (Coming Soon)</Button>
          </CardContent>
        </Card>

        {/* Placeholder for future sections like Users, Orders, etc. */}
         <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-6 w-6 text-primary" />
              User Management
            </CardTitle>
            <CardDescription>View and manage user accounts.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Oversee registered users, roles, and permissions.
            </p>
            <Button disabled className="w-full">Manage Users (Coming Soon)</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
