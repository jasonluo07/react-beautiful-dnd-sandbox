import { useState } from 'react';
import initialData from './initialData';
import Column from './components/Column';
import { IData } from './types';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import produce from 'immer';

export default function App() {
  const [data, setData] = useState<IData>(initialData);

  function handleDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    setData(prevData => {
      return produce(prevData, draft => {
        const column = draft.columns[source.droppableId];
        column.taskIds.splice(source.index, 1);
        column.taskIds.splice(destination.index, 0, draggableId);
      });
    });
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
