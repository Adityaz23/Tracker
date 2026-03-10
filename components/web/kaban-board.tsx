"use client";

import { Board, Column } from "@/lib/models/models.types";
import {
  AwardIcon,
  CalendarHeartIcon,
  CheckCircle2,
  MicIcon,
  MoreVertical,
  Trash2,
  XCircleIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import CreateJobApplicationDialog from "./CreateJobApplicationDialog ";

interface KanbanBoardProps {
  board: Board;
  userId: string;
}

// interface for the col config :-
interface ColConfig {
  color: string;
  icon: React.ReactNode;
}

const COLUMN_CONFIG: Array<ColConfig> = [
  {
    color: "bg-cyan-400",
    icon: <CalendarHeartIcon className="h-4 w-4" />,
  },
  {
    color: "bg-indigo-400",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-orange-400",
    icon: <MicIcon className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-400",
    icon: <AwardIcon className="h-4 w-4" />,
  },
  {
    color: "bg-red-600",
    icon: <XCircleIcon className="h-4 w-4" />,
  },
];
// Drop and drag function :-
function DropableColumn({
  columns,
  config,
  boardId,
}: {
  columns: Column;
  config: ColConfig;
  boardId: string;
}) {
  return (
    <Card className="min-w-75 shrink-0 shadow-md p-0">
      <CardHeader
        className={`${config.color} text-white rounded-t-lg pb-2 pt-3`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle className="text-white text-base font-semibold">
              {columns.name}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-destructive">
                <Trash2 size={4} className="mr-2" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pt-4 bg-gray-50/50 min-h-100 rounded-b-lg">
        <CreateJobApplicationDialog columnId={columns._id} boardId={boardId} />
      </CardContent>
    </Card>
  );
}
export default function KanbaBoard({ board, userId }: KanbanBoardProps) {
  const columns = board.columns;
  return (
    <>
      <div>
        <div>
          {/* Looping through the columns :- */}
          {columns.map((col, key) => {
            const config = COLUMN_CONFIG[key] || {
              color: "bg-cyan-400",
              icon: <CalendarHeartIcon className="h-4 w-4" />,
            };
            return (
              <DropableColumn
                key={key}
                columns={col}
                config={config}
                boardId={board._id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
