import "../style/index.scss";
import Navbar from "../components/navbar";
import Comingsoon from "../components/comingsoon";
import Cinema from "../components/cinema";
import Search from "../components/search";
import bruger from "../pic/bruger.png";

function Forside() {
  return (
    <>
      <div className="container">
        <div className="header">
          <div>
            <p>Welcome</p>
            <h1>ABC</h1>
          </div>
          <img src={bruger} alt="" />
        </div>
        <Search />
        <div className="movie-container">
          <h2>Coming Soon</h2>
        </div>
        <div>
          <div className="movie-slideshow">
            <Comingsoon />
          </div>
        </div>
        <div className="movie-cinema-text">
          <h2>Cinema Near You</h2>
          <p>See all</p>
        </div>

        <div>
          <Cinema />
        </div>
        <Navbar />
      </div>
    </>
  );
}

export default Forside;
