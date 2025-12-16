"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { AddEditStaffSheet, StaffData } from "@/components/staff/AddEditStaffSheet";

const staff = Array.from({ length: 12 }).map((_, i) => ({
  id: `#10${i}`,
  name: "Watson Joyce",
  role: "Manager",
  email: "watsonjoycell2@gmail.com",
  phone: "+1 (123) 123 4654",
  age: "45 yr",
  salary: "$2200.00",
  timing: "9am to 6pm",
}));

export default function StaffManagementTable() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState<"add" | "edit">("add");
  const [selectedStaff, setSelectedStaff] = useState<StaffData | undefined>(undefined);

  const handleAddStaff = () => {
    setSheetMode("add");
    setSelectedStaff(undefined);
    setSheetOpen(true);
  };

  const handleEditStaff = (staffMember: typeof staff[0]) => {
    setSheetMode("edit");
    setSelectedStaff({
      id: staffMember.id,
      name: staffMember.name,
      email: staffMember.email,
      role: staffMember.role,
      phone: staffMember.phone,
      salary: staffMember.salary,
      shiftStartTime: "09:00",
      shiftEndTime: "18:00",
      address: "",
      additionalDetails: "",
    });
    setSheetOpen(true);
  };

  const handleSaveStaff = (data: StaffData) => {
    console.log("Saving staff data:", data);
    // TODO: Implement actual save logic
  };

  return (
    <div className="flex-1 flex flex-col ml-16">
      <div className="w-full ">
        <div className="flex flex-row items-center justify-between px-4 mt-10">
          <h2 className="text-xl font-semibold">Staff (22)</h2>
          <div className="flex gap-2">
            <Button className="bg-primary text-primary-foreground" onClick={handleAddStaff}>Add Staff</Button>
            <Button variant="secondary">Sort by</Button>
          </div>
        </div>

        <div className="my-10 flex gap-2 mx-4">
          <Button variant="secondary" className="bg-primary text-primary-foreground">Staff Management</Button>
          <Button variant="ghost" disabled className="cursor-not-allowed opacity-50">
  Coming Soon
</Button>
        </div>

        <div>
          <div className="overflow-hidden ">
            <table className="w-full text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr className="text-left">
                  <th className="p-3"><Checkbox className="cursor-pointer" /></th>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Age</th>
                  <th className="p-3">Salary</th>
                  <th className="p-3">Timings</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s, i) => (
                  <tr
                    key={i}
                    className="border-t border-border bg-card even:bg-neutral-200 dark:even:bg-muted hover:bg-muted transition"
                  >
                    <td className="p-3"><Checkbox className="cursor-pointer " /></td>
                    <td className="p-3 text-muted-foreground">{s.id}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-full bg-neutral-300" />
                        <div>
                          <div className="font-medium">{s.name}</div>
                          <Badge variant="secondary" className="mt-1">{s.role}</Badge>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{s.email}</td>
                    <td className="p-3">{s.phone}</td>
                    <td className="p-3">{s.age}</td>
                    <td className="p-3">{s.salary}</td>
                    <td className="p-3">{s.timing}</td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="secondary"><Eye size={16} /></Button>
                        <Button size="icon" variant="secondary" onClick={() => handleEditStaff(s)}><Pencil size={16} /></Button>
                        <Button size="icon" variant="destructive"><Trash2 size={16} /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddEditStaffSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        mode={sheetMode}
        initialData={selectedStaff}
        onSave={handleSaveStaff}
      />
    </div>
  );
}
