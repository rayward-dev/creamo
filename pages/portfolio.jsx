import { useState,useEffect,useRef } from "react";
import { useRouter } from 'next/router'
import { db } from '../lib/db';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout'
import firebase from '../lib/db';

const PortFolio = () => {

  const [current, setCurrent] = useState("");
  const [result, setResult] = useState([]);

  const auth = firebase.auth();
  const mounted = useRef(false)

  useEffect(() => {
    if(mounted.current) {
      // Update時の処理
      readPort();
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

  const readPort = () => {
    (async () => {
      try {
        const userFile = db.collection('users').doc(current)
        const userData = await userFile.get()  
        // const usersUidArr = usersUid.docs.map(userDoc => userDoc.id)
        console.log(userData)
        let resultArr = []
        let resultBox = userData.data();
        resultArr.push(resultBox)
        // let resultBox = [];
        // usersUid.forEach((userDoc) => {
        //   let postData = userDoc.data()
        //   resultBox.push(postData)
        // })
        setResult(resultArr);
        console.log(resultArr);

        //storageから画像取得
        const avatarData = resultBox.avatar
        const opus1img = resultBox.opus1image
        const opus2img = resultBox.opus2image
        const opus3img = resultBox.opus3image
        const opus4img = resultBox.opus4image
        const opus5img = resultBox.opus5image
        const opus6img = resultBox.opus6image
        const opus7img = resultBox.opus7image
        const opus8img = resultBox.opus8image
        const opus9img = resultBox.opus9image
        const opus10img = resultBox.opus10image

        let avatarref = firebase.storage().ref().child(`${current}/portfolio/avatar/${avatarData}`);
        let opusimg1ref = firebase.storage().ref().child(`${current}/portfolio/opus/${opus1img}`); 
        let opusimg2ref = firebase.storage().ref().child(`${current}/portfolio/opus/${opus2img}`);
        let opusimg3ref = firebase.storage().ref().child(`${current}/portfolio/opus/${opus3img}`);
        let opusimg4ref = firebase.storage().ref().child(`${current}/portfolio/opus/${opus4img}`);
        let opusimg5ref = firebase.storage().ref().child(`${current}/portfolio/opus/${opus5img}`);
        let opusimg6ref = firebase.storage().ref().child(`${current}/portfolio/opus/${opus6img}`);
        let opusimg7ref = firebase.storage().ref().child(`${current}/portfolio/opus/${opus7img}`);
        let opusimg8ref = firebase.storage().ref().child(`${current}/portfolio/opus/${opus8img}`);
        let opusimg9ref = firebase.storage().ref().child(`${current}/portfolio/opus/${opus9img}`);
        let opusimg10ref = firebase.storage().ref().child(`${current}/portfolio/opus/${opus10img}`);

        //DLURLをぶちこむ
        avatarref.getDownloadURL().then((url) => {
          // postData.avatarurl = url;
          document.getElementById('avatarurl').src =url;
        });
        if (!opusimg1ref == nul) {
          opusimg1ref.getDownloadURL().then((url) => {
            // postData.avatarurl = url;
            document.getElementById('opus1image').src =url;
          });
        }
        // opusimg2ref.getDownloadURL().then((url) => {
        //   // postData.avatarurl = url;
        //   document.getElementById('opus2image').src =url;
        // });
        // opusimg3ref.getDownloadURL().then((url) => {
        //   // postData.avatarurl = url;
        //   document.getElementById('opus3image').src =url;
        // });
        // opusimg4ref.getDownloadURL().then((url) => {
        //   // postData.avatarurl = url;
        //   document.getElementById('opus4image').src =url;
        // });
        // opusimg5ref.getDownloadURL().then((url) => {
        //   // postData.avatarurl = url;
        //   document.getElementById('opus5image').src =url;
        // });
        // opusimg6ref.getDownloadURL().then((url) => {
        //   // postData.avatarurl = url;
        //   document.getElementById('opus6image').src =url;
        // });
        // opusimg7ref.getDownloadURL().then((url) => {
        //   // postData.avatarurl = url;
        //   document.getElementById('opus7image').src =url;
        // });
        // opusimg8ref.getDownloadURL().then((url) => {
        //   // postData.avatarurl = url;
        //   document.getElementById('opus8image').src =url;
        // });
        // opusimg9ref.getDownloadURL().then((url) => {
        //   // postData.avatarurl = url;
        //   document.getElementById('opus9image').src =url;
        // });
        // opusimg10ref.getDownloadURL().then((url) => {
        //   // postData.avatarurl = url;
        //   document.getElementById('opus10image').src =url;
        // });
     

      } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`)
      }
    })()
  }

      // result.map((post) =>  (
      // Object.keys(result).forEach(post => (

  return (
    <>
      <Head>
        <title>ポートフォリオ</title>
      </Head>
      <Layout>
      <div className="wrap">
        <div className="container">
          <div className="space-box50">
          </div>
          {result.map((post) =>  (
          <>
            <div className="basic-back intro-back">
              <div className="space-box20">
              </div>
              <div className="intro-head">
                <div className="intro-left">
                  <img src="" id="avatarurl" alt="アイコン" className="port-avatar" />         
                </div>
                <div className="intro-center">
                  <div className="intro-center-name">
                    {post.artistname}
                  </div>
                  <div className="intro-center-genre">
                    {post.genre}
                  </div>
                </div>
                <div className="intro-right">
                </div>
              </div>
              <div className="space-box10">
              </div>
              <div className="intro-foot">
                <div className="intro-foot-text">
                  {post.introduction}
                </div>
                <div className="intro-foot-insta">
                  {post.instaurl}
                </div>
                <div className="intro-foot-tw">
                  {post.twurl}
                </div>
                <div className="intro-foot-fb">
                  {post.fburl}
                </div>
              </div>
              <div className="space-box20">
              </div>
            </div>
            <div className="space-box10">
            </div>
          { !post.tags || !post.birthplace || !post.base == "" && (
            <>
            <div className="basic-back tag-back">
            {post.birthplace} &ensp; {post.base} &ensp; {post.tags}
            </div>
            <div className="space-box10">
            </div>
            </>
          )}
          { !post.dream == "" && (
            <>
            <div className="basic-back dream-back">
              <h3>これからの活動</h3>
              <div className="box-text">
                {post.dream}
              </div>
              <div className="space-box20">
              </div>
            </div>
            <div className="space-box10">
            </div>
            </>
          )}
          { !post.carrir == "" && (
          <>
            <div className="basic-back carrier-back">
              <h3>今までの活動</h3>
              <div className="box-text">
              {post.carrir}
              </div>
              <div className="space-box20">
              </div>
            </div>
            <div className="space-box10">
            </div>
            </>
          )}

          { !post.opus1image == "" && (
            <div className="opus-back">

              <div className="opus-box">
                <div className="opus-image">
                  <img src="" id="opus1image" alt="作品1画像" className="opus-size" />         
                  <div className="opus-title">
                    {post.opus1title}
                  </div>
                  <div className="opus-discription">
                    {post.opus1discription}
                  </div>
                </div>
              </div>

              <div className="opus-box">
                <div className="opus-image">
                  <img src="" id="opus2image" alt="作品2画像" className="opus-size" />
                  <div className="opus-title">
                    {post.opus2title}
                  </div>
                  <div className="opus-discription">
                    {post.opus2discription}
                  </div>
                </div>
              </div>

              <div className="opus-box">
                <div className="opus-image">
                  <img src="" id="opus3image" alt="作品3画像" className="opus-size" />
                  <div className="opus-title">
                    {post.opus3title}
                  </div>
                  <div className="opus-discription">
                    {post.opus3discription}
                  </div>
                </div>
              </div>

              <div className="opus-box">
                <div className="opus-image">
                  <img src="" id="opus4image" alt="作品4画像" className="opus-size" />
                  <div className="opus-title">
                    {post.opus4title}
                  </div>
                  <div className="opus-discription">
                    {post.opus4discription}
                  </div>
                </div>
              </div>

              <div className="opus-box">
                <div className="opus-image">
                  <img src="" id="opus5image" alt="作品5画像" className="opus-size" />
                  <div className="opus-title">
                    {post.opus5title}
                  </div>
                  <div className="opus-discription">
                    {post.opus5discription}
                  </div>
                </div>
              </div>

              <div className="opus-box">
                <div className="opus-image">
                  <img src="" id="opus6image" alt="作品6画像" className="opus-size" />
                  <div className="opus-title">
                    {post.opus6title}
                  </div>
                  <div className="opus-discription">
                    {post.opus6discription}
                  </div>
                </div>
              </div>

              <div className="opus-box">
                <div className="opus-image">
                  <img src="" id="opus7image" alt="作品7画像" className="opus-size" />
                  <div className="opus-title">
                    {post.opus7title}
                  </div>
                  <div className="opus-discription">
                    {post.opus7discription}
                  </div>
                </div>
              </div>

              <div className="opus-box">
                <div className="opus-image">
                  <img src="" id="opus8image" alt="作品8画像" className="opus-size" />
                  <div className="opus-title">
                    {post.opus8title}
                  </div>
                  <div className="opus-discription">
                    {post.opus8discription}
                  </div>
                </div>
              </div>

              <div className="opus-box">
                <div className="opus-image">
                  <img src="" id="opus9image" alt="作品9画像" className="opus-size" />
                  <div className="opus-title">
                    {post.opus9title}
                  </div>
                  <div className="opus-discription">
                    {post.opus9discription}
                  </div>
                </div>
              </div>

              <div className="opus-box">
                <div className="opus-image">
                  <img src="" id="opus10image" alt="作品10画像" className="opus-size" />
                  <div className="opus-title">
                    {post.opus10title}
                  </div>
                  <div className="opus-discription">
                    {post.opus10discription}
                  </div>
                </div>
              </div>

            </div>
          )}
          </>
          ))}
          <div className="space-box50">
          </div>
          <Link href="/portedit">
            <div className="edit-btn-box">
              編集する
            </div>
          </Link>
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
            font-family: Hiragino Sans,ヒラギノ角ゴシック,Yu Gothic,游ゴシック,sans-serif;
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
            font-family: Hiragino Sans,ヒラギノ角ゴシック,Yu Gothic,游ゴシック,sans-serif;
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
            font-family: Hiragino Sans,ヒラギノ角ゴシック,Yu Gothic,游ゴシック,sans-serif;
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
          .edit-btn-box {
            width: 120px;
            height: 30px;
            font-family: Hiragino Sans,ヒラギノ角ゴシック,Yu Gothic,游ゴシック,sans-serif;
            font-size: 14px;
            border-radius: 3px;
            color: white;
            text-align: center;
            padding-top: 5px;
            background-color: #240A2C;
            cursor: pointer;
          }

        `}</style>
      </Layout>
    </>
  );
};

export default PortFolio;