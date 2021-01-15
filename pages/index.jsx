import { useState,useEffect,useRef } from "react";
import { db } from '../lib/db';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout'
import firebase from '../lib/db';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';


const App = () => {
  
  // indexで欲しいデータ
    // ①ログインユーザーのUID
    // ②投稿したユーザーのUID
    // ③その作家データ+アバター画像。画像はファイル名でstorageからDLURLを取得
    // ④投稿ID+投稿データ+画像。画像はファイル名でstorageからDLURLを取得
    // ③上記取得後にそれぞれKeyを付け足して一つの配列にまとめる
    // ④その配列をループ処理して配置
  // FontAwesomeIcon
    // <i class="fas fa-heart"></i>
    // <i class="far fa-heart"></i>
    // <i class="fas fa-thumbs-up"></i>
    // <i class="far fa-thumbs-up"></i>
    // <FontAwesomeIcon icon={faHeart} size="lg" color="#fff" />

  const [current, setCurrent] = useState("");
  const [result, setResult] = useState([]);
  console.log(result);

  const auth = firebase.auth();
  const mounted = useRef(false)

  useEffect(() => {
    if(mounted.current) {
      // Update時の処理
      mainIndex();
      console.log('Updated!')
    } else {
      // Mount時の処理
      authCheck(current);
      console.log('Mounted!')
      mounted.current = true
    }
    
  },[current]);

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
            setCurrent(userUid);
            return userUid
          }
          else {
            console.log("サインインしてません");
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
        //まずはusersコレクションの全userIDを取得
        const usersUid = await db.collection('users').get()
        const usersUidArr = usersUid.docs.map(userDoc => userDoc.id)
        // console.log(usersUidArr)
        //forEachのネスト内ではFirebaseのdocなど取得できない(Promiseが付く)
        //asyncだけだとPromiseのまま動かない。awaitつけて成功
        //postsとusernameはuserUIDだけでは関連付けできないのでpostsの中にもuserデータを格納しておく
        let resultBox = [];
        //userUIDごとのpostsデータを取得
        usersUidArr.forEach((userId) => {
          (async () => {
            //userUIDのposts情報の取得
            const postsData = await db.collection('users').doc(userId).collection('posts').get()
            //posts情報を使えるデータだけの配列になるようにバラす
            postsData.forEach((postDoc) => {
              let postData = postDoc.data()
              //その中のavatarデータとimageデータ(ファイル名)をuseridを使って抜き出す
              const userID = postData.userid
              const avatarData = postData.avatar
              const imageData1 = postData.image1
              const imageData2 = postData.image2
              //そのファイル名を使ってDLURLをそれぞれkeyをつけて取得
              let avatarref = firebase.storage().ref().child(`${userID}/portfolio/avatar/${avatarData}`);
              let img1ref = firebase.storage().ref().child(`${userID}/posts/${imageData1}`);
              let img2ref = firebase.storage().ref().child(`${userID}/posts/${imageData2}`);
              //DLURLをぶちこむ
              avatarref.getDownloadURL().then((url) => {
                postData.avatar = url;
              });
              if (!img1ref == "") {
              img1ref.getDownloadURL().then((url) => {
                postData.image1 = url;
              });
              } else {
                console.log("画像１はありません")
              }
              if (!img2ref == "") {
              avatarref.getDownloadURL().then((url) => {
                postData.image2 = url;
              });
              } else {
                console.log("画像２はありません")
              }
              // console.log(postData);
              //一つのオブジェクトにまとめる
              resultBox.push(postData)
            })
            //resultに反映させる
            // console.log(resultBox);
            setResult(resultBox);
          })()
        })

      } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`)
      }
    })()
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
          <Link href='/portedit' passHref>
            <a>ポートフォリオ編集ページ</a>
          </Link>
          <Link href='/portfolio' passHref>
            <a>ポートフォリオページ</a>
          </Link>
          <Link href='/post' passHref>
            <a>投稿ページ</a>
          </Link>
          <Link href='/name' passHref>
            <a>namaページ</a>
          </Link>
          <div className="space-box50">
          </div>

          <h2>ここから本番用デザイン</h2>
          <div className="container-wrap-left">
            
          {result.map((post) => { 
            <>
            <div className="post-back">
              <div className="space-box20">
              </div>
              <div className="post-area-head">
                <div className="post-area-head-left">               
                  <img src={post.avatar} alt="アイコン" className="post-avatar" />         
                </div>
                <div className="post-area-head-center">
                  <div className="post-artist-name">
                    {post.artistname}
                  </div>
                  <div className="post-artist-genre">
                    {post.genre}
                  </div>
                </div>
                <div className="post-area-head-right">
                  <div className="post-time">
                    {post.data}
                  </div>
                  <div className="space-box10">
                  </div>
                  <div className="post-status">
                    {post.status}
                  </div>
                </div>
              </div>
              <div className="space-box20">
              </div>
              <div className="post-area-text">
                {post.post}
              </div>
              <div className="space-box20">
              </div>
              <div className="post-area-tag">
                {post.tags} 
              </div>
              <div className="space-box30">
              </div>
              <div className="post-area-image">
                <div className="post-area-image-left">
                  <img src={post.image1} alt="アイコン" className="post-imagea" />
                </div>
                <div className="space-box30w">
                </div>
                <div className="post-area-image-right">
                <img src={post.image2} alt="アイコン" className="post-imageb" />
                </div>
              </div>
              <div className="space-box30">
              </div>
              <div className="post-area-foot">
                <div className="post-area-foot-left">
                </div>
                <div className="post-area-foot-right">
                  作家詳細を見にいく
                </div>
              </div>
            </div>
            </>
            })
            }

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
          border: 2px solid #787979;
          background-color: white;
          margin-bottom: 30px;
        }
        .post-area-head {
          display: flex;
          align-items: center;
          padding: 0 20px;
        }
        .post-area-head-left {
        }
        .post-avatar {
          width: 70px;
          height: 70px;
          border-radius: 5px;
          object-fit: cover;
        }
        .post-area-head-center {
          padding-left: 20px;
        }
        .post-artist-name {
          font-family: Hiragino Sans,ヒラギノ角ゴシック,Yu Gothic,游ゴシック,sans-serif;
          font-size: 20px;
          color: #212121;
        
        }
        .post-artist-genre {
          font-family: Hiragino Sans,ヒラギノ角ゴシック,Yu Gothic,游ゴシック,sans-serif;
          font-size: 16px;
          color: #212121;
        }
        .post-area-head-right {
          margin-left: auto;
        }
        .post-time {
          font-family: Hiragino Sans,ヒラギノ角ゴシック,Yu Gothic,游ゴシック,sans-serif;
          font-size: 10px;
          color: #212121;
        }
        .post-status {
          width: 90px;
          height: 30px;
          font-family: Hiragino Sans,ヒラギノ角ゴシック,Yu Gothic,游ゴシック,sans-serif;
          font-size: 14px;
          border-radius: 4px;
          color: white;
          text-align: center;
          line-height: 30px;
          background-color: #5C5C5C;
        }
        .post-area-text {
          padding: 0 20px;
          font-family: Hiragino Sans,ヒラギノ角ゴシック,Yu Gothic,游ゴシック,sans-serif;
          font-size: 16px;
          color: #4A4949;

        }
        .post-area-tag {
          padding: 0 20px;
          font-family: Hiragino Sans,ヒラギノ角ゴシック,Yu Gothic,游ゴシック,sans-serif;
          font-size: 14px;
          color: #2871E6;

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
          display: flex;
          justify-content: space-between;
          height: 30px;
          border-top: 2px solid #787979;
        }
        .post-area-foot-left {

        }
        .post-area-foot-right {
          font-family: Hiragino Sans,ヒラギノ角ゴシック,Yu Gothic,游ゴシック,sans-serif;
          font-size: 12px;
          color: #818080;
          line-height: 30px;
          padding-right: 20px;

        }

      `}</style>
      </Layout>
    </>
  );
};

export default App;