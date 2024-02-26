// CourseSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import grad_cap from "./grad-cap.svg";
import white_cap from "./white-cap.svg";

export default function CourseSidebar({ courseData, selectedItem, handleItemClick }) {
  return (
    <div className="course-sidebar">
      {courseData.map((course, index) => (
        <NavLink
          key={index + 1}
          to="/course"
          className={`course-sidebar-card ${selectedItem === index + 1 ? 'selected' : ''}`}
          id={`course-card${index + 1}`}
          onClick={() => handleItemClick(index + 1)}
        >
          <div className="course-sidebar-img">
            <img src={selectedItem === index + 1 ? white_cap : grad_cap} alt="" />
          </div>
          <div className="course-sidebar-text">{course.title}</div>
        </NavLink>
      ))}
    </div>
  );
}
