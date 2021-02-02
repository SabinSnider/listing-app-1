import React from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from '../config'
import MovieCard from '../components/MovieCard';

const Home = () => {

  const [trendings, setTrendings] = React.useState([]);
  const [playingNow, setPlayingNow] = React.useState([]);

  React.useEffect(() => {
    getTrendingMovies();
    getPlayingNowMovies();
  }, []);

  const getTrendingMovies = async () => {
    const res = await axios.get(`${BASE_URL}/trending/movie/week`, { params:{ api_key: API_KEY }});
    setTrendings(res.data.results);
  }

  const getPlayingNowMovies = async () => {
    const res = await axios.get(`${BASE_URL}/movie/now_playing`, { params:{ api_key: API_KEY }});
    setPlayingNow(res.data.results.splice(0,6));
  }

  return (
    <div>
      <div className="mt-2 text-light card bg-info p-2">
        <h3>Now Playing</h3>
      </div>
      <div className="row">
        {
          playingNow.map(movie => {
            return <div className="col-md-2"><MovieCard movie={movie} /></div>
          })
        }
      </div>


      <div className="mt-4 text-light card bg-info p-2">
        <h3>Trending Now</h3>
      </div>
      <div className="row">
        {
          trendings.map(movie => {
            return <div className="col-md-2"><MovieCard movie={movie} /></div>
          })
        }
      </div>
    </div>
  )
}

export default Home;