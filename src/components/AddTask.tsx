import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  border: 1px solid lightgrey;
`;

const Input = styled.input`
  height: 40px;
  line-height: 40px;
  border: none;
  width: 100%;
  padding: 0 8px;
  box-sizing: border-box;
`;

interface AddTaskProps {
  columnId: string;
  onAddTask: (columnId: string, content: string) => void;
}

export default function AddTask({ columnId, onAddTask }: AddTaskProps) {
  const [inputValue, setInputValue] = useState('');

  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      onAddTask(columnId, inputValue);
      setInputValue('');
    }
  }

  function handleContainerClick() {
    if (inputValue.trim()) {
      onAddTask(columnId, inputValue);
      setInputValue('');
    }
  }

  return (
    <Container onClick={handleContainerClick}>
      <Input
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
        placeholder="Add a new task..."
        onKeyPress={handleKeyPress}
      />
    </Container>
  );
}
