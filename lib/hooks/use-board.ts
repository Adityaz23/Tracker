// * Main hook fir this application for the functionality of the drag and drop .

import { useEffect, useState } from "react";
import { Board, Column } from "../models/models.types";

export function useBoard(initialBoard?: Board | null) {
  // creating the state to manange the frontend .
  const [board, setBoard] = useState<Board | null>(initialBoard || null);
  const [columns, setColumns] = useState<Column[]>(initialBoard?.columns || []);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
        if(initialBoard){
                setBoard(initialBoard)
                setColumns(initialBoard.columns || [])
        }
  }, [initialBoard]);

  //   function which will help to drag and drop the jobs :-
  async function moveJob(
    jobApplicationId: string,
    newColumnId: string,
    newOrder: number,
  ) {}

  return { board, columns, error, moveJob };
}
