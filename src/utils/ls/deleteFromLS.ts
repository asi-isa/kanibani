import type { SubtaskType } from "@/components/form/subtasks/SubtasksInput.vue";
import type { ColumnType } from "@/components/kanban/AddColumn.vue";
import type { TaskType } from "@/components/kanban/AddTask.vue";
import type { BoardType } from "@/components/Sidebar.vue";
import getFromLS from "./getFromLS";

interface Idable {
  id: string;
}

export default function deleteFromLS<T extends Idable>(
  key: string,
  where?: (t: T) => boolean
) {
  function invert(where?: (t: T) => boolean) {
    if (!where) return (t: T) => false;

    return (t: T) => {
      return !where(t);
    };
  }

  const items_ = getFromLS<T>(key, invert(where));

  const items: { [key: string]: T } = {};
  items_.forEach((t) => {
    items[t.id] = t;
  });

  localStorage.setItem(key, JSON.stringify(items));
}

// ondelete = cascade
export function deleteFromLSSubtasks(where?: (st: SubtaskType) => boolean) {
  deleteFromLS("subtasks", where);
}

export function deleteFromLSTasks(where?: (t: TaskType) => boolean) {
  const tasks = getFromLS<TaskType>("tasks", where);

  tasks.forEach((task) => {
    deleteFromLSSubtasks((st) => st.taskId === task.id);
  });

  deleteFromLS("tasks", where);
}

export function deleteFromLSColumns(where?: (c: ColumnType) => boolean) {
  const columns = getFromLS<ColumnType>("columns", where);

  columns.forEach((column) => {
    deleteFromLSTasks((t) => t.columnId === column.id);
  });

  deleteFromLS("columns", where);
}

export function deleteFromLSBoards(where?: (b: BoardType) => boolean) {
  const boards = getFromLS<BoardType>("boards", where);

  boards.forEach((board) => {
    deleteFromLSColumns((c) => c.boardId === board.id);
  });

  deleteFromLS("boards", where);
}
