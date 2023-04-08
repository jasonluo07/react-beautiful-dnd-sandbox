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
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    setData(prevData => {
      return produce(prevData, draft => {
        const sourceColumn = draft.columns[source.droppableId];
        const destinationColumn = draft.columns[destination.droppableId];

        sourceColumn.taskIds.splice(source.index, 1);
        if (sourceColumn === destinationColumn) {
          sourceColumn.taskIds.splice(destination.index, 0, draggableId);
        } else {
          destinationColumn.taskIds.splice(destination.index, 0, draggableId);
        }
      });
    });
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
