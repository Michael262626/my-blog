import TopBar from "@/components/shared/TopBar.tsx";
import LeftSideBar from "@/components/shared/LeftSideBar.tsx";
import {Outlet} from "react-router-dom";
import Bottombar from "@/components/shared/Bottombar.tsx";

const RootLayout = () => {
    return (
        <div className="w-full md:flex">
            <TopBar/>
            <LeftSideBar/>

            <section className="flex flex-1 h-full">
                <Outlet/>
            </section>
            <Bottombar/>
        </div>
    )
}
export default RootLayout
