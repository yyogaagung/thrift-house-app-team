import { useState, useRef } from "react";
import { InlineIcon } from "@iconify/react";

export default function FilterAccordion(props) {
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
    <div className={`flex flex-col mt-4 ${props.className}`}>
      <button className={`flex border rounded-lg px-3 py-[10px] ${props.classButton} ${active}`} onClick={toggleAccordion}>
        <p className="text-xs">{props.title}</p>
        <InlineIcon icon="eva:arrow-ios-downward-outline" height="16" className={`ml-auto ${rotate}`} />
      </button>
      <div ref={content} style={{ maxHeight: `${height}` }} className={`overflow-hidden transition-[max-height]ease-in ${props.classContent}`}>
        <div className="text-xs">{props.content}</div>
      </div>
    </div>
  );
}
