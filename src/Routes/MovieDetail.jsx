import React from 'react'
import { LeftOutlined, VideoCameraOutlined, ClockCircleOutlined, StarOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router'

const MovieDetail = () => {
    const nav = useNavigate()
    const movieId = useParams()

    const [movie, setMovie] = React.useState();

    React.useEffect(() => {
        fetch(`http://localhost:4000/movies/${movieId.id}`)
            .then(response => response.json())
            .then(data => {
                // data = data.find((movie) => movie.id === movieId.id);
                setMovie(data);
                // console.log(data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    const onClickReturn = () => {
        history.back()
    }
    const onClickBook = () => {
        nav(`/booking/${movieId.id}`)
    }

    return (
        <>
            {(movie) ? <div className='w-full h-full'>
                <div className='w-full py-3 px-5 border-b-2 border-gray-200 font-bold text-center relative'>
                    <p onClick={onClickReturn} className='absolute left-3'><LeftOutlined /></p>
                    <p>Movie Details</p>
                </div>
                <div className='p-5 flex flex-row justify-between'>
                    <div className='w-[230px]'>
                        {(movie) ? <img src={movie.image} alt={movie.title} className='w-full object-cover rounded-xl' /> : <div>No image</div>}
                    </div>
                    <div className='w-[30%] flex flex-col justify-between'>
                        <div className='flex flex-col bg-gray-100 text-center p-1 rounded-lg'>
                            <span className='text-orange-600 text-xl'><VideoCameraOutlined /></span>
                            <p className='text-gray-500'>Type</p>
                            <p className='font-bold'>{movie.genres}</p>
                        </div>
                        <div className='flex flex-col bg-gray-100 text-center p-1 rounded-lg'>
                            <span className='text-orange-600 text-xl'><ClockCircleOutlined /></span>
                            <p className='text-gray-500'>Duration</p>
                            <p className='font-bold'>{movie.duration}m</p>
                        </div><div className='flex flex-col bg-gray-100 text-center p-1 rounded-lg'>
                            <span className='text-orange-600 text-xl'><StarOutlined /></span>
                            <p className='text-gray-500'>Rating</p>
                            <p className='font-bold'>{movie.rating}/10</p>
                        </div>
                    </div>
                </div>
                <div className='w-full px-7 flex flex-col gap-4'>
                    <p className='font-bold text-xl'>{movie.title}</p>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-lg'>Description</p>
                        <p>{movie.description}</p>
                    </div>
                </div>
                <div onClick={onClickBook} className='bg-orange-600 text-lg font-semibold text-white m-6 flex justify-center items-center h-[60px] rounded-xl'>Select Seat</div>
            </div> : null}
        </>

    )
}

export default MovieDetail