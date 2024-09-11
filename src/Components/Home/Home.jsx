import React, { useEffect, useState } from 'react';
import './Home.scss';
import axios from "axios";
import { Link } from 'react-router-dom';

import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"



const apiKey = '6c49694950f94c5012e6f8f455bd4828';
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";


const Card = ({img}) => (
  <img className='card' src={img} alt="Cover" />
)


const Row = ({title,arr=[]}) =>{
  return(
    <div className='row'>
      <h2>{title}</h2>

      <div>
        {

          arr.map((item,index) => (
            <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
          ))
        }
        

      </div>

      
    </div>
  )
}


const Home = () => {

  const [upcomingMovies,setUpcomingMovies] = useState([])
  const [nowplayingMovies,setNowplayingMovies] = useState([])
  const [PopularMovies,setPopularMovies] = useState([])
  const [topRatedMovies,setTopratedMovies] = useState([])
  const [genre,setGenre] = useState([])



  useEffect(() => {
    
    const fetchUpcoming = async()=>{
      const {data: {results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
      setUpcomingMovies(results)
    };

    const fetchNowplaying = async()=>{
      const {data: {results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
      setNowplayingMovies(results)
    };
    const fetchPopular = async()=>{
      const {data: {results}} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
      setPopularMovies(results)
    };
    const fetchToprated = async()=>{
      const {data: {results}} = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
      setTopratedMovies(results)
    };

    const getAllGenre = async()=>{
      const {data: {genres}} = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
      setGenre(genres)
    };

    getAllGenre()
    fetchUpcoming()
    fetchNowplaying()
    fetchPopular()
    fetchToprated()

  }, [])
  
  return (
    <section className="home">

      <div className="banner" style={{
        backgroundImage: PopularMovies[0]? `url(${`${imgUrl}/${PopularMovies[0].poster_path}`})`:"rgb(16,16,16)"
      }}>
        {
          PopularMovies[0] &&

            <h1>{PopularMovies[0].original_title}</h1>
        }
        {
          PopularMovies[0] &&
            <p>{PopularMovies[0].overview}</p>
        }

        <div>
            <button>Play <BiPlay /></button>
            <button>My List <AiOutlinePlus /></button>
        </div>
        

      </div>

      <Row title={"upcoming"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowplayingMovies} />
      <Row title={"Popular"} arr={PopularMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />

      <div className="genreBox">
        {genre.map((item,index) => (
          <Link key={index} to={`/genre/${item.id}`}>{item.name}</Link>
        ))}
      </div>


    </section>
  )
}

export default Home