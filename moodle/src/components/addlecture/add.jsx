import React from 'react';
import { NavLink } from 'react-router-dom';
import TaskForm from './taskform';

const Add = (props) => {
    return (
        <div className='journal-main'>
            <div className="container">
                <div className="journal-text">                        
                    <div className="textnav">
                        <NavLink to="/" className="text1">Главная →</NavLink>
                        <NavLink to="/groups" className="text-vkladka" id="texttttt">Ваши группы →</NavLink>
                        <div className="text-vkladka">Добавить новую лекцию</div>
                    </div>
                    <div className="text2">Добавить новую лекцию</div>
                </div>
                <TaskForm course={props.course} AddLecture={props.AddLecture}/>
            </div>
        </div>
    );
}

export default Add;
