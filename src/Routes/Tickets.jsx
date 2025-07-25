import React from 'react'
import NavBar from '../Components/NavBar'
import { IoTicketOutline } from "react-icons/io5";
import { useNavigate } from 'react-router';

const Tickets = () => {
    const pageStatus = 3
    const nav = useNavigate()
    const user = localStorage.getItem('userId')

    const [movies, setMovies] = React.useState([]);
    React.useEffect(() => {
        fetch('http://localhost:4000/movies')
            .then(response => response.json())
            .then(data => {
                setMovies(data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);
    const [tickets, setTickets] = React.useState([]);
    const handleApi = () => {
        fetch('http://localhost:4000/tickets')
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => b.ticketId - a.ticketId);
                setTickets(data.filter((ticket) => ticket.userId === user));
            })
            .catch(error => {
                location.reload();
                console.error('Error fetching movies:', error);
            });
    }
    React.useEffect(() => {
        handleApi()
    }, []);

    const onClickLogin = () => {
        nav('/login')
    }

    const [cancelModal, setCancelModal] = React.useState({ status: false, id: null })
    const onClickCloseModalCancel = () => {
        setCancelModal({ status: false, id: null })
    }
    const onClickCancelTicket = async () => {
        const ticket = tickets.find((item) => item.id === cancelModal.id)
        ticket.canceled = true

        await fetch(`http://localhost:4000/tickets/${cancelModal.id}`, {
            method: "PUT",
            header: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket),
        });
        handleApi()
    }

    return (
        <>
            <div>
                <div className='w-full py-3 px-5 border-b-2 border-gray-200 font-bold text-center relative'>
                    <p>Your tickets</p>
                </div>
                {(user) ?
                    <div className='p-5 flex flex-col gap-5'>
                        {tickets.map(ticket => {
                            const movie = movies.find((item) => item.id === `${ticket.movieId}`)
                            const cancelInfo = { status: true, id: ticket.id }
                            const onClickOpenModalCancel = () => {
                                setCancelModal(cancelInfo)
                            }
                            const onClickDetails = () => {
                                nav(`/tickets/${ticket.id}`)
                            }
                            return (
                                <>
                                    <div className='w-full shadow-2xl p-4 rounded-2xl border-2 border-gray-200 flex flex-col gap-5  '>
                                        <div className='flex flex-row gap-5'>
                                            <div className='bg-amber-400 w-[70px] aspect-square rounded-xl overflow-hidden'>
                                                <img src={movie.image} alt="" />
                                            </div>
                                            <div className='flex flex-col justify-between'>
                                                <p className='text-lg font-bold'>{movie.title}</p>
                                                <div className='py-1 px-2 bg-red-200 rounded-md text-red-600'>Checkout method: At counter</div>
                                            </div>
                                        </div>
                                        {(ticket.canceled) ?
                                            <div className='w-full py-2 rounded-lg bg-gray-300 text-gray-600 flex justify-center items-center'>Canceled</div>
                                            :
                                            <div className='flex flex-row justify-between'>
                                                {(new Date(ticket.date) < Date.now()) ?
                                                    <div className='bg-gray-300 text-gray-600 rounded-lg py-2 p-9'>Out of date</div>
                                                    :
                                                    <div onClick={onClickOpenModalCancel} className='border-2 border-red-500 text-red-500 rounded-lg py-2 px-12'>Cancel</div>
                                                }
                                                <div onClick={onClickDetails} className='bg-orange-600 text-white rounded-lg py-2 px-12'>Details</div>
                                            </div>
                                        }
                                    </div>
                                </>
                            )
                        }
                        )}
                    </div>
                    :
                    <div className='w-full h-[700px]  flex flex-col justify-center items-center text-xl text-gray-600 gap-5'>
                        <div className='text-5xl'><IoTicketOutline /></div>
                        <div>Log in to see your tickets</div>
                        <div onClick={onClickLogin} className='text-white bg-orange-600 px-5 py-2 rounded-lg'>Log in</div>
                    </div>
                }
                <NavBar pageStatus={pageStatus} />
            </div>
            {(cancelModal.status) ?
                <div onClick={onClickCloseModalCancel} className='w-full h-full fixed z-10 top-0 bg-black/50 flex justify-center items-center'>
                    <div className='bg-white p-5 rounded-xl flex flex-col items-center gap-5'>
                        <p className='font-semibold text-lg'>Are you sure to cancel the ticket?</p>
                        <p className='text-red-500'>/* This action can't be undone */</p>
                        <div className='flex flex-row justify-center gap-5'>
                            <div onClick={onClickCloseModalCancel} className='bg-green-500 text-white rounded-lg py-2 px-14'>No</div>
                            <div onClick={onClickCancelTicket} className='bg-red-600 text-white rounded-lg py-2 px-14'>Yes</div>
                        </div>
                    </div>
                </div>
                : null
            }
        </>

    )
}

export default Tickets