export interface Data {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface ColumnProps {
  column: Column;
  tasks: Task[];
  index: number;
}

export interface Task {
  id: string;
  content: string;
}

export interface TaskProps {
  task: Task;
  index: number;
}
