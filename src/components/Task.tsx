import styled from 'styled-components';
import { ITask } from '../types';
import { Draggable } from '@hello-pangea/dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

interface ITaskProps {
  task: ITask;
  index: number;
}

export default function Task(props: ITaskProps) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {provided => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {props.task.content}
        </Container>
      )}
    </Draggable>
  );
}
