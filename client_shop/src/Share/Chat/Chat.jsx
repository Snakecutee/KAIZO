import React, { useEffect, useRef, useState } from 'react';
import './Chat.css'
import queryString from 'query-string'

import MessengerAPI from '../../API/MessengerAPI';
import { useSelector } from 'react-redux';

// import io from "socket.io-client";
// const socket = io("http://localhost:8000", {
//     withCredentials: true,
//     extraHeaders: {
//       "my-custom-header": "abcd"
//     }
// });

function Chat(props) {

    const [activeChat, setActiveChat] = useState(false)

    const [textMessage, setTextMessage] = useState('')

    const [message, setMessage] = useState()

    const id_admin = '5ff808424e24e9118cee77b2'

    //Get id_user từ redux khi user đã đăng nhập
    const id_user = useSelector(state => state.Session.idUser)

    const [loadMessage, setLoadMessage] = useState('')

    const [load, setLoad] = useState(false)

    const timeRef = useRef(null);

    // Hàm này dùng để mở hộp thoại chat
    const onChat = () => {
        setActiveChat(!activeChat)
    }

    const onChangeText = (e) => {

        setTextMessage(e.target.value)
        console.log(e.target.value)
    }

    // Hàm này là thay đổi state loadMessage phụ thuộc vào redux id_user
    // Nhầm mục đích để gọi lại hàm useEffect loadmessage
    useEffect(() => {
        if (!id_user) {
            setLoadMessage('')
        } else {
            setLoadMessage(id_user)
        }
    }, [id_user])


    const handlerSend = () => {
        
        const data = {
            id_user1: id_user,
            id_user2: id_admin,
            id: Math.random().toString(),
            message: textMessage,
            name: sessionStorage.getItem('name_user'),
            category: "send"
        }

        const data_partner = {
            id_user1: id_admin,
            id_user2: id_user,
            id: Math.random().toString(),
            message: textMessage,
            name: sessionStorage.getItem('name_user'),
            category: "receive"
        };

        //Sau đó nó emit dữ liệu lên server bằng socket với key send_message và value data
        // socket.emit('send_message', data)

        //Tiếp theo nó sẽ postdata lên api đưa dữ liệu vào database
        const postData = async () => {

            const query = '?' + queryString.stringify(data);
            const query_partner = '?' + queryString.stringify(data_partner);


            await MessengerAPI.postMessage(query);
            const res = await MessengerAPI.postMessage(query_partner);

            //Sau đó gọi hàm setLoad để useEffect lấy lại dữ liệu sau khi update
            if (res) {
                setLoad(true);
            }
        }

        postData()

        setTextMessage('')

    }

    // Hàm này dùng để load dữ liệu message của user khi user gửi tin nhán
    useEffect(() => {
        if (load) {
            fetchMessageData();
            setLoad(false)
        }
    }, [load])

    const fetchMessageData = async () => {
        const params = {
            id_user1: id_user,
            id_user2: id_admin
        }
        const query = '?' + queryString.stringify(params)
        const response = await MessengerAPI.getMessage(query)
        setMessage(response.content);
        if (response) {
            return true;
        }
    };


    // Hàm này dùng để load dữ liệu message của user
    // Phụ thuộc state loadMessage
    useEffect(() => {
        if (loadMessage) {
            const fetchData = async () => {
                const params = {
                    id_user1: id_user,
                    id_user2: id_admin
                }
                const query = '?' + queryString.stringify(params)
                const response = await MessengerAPI.getMessage(query)
                setMessage(response.content)
            }
            fetchData()
        }
    }, [loadMessage])


    //Hàm này dùng để nhận socket từ server gửi lên
    // useEffect(() => {

    //     //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_message
    //     socket.on('receive_message', (data) => {

    //         //Sau đó nó sẽ setLoad gọi lại hàm useEffect lấy lại dữ liệu
    //         setLoad(true)

    //     })

    // }, [])

    const handlePollingMessage = () => {
        timeRef.current = setTimeout(async () => {
            const flag = await fetchMessageData();
            if (flag && activeChat) {
                handlePollingMessage();
            }
        }, 3000);
    }

    useEffect(() => {
        if (activeChat) {
            handlePollingMessage();
        } else {
            clearTimeout(timeRef.current);
        }
    }, [activeChat])


    return (
        <>
            {id_user &&
                <div>
                    <div className="wrapper_chat">
                        <div className="chat_messenger" onClick={onChat}>
                            <svg x="0" y="0" width="60px" height="60px"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g>
                                    <circle fill="#383838" cx="30" cy="30" r="30"></circle>
                                    <svg x="10" y="10">
                                        <g transform="translate(0.000000, -10.000000)" fill="#FFFFFF">
                                            <g id="logo" transform="translate(0.000000, 10.000000)">
                                                <path d="M20,0 C31.2666,0 40,8.2528 40,19.4 C40,30.5472 31.2666,38.8 
                                        20,38.8 C17.9763,38.8 16.0348,38.5327 14.2106,38.0311 C13.856,37.9335 13.4789,37.9612 
                                        13.1424,38.1098 L9.1727,39.8621 C8.1343,40.3205 6.9621,39.5819 6.9273,38.4474 L6.8184,34.8894 
                                        C6.805,34.4513 6.6078,34.0414 6.2811,33.7492 C2.3896,30.2691 0,25.2307 0,19.4 C0,8.2528 8.7334,0 
                                        20,0 Z M7.99009,25.07344 C7.42629,25.96794 8.52579,26.97594 9.36809,26.33674 L15.67879,21.54734 
                                        C16.10569,21.22334 16.69559,21.22164 17.12429,21.54314 L21.79709,25.04774 C23.19919,26.09944 
                                        25.20039,25.73014 26.13499,24.24744 L32.00999,14.92654 C32.57369,14.03204 31.47419,13.02404 
                                        30.63189,13.66324 L24.32119,18.45264 C23.89429,18.77664 23.30439,18.77834 22.87569,18.45674 
                                        L18.20299,14.95224 C16.80079,13.90064 14.79959,14.26984 13.86509,15.75264 L7.99009,25.07344 Z">
                                                </path>
                                            </g>
                                        </g>
                                    </svg>
                                </g>
                            </g>
                            </svg>
                        </div>
                    </div>
                    {
                        activeChat && (
                            <div className='active_chat animate__animated animate__jackInTheBox'>
                                <div style={{ width: '100%' }}>
                                    <div className="card card-bordered fix_boderChat">
                                        <div className="card-header">
                                            <h4 className="card-title"><strong>Customer Support</strong></h4> <a className="btn btn-xs btn-secondary" href="#">Let's Chat App</a>
                                        </div>
                                        <div className="ps-container ps-theme-default ps-active-y fix_scoll">
                                            {
                                                message && message.map(value => (
                                                    value.category === 'send' ? (
                                                        <div className="media media-chat media-chat-reverse" key={value.id}>
                                                            <div className="media-body">
                                                                <p>{value.message}</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="media media-chat" key={value.id}> <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
                                                            <div className="media-body" key={value.id}>
                                                                <p>ADMIN: {value.message}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                ))
                                            }
                                        </div>
                                        <div className="publisher bt-1 border-light">
                                            <img className="avatar avatar-xs" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
                                            <input type="text" placeholder="Enter Message!" onChange={onChangeText} value={textMessage} />
                                            <span className="publisher-btn file-group">
                                                <i className="fa fa-paperclip file-browser"></i>
                                                <input type="file" />
                                            </span>
                                            <a className="publisher-btn" href="#" data-abc="true">
                                                <i className="fa fa-smile"></i>
                                            </a>
                                            <a onClick={handlerSend} className="publisher-btn text-info" data-abc="true">
                                                <i className="fa fa-paper-plane"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            }
        </>
    );
}

export default Chat;