import { useState,useEffect } from "react";
import { useRouter } from 'next/router'
import { db } from '../lib/db';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout'
import firebase from '../lib/db';

const PortFolio = () => {

  const [urli, setUrli] = useState("");

    // portfolioで欲しいデータ
      // ①ログインユーザーのUID
      // ②詳細を押したユーザーのUID
      // ③その作家データ+アバター画像。画像はファイル名でstorageからDLURLを取得
      // （その作家の投稿データ+画像。画像はファイル名でstorageからDLURLを取得）
      // ③上記取得後にそれぞれKeyを付け足して一つの配列にまとめる
      // ④その配列を配置

      useEffect(() => {    
      // storageから画像urlの取得(useEffect内厳守)→これは指定の画像１つだけ
      let ref = firebase.storage().ref().child('post/hands-423794_640.jpg');
      let urlBox = ""
        ref.getDownloadURL().then((url) => {
          // document.getElementById('imga1').src = url;
          urlBox = url;
          setUrli(urlBox);
        });
      },[]);
    

  return (
    <>
      <Head>
        <title>ポートフォリオ</title>
      </Head>
      <Layout>
      <div className="wrap">
        <div className="container">
          <div className="space-box30">
          </div>
          <div className="basic-back intro-back">
            <div className="space-box20">
            </div>
            <div className="intro-head">
              <div className="intro-left">
                <img src={urli} alt="アイコン" className="port-avatar" />         
              </div>
              <div className="intro-center">
                <div className="intro-center-name">
                  アーティスト名
                </div>
                <div className="intro-center-genre">
                  ジャンル
                </div>
              </div>
              <div className="intro-right">
                <div className="intro-right-stutas">
                  ステータス
                </div>
              </div>
            </div>
            <div className="space-box10">
            </div>
            <div className="intro-foot">
              <div className="intro-foot-text">
                自己紹介文あいうえおABCDEabcdeアイウエオ自己紹介文あいうえおABCDEabcdeアイウエオ自己紹介文あいうえおABCDEabcdeアイウエオ
              </div>
              <div className="intro-foot-insta">
                インスタ
              </div>
              <div className="intro-foot-tw">
                ツイッター
              </div>
              <div className="intro-foot-fb">
                FB
              </div>
            </div>
            <div className="space-box20">
            </div>
          </div>
          <div className="space-box10">
          </div>
          <div className="basic-back tag-back">
            # 鹿児島県  # AB型  # 1990年生まれ  # 東京活動
          </div>
          <div className="space-box10">
          </div>
          <div className="basic-back dream-back">
            <h3>作家としての夢</h3>
            <div className="box-text">
              作家としての夢を大いに語る。テストのやつテストのやつテストのやつテストのやつテストのやつテストのやつテストのやつテストのやつテストのやつテストのやつテストのやつテストのやつテステストのやつテストのやつテストのやつテストのやつテストのやつテストのトのやつ
            </div>
            <div className="space-box20">
            </div>
          </div>
          <div className="space-box10">
          </div>
          <div className="basic-back carrier-back">
            <h3>経歴</h3>
            <div className="box-text">
              受賞歴とか過去の活動内容をテストのやつテストのやつテストのやつテストのやつテストのやつテストのやつテストのやつテストのやつテストのやつテストのやつテストのやつテストのやつテステストのやつテストのやつテストのやつテストのやつテストのやつテストのトのやつ
            </div>
            <div className="space-box20">
            </div>
          </div>
          <div className="space-box10">
          </div>
          <div className="opus-back">
            <div className="opus-box">
              <div className="opus-image">
                <img src={urli} alt="アイコン" className="opus-size" />         
                <div className="opus-title">
                  作品タイトル
                </div>
                <div className="opus-discription">
                  作品のモチーフやコンセプトをここに記述するとよい
                </div>
              </div>
              <div className="opus-image">
                <img src={urli} alt="アイコン" className="opus-size" />
                <div className="opus-title">
                  作品タイトル
                </div>
                <div className="opus-discription">
                  作品のモチーフやコンセプトをここに記述するとよい
                </div>
              </div>
            </div>
            <div className="opus-box">
              <div className="opus-image">
                <img src={urli} alt="アイコン" className="opus-size" />
                <div className="opus-title">
                  作品タイトル
                </div>
                <div className="opus-discription">
                  作品のモチーフやコンセプトをここに記述するとよい
                </div>
              </div>
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
          .basic-back {
            width: 700px;
            border-radius: 5px;
            border: 2px solid #787979;
            background-color: white;
            padding: 0 20px;
            font-family: 'Hiragino Sans','ヒラギノ角ゴシック','Yu Gothic','游ゴシック',sans-serif;
          }
          .intro-back {
  
          }
          .intro-head {
            display: flex;

          }
          .intro-left {

          }
          .port-avatar {
            width: 120px;
            height: 120px;
            border-radius: 5px;
            object-fit: cover;
  
          }
          .intro-center {
            padding-top: 30px;
            padding-left: 30px;
          }
          .intro-center-name {
            font-size: 24px;
          }
          .intro-center-genre {
            font-size: 20px;
          }
          .intro-right {
            margin-left: auto;
          }
          .intro-right-stutas {
            width: 90px;
            height: 30px;
            font-family: 'Hiragino Sans','ヒラギノ角ゴシック','Yu Gothic','游ゴシック',sans-serif;
            font-size: 14px;
            border-radius: 4px;
            color: white;
            text-align: center;
            line-height: 30px;
            background-color: #5C5C5C;
          }
          .intro-foot {
            display: flex;
          }
          .intro-foot-text {
            font-size: 14px;
          }
          .intro-foot-insta {
            margin-left: auto;
          }
          .intro-foot-tw {

          }
          .intro-foot-fb {

          }
          .tag-back {
            padding: 10px 20px;
            font-size: 14px;
            color: #2871E6;
          }
          .dream-back {

          }
          .carrier-back {

          }
          .box-text {
            font-size: 14px;
          }
          .opus-back {
            width: 700px;
            border-radius: 5px;
            background-color: #272727;
            color: white;
            padding: 0 20px;
            font-family: 'Hiragino Sans','ヒラギノ角ゴシック','Yu Gothic','游ゴシック',sans-serif;
            padding: 50px;
          }
          .opus-box {
            display: flex;
            justify-content: space-around;
            padding-bottom: 50px;
          }
          .opus-image {

          }
          .opus-size {
            max-width: 250px;
            height: auto;
            object-fit: cover;
          }
          .opus-title {
            font-size: 14px;
            max-width: 250px;
            text-align: center;
            padding: 10px 0;
          }
          .opus-discription {
            font-size: 12px;
            max-width: 250px;
          }

        `}</style>
      </Layout>
    </>
  );
};

export default PortFolio;