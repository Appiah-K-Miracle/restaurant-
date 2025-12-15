// src/components/attendance/AttendanceActions.tsx
import { Button } from "@/components/ui/button";
import { AttendanceStatus } from "@/types/attendance";
import { statusStyles } from "@/lib/attendance-colors";

interface Props {
  currentStatus?: AttendanceStatus;
  onChange: (status: AttendanceStatus) => void;
}

const STATUSES: AttendanceStatus[] = [
  "PRESENT",
  "ABSENT",
  "HALF_SHIFT",
  "LEAVE",
];

export function AttendanceActions({ currentStatus, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {STATUSES.map((status) => (
        <Button
          key={status}
          size="sm"
          className={`rounded-xl ${statusStyles[status]} ${
            currentStatus === status ? "ring-2 ring-white" : ""
          }`}
          onClick={() => onChange(status)}
        >
          {status.replace("_", " ")}
        </Button>
      ))}
    </div>
  );
}
