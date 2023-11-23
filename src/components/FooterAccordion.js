import { useState, useRef } from "react";
import { InlineIcon } from "@iconify/react";

export default function FooterAccordion(props) {
  const [active, setActive] = useState("");
  const [height, setHeight] = useState("0px");
  const [rotate, setRotate] = useState("");

  const content = useRef(null);

  function toggleAccordion() {
    const newActive = active;
    setActive(newActive === "" ? "active" : "");
    setHeight(newActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
    setRotate(newActive === "active" ? "" : "rotate-180");
  }

  return (
    <div className={`flex flex-col py-2 justify-center max-w-[230px] lg:justify-start lg:py-0 ${props.className}`}>
      <button className={`accord flex border-b-2 lg:border-0 lg:cursor-default ${active}`} onClick={toggleAccordion}>
        <p className="acc-title font-bold lg:text-2xl">{props.title}</p>
        <InlineIcon icon="eva:arrow-ios-downward-outline" height="24" className={`ml-auto lg:hidden ${rotate}`} />
      </button>
      <div ref={content} style={{ maxHeight: `${height}` }} className="acc-content text-sm overflow-hidden transition-[max-height]ease-in lg:text-base lg:font-medium lg:!max-h-full">
        <div className="acc-text px-2 lg:p-0">{props.content}</div>
      </div>
    </div>
  );
}
