import { useState,useEffect,useRef } from "react";
import { db } from '../lib/db';
import { useRouter } from 'next/router'
import { storage } from '../lib/db';
import Head from 'next/head';
import Link from 'next/link'
import firebase from '../lib/db';

const Name = () => {

  //カレントユーザーを取得するための変数
  const [current, setCurrent] = useState("");
  console.log(current);
  //名前を保存するための変数
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarname, setAvatarname] = useState("");
  const [genre, setgenre] = useState("");

  const auth = firebase.auth();
  const router = useRouter();
  const mounted = useRef(false)


  useEffect(() => {
    if(mounted.current) {
      // Update時の処理
      console.log('Updated!')
    } else {
      // Mount時の処理
      nameSave();
      console.log('Mounted!')
      mounted.current = true
    }
  },[]);

  // useEffect(() => {
  //   nameSave();
  // },[]);


  // ログインユーザーデータをfirebaseから取得
  const nameSave = () => {
    (async () => {
      try {
        let userBox = "";
        let currentBox ="";
        auth.onAuthStateChanged(user => {
          if (user) {
            console.log("サインインしてます");
            userBox = auth.currentUser;
            currentBox = userBox.uid
            setCurrent(currentBox);
            //firestoreにてuserコレクションにUIDサブコレクションを作成して保存
            db.collection('users').doc(currentBox).set({
              artistname: "NoName",
              genre: "未定",
              })    
              console.log("NoNameと未定が保存されました");
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

  const nhandleChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  const ghandleChange = (e) => {
    setgenre(e.target.value);
    console.log(genre);
  };
  const ahandleChange = (e) => {
    let avatarBox = e.target.files[0];
    setAvatar(avatarBox);
    console.log(avatar);
    let avatarnameBox = avatarBox.name
    setAvatarname(avatarnameBox);
    console.log(avatarname);
  };

  const handleSubmit = (e) => {
    // firestoreに保存
    db.collection('users').doc(current).set({
      artistname: name,
      genre: genre,
      avatar: avatarname,
    })
    if (!avatar == "") {
    // firestorageにアップロード
      const storageRef = storage.ref().child(`${current}/portfolio/avatar/${avatarname}`);  
      storageRef.put(avatar)
      .then = () => {
      console.log("送信されました");
      };
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
        <title>名前入力ページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      <div className="wrap">
        <div className="container">
          <div className="title">名前を入力してください
          </div>
          <div className="">※あとから編集できます
          </div>
          <form onSubmit={handleSubmit}>
          <div className="form-box">
              <label className="file-label">アバター画像
                <input 
                  type="file"
                  name="image" 
                  id="image-file"
                  className="file-form"
                  value={setAvatar.value}
                  onChange={ahandleChange}
                />
              </label>
            </div>
            <div className="space-box50">
            </div>
            <div className="form-box">
              <label className="label-text">名前
                <input 
                  type="text"
                  name="artistname" 
                  className="form"
                  placeholder="作家名を入力(20文字以内)"
                  maxLength="20"
                  value={setName.value}
                  onChange={nhandleChange}
                  required
                />
              </label>
            </div>
            <div className="space-box50">
            </div>
            <div className="form-box">
              <label className="label-text">ジャンル
                <input 
                  type="text"
                  name="genre" 
                  className="form"
                  placeholder="作品のジャンルを入力"
                  maxLength="20"
                  value={setgenre.value}
                  onChange={ghandleChange}
                  required
                />
              </label>
            </div>
            <div className="space-box50">
            </div>
            <button type="submit" className="regist-btn">登録する
            </button>
          </form>
          <div className="space-box20">
          </div>
          <div className="top-back">
            <Link href="/">
              <a>スキップする</a>
            </Link>
          </div> 
          <div className="">※名前は「NoName」、ジャンルは「未定」で登録されます
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
       
    </>
  )
}

export default Name;