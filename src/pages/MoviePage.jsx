import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import loading_spinner from "./../assets/loading_spinner.gif";
import axios from "axios";
import NavBar from "./../Components/NavBar";
import play_icon from "./../assets/play_icon.png";
async function getMovie(movieId) {
  const res = await axios.get(
    `https://www.omdbapi.com/?apikey=eaba11fc&i=${movieId}`
  );
  console.log(res.data)
  return res.data;
}

async function getClips(movieId) {
  const res = await axios.get(
    `https://www.omdbapi.com/?apikey=eaba11fc&i=${movieId}`
  );
  return res.data;
}

function MoviePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState("loading");
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.screen.availWidth);
  const [clips, setClips] = useState([]);
  let mt = width > 786 ? (width * 9) / 16 - 250 : 0;

  window.addEventListener("resize", () => {
    setWidth(window.screen.availWidth);
  });

  useEffect(() => {
    getMovie(movieId)
      .then((res) => {
        setMovie(res);
        getClips(movieId)
          .then((res) => {
            setClips(res);
          })
          .catch((err) => {
            alert(err);
            navigate("/", { replace: true });
          });

        if (width > 786) {
          window.scroll({ top: mt - 100, behavior: "smooth" });
        }
      })
      .catch((err) => {
        alert(err);
        navigate("/", { replace: true });
      });
  }, [movieId, navigate, mt, width]);

  if (movie === "loading" || !movie) {
    return (
      <div className="bg-gray-700 h-screen flex items-center justify-center">
        <img src={loading_spinner} alt="loading" />
      </div>
    );
  }

  return (
    <div className="bg-gray-700 min-h-[100vh] text-white text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-6xl font-bold">
      {width < 768 ? (
        <NavBar />
      ) : (
        <img
          src={movie.Poster}
          alt="backdrop"
          className="w-screen aspect-video absolute top-0"
        />
      )}
      <div
        className="flex flex-col items-center justify-center md:flex-row md:ml-[50px]"
        style={{
          marginTop: `${mt}px`,
        }}
      >
        <img
          src={movie.Poster}
          alt="poster"
          className="rounded-xl border-white border-4 max-w-[min(400px,90%)] sm:max-w-[50%]  md:h-[576px] z-10"
        />
        <h1 className="z-10 md:ml-10 text-center">{movie.Title}</h1>
      </div>

      {/*Clips And Trailers Part */}
      <div className="mt-5 md:mt-10 text-xl md:text-2xl lg:text-4xl pb-[100px] mx-2 sm:mx-5 md:mx-[50px] lg:mx-[100px]">
        <div className="mt-5 md:mt-10 text-lg md:text-xl lg:text-2xl">
          <div>
            Genre :
            <span className=" font-normal">{" "+ movie.Genre}</span>
          </div>
          <div>
            Release Date :
            <span className=" font-normal">{" "+ movie.Released}</span>
          </div>
          <div>
            Duration :
            <span className=" font-normal">
              {/* {parseInt(movie.Runtime / 60)}:{movie.Runtime % 60} hr */}
              {" "+movie.Runtime}
            </span>
          </div>
          <div>
            Rating :
            <span className=" font-normal">{" "+ movie.imdbRating}/10</span>
          </div>
          <div>
            Actors :
            <span className=" font-normal">{" "+ movie.Actors}</span>
          </div>
        </div>
        {/* Overview */}
        <div className="mt-5 md:mt-10">Overview</div>
        <div className="mt-5 md:mt-10 font-normal text-lg md:text-xl lg:text-2xl">
          {movie.Plot}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
