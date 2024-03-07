import React, { useState } from "react";
import "./group.css";
import { NavLink } from 'react-router-dom';
import arrow from '../journal/arrow.svg';
import whiteArrow from '../journal/white-arrow.svg';
import { useLocation } from 'react-router-dom';

const Groupdata = props => {
    const location = useLocation();
    let groupId = location.pathname.split('/')[2];
    let groupData = props.auth.groupData.find(item => item.id == groupId);
    const [hoveredArrow, setHoveredArrow] = useState(null);
    return (
        <div className="journal-main">
            <div className="container">
                <div className="journal-text">
                    <div className="textnav">
                        <NavLink to="/" className="text1">Главная →</NavLink>
                        <NavLink to="/groups" className="text-vkladka" id="texttttt">Ваши группы →</NavLink>
                        <div className="text-vkladka">{groupData.name}</div>
                    </div>
                    <div className="text2">{groupData.name}</div>
                </div>
                <table className="journal-table">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Дата рождения</th>
                            <th>ФИО</th>
                            <th>Университет</th>
                            <th>Номер телефона</th>
                            <th>Подробнее</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.auth.groupData.length === 0 ? <p style={{textAlign: 'center'}}>У вас пока нету групп</p> : groupData.students.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.birth_date}</td>
                                <td>{item.last_name} {item.first_name}</td>
                                <td>{item.university.name}</td>
                                <td>{item.phone_number}</td>
                                <td> <NavLink
                                        to={`/student/${item.id}`}
                                        className="journal-btn"
                                        onMouseEnter={() => setHoveredArrow(item.id)}
                                        onMouseLeave={() => setHoveredArrow(null)}
                                    >
                                        <img
                                            className="arrow-image"
                                            src={hoveredArrow === item.id ? whiteArrow : arrow}
                                            alt="Стрелка"
                                            width="16"
                                            height="16"
                                        />
                                    </NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Groupdata;
