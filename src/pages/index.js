import { useEffect, useState } from "react";
import Head from "next/head";

import NotFound from "../components/not_found";
import LogoHeader from "../components/logo_header";
import BadUrlView from "../components/bad_url";
import TimeOutView from "../components/timeout";
import LoadingAnimation from "../components/loading_animation";
import Footer from "../components/footer";
import ContactForm from "../components/contact_form";
import TextLoading from "../components/dots_animation";

var formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const fetcher = async (url) => {
  console.log('fetcher: ', url);

  const controller = new AbortController();
  //after 8 seconds we abort the request to the server
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(url, { signal: controller.signal });

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
      const error = new Error();
      // Attach extra info to the error object.
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
    clearTimeout(timeout);

    return res.json();
  } catch (err) {
    console.log('fetcher: ', err);
    return null;
  }
};

const RemoteFetching = ({ remote }) => {
  console.log('RemoteFetching: ', remote);

  const [timeoutExceeded, setTimeoutForRequest] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [animationStatus, setAnimationStatus] = useState(true);
  const [activeForm, setActiveForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const json = await fetcher(
          `/api/property?address=${remote.address}&zipcode=${remote.zipcode}`
        );
        // console.log(json);
        setData(json);
        if (!json.data) setError(true);
        setAnimationStatus(false);
      } catch (e) {
        // debugger;
        console.log(e);
        if (e.name === "AbortError") {
          setTimeoutForRequest(true);
        }
        setAnimationStatus(false);
      }
    }
    fetchData();
  }, []);

  if (error && !timeoutExceeded) {
    // debugger;
    return <NotFound remote={remote} />;
  }
  if (timeoutExceeded) {
    return <TimeOutView />;
  }

  if (data != undefined && !data.data) {
    return <NotFound remote={remote} />;
  }
  return (
    <section className="main-section">
      <Head>
        <title>{remote.address}</title>
      </Head>
      <LogoHeader />
      <div style={{ flexGrow: 1 }}></div>
      <div className="offer-container">
        {/* <div className="margin-top"></div> */}
        <div className="offer-and-address">
          <div className="offer-and-animation">
            <h2 className="preliminary-text">Your preliminary offer</h2>
            {!data ? (
              <TextLoading
                styles={`
              display: flex;
          justify-content: center;
          padding: 0; // 10px 20px;

          font-family: Montserrat;
          font-size: 55px;
          color: var(--orange);
          font-weight: 700;`}
              />
            ) : (
              <div>
                <div className="offer">{formatter.format(data.price ?? 0)}</div>
              </div>
            )}

            <LoadingAnimation
              active={animationStatus}
              min_value={data?.lwr ?? 0}
              max_value={data?.upr ?? 0}
            />
          </div>
          <div className="address">
            {remote.address} {remote.city}, {remote.state} {remote.zipcode}
          </div>
        </div>

        <Lorem />
        {!activeForm ? (
          <button className="button top-50" onClick={() => setActiveForm(true)}>
            Schedule time to talk
          </button>
        ) : (
          <ContactForm />
        )}
        {/* <button className="button top-50">Schedule time to talk</button> */}
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <Footer />
      <style jsx>{`
         {
          /* * {
          border: 1px solid rgba(5, 226, 255, 0);
        } */
        }
        .main-section {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100vh;
        }
        .offer-container {
          max-width: 1440px;
          width: 80%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px 0px;
        }
        .offer {
          display: flex;
          justify-content: center;
          padding: 0; // 10px 20px;
          border-radius: 10px;

          font-family: Montserrat;
          font-size: 55px;
          color: var(--orange);
          font-weight: 700;
        }
        .offer-and-address {
          display: flex;
          margin-bottom: 20px;
          width: 100%;
          flex-direction: row;
        }
        .offer-and-animation {
          display: flex;
          flex-direction: column;
        }
        .preliminary-text {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          color: var(--orange);
          margin: 0;
          text-align: center;
        }

        .address {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 700;
          font-size: 36px;
          color: var(--blue-gray);
          align-self: center;
          padding: 0px 40px;
          width: 100%;
          text-align: center;
          margin-top: 10px;
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
        .primary {
          color: #234951;
        }
        .main-box {
          padding: 30px;
        }
        .margin-top {
          margin-top: 100px;
        }
        @media (max-width: 830px) {
          .offer-and-address {
            flex-direction: column;
            justify-content: center;
            display: flex;
            align-self: center;
          }
        }
      `}</style>
    </section>
  );
};
export default function Home({ remote }) {
  console.log('Home: ', this);
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
  console.log('getServerSideProps: ', context.query);

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
        Your preliminary offer is based on comparable home sales, market trends,
        and your home???s specific characteristics. This preliminary offer is a
        non-binding estimate of value and an indication of what the exact offer
        price for your home could be if it qualifies for our program and is
        sought by one of our active buyers.
        <span className="separator-txt">{""}</span>
        Take the next step to getting your exact offer price. Share digital
        imagery of your home with us and have a conversation with a certified
        local real estate professional so that our buyers can evaluate it
        further. Don???t worry, there is no obligation to sell.
      </p>
      <style jsx>{`
        .separator-txt {
          display: block;
          margin-top: 10px;
        }
        p {
          margin-top: 20px;
          font-family: Montserrat;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 17px;
          letter-spacing: -0.2px;
        }
      `}</style>
    </div>
  );
}
