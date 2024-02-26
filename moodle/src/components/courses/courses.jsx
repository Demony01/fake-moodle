import React, { useState } from 'react';
import './courses.css';
import { NavLink, useHistory } from 'react-router-dom';
import arrow from './arrow.svg';
import whiteArrow from './white-arrow.svg';
import grad_cap from "./grad-cap.svg";
import white_cap from "./white-cap.svg" 
import { useEffect } from 'react';

export default function Course(props) {
    const [selectedCourse, setSelectedCourse] = useState(props.course.courseData[0]);
    
    useEffect(() => {
        setSelectedCourse(props.course.courseData[0]);
    }, [props.course.courseData]);

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
    };

    console.log(selectedCourse);

    return (
        <div className="main__theme">
            <div className="container">
                <div className="theme__inner">
                    <div className="courses-text">
                        <div className="textnav">
                            <NavLink to="/" className="text1">Главная →</NavLink>
                            <div className="text-vkladka">Курсы</div>
                        </div>
                        <div className="text2">{selectedCourse.title}</div>
                    </div>
                    <div className="course-wrapper">
                        <div className="course-sidebar">
                        {props.course.courseData.map((course, index) => (
                            <NavLink
                                key={index + 1}
                                to="/course"
                                className={`course-sidebar-card ${selectedCourse.id === course.id ? 'selected' : ''}`}
                                id={`course-card${index + 1}`}
                                onClick={() => handleCourseClick(course)}
                            >
                                    <div className="course-sidebar-img">
                                        <img src={course === index + 1 ? white_cap : grad_cap} alt="" />
                                    </div>
                                    <div className="course-sidebar-text">{course.title}</div>
                                </NavLink>
                            ))}
                        </div>
                        <table className="theme__table">
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Название</th>
                                    <th>Дата и время назначения</th>
                                    <th>Дата и время завершения</th>
                                    <th>Ответ</th>
                                </tr>
                            </thead>
                            <tbody>
                            {selectedCourse.lectures.map((lecture) => (
                                <tr key={lecture.id}>
                                    <td>{lecture.title}</td>
                                    <td>{lecture.content}</td>
                                    <td>{lecture.task.date_start}</td>
                                    <td>{lecture.task.date_end}</td>
                                    <td>
                                        <NavLink to={`/task/${selectedCourse.id}`} className="journal-btn">
                                            <img
                                                className="arrow-image"
                                                src={arrow}
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
            </div>
        </div>
    );
}
