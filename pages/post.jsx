import { useState,useEffect,useRef } from "react";
import { useRouter } from 'next/router'
import { storage } from '../lib/db';
import { db } from '../lib/db';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import firebase from '../lib/db';

const Post = () => {
  
  //フォームで送信する変数
  const [text, setText] = useState("");
  const [imgaval, setImgaval] = useState("");
  const [imganame, setImganame] = useState("");
  const [imgbval, setImgbval] = useState("");
  const [imgbname, setImgbname] = useState("");
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("構想中"); // selectBOXだからは必ず初期値を決めておく
  //ユーザー情報
  const [current, setCurrent] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [genre, setGenre] = useState("");


  const auth = firebase.auth();
  const router = useRouter();
  const mounted = useRef(false)

  //レンダー時に呼び出すやつ
  useEffect(() => {
    if(mounted.current) {
      // Update時の処理
      userData(current);
      console.log('Updated!')
    } else {
      // Mount時の処理
      authCheck(current);
      console.log('Mounted!')
      mounted.current = true
    }
  },[current]);

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
            console.log(userUid);
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

  const userData = () => {
    (async () => {
      try {
        const userRef = db.collection('users').doc(current)
        const userDoc = await userRef.get() 
        if (userDoc.exists) {
          console.log(userDoc.data());
          const userName = userDoc.get('artistname');
          console.log(userDoc.get('artistname'));
          const avatarBox = userDoc.get('avatar');
          console.log(userDoc.get('avatar'));
          const genreBox = userDoc.get('genre');
          console.log(userDoc.get('genre'));
          setName(userName);
          setAvatar(avatarBox);
          setGenre(genreBox);
        } else {
          console.log('No such document!')
        }
      
      } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`)
      }
    })()
  }

  const phandleChange = (e) => {
    // Keyを増やして登録もできるsetText({textval: e.target.value});とか
    setText(e.target.value);
    console.log(text);
  };
  const thandleChange = (e) => {
    let tagBox = e.target.value;
    let kugiri = ",";
    let tagSplit = tagBox.split(kugiri); //区切った文字列で配列にして保存する
    setTags(tagSplit);
    console.log(tagBox);
    console.log(tagSplit);
  };
  const shandleChange = (e) => {
    setStatus(e.target.value);
    console.log(status);
  };
  const iahandleChange = (e) => {
    let imgaBox = e.target.files[0];
    setImgaval(imgaBox);
    console.log(imgaBox);
    let imgaNbox = imgaBox.name
    setImganame(imgaNbox);
    console.log(imgaNbox);
  };
  const ibhandleChange = (e) => {
    //画像２だけで送信できちゃうと気持ち悪いからアラート飛ばして消去する
    if (!imgaval == "") {
      let imgbBox = e.target.files[0];
      setImgbval(imgbBox);
      console.log(imgbBox);
      let imgbNbox = imgbBox.name
      setImgbname(imgbNbox);
      console.log(imgbNbox);
    } else {
      e.target.value = null;
      alert('画像1を入力してください');
    }
  };

  const handleSubmit = (e) => {
    // firestoreに保存
    db.collection('users').doc(current).collection('posts').add({
      data: firebase.firestore.FieldValue.serverTimestamp(),
      artistname: name,
      avatar: avatar,
      genre: genre,
      post: text,
      image1: imganame,
      image2: imgbname,
      status: status,
      tags: tags,
      userid: current,
    })

    // firestorageにアップロード。画像が１つと2つで処理は分岐させる
    if (!imgaval == "" && imgbval == "") {
      const storageRef = storage.ref().child(`${current}/posts/${imganame}`);  
      storageRef.put(imgaval)
      .then = () => {
      console.log("画像１が送信されました");
      };
    }
    //同じ場所に複数アップロード
    //ただの繰り返しだとうまくいかなかったから連想配列を多重にしてforEachで配ってみた
    else if (!imgaval == "" && !imgbval == ""){
      const imgarr = [
        {name: imganame, val: imgaval},
        {name: imgbname, val: imgbval}
      ]
      imgarr.forEach(result => {
        const storageRef = storage.ref().child(`${current}/posts/${result.name}`);  
        storageRef.put(result.val)
        .then = () => {
        console.log(`${result.name}が送信されました`);
        };
      })

    }
    else {
      console.log("画像はありません");
    }
    e.preventDefault();
    router.push('/');
  };
  

  return (
    <>
      <Head>
        <title>投稿ページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <div className="wrap">
        <div className="container">
          <div className="space-box50">
          </div>
          <div className="title">投稿画面
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-box">
              <label className="label-text">投稿内容
                <textarea 
                  name="post" 
                  className="post-form"
                  placeholder="投稿内容を入力"
                  value={setText.value}
                  onChange={phandleChange}
                  required
                />
              </label>
            </div>
            <div className="space-box50">
            </div>
            <div className="form-box">
              <label className="file-label">画像１
                <input 
                  type="file"
                  name="image1" 
                  id="image-file"
                  className="file-form"
                  value={setImgaval.value}
                  onChange={iahandleChange}
                />
              </label>

              <label className="file-label">画像2
                <input 
                  type="file"
                  name="image2" 
                  id="image-file"
                  className="file-form"
                  value={setImgbval.value}
                  onChange={ibhandleChange}
                />
              </label>
            </div>
            <div className="space-box50">
            </div>

            <div className="form-box">
              <label className="label-text">タグ
                <input 
                  type="text"
                  name="tag"
                  className="form"
                  placeholder="例) タイトル未定,山,空"
                  value={setTags.value}
                  onChange={thandleChange}
                />
              </label>
            </div>
            <div className="tag-note">※複数登録する場合は「,」で区切ってください
            </div>
            <div className="space-box50">
            </div>
            <div className="form-box">
              <label className="label-text">活動状況
                <select
                  name="status" 
                  className="form"
                  value={setStatus.value}
                  onChange={shandleChange}
                  required>
                  <option value="構想中">構想中</option>
                  <option value="制作中">制作中</option>
                  <option value="制作開始">制作開始</option>
                  <option value="制作完了">制作完了</option>
                </select>
              </label>
            </div>
            <div className="space-box50">
            </div>
            <button type="submit" className="regist-btn">投稿する
            </button>
          </form>
          <div className="space-box20">
          </div>
          <div className="top-back">
            <Link href="/">
              <a>一覧に戻る</a>
            </Link>
          </div> 
        </div>
      </div>
      <style>{`
          .title {
            font-family: Arial;
            font-size: 30px;
            color: #616264;
            padding-bottom: 50px;
            
          }
          .post-form {
            display: block;
            width: 270px;
            height: 100px;
            color: #616264;
            font-family: Arial;
            font-size: 12px;
            border-radius: 7px;
            border: 2px solid #787979;
            padding-left: 10px;
            resize: none;
          }
          .post-form::placeholder {
            color: #ADADAD;
          }
          .post-form:focus {
            outline: 0;
          }
          .file-form {
            // display: none;
            display: block;
            font-size: 5px;
          }
          .file-label {
            display: block;
            font-family: Arial;
            font-size: 11px;
            font-weight: bold;
            color: #616264;
            line-height: 20px;
          }
          .tag-note {
            font-family: Hiragino Sans,ヒラギノ角ゴシック,Yu Gothic,游ゴシック,sans-serif;
            font-size: 12px;
            color: #212121;
            text-align: center;
            padding-top: 3px;
          }
          .top-back {
            color: grey;
            font-family: Arial;
            font-size: 14px;
            line-height: 40px;
            cursor: pointer;
          }
          .top-back:hover {
            color: #240A2C;
          }
        `}</style>
        </Layout>
    </>
  )
}

export default Post;