import { Outlet } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "./Layout.css";

function Layout() {

    return(

        <div className="layout">

            <Header />

            <main className="layout-main">

                <Outlet />

            </main>

            <Footer />
        </div>
    );
}

export default Layout;