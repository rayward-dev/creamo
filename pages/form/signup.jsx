import { useState } from "react";
import Head from 'next/head';
import Layout from '../../components/layout'

const SignUp = () => {
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
        <title>新規登録</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <div class="wrap">
        <div class="container">
          <div class="title">新規登録
          </div>
          <form>
            <div class="form-box">
              <label class="label-text">Name
                <input 
                  type="text"
                  name="name" 
                  class="form"
                  placeholder="名前を入力(20文字以内)"
                  maxlength="20"
                  required
                />
              </label>
            </div>
            <div class="space-box50">
            </div>
            <div class="form-box">
              <label class="label-text">E-mail
                <input 
                  type="email"
                  name="mail" 
                  class="form"
                  placeholder="メールアドレスを入力"
                  required
                />
              </label>
            </div>
            <div class="space-box50">
            </div>
            <div class="form-box">
              <label class="label-text">Password
                <input 
                  type="password"
                  name="passwaord" 
                  class="form"
                  placeholder="パスワードを入力(6文字以上)"
                  minlength="6"
                  required
                />
              </label>
            </div>
            <div class="space-box50">
            </div>
            <submit class="regist-btn">登録する
            </submit>
          </form>
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

export default SignUp;