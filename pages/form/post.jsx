import { useState } from "react";
import Head from 'next/head';
import Link from 'next/link'
import Layout from '../../components/layout'


const Post = () => {
  // 入力したnameデータを入れておくためのstate
  const [name, setName] = useState([]);
  // 初期値の定義
  const [tmpName, setTmpName] = useState("");

  const addName = () => {
    // formの内容が空白の場合はalertを出す
    if (tmpNmae === "") {
      alert("文字を入力してください");
      return;
    }
    setName([...name, tmpName]);
    setTmpNmae("");
  };

  return (
    <>
      <Head>
        <title>投稿ページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <div class="wrap">
        <div class="container">
          <div class="title">投稿画面
          </div>
          <form>
            <div class="form-box">
              <label class="label-text">投稿内容
                <textarea 
                  name="post" 
                  class="post-form"
                  placeholder="投稿内容を入力"
                  required
                />
              </label>
            </div>
            <div class="space-box50">
            </div>
            <div class="form-box">
              <label for="" class="file-label">画像１
                <input 
                  type="file"
                  name="image" 
                  id="image-file"
                  class="file-form"
                />
              </label>
              <label for="" class="file-label">画像2
                <input 
                  type="file"
                  name="image" 
                  id="image-file"
                  class="file-form"
                />
              </label>
            </div>
            <div class="space-box50">
            </div>
            <div class="form-box">
              <label class="label-text">活動状況
                <select
                  name="status" 
                  class="form"
                  required>
                  <option value="構想中">構想中</option>
                  <option value="制作中">制作中</option>
                  <option value="制作開始">制作開始</option>
                  <option value="制作完了">制作完了</option>
                </select>
              </label>
            </div>
            <div class="space-box50">
            </div>
            <submit class="regist-btn">投稿する
            </submit>
          </form>
          <div class="space-box20">
          </div>
          <div class="top-back">
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