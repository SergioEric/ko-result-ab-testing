import { useState } from "react";

const contact_type_list = [
  "Phone, e-mail and/or SMS",
  "Phone call",
  "E-mail",
  "SMS",
];

const agents_list = [
  "Keller Williams",
  "Coldwell Banker",
  "REmax",
  "Century 21",
  "Compass",
  "ISP",
  "RedFin",
  "Other",
];
const fetcher = async (url, body) => {
  const controller = new AbortController();
  //after 8 seconds we abort the request to the server
  const timeout = setTimeout(() => controller.abort(), 30000);
  //{ signal: controller.signal }
  const res = await fetch(url, {
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: body,
  });

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
};

const ContactForm = ({}) => {
  const [agentState, switchAgentState] = useState(false);
  const [isOtherAgent, setVisibleOtherAgentField] = useState(false);
  const [isPopupOpen, changePopup] = useState("hidden");

  const [isSendingData, setIsSendingData] = useState(false);

  const [errorSavingForm, setErrorSavingForm] = useState(false);

  const handleSubmition = async (event) => {
    /* JSON without agent part
    {
      "contact_name": "Jhon Doe",
      phone: "1343455 343",
      email: "contact@domain.com",
      "contact_type": "Phone, e-mail and/or SMS",
    }
    */
    /* JSON with an agent of the *agents_list*
    {
      "contact_name": "Jhon Doe",
      phone: "1343455 343",
      email: "contact@domain.com",
      "contact_type": "E-mail",
      "agent_name": "Andrew McAgent",
      "agent_phone": "423342",
      "agent_type": "Keller Williams",
    };
    */
    /* JSON with a CUSTOM agent
    {
      "contact_name": "Jhon Doe",
      phone: "1343455 343",
      email: "contact@domain.com",
      "contact_type": "E-mail",
      "agent_name": "Andrew McAgent",
      "agent_phone": "423342",
      "agent_type": "Other",
      "other_agent":"Custom Agent",
    };
    */
    event.preventDefault();
    const data = new FormData(event.target);
    const json = JSON.stringify(Object.fromEntries(data));
    setIsSendingData(true);
    try {
      const json_response = await fetcher("/api/upload_form", json);
      setIsSendingData(false);
      if (json_response.data) {
        if (errorSavingForm) setErrorSavingForm(false);
        changePopup("visible");
      } else {
        setErrorSavingForm(true);
      }
    } catch (e) {
      setIsSendingData(false);
      setErrorSavingForm(true);
    }
  };

  return (
    <>
      <div className="wrapper-popup" style={{ visibility: isPopupOpen }}>
        <section className="popup-message">
          <h2>Thanks, you are all set</h2>
          <p>
            Your info has been sent and you’ll get a call, message or text from
            a Keller Offers team.
            <br />
            <br />
            If you would prefer to call us, we are happy to answer your
            questions and walk you through the various options to support you so
            you can make an informed decision.
            <br />
            <br />
            Contact: (512) 884-3506
          </p>
          <button
            className="button close-popup"
            onClick={() => {
              changePopup("hidden");
              window.location.href = "https://kelleroffers.com/";
            }}
          >
            Close
          </button>
        </section>
      </div>
      <form className="form" onSubmit={handleSubmition}>
        <section className="first-section">
          <div className="field spacing">
            <label>Your name</label>
            <input
              type="text"
              placeholder="Write your name here..."
              name="contact_name"
              autoComplete="off"
              required
            />
          </div>
          <div className="field spacing">
            <label>Phone</label>
            <input
              type="number"
              placeholder="Write your phone here..."
              name="phone"
              required
            />
          </div>
          <div className="field spacing">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Write your e-mail address"
              name="email"
              required
            />
          </div>
          <div className="contact-type">
            <p>I prefer to be contacted by</p>
            <select
              name="contact_type"
              // onChange={(e) => {
              //   console.log(e.target.value);
              // }}
              className="select"
            >
              {contact_type_list.map((value, index) => (
                <option value={value} key={index}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </section>
        <div className="agent-section">
          <label className="check-container spacing">
            I am currently working <br /> with a real estate agent
            <input
              type="checkbox"
              onChange={(event) => {
                switchAgentState(event.target.checked);
              }}
            />
            <span className="checkmark"></span>
          </label>
          {!agentState ? (
            <></>
          ) : (
            <>
              <div className="field spacing">
                <label>Agent’s name</label>
                <input
                  type="text"
                  placeholder="Write name here..."
                  name="agent_name"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="field spacing">
                <label>Agent’s phone</label>
                <input
                  type="number"
                  placeholder="Write phone here..."
                  name="agent_phone"
                  required
                />
              </div>
              <select
                name="agent_type"
                onChange={(e) => {
                  const option = e.target.value;
                  // console.log(option);
                  if (option === agents_list[agents_list.length - 1]) {
                    // activate other form for agent
                    if (isOtherAgent) return;
                    setVisibleOtherAgentField(true);
                  } else {
                    if (!isOtherAgent) return;
                    setVisibleOtherAgentField(false);
                  }
                }}
                className="select"
              >
                {agents_list.map((value, index) => (
                  <option value={value} key={index}>
                    {value}
                  </option>
                ))}
              </select>
              {isOtherAgent ? (
                <>
                  <div className="field other-agent">
                    {/* <label>Other</label> */}
                    <input
                      type="text"
                      placeholder="Write here..."
                      name="other_agent"
                      required
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
        {isSendingData ? (
          <LoadingEllipsis />
        ) : (
          <>
            {!errorSavingForm ? (
              <input className="button" type="submit" />
            ) : (
              <></>
            )}
          </>
        )}
        {errorSavingForm ? (
          <ErrorSavingFormData handleClick={() => {}} />
        ) : (
          <></>
        )}
      </form>

      <style jsx>{`
        * {
          //border: 1px solid rgba(255, 5, 243, 0.2);
        }
        label {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 15px;
          color: var(--orange);
        }
        input[type="text"],
        input[type="number"],
        input[type="email"],
        select {
          background: rgba(94, 103, 146, 0.1);
          border-radius: 4px;
          border: none;
          color: #16292d;
          padding: 8px 5px;
          font-family: Montserrat;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          letter-spacing: -0.2px;
          max-height: 31px;
          align-self: stretch;
        }
        .select {
          font-weight: 600;
          align-self: center;
        }
        .field {
          display: flex;
          flex-direction: column;
          min-width: 215px;
        }
        .form {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          grid-gap: 15px;
          width: 100%;
        }
        .contact-type {
          display: flex;
          align-content: center;
        }
        .contact-type p {
          margin: 0 10px 0 0;
          align-self: center;
        }
        .agent-section {
          display: flex;
          min-height: 62px;
          flex-wrap: wrap;
        }
        .other-agent {
          margin-left: 10px;
          align-self: center;
        }
        .first-section {
          display: flex;
          width: 100%;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        input[type="submit"] {
          max-width: 112px;
          align-self: center;
        }
        /* Customize the label (the check-container) */
        .check-container {
          display: block;
          position: relative;
          padding-left: 35px;
          cursor: pointer;
          font-size: 22px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          color: #16292d;

          font-family: Montserrat;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: initial;
          align-self: flex-start;

          letter-spacing: -0.2px;
        }
        /* Hide the browser's default checkbox */
        .check-container input[type="checkbox"] {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }
        /* Create a custom checkbox */
        .checkmark {
          position: absolute;
          top: 5px;
          left: 0;
          height: 25px;
          width: 25px;
          background-color: #eee;
        }
        /* On mouse-over, add a grey background color */
        .check-container:hover input ~ .checkmark {
          background-color: #ccc;
        }
        /* When the checkbox is checked, add a blue background */
        .check-container input:checked ~ .checkmark {
          background-color: var(--orange);
        }
        /* Create the checkmark/indicator (hidden when not checked) */
        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }
        /* Show the checkmark when checked */
        .check-container input:checked ~ .checkmark:after {
          display: block;
        }
        /* Style the checkmark/indicator */
        .check-container .checkmark:after {
          left: 9px;
          top: 5px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 3px 3px 0;
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        .spacing {
          margin-bottom: 10px;
          margin-right: 10px;
        }
        .wrapper-popup {
          background-color: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(1px);
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          z-index: 9997;
          display: flex;
          justify-content: center;
        }
        .popup-message {
          max-width: 680px; //height: 445px;

          background-color: white;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
          border-radius: 5px;
          z-index: 9998;
          display: flex;
          flex-direction: column;
          align-self: center;
          padding: 40px;
        }
        .popup-message h2 {
          text-align: center;
        }

        .popup-message p {
          font-size: 18px;
        }
        .close-popup {
          max-width: 120px;
          align-self: center;
        }
      `}</style>
    </>
  );
};

const LoadingEllipsis = () => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>

      <style jsx>{`
        .lds-ellipsis {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
          align-self: center;
        }
        .lds-ellipsis div {
          position: absolute;
          top: 33px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: var(--orange);
          animation-timing-function: cubic-bezier(0, 1, 1, 0);
        }
        .lds-ellipsis div:nth-child(1) {
          left: 8px;
          animation: lds-ellipsis1 0.5s infinite;
        }
        .lds-ellipsis div:nth-child(2) {
          left: 8px;
          animation: lds-ellipsis2 0.5s infinite;
        }
        .lds-ellipsis div:nth-child(3) {
          left: 32px;
          animation: lds-ellipsis2 0.5s infinite;
        }
        .lds-ellipsis div:nth-child(4) {
          left: 56px;
          animation: lds-ellipsis3 0.5s infinite;
        }
        @keyframes lds-ellipsis1 {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes lds-ellipsis3 {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(0);
          }
        }
        @keyframes lds-ellipsis2 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(24px, 0);
          }
        }
      `}</style>
    </div>
  );
};

const ErrorSavingFormData = ({ handleClick }) => {
  return (
    <>
      <div className="Container">
        <svg
          width="32"
          height="33"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.7004 24.6996L16.9004 7.29961C16.5004 6.69961 15.5004 6.69961 15.2004 7.29961L5.30039 24.6996C5.10039 24.9996 5.10039 25.3996 5.30039 25.6996C5.50039 25.9996 5.80039 26.1996 6.20039 26.1996H25.8004C26.2004 26.1996 26.5004 25.9996 26.7004 25.6996C26.9004 25.3996 26.9004 24.9996 26.7004 24.6996ZM15.0004 13.8996C15.0004 13.2996 15.4004 12.8996 16.0004 12.8996C16.6004 12.8996 17.0004 13.2996 17.0004 13.8996V18.6996C17.0004 19.2996 16.6004 19.6996 16.0004 19.6996C15.4004 19.6996 15.0004 19.2996 15.0004 18.6996V13.8996ZM16.0004 22.9996C15.4004 22.9996 14.9004 22.4996 14.9004 21.8996C14.9004 21.2996 15.4004 20.7996 16.0004 20.7996C16.6004 20.7996 17.1004 21.2996 17.1004 21.8996C17.1004 22.4996 16.6004 22.9996 16.0004 22.9996Z"
            fill="#DF546A"
          />
        </svg>
        <p>We couldn't save the form data</p>
        <span style={{ flexGrow: 1 }}></span>
        <button className="button" onClick={handleClick}>
          Try again
        </button>
      </div>

      <style jsx>
        {`
          .Container {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 20px 25px;
            max-width: 664px;
            background: rgba(223, 84, 106, 0.1);
            border-radius: 5px;
            grid-gap: 14px;

            align-self: center;
          }

          .Container p {
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            display: flex;
            align-items: center;
            letter-spacing: -0.5px;
            color: #df546a;
            margin: 0;
          }
        `}
      </style>
    </>
  );
};

export default ContactForm;
