import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  background-color: white;
`;

const Input = styled.input`
  border: none;
  height: 40px;
  line-height: 40px;
  width: 100%;
  padding: 0 8px;
  box-sizing: border-box;
  font-size: 14px;
`;

interface AddTaskProps {
  columnId: string;
  onAddTask: (columnId: string, content: string) => void;
}

export default function AddTask({ columnId, onAddTask }: AddTaskProps) {
  const [title, setTitle] = useState('');

  function handleChange(evnet: ChangeEvent<HTMLInputElement>) {
    setTitle(evnet.target.value);
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      onAddTask(columnId, title);
      setTitle('');
    }
  }

  return (
    <Container>
      <Input
        value={title}
        placeholder="Add a new task"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </Container>
  );
}
