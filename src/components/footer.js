export default function Footer() {
  return (
    <div className="footer-ko">
      <p className="ko-name">© 2021 Keller Offers</p>
      <p className="privacy-policy">Data Sharing • Privacy Policy</p>
      <style jsx>{`
        .ko-name {
          color: white;
        }
        .privacy-policy {
          color: #f7872a;
          margin-left: 5px;
        }
        .footer-ko {
          background-color: #234951;
          min-height: 45px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          font-family: Montserrat;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          align-self: flex-end;
        }
      `}</style>
    </div>
  );
}
