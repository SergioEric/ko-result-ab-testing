import Head from "next/head";
import useSWR from "swr";

import { CheckIcon, BackArrowIcon } from "../components/icons";
import NotFound from "../components/not_found";
import LogoHeader from "../components/logo_header";
import BadUrlView from "../components/bad_url";

var formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error();
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const checklist_reason = [
  "Pellentesque faucibus adipiscing quis nibh non diam et bibendum.",
  "Nibh molestie pellentesque nunc quis elementum nec maecenas potenti penatibus.",
  // "check list reason 3",
  // "check list reason 4",
];

const RemoteFetching = ({ remote }) => {
  const { data, error } = useSWR(
    `/api/property?address=${remote.address}&zipcode=${remote.zipcode}`,
    fetcher
  );
  if (error) {
    // TODO component into view
    return <NotFound remote={remote} />;
  }
  // if (!data) return <div>loading...</div>;
  return (
    <section className="main-section">
      <Head>
        <title>{remote.address}</title>
      </Head>
      <LogoHeader />
      <div className="offer-container">
        <div className="margin-top"></div>
        <div className="">
          {!data ? (
            <progress
              className="progress is-small is-primary"
              max="100"
            ></progress>
          ) : (
            <div className="offer">
              {formatter.format(data.hc_avm_value_analysis.avm_value ?? 0)}
            </div>
          )}
          <h2 className="preliminary-text">Your preliminary offer</h2>
          <div className="address">
            {remote.address} {remote.city}, {remote.state} {remote.zipcode}
          </div>
          <Lorem />

          <div className="checklist">
            {checklist_reason.map((reason) => (
              <div className="check is-flex" key={reason}>
                <CheckIcon />
                <p>{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
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
          display: flex;
          flex-direction: column;
           {
            /* border: 1px solid blue; */
          }
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
          font-size: 32px;
          line-height: 39px;
          color: var(--orange);
          margin-top: 10px;
          margin-bottom: 50px;
        }

        .address {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 600;
          font-size: 36px;
          color: var(--blue-gray);
        }
        .check {
          column-gap: 5px;
        }
        .checklist {
          margin-top: 20px;
        }
        .chip {
          padding: 5px 10px;
          color: rgba(108, 132, 255, 1);
          background-color: rgba(108, 132, 255, 0.2);
          margin-right: 5px;
          border-radius: 20px;
        }
        .address {
          color: #5e6792;
        }
        .primary {
          color: #234951;
        }
        .main-box {
          padding: 30px;
        }
        .ko {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .margin-top {
          margin-top: 100px;
        }
      `}</style>
    </section>
  );
};
export default function Home({ remote }) {
  // const { data, error } = useSWR(
  //   `/api/property?address=${remote.address}&zipcode=${remote.zipcode}`,
  //   fetcher
  // );

  if (remote.address == "" || remote.zipcode == "") {
    return <BadUrlView message="Address and zipcode are missing" />;
  }

  if (remote.address == null && remote.zipcode == null) {
    return <BadUrlView message="Address and zipcode are missing" />;
    // return <div>Missing address and zipcode view</div>;
  }
  if (remote.address == null && remote.zipcode != null) {
    return <BadUrlView message="Address is missing" />;
    // return <div>Missing address view</div>;
  }
  if (remote.address != null && remote.zipcode == null) {
    return <BadUrlView message="Zipcode is missing" />;
    // return <div>Missing zipcode view</div>;
  }

  return <RemoteFetching remote={remote} />;
}

export async function getServerSideProps(context) {
  console.log(context.query);

  const { address, zipcode, city, state } = context.query;

  const remote = {
    address: address ?? null,
    zipcode: zipcode ?? null,
    city: city ?? null,
    state: state ?? null,
  };
  return {
    props: {
      remote,
    },
  };
}

function Lorem() {
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </p>
      <style jsx>{`
        p {
          margin-top: 20px;
          font-family: Montserrat;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 20px;
          letter-spacing: -0.3px;
        }
      `}</style>
    </div>
  );
}
