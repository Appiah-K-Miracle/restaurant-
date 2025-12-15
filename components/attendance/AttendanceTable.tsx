// src/components/attendance/AttendanceTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AttendanceActions } from "./AttendanceActions";
import { AttendanceStatus } from "@/types/attendance";

interface StaffAttendance {
  id: string;
  name: string;
  role: string;
  date: string;
  time: string;
  status?: AttendanceStatus;
}

export function AttendanceTable({
  data,
  onStatusChange,
}: {
  data: StaffAttendance[];
  onStatusChange: (id: string, status: AttendanceStatus) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Timings</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((staff) => (
          <TableRow key={staff.id} className="bg-zinc-800">
            <TableCell>#{staff.id}</TableCell>
            <TableCell className="flex gap-3 items-center">
              <Avatar>
                <AvatarFallback>{staff.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{staff.name}</p>
                <p className="text-xs text-muted-foreground">{staff.role}</p>
              </div>
            </TableCell>
            <TableCell>{staff.date}</TableCell>
            <TableCell>{staff.time}</TableCell>
            <TableCell>
              <AttendanceActions
                currentStatus={staff.status}
                onChange={(status) => onStatusChange(staff.id, status)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
