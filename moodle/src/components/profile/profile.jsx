import React from 'react';
import './profile.css';
import logo from './profile-logo.png'
import { NavLink } from 'react-router-dom';
import UpdateProfileForm from './form';


export default function Profile(props) {
    return (
        <div className="profile">
            <div className="container">
                <div className="main">
                    <div className="profile-text">
                        <div className="textnav">
                            <NavLink to="/" className="text1">Главная →</NavLink>
                            <div className="text-vkladka">Профиль</div>
                        </div>
                        <div className="text2">ПРОФИЛЬ</div>
                    </div>
                    <div className="profile-main">
                        <div className="avatar-menu">
                            <div className="avatar">
                                <img src={logo} alt="" />
                            </div>
                            <div className="avatar-text">
                                <div className="name-text">{props.props.data.last_name} {props.props.data.first_name}</div>
                            </div>
                        </div>
                        <div className="info-main">
                            <div className="info-menu">
                                <div className="info-card">
                                    <div className="base-text">Адрес электронной почты</div>
                                    <div className="gmail-text">
                                        <a href="#">{props.props.userData.email}</a>
                                    </div>
                                </div>
                                <div className="info-card">
                                    <div className="base-text">Дата рождения</div>
                                    <div className="info-text">{props.props.data.birth_date}</div>
                                </div>
                                <div className="info-card">
                                    <div className="base-text">Адрес</div>
                                    <div className="info-text">{props.props.data.address}</div>
                                </div>
                            </div>
                            <div className="edit-menu">
                                <div className="btns">
                                    {/* <div className="btn-edit">
                                        <a href="#">Edit </a>
                                    </div> */}
                                </div>
                                <UpdateProfileForm token={props.props.token} userId={props.props.data.id} change={props.change} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}