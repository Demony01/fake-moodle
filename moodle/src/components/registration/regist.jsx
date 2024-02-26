import React, { useState } from "react";
import "./regist.css";
import user from "./user.svg";
import email from "./email.svg";
import year from "./year.svg";
import major from "./major.svg";
import birth from "./birth.svg";
import gender from "./gender.svg";
import univer from "./university.svg";
import phone from "./phone.svg";
import password from "./password.svg";
import map from './map-regular.svg'
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useEffect } from "react";

const SuggestionsList = ({ suggestions, onSelect }) => (
    <ul className="suggestions-list">
      {suggestions.map((university) => (
        <li key={university.id} onClick={() => onSelect(university)}>
          {university.name}
        </li>
      ))}
    </ul>
  );
  

export default function Registration(props) {
    const navigate = useNavigate();
    useEffect(() => {
        props.getUniversity()
    }, []);
    const [type, setType] = useState(null);
    const initialValues = {
        username: "",
        email: "",
        password: "",
        university: "",
        year: "",
        first_name: "",
        last_name: "",
        major: "",
        birth_date: "",
        gender: "",
        phone: "",
        address: "",
        universityId: ""
    };

    const [universitySuggestions, setUniversitySuggestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
      
    const validationSchema = Yup.object({
        username: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required("Invalid password"),
        university: Yup.string().required("Invalid password"),
        first_name: Yup.string().required("Invalid password"),
        last_name: Yup.string().required("Invalid password"),
        birth_date: Yup.string().required("Invalid password"),
        gender: Yup.string().required("Invalid password"),
        phone: Yup.string().required("Invalid password"),
        address: Yup.string().required("Invalid password")
    });

    const onSubmit = (values) => {
        console.log(values);
        props.register(values, type);
        navigate('/profile')
    };

    const handleUniversityChange = (event, formik) => {
        const value = event.target.value;
        formik.handleChange(event);
        setSearchTerm(value);
    
        if (props.props.uniData && Array.isArray(props.props.uniData)) {
            setUniversitySuggestions(
                props.props.uniData.filter((university) =>
                    university.name.toLowerCase().includes(value.toLowerCase())
                )
            );
        } else {
            setUniversitySuggestions([]);
        }
    };
    
    

    const handleSuggestionSelect = (university, formik) => {
        setSearchTerm(university.name);
        setUniversitySuggestions([]);
        formik.setFieldValue('university', university.name);
        formik.setFieldValue('universityId', university.id);
    };
    
      
    console.log(type);
      

    return (
        <div className="register">
            <div className="container">
                <div className="register-menu">
                    <div className="reg-text">РЕГИСТРАЦИЯ</div>
                    <div className="reg-type">
                    <button onClick={() => setType('teacher')}>Учитель</button> <button className="student" onClick={() => setType('student')}>Ученик</button>
                    </div>
                    <div className="input-menu-reg">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {(formik) => {
                                return (
                                    <Form>
                                        <div className="input-card-reg">
                                            <div className="avatar-reg">
                                                <img src={email} alt="" />
                                            </div>
                                            <div className="input-reg">
                                                <Field
                                                    component="input"
                                                    name="email"
                                                    type="text"
                                                    placeholder="Email@email.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="input-card-reg">
                                            <div className="avatar-reg">
                                                <img src={user} alt="" />
                                            </div>
                                            <div className="input-reg">
                                                <Field
                                                    component="input"
                                                    name="username"
                                                    type="text"
                                                    placeholder="Username"
                                                />
                                            </div>
                                        </div>
                                        <div className="input-card-reg">
                                            <div className="avatar-reg">
                                                <img src={user} alt="" />
                                            </div>
                                            <div className="input-reg">
                                                <Field
                                                    component="input"
                                                    name="first_name"
                                                    type="text"
                                                    placeholder="Имя"
                                                />
                                            </div>
                                        </div>
                                        <div className="input-card-reg">
                                            <div className="avatar-reg">
                                                <img src={user} alt="" />
                                            </div>
                                            <div className="input-reg">
                                                <Field
                                                    component="input"
                                                    name="last_name"
                                                    type="text"
                                                    placeholder="Фамилия"
                                                />
                                            </div>
                                        </div>
                                        <div className="input-card-reg">
          <div className="avatar-reg">
            <img src={univer} alt="" />
          </div>
          <div className="input-reg">
            <Field
              component="input"
              name="university"
              type="text"
              placeholder="Университет"
              value={searchTerm}
              onChange={(e) => handleUniversityChange(e, formik)}
            />
            {universitySuggestions.length > 0 && (
              <SuggestionsList
                suggestions={universitySuggestions}
                onSelect={(university) => handleSuggestionSelect(university, formik)}
              />
            )}
          </div>
        </div>
        {type === 'student' && (
                      <div>
                        <div className="input-card-reg">
                          <div className="avatar-reg">
                            <img src={year} alt="" />
                          </div>
                          <div className="input-reg">
                            <Field
                              component="input"
                              name="year"
                              type="text"
                              placeholder="Курс"
                            />
                          </div>
                        </div>
                        <div className="input-card-reg">
                          <div className="avatar-reg">
                            <img src={major} alt="" />
                          </div>
                          <div className="input-reg">
                            <Field
                              component="input"
                              name="major"
                              type="text"
                              placeholder="Специальность"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                                        <div className="input-card-reg">
                                            <div className="avatar-reg">
                                                <img src={birth} alt="" />
                                            </div>
                                            <div className="input-reg">
                                                <Field
                                                    component="input"
                                                    name="birth_date"
                                                    type="date"
                                                    placeholder="Дата рождения"
                                                />
                                            </div>
                                        </div>
                                        <div className="input-card-reg">
                                            <div className="avatar-reg">
                                                <img src={gender} alt="" />
                                            </div>
                                            <div className="input-reg-gender">
                                                <Field
                                                    component="input"
                                                    name="gender"
                                                    type="radio"
                                                    value="male"
                                                    id="male"
                                                />
                                                <label htmlFor="male">М</label>

                                                <Field
                                                    component="input"
                                                    name="gender"
                                                    type="radio"
                                                    value="female"
                                                    id="female"
                                                />
                                                <label htmlFor="female">Ж</label>
                                            </div>
                                        </div>
                                        <div className="input-card-reg">
                                            <div className="avatar-reg">
                                                <img src={phone} alt="" />
                                            </div>
                                            <div className="input-reg">
                                                <Field
                                                    component="input"
                                                    name="phone"
                                                    type="text"
                                                    placeholder="Номер телефона"
                                                />
                                            </div>
                                        </div>
                                        <div className="input-card-reg">
                                            <div className="avatar-reg">
                                                <img src={map} alt="" />
                                            </div>
                                            <div className="input-reg">
                                                <Field
                                                    component="input"
                                                    name="address"
                                                    type="text"
                                                    placeholder="Адрес проживания"
                                                />
                                            </div>
                                        </div>
                                        <div className="input-card-reg">
                                            <div className="avatar-reg">
                                                <img src={password} alt="" />
                                            </div>
                                            <div className="input-reg">
                                                <Field
                                                    component="input"
                                                    name="password"
                                                    type="password"
                                                    placeholder="Пароль"
                                                />
                                            </div>
                                        </div>
                                        <div className="btns-remember-reg">
                                            <div className="remember-reg">
                                                <input type="checkbox" name="check" />
                                                <label htmlFor="check" className="remember-text">
                                                    Запомнить меня
                                                </label>
                                            </div>
                                            <div className="btn-reg">
                                                <button
                                                    type="submit"
                                                    className="btn-reg-text"
                                                >
                                                    Вход
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}
