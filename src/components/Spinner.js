const Spinner = ({ size, className }) => {
  let theSize = "";
  switch (size) {
    case "sm":
      theSize = "w-5 h-5 sm:w-7 sm:h-7";
      break;
    default:
      theSize = "w-7 h-7 sm:w-9 sm:h-9";
  }

  return (
    <div
      className={`${theSize} border-4 border-l-gogreen rounded-full animate-spin ${className}`}
    ></div>
  );
};

export default Spinner;
