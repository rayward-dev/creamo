import { useState } from "react";
import Link from 'next/link'

const Layout = (props) => {
  return (
    <>
      <div className="layout-wrap">
        <div className="border-box-bottom">
          <div className="header-box">
            <div className="flex-wrap-head">
              <Link href="/">
                <div className="header-title">
                  CREAMO
                </div>
              </Link>
              <Link href="/">
                <div className="top-back">
                  一覧に戻る
                </div>
              </Link>
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
          border-bottom: 2px solid gray;
          background-color: white;
        }
        .header-box {
          margin: 0 auto;
          max-width: 70%;
          height: 40px;
        }
        .flex-wrap-head {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .header-title {
          color: #240A2C;
          font-family: Arial;
          font-size: 22px;
          line-height: 40px;
          cursor: pointer;
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