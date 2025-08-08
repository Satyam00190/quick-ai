import AiTool from "../components/AiTools";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbaar from "../components/Navbaar";
import Plan from "../components/Plan";
import Testimonial from "../components/Testimonial";

const Home = () => {
    return (
        <div>
            <Navbaar/>
            <Hero/>
            <AiTool/>
            <Testimonial/>
            <Plan/>
            <Footer/>
        </div>
    )
}

export default Home;