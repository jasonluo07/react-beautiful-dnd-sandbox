import { useState } from 'react';
import styled from 'styled-components';
import Column from './Column';
import AddColumn from './AddColumn';
import { IKanban } from '../types';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import produce from 'immer';
import initialData from '../initialData';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #e6e6e6;
  min-width: 100vw;
  min-height: 100vh;
`;

export default function Kanban() {
  const [kanban, setKanban] = useState<IKanban>(initialData);

  function handleDragEnd(result: DropResult) {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'task') {
      setKanban(prevKanban => {
        return produce(prevKanban, draft => {
          draft.columns[source.droppableId].taskOrder.splice(source.index, 1);
          draft.columns[destination.droppableId].taskOrder.splice(destination.index, 0, draggableId);
        });
      });
    } else if (type === 'column') {
      setKanban(prevKanban => {
        return produce(prevKanban, draft => {
          draft.columnOrder.splice(source.index, 1);
          draft.columnOrder.splice(destination.index, 0, draggableId);
        });
      });
    }
  }

  const handleAddTask = (columnId: string, content: string) => {
    if (!content) return;

    const newTaskId = `task-${Date.now()}`;
    const newTask = { id: newTaskId, content };
    setKanban(prevKanban => {
      return produce(prevKanban, draft => {
        draft.tasks[newTaskId] = newTask;
        draft.columns[columnId].taskOrder.push(newTaskId);
      });
    });
  };

  const handleAddColumn = (title: string) => {
    if (!title) return;
  
    const newColumnId = `column-${Date.now()}`;
    const newColumn = { id: newColumnId, title, taskOrder: [] };
    setKanban(prevKanban => {
      return produce(prevKanban, draft => {
        draft.columns[newColumnId] = newColumn;
        draft.columnOrder.push(newColumnId);
      });
    });
  };  

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="allColumns" direction="horizontal" type="column">
        {provided => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {kanban.columnOrder.map((columnId, index) => {
              const column = kanban.columns[columnId];
              const tasks = column.taskOrder.map(taskId => kanban.tasks[taskId]);
              return <Column key={column.id} column={column} tasks={tasks} index={index} onAddTask={handleAddTask} />;
            })}
            {provided.placeholder}
            <AddColumn onAddColumn={handleAddColumn} />
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
