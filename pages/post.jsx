import { useState } from "react";
import { storage } from '../lib/db';
import { db } from '../lib/db';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';


const Post = () => {
  
  // フォームで入力された値を入れる箱
  // const [idval, setIdval] = useState("");
  // const [artistnameval, setArtistnameval] = useState("");
  const [text, setText] = useState("");
  const [imgaval, setImgaval] = useState("");
  const [imganame, setImganame] = useState("");
  const [imgaurl, setImgaurl] = useState("");

  const [imgbname, setImgbname] = useState("");

  // selectを必ず初期値を決めておく
  const [status, setStatus] = useState("構想中");
  // Hooksはbindいらない
  // this.handleChange = this.handleChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);

  const phandleChange = (e) => {
    // Keyを増やして登録もできる
    // setTextval({textval: e.target.value});
    setText(e.target.value);
    console.log(text);
  };
  const shandleChange = (e) => {
    setStatus(e.target.value);
    console.log(status);
  };
  const iahandleChange = (e) => {
    const imgaval = e.target.files[0];
    setImgaval(imgaval);
    console.log(imgaval);
    const imganame = imgaval.name
    setImganame(imganame);
    console.log(imganame);
    const imgaurl = "gs://creamo-d1efd.appspot.com/" + imganame
    setImgaurl(imgaurl);
    console.log(imgaurl);
  };

  const handleSubmit = (e) => {
    // firestoreに保存
    db.collection('posts').add({
      artistname: "current",
      avatar: "currentImage",
      // data: firebase.firestore.FieldValue.serverTimestamp(),
      genre: "currentGenre",
      post: text,
      image1: imganame + "a",
      // image2: {setImgbval},
      status: status,
    })

    // firestorageにアップロード
    const storageRef = storage.ref().child(`post/${imganame}`);
    
    storageRef.put(imgaval)
    .then = () => {
    //  console.log("送信されました");
    storageRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
    };
    // const uploadTask = storage.put(imgaval);
    // const uploadTask = storage.ref().put(imgaval);

    e.preventDefault();
  };

  const next = snapshot => {
    // 進行中のsnapshotを得る
    // アップロードの進行度を表示
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + "% done");
    console.log(snapshot);
  };
  const error = error => {
    // エラーハンドリング
    console.log(error);
  };
  const complete = () => {
    console.log("アップロード完了");
    // 完了後の処理
    // 画像表示のため、アップロードした画像のURLを取得
    // storage
    //   .ref("images")
    //   .child(imganame)
    //   .getDownloadURL()
    //   .then(fireBaseUrl => {
    //     setImgaUrl(fireBaseUrl);
    //   });
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
                  value={setImgaurl.value}
                  onChange={iahandleChange}
                />
              </label>

              <img src={imgaurl} alt="uploaded" />

              <label className="file-label">画像2
                <input 
                  type="file"
                  name="image2" 
                  id="image-file"
                  className="file-form"
                  // value={setImgbval}
                  // onChange={handleChange}
                />
              </label>
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