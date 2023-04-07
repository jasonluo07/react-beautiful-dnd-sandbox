import { useState } from 'react';
import initialData from './initial-dats';
import Column from './components/Column';
import { IData } from './types';

export default function App() {
  const [data, setData] = useState<IData>(initialData);

  return (
    <div>
      {data.columnOrder.map(columnId => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </div>
  );
}
