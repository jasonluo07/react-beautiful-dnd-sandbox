import styled from 'styled-components';
import Task from './Task';
import { IColumn, ITask } from '../types';
import { Droppable } from '@hello-pangea/dnd';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
`;

interface IColumnProps {
  column: IColumn;
  tasks: ITask[];
}

export default function Column(props: IColumnProps) {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <Droppable droppableId={props.column.id}>
        {provided => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {props.tasks.map(task => (
              <Task key={task.id} task={task} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
