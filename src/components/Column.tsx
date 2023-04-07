import styled from 'styled-components';
import Task from './Task';
import { IColumn, ITask } from '../types';

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
  key: string;
  column: IColumn;
  tasks: ITask[];
}

export default function Column(props: IColumnProps) {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <TaskList>
        {props.tasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </TaskList>
    </Container>
  );
}
