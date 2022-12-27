export type SubtaskType = {
  id: string;
  taskId: string;
  title: string;
  isFinished: boolean;
};

export type ColumnType = {
  id: string;
  boardId: string | undefined;
  title: string;
  color: string;
};

export type TaskType = {
  id: string;
  title: string;
  description: string;
  columnId: string;
  order: number;
};

export type BoardType = { id: string; title: string };
