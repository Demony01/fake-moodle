import React, { useState, useEffect } from "react";
import "./group.css";
import { NavLink } from 'react-router-dom';
import arrow from '../journal/arrow.svg';
import whiteArrow from '../journal/white-arrow.svg';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Groupdata = (props) => {
    console.log(props);
    const location = useLocation();
    const navigate = useNavigate();
    let groupId = location.pathname.split('/')[2];
    let groupData = props.auth.groupData.find(item => item.id == groupId);
    const [hoveredArrow, setHoveredArrow] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [taskForm, setTaskForm] = useState({
        text: "",
        title: "",
        description: "",
        file: null,
        deadline: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setTaskForm((prevForm) => ({ ...prevForm, file }));
    };

    const handlePopupToggle = () => {
        setShowPopup(!showPopup);
        document.body.style.overflow = showPopup ? 'auto' : 'hidden';
    };

    const handleAddTask = () => {
        const formData = new FormData();
        formData.append('file', taskForm.file);
        formData.append('title', taskForm.title);
        formData.append('content', taskForm.description);

        let data = {
            "text": taskForm.text,
            "date_end": taskForm.deadline
        };
        console.log(formData);
        props.addLecture(formData, data, props.course.teacherCourse[0].id, props.course.teacherCourse[0].lectures);
        navigate('/profile')
        setShowPopup(false);
        document.body.style.overflow = 'auto';
    };

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
                        {props.auth.groupData.length === 0 ? <p style={{ textAlign: 'center' }}>У вас пока нету групп</p> : groupData.students.map((item) => (
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
                <button className="open-popup-btn" onClick={handlePopupToggle}>
                    Добавить задание
                </button>
                {showPopup && (
                    <div className="overlay" onClick={handlePopupToggle} />
                )}
                {showPopup && (
                    <div className="popup">
                        <span className="close-popup" onClick={handlePopupToggle}>
                            &times;
                        </span>
                        <div className="popup-input-menu">
                            <label className="popup-label">Текст:</label>
                            <input
                                type="text"
                                name="text"
                                value={taskForm.text}
                                onChange={handleInputChange}
                                className="popup-input"
                            />

                            <label className="popup-label">Название:</label>
                            <input
                                type="text"
                                name="title"
                                value={taskForm.title}
                                onChange={handleInputChange}
                                className="popup-input"
                            />

                            <label className="popup-label">Описание:</label>
                            <input
                                type="text"
                                name="description"
                                value={taskForm.description}
                                onChange={handleInputChange}
                                className="popup-input"
                                aria-rowspan={4}
                            />

                            <label className="popup-label">Файл:</label>
                            <input
                                type="file"
                                name="file"
                                onChange={handleFileChange}
                                className="popup-input"
                            />

                            <label className="popup-label">Дедлайн:</label>
                            <input
                                type="date"
                                name="deadline"
                                value={taskForm.deadline}
                                onChange={handleInputChange}
                                className="popup-input"
                            />
                        </div>
                        <button className="add-popup-btn" onClick={handleAddTask}>
                            Добавить задание
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Groupdata;
