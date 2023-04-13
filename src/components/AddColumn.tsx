import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  min-width: 220px;
`;

const Input = styled.input`
  border: none;
  height: 40px;
  line-height: 40px;
  width: 100%;
  padding: 0 8px;
  box-sizing: border-box;
`;

interface AddColumnProps {
  onAddColumn: (title: string) => void;
}

export default function AddColumn(props: AddColumnProps) {
  const [title, setTitle] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      props.onAddColumn(title);
      setTitle('');
    }
  }

  return (
    <Container>
      <Input
        value={title}
        placeholder="Add a new column"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </Container>
  );
}
