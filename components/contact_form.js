import { useState, useRef, useEffect } from "react";

const ContactForm = ({}) => {
  useEffect(() => {
    console.log("re-rendered");
  });
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.target);
          console.log(JSON.stringify(Object.fromEntries(data)));
        }}
      >
        <label>Your name</label>
        <input
          placeholder="Write your name here..."
          name="contactName"
          required
        />
        <input
          type="number"
          placeholder="Write your phone here..."
          name="phone"
          required
        />
        <input type="submit" />
      </form>

      <style jsx>{`
        * {
          border: 1px solid transparent;
        }

        label {
        }

        .field {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
