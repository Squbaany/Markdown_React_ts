import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import {
  ArrowRightFromLine,
  FileType2,
  Hash,
  TextCursor,
  TextCursorInput,
} from "lucide-react";
import { TopBarLinks } from "@/constants";
import { link } from "fs";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="py-4 px-5 flex-between">
        <div className="flex items-center">
          <Link to="/" className="flex gap-3 items-center">
            <TextCursor width={32} height={32} />
            <h2 className="h3-bold -ml-3">MarkDown</h2>
          </Link>
          <ul className="hidden md:flex gap-5 ml-10">
            {TopBarLinks.map((link) => (
              <li
                key={link.label}
                className={`base-medium transition-colors duration-500  ${
                  pathname === link.route
                    ? ""
                    : "text-light-4 hover:text-light-2"
                }`}
              >
                <NavLink to={link.route}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4">
          <div className="flex-center gap-3">
            <img
              src={user.imgUrl || `/assets/icons/profile-placeholder.svg`}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
            <p className="base-semibold">{user.name}</p>
          </div>
          <Button className="shad-button_primary" onClick={() => signOut()}>
            Sign Out
            <ArrowRightFromLine />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
