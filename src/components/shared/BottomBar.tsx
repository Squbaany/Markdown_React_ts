import { TopBarLinks } from "@/constants";
import { link } from "fs";
import { useLocation, NavLink } from "react-router-dom";

const BottomBar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottombar">
      <ul className="gap-5 flex-between mx-3 max-w-screen-sm">
        {TopBarLinks.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.route}
              className={`block bg-dark-3 hover:bg-dark-4 p-4 rounded-xl  base-medium transition-colors duration-500  ${
                pathname === link.route ? "" : "text-light-4 hover:text-light-2"
              }`}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BottomBar;
