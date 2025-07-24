import React from 'react'
import { LeftOutlined } from '@ant-design/icons'
import { useParams } from 'react-router'


const TicketDetails = () => {
    const ticketParam = useParams()
    // console.log(ticket)

    const [ticket, setTicket] = React.useState([]);
    React.useEffect(() => {
        fetch(`http://localhost:4000/tickets/${ticketParam.id}`)
            .then(response => response.json())
            .then(data => {
                setTicket(data)
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            })
    }, []);
    const [users, setUsers] = React.useState([]);
    React.useEffect(() => {
        fetch(`http://localhost:4000/users`)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
    const user = users.find(user => user.id === ticket.userId)
    const seats = ticket.seats
    if (seats) {
        for (let i = 0; i < seats.length; i++) {
            (seats[i] > 48) ? seats[i] = `G${seats[i] % 48} ` : (seats[i] > 40) ? seats[i] = `E${seats[i] % 40} ` : (seats[i] > 32) ? seats[i] = `F${seats[i] % 32} ` : (seats[i] > 24) ? seats[i] = `D${seats[i] % 24} ` : (seats[i] > 16) ? seats[i] = `C${seats[i] % 16} ` : (seats[i] > 8) ? seats[i] = `B${seats[i] % 8} ` : (seats[i] > 0) ? seats[i] = `A${seats[i]} ` : null
        }
    }

    const onClickReturn = () => {
        history.back()
    }
    return (
        <>
            {(user && ticket) ?
                <div>
                    <div className='w-full py-3 px-5 border-b-2 border-gray-200 font-bold text-center relative bg-white'>
                        <p onClick={onClickReturn} className='absolute left-3'><LeftOutlined /></p>
                        <p>Ticket Details</p>
                    </div>
                    <div className='w-full  fixed -z-10 top-0 p-6 pt-18'>
                        <div className='border-2 border-gray-200 w-full h-full shadow-2xl rounded-2xl p-6 flex flex-col gap-10'>
                            <div>
                                <p className='text-xl font-semibold'>Name</p>
                                <p className='text-lg text-gray-500'>{user.username}</p>
                            </div>
                            <div>
                                <p className='text-xl font-semibold'>Date</p>
                                <p className='text-lg text-gray-500'>{ticket.date}</p>
                            </div>
                            <div>
                                <p className='text-xl font-semibold'>Time</p>
                                <p className='text-lg text-gray-500'>{ticket.time}</p>
                            </div>
                            <div>
                                <p className='text-xl font-semibold'>Seat</p>
                                <p className='text-lg text-gray-500'>{seats}</p>
                            </div>
                            <div className='bg-orange-200 text-orange-600 px-1 rounded-lg'>
                                <p className='text-xl font-semibold'>Payment: At counter</p>
                                <p className='text-lg'>* Please come checkout before the time of the movie</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                null
            }
        </>


    )
}

export default TicketDetails