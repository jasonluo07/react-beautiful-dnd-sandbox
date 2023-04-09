import { useState } from 'react';
import initialData from './initialData';
import styled from 'styled-components';
import Column from './components/Column';
import { IData } from './types';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import produce from 'immer';

const Container = styled.div`
  display: flex;
`;

export default function App() {
  const [data, setData] = useState<IData>(initialData);

  function handleDragEnd(result: DropResult) {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'task') {
      setData(prevData => {
        return produce(prevData, draft => {
          draft.columns[source.droppableId].taskIds.splice(source.index, 1);
          draft.columns[destination.droppableId].taskIds.splice(destination.index, 0, draggableId);
        });
      });
    } else if (type === 'column') {
      setData(prevData => {
        return produce(prevData, draft => {
          draft.columnOrder.splice(source.index, 1);
          draft.columnOrder.splice(destination.index, 0, draggableId);
        });
      });
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId="allColumns"
        direction="horizontal"
        type="column"
      >
        {provided => (
          <Container
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
              return <Column key={column.id} column={column} tasks={tasks} index={index} />;
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
