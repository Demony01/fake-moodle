import React, { useState } from "react";
import './login.css';
import avatar from './avatar.png'
import lock from './lock.png'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    const navigate = useNavigate()
    const [type, setType] = useState(null);
    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const onSubmit = values => {
        if (type === 'teacher') {
            props.loginTeacher(values)
        } else {
            props.login(values)
        }
        navigate('/profile')
    };

    return (
        <div className="login">
            <div className="container">
                <div className="login-menu">
                    <div className="login-text">ВХОД</div>
                    <div className="reg-type">
                    <button onClick={() => setType('teacher')}>Учитель</button> <button onClick={() => setType('student')}>Ученик</button>
                    </div>
                    <div className="input-menu-login">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {
                formik => {
                    return <Form>
                        <div className="input-card">
                            <div className="avatar-login">
                                <img src={avatar} alt="" />
                            </div>
                            <div className="input-login">
                                <Field component='input' name="username" type="text" placeholder="Username" />
                            </div>
                        </div>
                        <div className="input-card2">
                            <div className="avatar-login">
                                <img src={lock} alt="" />
                            </div>
                            <div className="input-login">
                                <Field component='input' name="password" type="password" placeholder="Password" />
                            </div>
                        </div>
                        <div className="btns-remember-login">
                            <div className="remember">
                                <input type="checkbox" name="check"/>
                                <label htmlFor="check" className="remember-text">Запомнить меня</label>
                            </div>
                            <div className="btn-login">
                                <button type="submit" disabled={!formik.isValid} className="btn-login-text">Вход</button>
                            </div>
                        </div>
                        </Form>}}
                    </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}