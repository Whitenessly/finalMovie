import React from 'react'
import { Navigate, useNavigate } from 'react-router';
import { LeftOutlined } from '@ant-design/icons'
import { DatePicker, Space } from 'antd';
import { Cascader } from 'antd';


const StaffTicket = () => {
    const localStaff = localStorage.getItem("staffLogin")
    if (!localStaff) {
        return <Navigate to={"/staff"} />;
    }
    const [tickets, setTickets] = React.useState([]);
    React.useEffect(() => {
        fetch('http://localhost:4000/tickets')
            .then(response => response.json())
            .then(data => {
                setTickets(data);
            })
            .catch(error => {
                location.reload();
                console.error('Error fetching movies:', error);
            });
    }, [])

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
    const [movies, setMovies] = React.useState([]);
    React.useEffect(() => {
        fetch(`http://localhost:4000/movies`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const options = [
        {
            key: "1",
            value: '9:00 AM',
            label: '9:00 AM',
        },
        {
            key: "2",
            value: '11:00 AM',
            label: '11:00 AM',
        },
        {
            key: "3",
            value: '2:00 PM',
            label: '2:00 PM',
        },
        {
            key: "4",
            value: '5:00 PM',
            label: '5:00 PM',
        },
        {
            key: "5",
            value: '8:00 PM',
            label: '8:00 PM',
        },
    ];
    const [time, setTime] = React.useState('')
    const onChangeTime = (value) => {
        setTime(value[0])
    };
    const [date, setDate] = React.useState('')
    const onChangeDate = (date, dateString) => {
        setDate(dateString)
    };
    const [filtered, setFiltered] = React.useState([])
    const onSubmit = () => {
        const array = tickets.filter(ticket => ticket.date === date && ticket.time === time)
        setFiltered([...array])
    }

    const onClickReturn = () => {
        localStorage.removeItem("staffLogin")
        nav('/home');
    }
    return (
        <>
            <div className='w-full py-3 px-5 font-bold bg-white'>
                <p onClick={onClickReturn} className=''><LeftOutlined /> Back to home</p>
            </div>
            <div className='flex flex-row px-5 justify-between'>
                <Cascader options={options} onChange={onChangeTime} placeholder="Select time" />
                <Space direction="vertical">
                    <DatePicker onChange={onChangeDate} />
                </Space>
            </div>
            <div className='w-full flex flex-col items-center pt-5'>
                <div onClick={onSubmit} className='bg-blue-400 text-white px-3 py-2 rounded-lg'>Search</div>
                <div className='w-full px-5 flex flex-col gap-5 pt-5'>
                    {(filtered.length) ? filtered.map((ticket) => {
                        const user = users.find(item => item.id === ticket.userId)
                        const movie = movies.find(item => item.id === `${ticket.movieId}`)
                        for (let i = 0; i < ticket.seats.length; i++) {
                            (ticket.seats[i] > 48) ? ticket.seats[i] = `G${ticket.seats[i] % 48} ` : (ticket.seats[i] > 40) ? ticket.seats[i] = `E${ticket.seats[i] % 40} ` : (ticket.seats[i] > 32) ? ticket.seats[i] = `F${ticket.seats[i] % 32} ` : (ticket.seats[i] > 24) ? ticket.seats[i] = `D${ticket.seats[i] % 24} ` : (ticket.seats[i] > 16) ? ticket.seats[i] = `C${ticket.seats[i] % 16} ` : (ticket.seats[i] > 8) ? ticket.seats[i] = `B${ticket.seats[i] % 8} ` : (ticket.seats[i] > 0) ? ticket.seats[i] = `A${ticket.seats[i]} ` : null
                        }
                        return (
                            <div className='w-full px-10 py-5 shadow-2xl border-2 border-gray-200 rounded-xl'>
                                <div>Name: {user.username}</div>
                                <div>Email: {user.email}</div>
                                <div>Movie: {movie.title}</div>
                                <div>Date: {ticket.date}</div>
                                <div>Time: {ticket.time}</div>
                                <div>Seats: {ticket.seats}</div>
                                <div>Status: {(ticket.paid) ? 'Paid' : 'Not paid'}</div>
                                <div>Canceled: {(ticket.canceled) ? 'Yes' : 'No'}</div>
                            </div>
                        )
                    }) : null}
                </div>

            </div>
        </>
    )
}

export default StaffTicket