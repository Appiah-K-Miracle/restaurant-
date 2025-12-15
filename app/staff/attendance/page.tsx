"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { AttendanceStatus } from "@/types/attendance";
import { useRouter } from "next/navigation";

const initialData = Array.from({ length: 12 }).map((_, i) => ({
  id: `10${i + 1}`,
  name: "Watson Joyce",
  role: "Manager",
  date: "16-Apr-2024",
  time: "9am to 6pm",
  status: undefined as AttendanceStatus | undefined,
}));

export default function AttendancePage() {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  const handleStatusChange = (id: string, status: AttendanceStatus) => {
    setData((prevData) =>
      prevData.map((staff) =>
        staff.id === id ? { ...staff, status } : staff
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col ml-16">
      <div className="w-full">
        <div className="flex flex-row items-center justify-between px-4 mt-10">
          <h2 className="text-xl font-semibold">Staff (22)</h2>
          <div className="flex gap-2">
            <Button className="bg-primary text-primary-foreground">Add Staff</Button>
            <Button variant="secondary">Sort by</Button>
          </div>
        </div>

        <div className="my-10 flex gap-2 mx-4">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/staff")}
          >
            Staff Management
          </Button>
          <Button 
            variant="secondary" 
            className="bg-primary text-primary-foreground"
          >
            Attendance
          </Button>
        </div>

        <div className="px-4">
          <AttendanceTable data={data} onStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
}
