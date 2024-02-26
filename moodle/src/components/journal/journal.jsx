import React, { useState } from "react";
import "./journal.css";
import { NavLink } from 'react-router-dom';
import arrow from './arrow.svg';
import whiteArrow from './white-arrow.svg';

export default function Journal(props) {
    console.log(props.course.data);
    const [hoveredArrow, setHoveredArrow] = useState(null);

    return (
        <div className="journal-main">
            <div className="container">
                <div className="journal-text">
                    <div className="textnav">
                        <NavLink to="/" className="text1">Главная →</NavLink>
                        <div className="text-vkladka">Журнал</div>
                    </div>
                    <div className="text2">ЖУРНАЛ</div>
                </div>
                <table className="journal-table">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Название</th>
                            <th>Тип журнала</th>
                            <th>Группа</th>
                            <th>Преподаватель</th>
                            <th>Оценки</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.course.data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{props.course.groupData[0].name}</td>
                                <td>{item.teacher.user}</td>
                                <td>
                                    <NavLink
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
