import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";

const MainLayout = ({children}) => {
    return(
        <>
        <NavBar />
        {children}
        <Footer />
        </>
    )
}

export default MainLayout;