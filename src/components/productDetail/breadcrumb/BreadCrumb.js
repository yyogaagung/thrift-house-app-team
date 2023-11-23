import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const Breadcrumbs = () => {
  const linkTab = useBreadcrumbs();
  console.log(linkTab, 'k')

  return (
    <div className="container flex-wrap sm:max-w-4xl md:max-w-6xl lg:max-w-7xl flex mx-auto px-10 py-5">
      {linkTab.map(({ breadcrumb, match }, index) => (
        <div className="items-center  whitespace-nowrap " key={index}>
        {/* {console.log(breadcrumb, 'limk')} */}
          {index < linkTab.length-1 ? 
            <Link className=" text-sm font-normal md:text-base md:font-normal"  key={index} to={match.pathname || ""}>{breadcrumb}</Link> 
            
            : ""
          }          
          {index < linkTab.length - 1 && <span className="text-sm font-normal md:text-base md:font-normal mr-2 ml-2">{' / '}</span>}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;