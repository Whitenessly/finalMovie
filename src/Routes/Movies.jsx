import React from 'react'
import List from '../Components/List'
import { LeftOutlined } from '@ant-design/icons'


const Movies = () => {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:4000/movies')
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        setMovies(data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const onClickReturn = () => {
    history.back()
  }


  return (
    <>
      <div className='w-full py-3 px-5 border-b-2 border-gray-200 font-bold text-center fixed top-0 bg-white'>
        <p onClick={onClickReturn} className='absolute left-3'><LeftOutlined /></p>
        <p>Movies</p>
      </div>
      <div className='w-full flex flex-col py-5 px-7 gap-3'>
        <div className='h-[50px]'></div>
        <div className='w-full grid grid-cols-2 gap-5 '>
          <List movies={movies} />
        </div>
      </div>
    </>

  )
}

export default Movies