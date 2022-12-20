import React from 'react';
import {
  act,
  renderHook,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { useTodo } from './useTodo';
import CreatePage from 'pages/CreatePage';
import TodoPage from 'pages/TodoPage';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// カウタムフックテスト
describe('useTodo', () => {
  describe('関数（api関係）', () => {
    describe('【関数テスト】fetchTodo', () => {
      it('データを取得し、DOMに反映される', async () => {
        // hookをレンダー
        const { result } = renderHook(() => useTodo());
        // fetchTodo実行
        result.current.fetchTodo(false);
        // 該当コンポーネントをレンダリング
        render(
          <BrowserRouter>
            <TodoPage />
          </BrowserRouter>
        );
        // 非同期処理の結果を待ちたいので、waitForを用いる
        await waitFor(() => {
          // 検証のターゲットを取得
          const target = screen.getByText('test05');
          // 結果確認
          expect(target).toBeTruthy();
        });
      });
    });
    describe('【関数テスト】addTodo', () => {
      it('データを追加し、DOMに反映される', () => {
        // hookをレンダー
        const { result } = renderHook(() => useTodo());
      });

      it('データ追加後に、フォームが空になっている', () => {});
    });
    describe('【関数テスト】updateDone', () => {
      it('test', () => {});
    });
    describe('【関数テスト】updateContent', () => {
      it('test', () => {});
    });
    describe('【関数テスト】removeTodo', () => {
      it('test', () => {});
    });
  });

  describe('関数（api以外）', () => {
    describe('【関数テスト】searchTodo', () => {
      // it('検索が正しく機能している', () => {
      //   // hookをレンダー
      //   const { result } = renderHook(() => useTodo());
      //   // デモデータ作成
      //   const demoTodos: TodoType[] = [
      //     {
      //       id: 'test01',
      //       content: 'test01',
      //       done: false,
      //     },
      //     {
      //       id: 'test02',
      //       content: 'test02',
      //       done: false,
      //     },
      //     {
      //       id: 'test03',
      //       content: 'test03',
      //       done: true,
      //     },
      //   ];
      //   // act()で囲むことで、hookで管理しているstateが更新されDOMに反映されることが保証される
      //   act(() => {
      //     // filterTodoでデモデータを完了・未完了に分け、それぞれのstateを更新
      //     result.current.filterTodo(demoTodos);
      //   });
      //   // 該当コンポーネントをレンダリング
      //   render(
      //     <BrowserRouter>
      //       <TodoPage />
      //     </BrowserRouter>
      //   );
      //   // 対象の要素を取得
      //   const inputElement = screen.getByPlaceholderText(
      //     /todoを検索/i
      //   ) as HTMLInputElement;
      //   // changeイベント登録。input要素にテキストを入力
      //   fireEvent.change(inputElement, {
      //     target: { value: 'test01' },
      //   });
      //   // act()で囲むことで、hookで管理しているstateが更新されDOMに反映されることが保証される
      //   act(() => {
      //     // searchTodoでデモデータから該当データを抽出し、完了・未完了それぞれのstateを更新
      //     result.current.searchTodo('test01');
      //   });
      //   // 対象の要素を取得
      //   const targetElement = screen.getByText(/test01/i);
      //   // 結果確認
      //   expect(targetElement).toBeInTheDocument;
      // });
    });
    describe('【関数テスト】resetTodo', () => {
      it('test', () => {});
    });
    describe('【関数テスト】filterTodo', () => {
      it('test', () => {});
    });
    describe('【関数テスト】getTargetJson', () => {
      it('test', () => {});
    });
  });
});

// テスト実行環境確認用テスト
describe('CreatePage', () => {
  // input要素に文字列を入力した際、入力した値が表示されているか確認
  it('InputForm value change', () => {
    // 該当コンポーネントをレンダリング
    render(
      <BrowserRouter>
        <CreatePage />
      </BrowserRouter>
    );
    // 対象の要素を取得
    const inputElement = screen.getByPlaceholderText(
      /todoを入力/i
    ) as HTMLInputElement;
    // changeイベント登録。input要素にテキストを入力
    fireEvent.change(inputElement, {
      target: { value: 'test' },
    });
    // 結果確認
    expect(inputElement.value).toBe('test');
  });
});
