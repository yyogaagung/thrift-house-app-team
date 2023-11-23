import { useState } from "react";
import { InlineIcon } from "@iconify/react";
import { Link } from "react-router-dom";

const Accordion = ({ title, content, setIsHamburgerOpen }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item border-b-[1px] border-[#CFCFCF] py-3">
      <div
        className="accordion-title flex justify-between"
        onClick={() => setIsActive(!isActive)}
      >
        <div className="font-medium text-sm">{title}</div>
        <div>
          {isActive ? (
            <InlineIcon
              icon="eva:arrow-ios-downward-outline"
              height="24"
              className="ml-1 rotate-180"
            />
          ) : (
            <InlineIcon
              icon="eva:arrow-ios-downward-outline"
              height="24"
              className="ml-1"
            />
          )}
        </div>
      </div>
      {isActive &&
        content.map((item, index) => (
          <div className="accordion-content text-sm mt-3" key={index}>
            <Link
              to={item.to}
              onClick={() => setIsHamburgerOpen((prev) => !prev)}
            >
              {item.text}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Accordion;
