import LogoHeader from "../components/logo_header";
import Image from "next/image";

const BadUrlView = ({ message }) => {
  return (
    <section className="main-section">
      <LogoHeader />
      <div className="main-container">
        <Image
          src="/not_found.png"
          className="logo-img"
          height={292.98 + 40}
          width={397.5 + 40}
          alt="ko-logo"
        />
        <section className="message-section">
          <h2 className="preliminary-text">Sorry,</h2>
          <div className="message-avscsc">
            There seems to be something wrong with your Address
          </div>
          <div
            className="action-btn"
            onClick={() => alert("TODO: redirect to instapage")}
          >
            <p>Please review and try again</p>
          </div>
        </section>
      </div>
      <style jsx>{`
        * {
          border: 1px solid transparent;
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
        .action-btn:hover {
        }
      `}</style>
    </section>
  );
};

export default BadUrlView;
