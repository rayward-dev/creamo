import { useState,useEffect,useRef } from "react";
import { useRouter } from 'next/router'
import { db } from '../lib/db';
import Head from 'next/head';
import Link from 'next/link'
import Layout from '../components/layout'
import firebase from '../lib/db';

const PortEdit = () => {
  // 入力したnameデータを入れておくためのstate
  const [current, setCurrent] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarname, setAvatarname] = useState("");
  const [genre, setGenre] = useState("");
  const [intro, setIntro] = useState("");
  const [place,setPlace] = useState("");
  const [base,setBase] = useState("");
  const [tags, setTags] = useState([]);
  const [career,setCareer] = useState("");
  const [dream,setDream] = useState("");

  const [opus1title,setOpus1title] = useState("");
  const [opus1image,setOpus1image] = useState("");
  const [opus1imagename,setOpus1imagename] = useState("");
  const [opus1disc,setOpus1disc] = useState("");
  const [opus2title,setOpus2title] = useState("");
  const [opus2image,setOpus2image] = useState("");
  const [opus2imagename,setOpus2imagename] = useState("");
  const [opus2disc,setOpus2disc] = useState("");
  const [opus3title,setOpus3title] = useState("");
  const [opus3image,setOpus3image] = useState("");
  const [opus3imagename,setOpus3imagename] = useState("");
  const [opus3disc,setOpus3disc] = useState("");
  const [opus4title,setOpus4title] = useState("");
  const [opus4image,setOpus4image] = useState("");
  const [opus4imagename,setOpus4imagename] = useState("");
  const [opus4disc,setOpus4disc] = useState("");
  const [opus5title,setOpus5title] = useState("");
  const [opus5image,setOpus5image] = useState("");
  const [opus5imagename,setOpus5imagename] = useState("");
  const [opus5disc,setOpus5disc] = useState("");
  const [opus6title,setOpus6title] = useState("");
  const [opus6image,setOpus6image] = useState("");
  const [opus6imagename,setOpus6imagename] = useState("");
  const [opus6disc,setOpus6disc] = useState("");
  const [opus7title,setOpus7title] = useState("");
  const [opus7image,setOpus7image] = useState("");
  const [opus7imagename,setOpus7imagename] = useState("");
  const [opus7disc,setOpus7disc] = useState("");
  const [opus8title,setOpus8title] = useState("");
  const [opus8image,setOpus8image] = useState("");
  const [opus8imagename,setOpus8imagename] = useState("");
  const [opus8disc,setOpus8disc] = useState("");
  const [opus9title,setOpus9title] = useState("");
  const [opus9image,setOpus9image] = useState("");
  const [opus9imagename,setOpus9imagename] = useState("");
  const [opus9disc,setOpus9disc] = useState("");
  const [opus10title,setOpus10title] = useState("");
  const [opus10image,setOpus10image] = useState("");
  const [opus10imagename,setOpus10imagename] = useState("");
  const [opus10disc,setOpus10disc] = useState("");

  const auth = firebase.auth();
  const router = useRouter();
  const mounted = useRef(false)

  useEffect(() => {
    if(mounted.current) {
      // Update時の処理
      initialData(current)
      console.log('Updated!')
    } else {
      // Mount時の処理
      authCheck();
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

  const initialData = () => {
    (async () => {
      try {
        //画像の初期値は設定できないので今のアバターを表示だけしてvalueは""で。
        //変更あったら上書きして、""のままなら何もしない

        const userRef = db.collection('users').doc(current)
        const userFile = await userRef.get()
        const userData = userFile.data();

        const initialName = userData.artistname
        console.log(initialName);
        setName(initialName)

      } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`)
      }
    })()
  }
  
  //更新する内容
  const handleSubmit = (e) => {
    // firestoreに保存
    db.collection('users').doc(current).set({
      artistname: name,
      avatar: avatarname,
      genre: genre,
      introduction: intro,
      birthplace: place,
      base: base,
      tags: tags,
      career: career,
      dream: dream,

      opus1title: opus1title,
      opus1image: opus1imagename,
      opus1discription: opus1disc,
      opus2title: opus2title,
      opus2image: opus2imagename,
      opus2discription: opus2disc,
      opus3title: opus3title,
      opus3image: opus3imagename,
      opus3discription: opus3disc,
      opus4title: opus4title,
      opus4image: opus4imagename,
      opus4discription: opus4disc,
      opus5title: opus5title,
      opus5image: opus5imagename,
      opus5discription: opus5disc,
      opus6title: opus6title,
      opus6image: opus6imagename,
      opus6discription: opus6disc,
      opus7title: opus7title,
      opus7image: opus7imagename,
      opus7discription: opus7disc,
      opus8title: opus8title,
      opus8image: opus8imagename,
      opus8discription: opus8disc,
      opus9title: opus9title,
      opus9image: opus9imagename,
      opus9discription: opus9disc,
      opus10title: opus10title,
      opus10image: opus10imagename,
      opus10discription: opus10disc,
    })
    // firestorageにアップロード
    const storageRef = storage.ref().child(`${current}/portfolio/avatar/${avatarname}`);  
    storageRef.put(avatar)
    .then = () => {
    console.log("アバターが送信されました");
    };
    const imgarr = [
      {name: opus1imagename, val: opus1image},
      {name: opus2imagename, val: opus2image},
      {name: opus3imagename, val: opus3image},
      {name: opus4imagename, val: opus4image},
      {name: opus5imagename, val: opus5image},
      {name: opus6imagename, val: opus6image},
      {name: opus7imagename, val: opus7image},
      {name: opus8imagename, val: opus8image},
      {name: opus9imagename, val: opus9image},
      {name: opus10imagename, val: opus10image}
    ]
    imgarr.forEach(result => {
      const storageRef = storage.ref().child(`${current}/portfolio/opus/${result.name}`);  
      storageRef.put(result.val)
      .then = () => {
      console.log(`${result.name}が送信されました`);
      };
    })

  }

  //アバター入力の取得
  const avahandleChange = (e) => {
    let imgaBox = e.target.files[0];
    setAvatar(imgaBox);
    console.log(imgaBox);
    let imgaNbox = imgaBox.name
    setAvatarname(imgaNbox);
    console.log(imgaNbox);
  };
  //nameフォームの取得
  const nhandleChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  //genreフォームの取得
  const ghandleChange = (e) => {
    setGenre(e.target.value);
    console.log(genre);
  };
  //introフォームの取得
  const inhandleChange = (e) => {
    setIntro(e.target.value);
  };
  //placeフォームの取得
  const phandleChange = (e) => {
    setPlace(e.target.value);
  };
  //baseフォームの取得
  const bhandleChange = (e) => {
    setBase(e.target.value);
  };
  //tagsフォームの取得
  const thandleChange = (e) => {
    let tagBox = e.target.value;
    let kugiri = ",";
    let tagSplit = tagBox.split(kugiri); //区切った文字列で配列にして保存する
    setTags(tagSplit);
    console.log(tagBox);
    console.log(tagSplit);
  };
  //careerフォームの取得
  const chandleChange = (e) => {
    setCareer(e.target.value);
  };
  //dreamフォームの取得
  const dhandleChange = (e) => {
    setBase(e.target.value);
  };

  //opus1の取得
  const opi1handleChange = (e) => {
    let imgaBox = e.target.files[0];
    setOpus1image(imgaBox);
    console.log(imgaBox);
    let imgaNbox = imgaBox.name
    setOpus1imagename(imgaNbox);
    console.log(imgaNbox);
  };
  const opt1handleChange = (e) => {
    setOpus1title(e.target.value);
  };
  const opd1handleChange = (e) => {
    setOpus1disc(e.target.value);
  };
  //opus2の取得
  const opi2handleChange = (e) => {
    let imgaBox = e.target.files[0];
    setOpus2image(imgaBox);
    console.log(imgaBox);
    let imgaNbox = imgaBox.name
    setOpus2imagename(imgaNbox);
    console.log(imgaNbox);
  };
  const opt2handleChange = (e) => {
    setOpus2title(e.target.value);
  };
  const opd2handleChange = (e) => {
    setOpus2disc(e.target.value);
  };
  //opus3の取得
  const opi3handleChange = (e) => {
    let imgaBox = e.target.files[0];
    setOpus3image(imgaBox);
    console.log(imgaBox);
    let imgaNbox = imgaBox.name
    setOpus3imagename(imgaNbox);
    console.log(imgaNbox);
  };
  const opt3handleChange = (e) => {
    setOpus3title(e.target.value);
  };
  const opd3handleChange = (e) => {
    setOpus3disc(e.target.value);
  };
  //opus4の取得
  const opi4handleChange = (e) => {
    let imgaBox = e.target.files[0];
    setOpus4image(imgaBox);
    console.log(imgaBox);
    let imgaNbox = imgaBox.name
    setOpus4imagename(imgaNbox);
    console.log(imgaNbox);
  };
  const opt4handleChange = (e) => {
    setOpus4title(e.target.value);
  };
  const opd4handleChange = (e) => {
    setOpus4disc(e.target.value);
  };
  //opus5の取得
  const opi5handleChange = (e) => {
    let imgaBox = e.target.files[0];
    setOpus5image(imgaBox);
    console.log(imgaBox);
    let imgaNbox = imgaBox.name
    setOpus5imagename(imgaNbox);
    console.log(imgaNbox);
  };
  const opt5handleChange = (e) => {
    setOpus5title(e.target.value);
  };
  const opd5handleChange = (e) => {
    setOpus5disc(e.target.value);
  };
  //opus6の取得
  const opi6handleChange = (e) => {
    let imgaBox = e.target.files[0];
    setOpus6image(imgaBox);
    console.log(imgaBox);
    let imgaNbox = imgaBox.name
    setOpus6imagename(imgaNbox);
    console.log(imgaNbox);
  };
  const opt6handleChange = (e) => {
    setOpus6title(e.target.value);
  };
  const opd6handleChange = (e) => {
    setOpus6disc(e.target.value);
  };
  //opus7の取得
  const opi7handleChange = (e) => {
    let imgaBox = e.target.files[0];
    setOpus7image(imgaBox);
    console.log(imgaBox);
    let imgaNbox = imgaBox.name
    setOpus7imagename(imgaNbox);
    console.log(imgaNbox);
  };
  const opt7handleChange = (e) => {
    setOpus7title(e.target.value);
  };
  const opd7handleChange = (e) => {
    setOpus7disc(e.target.value);
  };
  //opus8の取得
  const opi8handleChange = (e) => {
    let imgaBox = e.target.files[0];
    setOpus8image(imgaBox);
    console.log(imgaBox);
    let imgaNbox = imgaBox.name
    setOpus8imagename(imgaNbox);
    console.log(imgaNbox);
  };
  const opt8handleChange = (e) => {
    setOpus8title(e.target.value);
  };
  const opd8handleChange = (e) => {
    setOpus8disc(e.target.value);
  };
  //opus9の取得
  const opi9handleChange = (e) => {
    let imgaBox = e.target.files[0];
    setOpus9image(imgaBox);
    console.log(imgaBox);
    let imgaNbox = imgaBox.name
    setOpus9imagename(imgaNbox);
    console.log(imgaNbox);
  };
  const opt9handleChange = (e) => {
    setOpus9title(e.target.value);
  };
  const opd9handleChange = (e) => {
    setOpus9disc(e.target.value);
  };
  //opus10の取得
  const opi10handleChange = (e) => {
    let imgaBox = e.target.files[0];
    setOpus10image(imgaBox);
    console.log(imgaBox);
    let imgaNbox = imgaBox.name
    setOpus10imagename(imgaNbox);
    console.log(imgaNbox);
  };
  const opt10handleChange = (e) => {
    setOpus10title(e.target.value);
  };
  const opd10handleChange = (e) => {
    setOpus10disc(e.target.value);
  };

  return (
    <>
      <Head>
        <title>ポートフォリオ編集ページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <div className="wrap">
        <div className="container">
          <div className="space-box50">
          </div>
          <div className="title">ポートフォリオ編集画面
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
                  onChange={avahandleChange}
                />
              </label>
            </div>
            <div className="space-box50">
            </div>
            <div className="form-box">
              <label className="label-text">作家名
                <input 
                  type="text"
                  name="artistname" 
                  className="form"
                  placeholder="作家名を入力(20文字以内)"
                  maxLength="20"
                  value={name}
                  onChange={nhandleChange}
                  required
                />
              </label>
            </div>
            <div className="space-box30">
            </div>
            <div className="form-box">
              <label className="label-text">ジャンル
                <input 
                  type="text"
                  name="genre" 
                  className="form"
                  placeholder="ジャンルを入力"
                  value={setGenre.value}
                  onChange={ghandleChange}
                />
              </label>
            </div>
            <div className="space-box30">
            </div>
            <div className="form-box">
              <label className="label-text">自己紹介
                <textarea 
                  name="introduction" 
                  className="post-form"
                  placeholder="自己紹介を入力"
                  value={setIntro.value}
                  onChange={inhandleChange}
                />
              </label>
            </div>
            <div className="space-box30">
            </div>
            <div className="form-box">
              <label className="label-text">出身
                <input 
                  type="text"
                  name="birthplace" 
                  className="form"
                  placeholder="出身を入力"
                  value={setPlace.value}
                  onChange={phandleChange}
                />
              </label>
            </div>
            <div className="space-box30">
            </div>
            <div className="form-box">
              <label className="label-text">活動場所・拠点
                <input 
                  type="text"
                  name="base" 
                  className="form"
                  placeholder="活動場所・拠点を入力"
                  value={setBase.value}
                  onChange={bhandleChange}
                />
              </label>
            </div>
            <div className="space-box30">
            </div>
            <div className="form-box">
              <label className="label-text">その他のパーソナルデータ
                <input 
                  type="text"
                  name="base" 
                  className="form"
                  placeholder="例) A型,水瓶座,〇〇好き"
                  value={setTags.value}
                  onChange={thandleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div>※複数登録する場合は「,」で区切ってください</div>
            <div className="space-box30">
            </div>
            <div className="form-box">
              <label className="label-text">経歴
                <textarea 
                  name="career" 
                  className="post-form"
                  placeholder="経歴や受賞歴を入力"
                  value={setCareer.value}
                  onChange={chandleChange}
                />
              </label>
            </div>
            <div className="space-box30">
            </div>
            <div className="form-box">
              <label className="label-text">将来の夢
                <textarea 
                  name="dream" 
                  className="post-form"
                  placeholder="将来の夢・実現したいことを入力"
                  value={setDream.value}
                  onChange={dhandleChange}
                />
              </label>
            </div>
            <div className="space-box30">
            </div>

            <div className="form-box">
              <label className="file-label">作品１
                <input 
                  type="file"
                  name="opus1" 
                  id="image-file"
                  className="file-form"
                  value={setOpus1image.value}
                  onChange={opi1handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品１のタイトル
                <input 
                  type="text"
                  name="opus1title" 
                  className="form"
                  placeholder="作品１のタイトルを入力"
                  value={setOpus1title.value}
                  onChange={opt1handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品１の詳細
                <textarea 
                  name="opus1detail" 
                  className="post-form"
                  placeholder="作品１の詳細を入力"
                  value={setOpus1disc.value}
                  onChange={opd1handleChange}
                />
              </label>
            </div>
            <div className="space-box30">
            </div>

            <div className="form-box">
              <label className="file-label">作品２
                <input 
                  type="file"
                  name="opus2" 
                  id="image-file"
                  className="file-form"
                  value={setOpus2image.value}
                  onChange={opi2handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品２のタイトル
                <input 
                  type="text"
                  name="opus2title" 
                  className="form"
                  placeholder="作品２のタイトルを入力"
                  value={setOpus2title.value}
                  onChange={opt2handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品２の詳細
                <textarea 
                  name="opus2detail" 
                  className="post-form"
                  placeholder="作品２の詳細を入力"
                  value={setOpus2disc.value}
                  onChange={opd2handleChange}
                />
              </label>
            </div>
            <div className="space-box30">
            </div>

            <div className="form-box">
              <label className="file-label">作品３
                <input 
                  type="file"
                  name="opus3" 
                  id="image-file"
                  className="file-form"
                  value={setOpus3image.value}
                  onChange={opi3handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品３のタイトル
                <input 
                  type="text"
                  name="opus3title" 
                  className="form"
                  placeholder="作品３のタイトルを入力"
                  value={setOpus3title.value}
                  onChange={opt3handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品３の詳細
                <textarea 
                  name="opus3detail" 
                  className="post-form"
                  placeholder="作品３の詳細を入力"
                  value={setOpus3disc.value}
                  onChange={opd3handleChange}
                />
              </label>
            </div>
            <div className="space-box30">
            </div>

            <div className="form-box">
              <label className="file-label">作品４
                <input 
                  type="file"
                  name="opus4" 
                  id="image-file"
                  className="file-form"
                  value={setOpus4image.value}
                  onChange={opi4handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品４のタイトル
                <input 
                  type="text"
                  name="opus4title" 
                  className="form"
                  placeholder="作品４のタイトルを入力"
                  value={setOpus4title.value}
                  onChange={opt4handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品４の詳細
                <textarea 
                  name="opus4detail" 
                  className="post-form"
                  placeholder="作品４の詳細を入力"
                  value={setOpus4disc.value}
                  onChange={opd4handleChange}
                />
              </label>
            </div>
            <div className="space-box30">
            </div>

            <div className="form-box">
              <label className="file-label">作品５
                <input 
                  type="file"
                  name="opus5" 
                  id="image-file"
                  className="file-form"
                  value={setOpus5image.value}
                  onChange={opi5handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品５のタイトル
                <input 
                  type="text"
                  name="opus5title" 
                  className="form"
                  placeholder="作品５のタイトルを入力"
                  value={setOpus5title.value}
                  onChange={opt5handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品５の詳細
                <textarea 
                  name="opus5detail" 
                  className="post-form"
                  placeholder="作品５の詳細を入力"
                  value={setOpus5disc.value}
                  onChange={opd5handleChange}
                />
              </label>
            </div>
            <div className="space-box30">
            </div>

            <div className="form-box">
              <label className="file-label">作品６
                <input 
                  type="file"
                  name="opus6" 
                  id="image-file"
                  className="file-form"
                  value={setOpus6image.value}
                  onChange={opi6handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品６のタイトル
                <input 
                  type="text"
                  name="opus6title" 
                  className="form"
                  placeholder="作品６のタイトルを入力"
                  value={setOpus6title.value}
                  onChange={opt6handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品６の詳細
                <textarea 
                  name="opus6detail" 
                  className="post-form"
                  placeholder="作品６の詳細を入力"
                  value={setOpus6disc.value}
                  onChange={opd6handleChange}
                />
              </label>
            </div>
            <div className="space-box30">
            </div>

            <div className="form-box">
              <label className="file-label">作品７
                <input 
                  type="file"
                  name="opus7" 
                  id="image-file"
                  className="file-form"
                  value={setOpus7image.value}
                  onChange={opi7handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品７のタイトル
                <input 
                  type="text"
                  name="opus7title" 
                  className="form"
                  placeholder="作品７のタイトルを入力"
                  value={setOpus7title.value}
                  onChange={opt7handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品７の詳細
                <textarea 
                  name="opus7detail" 
                  className="post-form"
                  placeholder="作品７の詳細を入力"
                  value={setOpus7disc.value}
                  onChange={opd7handleChange}
                />
              </label>
            </div>
            <div className="space-box30">
            </div>

            <div className="form-box">
              <label className="file-label">作品８
                <input 
                  type="file"
                  name="opus8"
                  id="image-file"
                  className="file-form"
                  value={setOpus8image.value}
                  onChange={opi8handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品８のタイトル
                <input 
                  type="text"
                  name="opus8title" 
                  className="form"
                  placeholder="作品８のタイトルを入力"
                  value={setOpus8title.value}
                  onChange={opt8handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品８の詳細
                <textarea 
                  name="opus8detail" 
                  className="post-form"
                  placeholder="作品８の詳細を入力"
                  value={setOpus8disc.value}
                  onChange={opd8handleChange}
                />
              </label>
            </div>
            <div className="space-box30">
            </div>

            <div className="form-box">
              <label className="file-label">作品９
                <input 
                  type="file"
                  name="opus9" 
                  id="image-file"
                  className="file-form"
                  value={setOpus9image.value}
                  onChange={opi9handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品９のタイトル
                <input 
                  type="text"
                  name="opus9title" 
                  className="form"
                  placeholder="作品９のタイトルを入力"
                  value={setOpus9title.value}
                  onChange={opt9handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品９の詳細
                <textarea 
                  name="opus9detail" 
                  className="post-form"
                  placeholder="作品９の詳細を入力"
                  value={setOpus9disc.value}
                  onChange={opd9handleChange}
                />
              </label>
            </div>
            <div className="space-box30">
            </div>

            <div className="form-box">
              <label className="file-label">作品１０
                <input 
                  type="file"
                  name="opus10" 
                  id="image-file"
                  className="file-form"
                  value={setOpus10image.value}
                  onChange={opi10handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品１０のタイトル
                <input 
                  type="text"
                  name="opus10title" 
                  className="form"
                  placeholder="作品１０のタイトルを入力"
                  value={setOpus10title.value}
                  onChange={opt10handleChange}
                />
              </label>
            </div>
            <div className="space-box10">
            </div>
            <div className="form-box">
              <label className="label-text">作品１０の詳細
                <textarea 
                  name="opus10detail" 
                  className="post-form"
                  placeholder="作品１０の詳細を入力"
                  value={setOpus10disc.value}
                  onChange={opd10handleChange}
                />
              </label>
            </div>
            <div className="space-box50">
            </div>
            <button type="submit" className="regist-btn">更新する
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

export default PortEdit;