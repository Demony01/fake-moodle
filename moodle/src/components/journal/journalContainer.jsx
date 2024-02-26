import { connect } from "react-redux";
import Journal from "./journal";
import { useEffect } from "react";
import { getCourseTC } from "../../store/reducers/taskReducers";

const JournalContainer = (props) => {

    useEffect(() => {
        if (props.auth && props.auth.data && props.auth.data.id) {
            props.getCourseTC(props.auth.data.id);
        }

        // Функция очистки, вызываемая при размонтировании компонента
        return () => {
            // Здесь вы можете добавить код для отписки от событий или очистки ресурсов
        };
    }, []);


    return <Journal course={props.course} auth={props.auth} />;
};

let mapStateToProps = (state) => ({
    auth: state.auth,
    course: state.course,
});

export const JournalConnected = connect(mapStateToProps, { getCourseTC })(JournalContainer);
