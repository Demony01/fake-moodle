import React from 'react';
import './style.css'
import { useNavigate } from "react-router-dom";

const Join = props => {
    const navigate = useNavigate()

    const handleSubmit = () => {
        if (props.auth.data.length === 0) {
            navigate('/login')
        } else {
            props.joinClub(props.auth.data.id, props.club.members.length)
        }
    }

    return (
        <div>
            <div className="desc">
                <div className="wrapper">
                    <img src={props.club.img} alt="" />
                    <div>
                        <h3>{props.club.name}</h3> <br />
                        <p>{props.club.description}</p>
                        <p>Кол-во участников: {props.club.members.length}</p>
                        <button onClick={handleSubmit} className='btn1 first1'>Присоединиться</button>  
                    </div>
                </div>  
            </div>
        </div>
    );
}

export default Join;
