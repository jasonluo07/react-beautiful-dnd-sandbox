import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 8px;
  margin: 0 8px 8px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: white;
  border-radius: 2px;
  border: 1px solid lightgrey;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  background-color: #5aac44;
  color: white;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    background-color: #6abc54;
  }
`;

interface AddTaskProps {
  columnId: string;
  onAddTask: (columnId: string, content: string) => void;
}

export default function AddTask(props: AddTaskProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim()) {
      props.onAddTask(props.columnId, inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <Container>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a new task..."
      />
      <Button onClick={handleSubmit}>Add Task</Button>
    </Container>
  );
};

