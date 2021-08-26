import { useState, useRef, useEffect } from "react";

const contact_type_list = [
  "Phone, e-mail and/or SMS",
  "Phone call",
  "E-mail",
  "SMS",
];

const agents_list = [
  "Other",
  "Keller Williams",
  "Coldwell Banker",
  "REmax",
  "Century 21",
  "Compass",
  "ISP",
  "RedFin",
];

const ContactForm = ({}) => {
  const [agentState, switchAgentState] = useState(false);
  useEffect(() => {
    console.log("re-rendered");
  });
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.target);
          console.log(JSON.stringify(Object.fromEntries(data)));
        }}
      >
        <section className="first-section">
          <div className="field spacing">
            <label>Your name</label>
            <input
              type="text"
              placeholder="Write your name here..."
              name="contact-name"
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
              name="contact-type"
              id="selectList"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              onSelect={(e) => {
                console.log(e);
              }}
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
          {/* <input type="checkbox" width={50} height={50} />
          <span class="checkmark"></span>
          <p>I am currently working with a real estate agent </p> */}
          <label className="check-container">
            I am currently working <br /> with a real estate agent
            <input
              type="checkbox"
              onChange={(event) => {
                console.log(event.target.checked);
              }}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <input className="button submit" type="submit" />
      </form>

      <style jsx>{`
        * {
          border: 1px solid rgba(255, 5, 243, 0.2);
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
          align-self: center;
        }

        .select {
          font-weight: 600;
        }

        option {
        }

        .field {
          display: flex;
          flex-direction: column;
        }
        .form {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          grid-gap: 15px;
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
          justify-content: center;
          align-content: center;
        }

        .first-section {
          display: flex;
          width: 100%;
          flex-wrap: wrap;
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
      `}</style>
    </div>
  );
};

export default ContactForm;
