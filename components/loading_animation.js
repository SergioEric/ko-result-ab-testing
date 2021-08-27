import { useEffect, useRef } from "react";
// import anime from "animejs/lib/anime.es.js";
import animejs from "animejs";

function LoadingAnimation({ active }) {
  const animation_progress = useRef(0);

  const anime = useRef(() => {});
  const stopAt = () => {
    anime.current.pause();
    console.log(`stopAt: ${animation_progress.current}`);
  };
  const seek = () => {
    stopAt();
    const animation = anime.current;
    const value = 50;
    let flag = animation_progress.current;
    const isReverse = animation_progress.current > value;
    const timer = setInterval(() => {
      if (isReverse) {
        // ? we have to go in reverse
        animation.seek(animation.duration * (flag / 100));
        flag = flag - 2;
        console.log(flag);
        if (flag <= value) {
          clearInterval(timer);
        }
      } else {
        animation.seek(animation.duration * (flag / 100));
        flag = flag + 2;
        console.log(flag);
        if (flag >= value) {
          clearInterval(timer);
        }
      }
    }, 2);
  };
  useEffect(() => {
    console.log(`active:${active}`);
    if (!active) {
      seek();
      return () => {};
    }
    anime.current = animejs({
      targets: ".needle",
      rotate: 180,
      duration: 800,
      easing: "linear",
      update: function (anim) {
        animation_progress.current = anim.progress;
        // console.log(animation_progress);
      },
      autoplay: true,
      loop: true,
      direction: "alternate",
    });
    // if (!active) seek();
  }, [active]);
  useEffect(() => {
    console.log("re-render LoadingAnimation");
  });
  return (
    <div className="group-animation">
      <svg
        width="296"
        height="157"
        viewBox="0 0 296 157"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M261.973 67.0938C278.944 90.9802 288.047 119.627 288 148.999"
          stroke="#7F8CB2"
          strokeOpacity="0.5"
          strokeWidth="15"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M8.00018 149C7.95264 119.602 17.0726 90.9303 34.0731 67.0322"
          stroke="#7F8CB2"
          strokeOpacity="0.5"
          strokeWidth="15"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M45.9023 52.5261C58.981 38.4522 74.7933 27.2371 92.357 19.5774C109.921 11.9177 128.861 7.97697 148 8.0001C167.14 7.97697 186.08 11.9177 203.644 19.5774C221.208 27.2371 237.02 38.4522 250.099 52.5261"
          stroke="#F7872A"
          strokeWidth="15"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
      </svg>
      <svg
        width="108"
        height="23"
        viewBox="0 0 108 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="needle"
      >
        <path
          d="M95.747 22.8525C95.747 22.8525 107.853 22.9776 107.853 11.8525C107.853 0.852534 95.747 0.852535 95.747 0.852535L1.30989 10.8388C0.988671 10.871 0.693698 10.9915 0.47999 11.1781C0.266281 11.3646 0.148437 11.6043 0.148437 11.8525C0.148437 12.1007 0.266281 12.3404 0.47999 12.5269C0.693699 12.7135 0.988671 12.834 1.30989 12.8662L95.747 22.8525Z"
          fill="#5E6792"
        />
      </svg>
      <p className="min-value">$368k</p>
      <p className="max-value">$415k</p>

      <style jsx>{`
        * {
          border: 1px solid transparent;
        }
        .min-value,
        .max-value {
          font-weight: 600;
          font-size: 14px;
          color: #7f8cb2;
          position: absolute;
          margin: 0;
          bottom: 0;
        }

        .min-value {
          left: 20px;
        }

        .max-value {
          right: 20px;
        }

        .needle {
          transform-origin: right;
          position: absolute;
          bottom: 0;
          right: 50%;
          transform: rotate(90deg); // remove after animation fix
        }
        .group-animation {
          position: relative;
          display: flex;
          align-self: center;
        }
      `}</style>
    </div>
  );
}
export default LoadingAnimation;
