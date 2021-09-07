import { useEffect, useState, useRef } from "react";
const TextLoading = ({ styles }) => {
  const animCount = useRef(0);
  const [text, changeText] = useState("...");

  useEffect(() => {
    const timer = setInterval(() => {
      switch (animCount.current++ & 3) {
        case 0:
          changeText(".‎‎");
          break;
        case 1:
          changeText("..‎");
          break;
        case 2:
          changeText("...");
          break;
      }
    }, 300);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <span>{text}</span>
      <style jsx>{`
        ${styles}
      `}</style>
    </>
  );
};

export default TextLoading;
