export interface IKanban {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}

export interface Column {
  id: string;
  title: string;
  taskOrder: string[];
}

export interface ColumnProps {
  column: Column;
  tasks: Task[];
  index: number;
  onAddTask: (columnId: string, content: string) => void;
}

export interface Task {
  id: string;
  content: string;
}

export interface TaskProps {
  task: Task;
  index: number;
}
