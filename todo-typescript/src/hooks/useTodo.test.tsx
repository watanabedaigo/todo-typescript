import React from 'react';
import { renderHook, render, screen } from '@testing-library/react';
import { useTodo } from './useTodo';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CreatePage from 'pages/CreatePage';

it('【関数テスト】addTodo', () => {
  // inputが存在するか確認
  render(
    <BrowserRouter>
      <CreatePage />
    </BrowserRouter>
  );
  const inputElement = screen.getByPlaceholderText(/todoを入力/i);
  expect(inputElement).toBeInTheDocument();
});
