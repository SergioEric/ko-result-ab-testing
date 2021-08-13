import LogoHeader from "../components/logo_header";
import Image from "next/image";

const NotFound = ({ remote }) => {
  return (
    <section className="main-section">
      <LogoHeader />
      <div className="offer-container">
        <div className="margin-top"></div>.
        <h2 className="preliminary-text">Sorry,</h2>
        <Image
          src="/not_found.png"
          className="logo-img"
          height={228}
          width={310}
          alt="ko-logo"
        />
        <div className="address">
          It looks like we do not service this area just yet
          <br />
          {remote.address} {remote.city}, {remote.state} {remote.zipcode}
        </div>
        <div className="paragraph">
          However, you are welcome to introduce us to your favorite General
          Contractor in your area
          <br />
          <br />
          Just reach out to us at{" "}
          <strong className="mail">questions@kelleroffers.com</strong>
        </div>
      </div>
      <style jsx>{`
        * {
        }
        h2,
        img {
          display: inline-block;
        }
        .main-section {
          max-width: 100%;
           {
            /* border: 1px solid salmon; */
          }
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .offer-container {
          max-width: 70%;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
          color: #234951;
          margin-bottom: 20px;
        }
        .paragraph {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 600;
          font-size: 28px;
           {
            /* margin-right: 450px; */
          }
          color: var(--blue-gray);
        }
        .mail {
          color: var(--orange);
          text-decoration: underline;
          text-decoration-color: var(--orange);
        }
        .margin-top {
          margin-top: 40px;
        }
      `}</style>
    </section>
  );
};

export default NotFound;
