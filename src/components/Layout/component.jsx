import { Outlet } from "react-router-dom";
import Footer from "../Footer/component";
import Header from "../Header/component";
import { useMemo } from "react";

function Layout({ SearchValue }) {
  return (
    <main>
        <Header SearchValue={SearchValue}/>
        <Outlet />
        <Footer />
    </main>
  )
}

export default Layout;