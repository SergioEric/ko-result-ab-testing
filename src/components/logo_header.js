import Image from "next/image";

const LogoHeader = () => (
  <div className="logo-header">
    <div className="margin"></div>
    {/* <figure> */}
    <Image
      src="/Keller-Offers-Logo.png"
      className="logo-img"
      height={42.5}
      width={125}
      alt="ko-logo"
    />
    {/* </figure> */}
    <style jsx>{`
      .margin {
        margin-left: 100px;
      }
      .logo-header {
        min-height: 60px;
        background-color: var(--background);
        width: 100%;
        display: flex;
        align-items: center;
      }
      .logo-img {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </div>
);

export default LogoHeader;
