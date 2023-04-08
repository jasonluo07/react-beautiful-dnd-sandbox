import { useState } from 'react';
import initialData from './initialData';
import Column from './components/Column';
import { IData } from './types';
import { DragDropContext } from '@hello-pangea/dnd';

export default function App() {
  const [data, setData] = useState<IData>(initialData);

  function handleDragEnd() {
    // TODO: reordering logic
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {data.columnOrder.map(columnId => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}
