import { useState } from "react";
import Head from 'next/head';
import { useRouter } from 'next/router'
import Layout from '../components/layout'
// import { auth } from '../lib/db';
import firebase from '../lib/db';

const LogIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      firebase.auth().signInWithEmailAndPassword(email, password)
      alert('ログインしました');
      router.push('/');
    }
    catch(error) {
      alert('ログインに失敗しました');
    };
  };
  const ehandleChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const phandleChange = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  

  return (
    <>
      <Head>
        <title>ログイン</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <div className="wrap">
        <div className="container">
          <div className="title">ログイン
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-box">
              <label className="label-text">E-mail
                <input 
                  type="email"
                  name="mail" 
                  className="form"
                  placeholder="メールアドレスを入力"
                  value={setEmail.value}
                  onChange={ehandleChange}
                  required
                />
              </label>
            </div>
            <div className="space-box50">
            </div>
            <div className="form-box">
              <label className="label-text">Password
                <input 
                  type="password"
                  name="passwaord" 
                  className="form"
                  placeholder="パスワードを入力(6文字以上)"
                  minLength="6"
                  value={setPassword.value}
                  onChange={phandleChange}
                  required
                />
              </label>
            </div>
            <div className="space-box50">
            </div>
            <button type="submit" className="regist-btn">ログイン
            </button>
          </form>
          <div className="space-box50">
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
        `}</style>
        </Layout>
    </>
  )
}

export default LogIn;