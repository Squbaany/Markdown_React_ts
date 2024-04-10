import { Outlet } from "react-router-dom";
import TopBar from "../components/shared/TopBar";
import BottomBar from "@/components/shared/BottomBar";

const RootLayout = () => {
  return (
    <div className="w-full">
      <TopBar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <BottomBar />
    </div>
  );
};

export default RootLayout;
