import React, { useState } from "react";
import "./group.css";
import { NavLink } from 'react-router-dom';
import arrow from '../journal/arrow.svg';
import whiteArrow from '../journal/white-arrow.svg';

export default function Groups(props) {
    console.log(props);
    const [hoveredArrow, setHoveredArrow] = useState(null);

    return (
        <div className="journal-main">
            <div className="container">
                <div className="journal-text">
                    <div className="textnav">
                        <NavLink to="/" className="text1">Главная →</NavLink>
                        <div className="text-vkladka">Ваши группы</div>
                    </div>
                    <div className="text2">ГРУППЫ</div>
                </div>
                <table className="journal-table">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Группа</th>
                            <th>Куратор</th>
                            <th>Кол-во студентов</th>
                            <th>Преподаватель</th>
                            <th>Информация</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.groupData.length === 0 ? <p style={{textAlign: 'center'}}>У вас пока нету групп</p> : props.groupData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.curator.last_name} {item.curator.first_name}</td>
                                <td>{item.students.length}</td>
                                <td>{item.teacher.last_name} {item.teacher.first_name}</td>
                                <td> <NavLink
                                        to="/grades"
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
