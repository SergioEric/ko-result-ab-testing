const BackArrowIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.2871 12.3809L6.66615 19.9999L14.2871 27.619"
      stroke="#16292D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.66602 20L31.4279 20"
      stroke="#16292D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="3"
      y="3"
      width="18"
      height="18"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 3H19C20.11 3 21 3.9 21 5V19C21 20.1 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3ZM5 12L10 17L19 8L17.59 6.58L10 14.17L6.41 10.59L5 12Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0)">
      <rect width="24" height="24" fill="#F7872A" />
    </g>
  </svg>
);
export { BackArrowIcon, CheckIcon };
