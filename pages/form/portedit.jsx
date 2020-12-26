import { useState } from "react";
import Head from 'next/head';
import Link from 'next/link'
import Layout from '../../components/layout'


const PortEdit = () => {
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
        <title>ポートフォリオ編集ページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <div class="wrap">
        <div class="container">
          <div class="title">ポートフォリオ編集画面
          </div>
          <form>
          <div class="form-box">
              <label for="" class="file-label">アバター画像
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
              <label class="label-text">作家名
                <input 
                  type="text"
                  name="artistname" 
                  class="form"
                  placeholder="作家名を入力(20文字以内)"
                  maxlength="20"
                  required
                />
              </label>
            </div>
            <div class="space-box30">
            </div>
            <div class="form-box">
              <label class="label-text">ジャンル
                <input 
                  type="text"
                  name="genre" 
                  class="form"
                  placeholder="ジャンルを入力"
                />
              </label>
            </div>
            <div class="space-box30">
            </div>
            <div class="form-box">
              <label class="label-text">自己紹介
                <textarea 
                  name="post" 
                  class="post-form"
                  placeholder="自己紹介を入力"
                />
              </label>
            </div>
            <div class="space-box30">
            </div>
            <div class="form-box">
              <label class="label-text">活動状況
                <select
                  name="status" 
                  class="form"
                  required>
                  <option value="構想中">構想中</option>
                  <option value="制作中">制作中</option>
                </select>
              </label>
            </div>
            <div class="space-box30">
            </div>
            <div class="form-box">
              <label class="label-text">出身
                <input 
                  type="text"
                  name="birthplace" 
                  class="form"
                  placeholder="出身を入力"
                />
              </label>
            </div>
            <div class="space-box30">
            </div>
            <div class="form-box">
              <label class="label-text">活動場所・拠点
                <input 
                  type="text"
                  name="base" 
                  class="form"
                  placeholder="活動場所・拠点を入力"
                />
              </label>
            </div>
            <div class="space-box30">
            </div>
            <div class="form-box">
              <label class="label-text">経歴
                <textarea 
                  name="career" 
                  class="post-form"
                  placeholder="経歴や受賞歴を入力"
                />
              </label>
            </div>
            <div class="space-box30">
            </div>
            <div class="form-box">
              <label class="label-text">将来の夢
                <textarea 
                  name="dream" 
                  class="post-form"
                  placeholder="将来の夢・実現したいことを入力"
                />
              </label>
            </div>
            <div class="space-box30">
            </div>

            <div class="form-box">
              <label class="file-label">作品１
                <input 
                  type="file"
                  name="opus1" 
                  id="image-file"
                  class="file-form"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品１のタイトル
                <input 
                  type="text"
                  name="opus1title" 
                  class="form"
                  placeholder="作品１のタイトルを入力"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品１の詳細
                <textarea 
                  name="opus1detail" 
                  class="post-form"
                  placeholder="作品１の詳細を入力"
                />
              </label>
            </div>
            <div class="space-box30">
            </div>

            <div class="form-box">
              <label class="file-label">作品２
                <input 
                  type="file"
                  name="opus2" 
                  id="image-file"
                  class="file-form"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品２のタイトル
                <input 
                  type="text"
                  name="opus2title" 
                  class="form"
                  placeholder="作品２のタイトルを入力"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品２の詳細
                <textarea 
                  name="opus2detail" 
                  class="post-form"
                  placeholder="作品２の詳細を入力"
                />
              </label>
            </div>
            <div class="space-box30">
            </div>

            <div class="form-box">
              <label for="" class="file-label">作品３
                <input 
                  type="file"
                  name="opus3" 
                  id="image-file"
                  class="file-form"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品３のタイトル
                <input 
                  type="text"
                  name="opus3title" 
                  class="form"
                  placeholder="作品３のタイトルを入力"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品３の詳細
                <textarea 
                  name="opus3detail" 
                  class="post-form"
                  placeholder="作品３の詳細を入力"
                />
              </label>
            </div>
            <div class="space-box30">
            </div>

            <div class="form-box">
              <label class="file-label">作品４
                <input 
                  type="file"
                  name="opus4" 
                  id="image-file"
                  class="file-form"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品４のタイトル
                <input 
                  type="text"
                  name="opus4title" 
                  class="form"
                  placeholder="作品４のタイトルを入力"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品４の詳細
                <textarea 
                  name="opus4detail" 
                  class="post-form"
                  placeholder="作品４の詳細を入力"
                />
              </label>
            </div>
            <div class="space-box30">
            </div>

            <div class="form-box">
              <label class="file-label">作品５
                <input 
                  type="file"
                  name="opus5" 
                  id="image-file"
                  class="file-form"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品５のタイトル
                <input 
                  type="text"
                  name="opus5title" 
                  class="form"
                  placeholder="作品５のタイトルを入力"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品５の詳細
                <textarea 
                  name="opus5detail" 
                  class="post-form"
                  placeholder="作品５の詳細を入力"
                />
              </label>
            </div>
            <div class="space-box30">
            </div>

            <div class="form-box">
              <label class="file-label">作品６
                <input 
                  type="file"
                  name="opus6" 
                  id="image-file"
                  class="file-form"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品６のタイトル
                <input 
                  type="text"
                  name="opus6title" 
                  class="form"
                  placeholder="作品６のタイトルを入力"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品６の詳細
                <textarea 
                  name="opus6detail" 
                  class="post-form"
                  placeholder="作品６の詳細を入力"
                />
              </label>
            </div>
            <div class="space-box30">
            </div>

            <div class="form-box">
              <label class="file-label">作品７
                <input 
                  type="file"
                  name="opus7" 
                  id="image-file"
                  class="file-form"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品７のタイトル
                <input 
                  type="text"
                  name="opus7title" 
                  class="form"
                  placeholder="作品７のタイトルを入力"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品７の詳細
                <textarea 
                  name="opus7detail" 
                  class="post-form"
                  placeholder="作品７の詳細を入力"
                />
              </label>
            </div>
            <div class="space-box30">
            </div>

            <div class="form-box">
              <label class="file-label">作品８
                <input 
                  type="file"
                  name="opus8"
                  id="image-file"
                  class="file-form"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品８のタイトル
                <input 
                  type="text"
                  name="opus8title" 
                  class="form"
                  placeholder="作品８のタイトルを入力"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品８の詳細
                <textarea 
                  name="opus8detail" 
                  class="post-form"
                  placeholder="作品８の詳細を入力"
                />
              </label>
            </div>
            <div class="space-box30">
            </div>

            <div class="form-box">
              <label class="file-label">作品９
                <input 
                  type="file"
                  name="opus9" 
                  id="image-file"
                  class="file-form"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品９のタイトル
                <input 
                  type="text"
                  name="opus9title" 
                  class="form"
                  placeholder="作品９のタイトルを入力"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品９の詳細
                <textarea 
                  name="opus9detail" 
                  class="post-form"
                  placeholder="作品９の詳細を入力"
                />
              </label>
            </div>
            <div class="space-box30">
            </div>

            <div class="form-box">
              <label class="file-label">作品１０
                <input 
                  type="file"
                  name="opus10" 
                  id="image-file"
                  class="file-form"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品１０のタイトル
                <input 
                  type="text"
                  name="opus10title" 
                  class="form"
                  placeholder="作品１０のタイトルを入力"
                />
              </label>
            </div>
            <div class="space-box10">
            </div>
            <div class="form-box">
              <label class="label-text">作品１０の詳細
                <textarea 
                  name="opus10detail" 
                  class="post-form"
                  placeholder="作品１０の詳細を入力"
                />
              </label>
            </div>
            <div class="space-box50">
            </div>
            <submit class="regist-btn">更新する
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

export default PortEdit;