import React from "react";
import { Link, useParams } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { icons } from "../ultils/icons";

const { FaChevronRight } = icons;

const Breadcrumbs = () => {
  const params = useParams();

  const routes = [
    { path: "/", breadcrumb: "Home" },
    { path: "/:category", breadcrumb: params.category.slice(0, 1).toUpperCase() + params.category.slice(1) },
    { path: "/:category/:title", breadcrumb: params.title },
  ];

  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <div className="flex items-center gap-2">
      {breadcrumbs.slice(0, 3).map(({ match, breadcrumb }, i, arr) => (
        <Link key={match.pathname} to={match.pathname} className="flex items-center gap-2">
          <span className={`${i < arr.length - 1 ? "hover:text-main" : 'cursor-text'}`}>{breadcrumb}</span>
          {i < arr.length - 1 && <FaChevronRight size={8} className="mt-1" />}
        </Link>
      ))}
    </div>
  );
};

export default Breadcrumbs;
