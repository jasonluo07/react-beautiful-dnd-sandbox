import styled from 'styled-components';
import { ITask } from '../types';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

interface ITaskProps {
  task: ITask;
}

function Task(props: ITaskProps) {
  return (
    <Container>
      {props.task.content}
    </Container>
  );
}

export default Task;
