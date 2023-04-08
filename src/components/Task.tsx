import styled from 'styled-components';
import { ITask } from '../types';
import { Draggable } from '@hello-pangea/dnd';

const Container = styled.div<{ isDragging: boolean }>`
  border: 3px solid lightgrey;
  border-radius: 50%;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ITaskProps {
  task: ITask;
  index: number;
}

export default function Task(props: ITaskProps) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {props.task.content[0]}
        </Container>
      )}
    </Draggable>
  );
}
