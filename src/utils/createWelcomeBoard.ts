import { v4 as uuidv4 } from "uuid";

import type { SubtaskType, BoardType, ColumnType, TaskType } from "@/types";
import { updateLS } from "./ls";

export default function () {
  // first ever page visit
  if (!localStorage.getItem("boards")) {
    const boardId = uuidv4();
    const board: BoardType = { id: boardId, title: "Welcome!" };
    updateLS("boards", board);

    const todoColId = uuidv4();
    const todoCol: ColumnType = {
      id: todoColId,
      boardId,
      color: "bg-indigo-600",
      title: "TODO",
    };
    updateLS("columns", todoCol);

    const doingColId = uuidv4();
    const doingCol: ColumnType = {
      id: doingColId,
      boardId,
      color: "bg-pink-600",
      title: "DOING",
    };
    updateLS("columns", doingCol);

    const doneColId = uuidv4();
    const doneCol: ColumnType = {
      id: doneColId,
      boardId,
      color: "bg-teal-800",
      title: "DONE",
    };
    updateLS("columns", doneCol);

    const task1Id = uuidv4();
    const task1: TaskType = {
      columnId: todoColId,
      id: task1Id,
      description: "Learn what a kanban is and how to use it.",
      title: "Kanban",
      order: 1,
    };
    updateLS("tasks", task1);

    const subtask1: SubtaskType = {
      taskId: task1Id,
      id: uuidv4(),
      isFinished: false,
      title: "With Kanban, you can manage work.",
    };
    updateLS("subtasks", subtask1);

    const subtask2: SubtaskType = {
      taskId: task1Id,
      id: uuidv4(),
      isFinished: false,
      title: "It is a method to manage all types of professional services",
    };
    updateLS("subtasks", subtask2);

    const subtask3: SubtaskType = {
      taskId: task1Id,
      id: uuidv4(),
      isFinished: false,
      title:
        "With the Kanban Method, you visualize invisible knowledge work and how it moves through a workflow",
    };
    updateLS("subtasks", subtask3);

    const subtask4: SubtaskType = {
      taskId: task1Id,
      id: uuidv4(),
      isFinished: false,
      title:
        "Using the Kanban method means applying a holistic way of thinking about your services",
    };
    updateLS("subtasks", subtask4);

    const task2Id = uuidv4();
    const task2: TaskType = {
      columnId: todoColId,
      id: task2Id,
      description: "Learn how to use kanibani.",
      title: "How To",
      order: 2,
    };
    updateLS("tasks", task2);

    const subtaskHowTo1: SubtaskType = {
      taskId: task2Id,
      id: uuidv4(),
      isFinished: false,
      title: "CRUD",
    };
    updateLS("subtasks", subtaskHowTo1);

    // TODO explain crud

    const task3Id = uuidv4();
    const task3: TaskType = {
      columnId: todoColId,
      id: task3Id,
      description: "You can drag and drop your tasks between your columns.",
      title: "Drag & Drop",
      order: 3,
    };
    updateLS("tasks", task3);

    return board;
  }

  return null;
}
