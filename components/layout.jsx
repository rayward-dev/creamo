import { useState,useEffect } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'
import firebase from '../lib/db';





const Layout = (props) => {

  const [user, setUser] = useState("");
  const auth = firebase.auth();
  const router = useRouter();

  useEffect(() => {
     authCheck(user);
  },[user]);

  const authCheck = () => {
    (async () => {
      try {
        let userBox = "";
        auth.onAuthStateChanged(user => {
          if (user) {
            console.log("Layoutサインインしてます");
            userBox = auth.currentUser;
            setUser(userBox);
          }
          else {
            console.log("Layoutサインインしてません");
          }
        })
      } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`)
      }
    })()
  }
  // ログアウトメソッド
  const logout = (e) => {
    e.preventDefault();
    firebase.auth().signOut()
    location.reload();
    router.push('/');
  }

  return (
    <>
      <div className="layout-wrap">
        <div className="border-box-bottom">
          <div className="header-box">
            <div className="flex-wrap-head">
              <Link href="/" passHref>
                <div className="header-title">
                  CREAMO
                </div>
              </Link>
              { !user == "" && (
              <>
                <div className="header-top-btn-left">
                  マイページ
                </div>
                <div className="header-top-btn">
                  <a onClick={logout}>ログアウト</a>
                </div>
              </>
              )}
              { user == "" && (
              <>
              <Link href="/signup">
                <div className="header-top-btn-left">
                  新規登録
                </div>
              </Link>
              <Link href="/login">
                <div className="header-top-btn">
                  ログイン
                </div>
              </Link>
              </>
              )}
            </div>
          </div>
        
          <div className="border-box-top">
            <div className="header-box">
              <div className="flex-wrap-head-second">
                <div className="post-btn-area">
                { !user == "" && (
                  <Link href="/post" passHref>
                    <div className="post-btn-box">
                        投稿する
                    </div>
                  </Link>
                )}
                { user == "" && (
                  <Link href="/login">
                  <div className="post-btn-box">
                      投稿する
                  </div>
                  </Link>
                )}
                </div>
                <div className="header-top-btn-second">
                  作家一覧
                </div>
                <div className="header-top-btn-second">
                  イベント
                </div>
                <div className="header-top-btn-second">
                  使い方
                </div>
              </div>
            </div>
          </div>

        </div>

        {props.children}

        <div className="footer-back">
          <div className="footer-inbox">
            <div className="flex-wrap-foot">
              <Link href="https://rayward.jp/">
                <a target="_blank" className="company">
                  運営会社
                </a>
              </Link>
              <div className="space-box50w">
              </div>
              <Link href="https://rayward.jp/wp-content/themes/rayward/privacy.html">
                <a target="_blank" className="policy">
                  プライバシーポリシー 
                </a>
              </Link>
            </div>
            <div className="copy">
              ©️ 2021 CREAMO all rights reserved
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .layout-wrap {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .border-box-bottom {
          position: fixed;
          width: 100%;
          border-bottom: 1px solid gray;
          background-color: white;
        }
        .border-box-top {
          width: 100%;
          border-top: 1px solid gray;
          background-color: white;
        }
        .header-box {
          margin: 0 auto;
          max-width: 70%;
          height: 40px;
        }
        .flex-wrap-head {
          display: flex;
          justify-content: flex-start;
        }
        .flex-wrap-head-second {
          display: flex;
          justify-content: space-between;
        }
        .header-title {
          color: #240A2C;
          font-family: Arial;
          font-size: 22px;
          line-height: 40px;
          cursor: pointer;
        }
        .post-btn-area {
          position: relative;
          width: 90px;
        }
        .post-btn-box {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 90px;
          height: 25px;
          font-family: Hiragino Sans,ヒラギノ角ゴシック,Yu Gothic,游ゴシック,sans-serif;
          font-size: 12px;
          border-radius: 3px;
          color: white;
          text-align: center;
          padding-top: 2px;
          background-color: #240A2C;
          cursor: pointer;
        }
        .header-top-btn-left {
          color: grey;
          font-family: Arial;
          font-size: 14px;
          line-height: 40px;
          cursor: pointer;
          margin-left: auto;
        }
        .header-top-btn-left:hover {
          color: #240A2C;
        }
        .header-top-btn {
          color: grey;
          font-family: Arial;
          font-size: 14px;
          line-height: 40px;
          cursor: pointer;
          padding-left: 50px;
        }
        .header-top-btn:hover {
          color: #240A2C;
        }
        .header-top-btn-second {
          color: grey;
          font-family: Arial;
          font-size: 12px;
          line-height: 40px;
          cursor: pointer;
          padding-left: 50px;
          white-space: nowrap;
        }
        .header-top-btn-second:hover {
          color: #240A2C;
        }

        .footer-back {
          margin-top: auto;
          background-color: #240A2C;
        }
        .footer-inbox {
          margin: 0 auto;
          max-width: 70%;
          padding-top: 10px;
        }
        .flex-wrap-foot {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        .company {
          color: white;
          font-family: Arial;
          font-size: 14px;
          cursor: pointer;
        }
        .company:hover {
          color: gray;
        }
        .policy {
          color: white;
          font-family: Arial;
          font-size: 14px;
          cursor: pointer;
        }
        .policy:hover {
          color: gray;
        }
        .copy {
          text-align: center;
          color: white;
          font-family: Arial;
          font-size: 12px;
          line-height: 30px;
        }
      `}</style>
    </>
  )
}
export default Layout;