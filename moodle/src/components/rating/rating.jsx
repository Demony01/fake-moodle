import React, { useState } from 'react';
import './rating.css';
import { NavLink } from 'react-router-dom';


const teachersData = [
  { id: 1, name: 'Асанали Токенов', subject: 'Python', rating: 5 },
  { id: 2, name: 'Биржан Турсын', subject: 'БД', rating: 5 },
];

export default function RatingTeacher() {
  const [teacherRatings, setTeacherRatings] = useState(teachersData);

  const handleRatingChange = (value, teacherId) => {
    const updatedRatings = teacherRatings.map((teacher) =>
      teacher.id === teacherId ? { ...teacher, rating: value } : teacher
    );

    setTeacherRatings(updatedRatings);
  };

  return (
    <div className="rating-main">
      <div className="container">
        <div className="rating-text">
          <div className="textnav">
            <NavLink to="/" className="text1">
              Главная →
            </NavLink>
            <div className="text-vkladka">Оценка</div>
          </div>
          <div className="text2">Оценка преподавателей</div>
        </div>
        <table className="rating-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Преподаватель</th>
              <th>Предмет</th>
              <th>Оценивание</th>
            </tr>
          </thead>
          <tbody>
            {teacherRatings.map((teacher, index) => (
              <tr key={teacher.id}>
                <td>{index + 1}</td>
                <td>{teacher.name}</td>
                <td>{teacher.subject}</td>
                <td>
                  <div className="custom-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${teacher.rating >= star ? 'filled' : ''}`}
                        onClick={() => handleRatingChange(star, teacher.id)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
