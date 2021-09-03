import { useState } from "react";
import Image from "next/image";
import LogoHeader from "../components/logo_header";
import ContactForm from "./contact_form";

const NotFound = ({ remote }) => {
  const [activeForm, setActiveForm] = useState(false);

  return (
    <section className="main-section">
      <LogoHeader />
      <div style={{ flexGrow: 1 }}></div>
      <div className="offer-container">
        <div className="text-and-image">
          <h2 className="preliminary-text">Sorry,</h2>
          <Image
            src="/not_found.png"
            height={228 - 30}
            width={310 - 30}
            alt="ko-logo"
          />
        </div>
        <div className="message-issue">
          It looks like we do not service this area just yet
        </div>
        <div className="address">
          {remote.address} {remote.city}, {remote.state} {remote.zipcode}
        </div>
        <div className="paragraph">
          {activeForm
            ? "We will get a Keller Williams agent for you"
            : "Click here to sell your house through a Keller Williams Agent"}
        </div>
        <br />
        <br />
        {activeForm ? (
          <ContactForm />
        ) : (
          <button className="button" onClick={() => setActiveForm(true)}>
            Connect with an Agent
          </button>
        )}
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <style jsx>{`
         {
          /* * {
          border: 1px solid rgba(0, 0, 0, 0);
        } */
        }
        h2,
        img {
          display: inline-block;
        }
        .main-section {
          max-width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: end;
          height: 100vh;
        }
        .offer-container {
          width: 80%;
          max-width: 1440px;
          display: flex;
          flex-direction: column;
          justify-content: baseline;
          align-items: baseline;
          padding: 20px 0px;
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
        .preliminary-text {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 600;
          font-size: 75px;
          line-height: 39px;
          color: var(--orange);
          margin-bottom: 50px;
        }

        .address {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 600;
          font-size: 36px;
          color: var(--primary);
          margin-bottom: 20px;
        }
        .message-issue {
          font-size: 32px;
          color: var(--primary);
        }
        .paragraph {
          font-family: Montserrat;
          font-weight: 600;
          font-size: 26px;
          color: var(--blue-gray);
        }

        .text-and-image {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 10px;
        }
      `}</style>
    </section>
  );
};

export default NotFound;
