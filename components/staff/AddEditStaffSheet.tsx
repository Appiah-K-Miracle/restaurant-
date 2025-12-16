"use client";

import * as React from "react";
import { CalendarIcon, ImageIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export interface StaffData {
  id?: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  salary: string;
  dateOfBirth?: Date;
  shiftStartTime: string;
  shiftEndTime: string;
  address: string;
  additionalDetails: string;
  profileImage?: string;
}

interface AddEditStaffSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  initialData?: StaffData;
  onSave?: (data: StaffData) => void;
}

export function AddEditStaffSheet({
  open,
  onOpenChange,
  mode,
  initialData,
  onSave,
}: AddEditStaffSheetProps) {
  const [formData, setFormData] = React.useState<StaffData>(
    initialData || {
      name: "",
      email: "",
      role: "",
      phone: "",
      salary: "",
      dateOfBirth: undefined,
      shiftStartTime: "",
      shiftEndTime: "",
      address: "",
      additionalDetails: "",
      profileImage: "",
    }
  );

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSave?.(formData);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleFieldChange = (
    field: keyof StaffData,
    value: string | Date | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[480px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">
            {mode === "add" ? "Add Staff" : "Edit Staff"}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 py-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="w-10 h-10 text-muted-foreground" />
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-primary hover:text-primary/90"
            >
              Change Profile Picture
            </Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Row 1: Full Name & Email */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm text-muted-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  placeholder="Enter full name"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-muted-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  placeholder="Enter email"
                  className="h-10"
                />
              </div>
            </div>

            {/* Row 2: Role & Phone Number */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm text-muted-foreground">
                  Role
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleFieldChange("role", value)}
                >
                  <SelectTrigger id="role" className="h-10 w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Chef">Chef</SelectItem>
                    <SelectItem value="Waiter">Waiter</SelectItem>
                    <SelectItem value="Cashier">Cashier</SelectItem>
                    <SelectItem value="Cleaner">Cleaner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm text-muted-foreground">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  className="h-10"
                />
              </div>
            </div>

            {/* Row 3: Salary & Date of Birth */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary" className="text-sm text-muted-foreground">
                  Salary
                </Label>
                <Input
                  id="salary"
                  type="text"
                  value={formData.salary}
                  onChange={(e) => handleFieldChange("salary", e.target.value)}
                  placeholder="$0.00"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-sm text-muted-foreground">
                  Date of Birth
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="dob"
                      variant="outline"
                      className={cn(
                        "h-10 w-full justify-start text-left font-normal",
                        !formData.dateOfBirth && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfBirth ? (
                        format(formData.dateOfBirth, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dateOfBirth}
                      onSelect={(date) =>
                        handleFieldChange("dateOfBirth", date)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Row 4: Shift Start Time & Shift End Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="shiftStart"
                  className="text-sm text-muted-foreground"
                >
                  Shift Start Time
                </Label>
                <Input
                  id="shiftStart"
                  type="time"
                  value={formData.shiftStartTime}
                  onChange={(e) =>
                    handleFieldChange("shiftStartTime", e.target.value)
                  }
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="shiftEnd"
                  className="text-sm text-muted-foreground"
                >
                  Shift End Time
                </Label>
                <Input
                  id="shiftEnd"
                  type="time"
                  value={formData.shiftEndTime}
                  onChange={(e) =>
                    handleFieldChange("shiftEndTime", e.target.value)
                  }
                  className="h-10"
                />
              </div>
            </div>

            {/* Row 5: Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm text-muted-foreground">
                Address
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleFieldChange("address", e.target.value)}
                placeholder="Enter address"
                className="h-10"
              />
            </div>

            {/* Row 6: Additional Details */}
            <div className="space-y-2">
              <Label
                htmlFor="details"
                className="text-sm text-muted-foreground"
              >
                Additional Details
              </Label>
              <Textarea
                id="details"
                value={formData.additionalDetails}
                onChange={(e) =>
                  handleFieldChange("additionalDetails", e.target.value)
                }
                placeholder="Enter additional details"
                rows={4}
                className="resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <SheetFooter className="flex flex-row justify-end gap-3">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            Confirm
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
