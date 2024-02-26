import React, { useState } from "react";
import "./grades.css";
import { NavLink } from "react-router-dom";

export default function Grades(props) {
  console.log(props.grades.grades);
  return (
    <div className="grades-main">
      <div className="container">
        <div className="main">
          <div className="grades-text">
            <div className="textnav">
              <NavLink to="/" className="text1">
                Главная →
              </NavLink>
              <NavLink to="/journal" className="text1-journal">
                Журнал →
              </NavLink>
              <div className="text-vkladka">Оценки</div>
            </div>
            <div className="text2">ОЦЕНКИ</div>
          </div>


          <table className="grades-table">
            <thead>
              <tr>
                <th>№</th>
                <th>Предмет</th>
                <th>Оценки</th>
                <th>Записи</th>
                <th>Итог за семестр</th>
              </tr>
            </thead>
            <tbody>
              {
                props.grades.grades.length === 0 ? <p style={{textAlign: 'center'}}>У вас пока нету оценок</p> : props.grades.grades.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.course.title}</td>
                    <td>{row.related_grades.map((grades) => {
                      return grades.score
                    })}</td>
                    <td>{row.related_grades.length}</td>
                    <td>{row.average_score}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
