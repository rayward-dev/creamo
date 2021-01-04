import { useState,useEffect } from "react";
import { db } from '../lib/db';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout'
import firebase from '../lib/db';
import { useRouter } from 'next/router'

const App = () => {
  
  // 変数定義
  const [user, setUser] = useState("");
  const [result, setResult] = useState([]);
  console.log(user);
  console.log(result);

  // FirebaseAuthの初期化
  const auth = firebase.auth();
  // Routerのインスタンス生成
  const router = useRouter();

  // ページ表示と同時に発火
  useEffect(() => {
    // 変数定義

    // 一覧情報を取得
    mainIndex();
    authCheck();

    // ログイン情報とCurrentUserを取得
    // auth.onAuthStateChanged(user => {
    //   if (user) {
    //     console.log("サインインしてます");
    //     userBox = auth.currentUser;
    //   }
    //   else {
    //     console.log("サインインしてません");
    //     setUser(auth.currentUser);
    //   }
    // })
  },[]);

  // ログイン情報とCurrentUserを取得
  const authCheck = () => {
    (async () => {
      try {
        var userBox = "";
        auth.onAuthStateChanged(user => {
          if (user) {
            console.log("サインインしてます");
            userBox = auth.currentUser;
            setUser(userBox);
            return userBox;
          }
          else {
            console.log("サインインしてません");
            userBox = auth.currentUser;
            setUser(userBox);
            return userBox;
          }
        })
      } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`)
      }
    })()
  }

  // firestoreからデータ取得
  const mainIndex = () => {
    (async () => {
      try {
    
        const querySnapshot = await db.collection('posts').get() 
        
        // とりあえずまとめて取得
        // var box = []
        // box = querySnapshot.docs.map(postDoc => JSON.stringify(postDoc.data()))
        // console.log(box)
        // setResult(box)

        // 配列を整理して取得
        let data = []
        querySnapshot.forEach((doc) =>
        {
          data.push(
            Object.assign({
              id: doc.id
            },doc.data())
          )
        })
        // console.log(data)
        setResult(data)
        return data
        
        // 公式の取得
        // querySnapshot.forEach((postDoc) => {
        //   console.log(JSON.stringify(postDoc.data()))
        // })
      } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`)
      }
    })()
  }

  // ログアウトメソッド
  const logout = () => {
    firebase.auth().signOut()
    router.push('/');
  }

  return (
    <>
      <Head>
        <title>CREAMO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <div className="container">
        <h1>一覧ページ</h1>
        <Link href="/signup">
          <a>新規登録ページ</a>
        </Link>
        <Link href="/login">
          <a>ログインページ</a>
        </Link>
        <Link href='/portedit' passHref>
          <a>ポートフォリオ編集ページ</a>
        </Link>
        <Link href='/post' passHref>
          <a>投稿ページ</a>
        </Link>
        <div className="space-box50">
        </div>
        <div>ログアウトシステム</div>
        {(() => {
            if (user == null) {
            return <p>ログインへ</p> 
            } else {
                return <a href="/" onClick={logout}>ログアウト</a>
            }
        })()}
        <div className="space-box50">
        </div>
        <div>POST</div>
        <ul>
        {result.map((posts) => (
          <>
          <li>{posts.artistname}</li>
          <li>{posts.genre}</li>
          <li>{posts.status}</li>
          </> 
        ))}
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