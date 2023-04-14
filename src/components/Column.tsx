import styled from 'styled-components';
import AddTask from './AddTask';
import Task from './Task';
import { ColumnProps } from '../types';
import { Droppable, Draggable } from '@hello-pangea/dnd';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  min-width: 220px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  transition: background-color 0.2s ease;
`;

export default function Column(props: ColumnProps) {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {provided => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Title {...provided.dragHandleProps}>{props.column.title}</Title>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
                <AddTask
                  columnId={props.column.id}
                  onAddTask={props.onAddTask}
                />
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
}
