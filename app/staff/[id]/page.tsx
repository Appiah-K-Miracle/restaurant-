"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AddEditStaffSheet, StaffData } from "@/components/staff/AddEditStaffSheet";
import { ArrowLeft, Bell, ImageIcon } from "lucide-react";
import Link from "next/link";

// Mock staff data - in a real app, this would come from an API or database
const getStaffById = (id: string) => {
  // This is mock data - replace with actual data fetching
  return {
    id: id,
    name: "Watson Joyce",
    role: "Manager",
    email: "watsonjoycell2@gmail.com",
    phone: "+1 (123) 123 4654",
    dateOfBirth: new Date("1978-05-15"),
    address: "123 Main Street, Springfield, IL 62701",
    salary: "$2200.00",
    shiftStartTime: "09:00",
    shiftEndTime: "18:00",
    profileImage: "",
    additionalDetails: "",
  };
};

export default function StaffDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const { id } = use(params);
  const staff = getStaffById(id);
  
  const handleEditProfile = () => {
    setSheetOpen(true);
  };

  const handleSaveStaff = (data: StaffData) => {
    console.log("Saving staff data:", data);
    // TODO: Implement actual save logic
  };

  const handleDeleteProfile = () => {
    console.log("Deleting staff:", staff.id);
    // TODO: Implement actual delete logic
    setDeleteDialogOpen(false);
    router.push("/staff");
  };

  return (
    <div className="flex-1 flex flex-col ml-16">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/staff")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">{staff.name}</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
            <span className="sr-only">Notifications</span>
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-border">
              <AvatarImage src="/restaurant-manager-avatar.png" alt="Manager" />
              <AvatarFallback className="bg-secondary text-secondary-foreground">JD</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">Manager</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Profile Section */}
              <div className="lg:col-span-1">
                <div className="flex flex-col items-center gap-6">
                  {/* Profile Image */}
                  <div className="w-48 h-48 rounded-2xl bg-neutral-300 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
                    {staff.profileImage ? (
                      <img
                        src={staff.profileImage}
                        alt={staff.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-20 h-20 text-muted-foreground" />
                    )}
                  </div>
                  
                  <Link
                    href="#"
                    className="text-sm text-primary underline"
                  >
                    Change Profile Picture
                  </Link>

                  {/* Action Buttons */}
                  <div className="w-full space-y-3">
                    <Button
                      onClick={handleEditProfile}
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      Edit profile
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setDeleteDialogOpen(true)}
                      className="w-full border-2"
                    >
                      Delete profile
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column - Information Sections */}
              <div className="lg:col-span-2 space-y-8">
                {/* Employee Personal Details */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Employee Personal Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">
                        Full Name
                      </label>
                      <p className="mt-1 text-sm font-medium">{staff.name}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">
                        Email
                      </label>
                      <p className="mt-1 text-sm font-medium">{staff.email}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">
                        Phone Number
                      </label>
                      <p className="mt-1 text-sm font-medium">{staff.phone}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">
                        Date of Birth
                      </label>
                      <p className="mt-1 text-sm font-medium">
                        {staff.dateOfBirth.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">
                        Address
                      </label>
                      <p className="mt-1 text-sm font-medium">{staff.address}</p>
                    </div>
                  </div>
                </div>

                {/* Employee Job Details */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Employee Job Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">
                        Role
                      </label>
                      <p className="mt-1 text-sm font-medium">{staff.role}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">
                        Salary
                      </label>
                      <p className="mt-1 text-sm font-medium">{staff.salary}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">
                        Shift Start Timing
                      </label>
                      <p className="mt-1 text-sm font-medium">{staff.shiftStartTime}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">
                        Shift End Timing
                      </label>
                      <p className="mt-1 text-sm font-medium">{staff.shiftEndTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Staff Sheet */}
      <AddEditStaffSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        mode="edit"
        initialData={{
          id: staff.id,
          name: staff.name,
          email: staff.email,
          role: staff.role,
          phone: staff.phone,
          salary: staff.salary,
          dateOfBirth: staff.dateOfBirth,
          shiftStartTime: staff.shiftStartTime,
          shiftEndTime: staff.shiftEndTime,
          address: staff.address,
          additionalDetails: staff.additionalDetails,
          profileImage: staff.profileImage,
        }}
        onSave={handleSaveStaff}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the staff
              member "{staff.name}" and remove their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProfile}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
