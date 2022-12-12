import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoPage from './pages/TodoPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TodoPage />
  </React.StrictMode>
);
