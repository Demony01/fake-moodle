import React from 'react';
import './profile.css';
import logo from './profile-logo.png'
import { NavLink } from 'react-router-dom';


export default function Student(props) {
    let user = props.props.uniqueStudentData
    console.log(user);
    return (
        <div className="profile">
            <div className="container">
                <div className="main">
                    <div className="profile-text">
                        <div className="textnav">
                            <NavLink to="/" className="text1">Главная →</NavLink>
                            <div className="text-vkladka">{user.last_name} {user.first_name}</div>
                        </div>
                        <div className="text2">ПРОФИЛЬ</div>
                    </div>
                    <div className="profile-main">
                        <div className="avatar-menu">
                            <div className="avatar">
                                <img src={logo} alt="" />
                            </div>
                            <div className="avatar-text">
                                <div className="name-text">{user.last_name} {user.first_name}</div>
                            </div>
                        </div>
                        <div className="info-main">
                            <div className="info-menu">
                                <div className="info-card">
                                    <div className="base-text">Номер телефона</div>
                                    <div className="gmail-text">
                                        <a href="#">{user.phone_number}</a>
                                    </div>
                                </div>
                                <div className="info-card">
                                    <div className="base-text">Дата рождения</div>
                                    <div className="info-text">{user.birth_date}</div>
                                </div>
                                <div className="info-card">
                                    <div className="base-text">Адрес</div>
                                    <div className="info-text">{user.address}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}