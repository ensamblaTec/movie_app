import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className='w-[21rem] max-w-[100%] bg-black rounded-xl p-3 text-white m-5 flex flex-col  cursor-pointer text-xl hover:scale-110'>
        <img
          className='w-full self-center rounded-lg h-[476px]'
          src={movie.Poster}
          alt={movie.Title}
        />
        <h3 className='my-1'>{movie.Title}</h3>
        <h3 className='my-1'>{movie.Year}</h3>
        <h3 className='my-1'>{movie.Type}</h3>
      </div>
    </Link>
  );
}

export default MovieCard;
