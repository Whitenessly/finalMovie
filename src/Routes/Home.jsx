import React from 'react'
import NavBar from '../Components/NavBar'
import List from '../Components/List'
import { Link } from 'react-router'

const Home = () => {
  localStorage.removeItem("staffLogin")
  const pageStatus = 1
  const [movies, setMovies] = React.useState([]);
  React.useEffect(() => {
    fetch('http://localhost:4000/movies')
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        while (data.length > 10) {
          data.pop()
        }
        setMovies(data);
        // console.log(data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <div className='w-screen h-screen'>
      <div className='w-full flex flex-col py-5 px-7 gap-3'>
        <p className='text-3xl font-bold text-left'>Welcome</p>
        <p className='text-lg text-left'>Book your favoutrite movie</p>
        <div className='flex flex-row justify-between items-center'>
          <p className='text-xl font-bold'>Latest movies</p>
          <Link to='/movie' className='text-xl text-orange-600'>See All</Link>
        </div>

        <div className='w-full grid grid-cols-2 gap-5 '>
          <List movies={movies} />
        </div>
        <div className='h-[50px] w-full text-xl font-bold text-center'></div>
      </div>
      <NavBar pageStatus={pageStatus} />
    </div>
  )
}

export default Home