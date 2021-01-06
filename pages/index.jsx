import { useState,useEffect } from "react";
import { useRouter } from 'next/router'
import { db } from '../lib/db';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout'
import firebase from '../lib/db';


const App = () => {
  
  // indexで欲しいデータ
    // ①ログインユーザーのUID
    // ②投稿したユーザーのUID
    // ③その作家データ+アバター画像。画像はファイル名でstorageからDLURLを取得
    // ④投稿ID+投稿データ+画像。画像はファイル名でstorageからDLURLを取得
    // ③上記取得後にそれぞれKeyを付け足して一つの配列にまとめる
    // ④その配列をループ処理して配置

  // 変数定義
  const [user, setUser] = useState("");
  const [result, setResult] = useState([]);
  const [urli, setUrli] = useState("");
  console.log(user);
  console.log(result);
  console.log(urli);

  // FirebaseAuthの初期化
  const auth = firebase.auth();
   // FirebaseStorgeの初期化
  const storage = firebase.storage();

  // Routerのインスタンス生成
  const router = useRouter();

  // ページ表示と同時に発火
  useEffect(() => {
    // 変数定義

    // 一覧情報を取得
    mainIndex();
    authCheck();

  // storageから画像urlの取得(useEffect内厳守)→これは指定の画像１つだけ
  let ref = firebase.storage().ref().child('post/hands-423794_640.jpg');
  let urlBox = ""
    ref.getDownloadURL().then((url) => {
      // document.getElementById('imga1').src = url;
      urlBox = url;
      setUrli(urlBox);
    });
  },[]);

  // ログイン情報とCurrentUserを取得
  const authCheck = () => {
    (async () => {
      try {
        let userBox = "";
        let userUid = "";
        auth.onAuthStateChanged(user => {
          if (user) {
            console.log("サインインしてます");
            userBox = auth.currentUser;
            userUid = userBox.uid;
            console.log(userUid);
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
  
  // storageからデータ取得
  // const getStorage = () => {
  //   (async () => {
  //     try {

  //       const storageRef = storage.ref();

  //       const url = storageRef.child('images/photo_1.png').getDownloadURL()
        

  //     } catch (err) {
  //       console.log(`Error: ${JSON.stringify(err)}`)
  //     }
  //   })()
  // }
      

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
      <div className="wrap">
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

          <h2>ここから本番用デザイン</h2>
          <div className="container-wrap-left">
            <div className="post-back">
              <>
              <div className="space-box20">
              </div>
              <div className="post-area-head">
                <div className="post-area-head-left">               
                  <img src={urli} alt="アイコン" class="post-avatar" />         
                </div>
                <div className="post-area-head-center">
                  <div className="post-artist-name">
                    アーティストネーム
                  </div>
                  <div className="post-artist-genre">
                    油絵画家、写真家
                  </div>
                </div>
                <div className="post-area-head-right">
                  <div className="post-time">
                    2020.12.01.01
                  </div>
                  <div className="post-status">
                    構想中
                  </div>
                </div>
              </div>
              <div className="space-box10">
              </div>
              <div className="post-area-text">
                とりあえず呟いておくか。
              </div>
              <div className="post-area-tag">
                絵画、悩み 
              </div>
              <div className="space-box30">
              </div>
              <div className="post-area-image">
                <div className="post-area-image-left">
                  <img src={urli} alt="アイコン" class="post-imagea" />
                </div>
                <div className="space-box30w">
                </div>
                <div className="post-area-image-right">
                <img src={urli} alt="アイコン" class="post-imageb" />
                </div>
              </div>
              <div className="space-box30">
              </div>
              <div className="post-area-foot">
              </div>
              </>
            </div>
          </div>
        </div>
      </div>
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
        .container-wrap-left {

        }
        .post-back {
          width: 500px;
          border-radius: 7px;
          border: 1px solid #787979;
          background-color: white;
        }
        .post-area-head {
          display: flex;
          align-items: center;
          padding: 0 20px;
        }
        .post-area-head-left {
        }
        .post-avatar {
          width: 60px;
          height: 60px;
          border-radius: 5px;
          object-fit: cover;
        }
        .post-area-head-center {
          padding-left: 20px;
        }
        .post-artist-name {
          font-family: Arial;
          font-size: 14px;
          font-weight: bold;
          color: #616264;
        
        }
        .post-artist-genre {
          font-family: Arial;
          font-size: 12px;
          color: #616264;
        }
        .post-area-head-right {
          margin-left: auto;
        }
        .post-time {

        }
        .post-status {

        }
        .post-area-text {
          padding: 0 20px;

        }
        .post-area-tag {
          padding: 0 20px;

        }
        .post-area-image {
          display: flex;
          justify-content: center;
        }
        .post-area-image-left {

        }
        .post-imagea {
          width: 200px;
          height: 130px;
          border-radius: 5px;
          object-fit: cover;
        }
        .post-area-image-right {

        }
        .post-imageb {
          width: 200px;
          height: 130px;
          border-radius: 5px;
          object-fit: cover;

        }
        .post-area-foot {
          height: 30px;
          border-top: 1px solid #787979;
        }

      `}</style>
      </Layout>
    </>
  );
};

export default App;