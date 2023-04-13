import styled from 'styled-components';
import { TaskProps } from '../types';
import { Draggable } from '@hello-pangea/dnd';

const Container = styled.div<{ isDragging: boolean }>`
  border: 1px solid lightgrey;
  padding: 0 8px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

export default function Task(props: TaskProps) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {props.task.content}
        </Container>
      )}
    </Draggable>
  );
}
