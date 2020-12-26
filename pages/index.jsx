import { useState } from "react";
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout'

const App = () => {
  // 作成したtodoを入れておくためのstate
  const [todos, setTodos] = useState([]);
  // フォームに入力された値をtodoに登録するまでに入れておくためのstate
  const [tmpTodo, setTmpTodo] = useState("");

  const addTodo = () => {
    // formの内容が空白の場合はalertを出す
    if (tmpTodo === "") {
      alert("文字を入力してください");
      return;
    }
    setTodos([...todos, tmpTodo]);
    setTmpTodo("");
  };

  // todoを削除する処理
  const deleteTodo = index => {
    const newTodos = todos.filter((todo, todoIndex) => {
      return index !== todoIndex;
    });
    setTodos(newTodos);
  };

  return (
    <>
      <Head>
        <title>CREAMO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <div className="container">
        <h1>一覧ページ</h1>
        <Link href="/form/signup">
          <a>新規登録ページ</a>
        </Link>
        <Link href="/form/login">
          <a>ログインページ</a>
        </Link>
        <Link href="/form/portedit">
          <a>ポートフォリオ編集ページ</a>
        </Link>
        <Link href="/form/post">
          <a>投稿ページ</a>
        </Link>
        <div className="todoform">
          <input
            type="text"
            name="todo"
            // formの入力値をtmpTodoで持っておく
            onChange={e => setTmpTodo(e.target.value)}
            value={tmpTodo}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul>
          {todos.map((todo, index) => {
            return (
              <li key={index}>
                {todo}
                {/* 削除ボタンを追加 */}
                <button onClick={() => deleteTodo(index)}>x</button>
              </li>
            );
          })}
        </ul>

        <style>{`
          h1 {
            text-align: center;
          }
          .form {
            display: flex;
            justify-content: center;
          }
          ul {
            width: 200px;
            margin: 10px auto;
          }
        `}</style>
      </div>
      </Layout>
    </>
  );
};

export default App;