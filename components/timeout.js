import { useEffect } from "react";
import Image from "next/image";
import LogoHeader from "../components/logo_header";
import svg from "../public/illustration.svg";
const TimeOutView = ({ remote }) => {
  return (
    <section className="main-section">
      <LogoHeader />
      <div className="main-container">
        <Image src={svg} width={250} height={250} />
        <section className="message-section">
          <h2 className="preliminary-text">Request Time Out</h2>
          <div className="message-avscsc">
            The server took a long time to respond
          </div>
          <div
            className="action-btn"
            onClick={() => alert("TODO: redirect to instapage")}
          >
            <p>Try again</p>
          </div>
        </section>
      </div>
      <style jsx>{`
        * {
        }
        .main-section {
          max-width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: start;
          align-items: center;
          height: 100vh;
        }
        .main-container {
          max-width: 70%;
          display: flex;
          column-gap: 157px;
          flex-direction: row;
          align-items: center;
          flex-grow: 1;
        }
        .offer {
          display: inline-flex;
          flex-direction: row;
          align-items: flex-start;
          padding: 10px 20px;
          background: var(--orange);
          border-radius: 10px;

          font-family: Montserrat;
          font-size: 75px;
          color: white;
          font-weight: 600;
        }
        .message-section {
          display: flex;
          flex-direction: column;
          column-gap: 34px;
        }
        .preliminary-text {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 600;
          font-size: 40px;
          color: var(--orange);
        }
        .message-avscsc {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 600;
          font-size: 32px;
          color: #234951;
        }
        .mail {
          color: var(--orange);
          text-decoration: underline;
          text-decoration-color: var(--orange);
        }
        .action-btn {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          /* identical to box height */

          text-decoration-line: underline;
          /* 01. Primary/300 */

          color: #7da7b0;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
};

export default TimeOutView;
