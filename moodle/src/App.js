import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import {Route, Routes} from "react-router";
import Rating_Teacher from "./components/rating/rating";
import './index.css'
import React from 'react';
import { LoginConnected } from "./components/login/loginContainer";
import { HeaderConnected } from "./components/header/headerContainer";
import { RegistConnected } from "./components/registration/registContainer";
import { ProfileConnected } from "./components/profile/profileContainer";
import { JournalConnected } from "./components/journal/journalContainer";
import { ClubsConnected } from "./components/clubs/clubsContainer"
import { GradesConnected } from "./components/grades/gradesContainer";
import { CoursesConnected } from "./components/courses/coursesContainer";
import { TaskConnected } from "./components/task/taskContainer";
import { GroupConnected } from "./components/groups/groupsContainer";
import { JoinConnected } from "./components/join/joinContainer";


function App() {
  
  return (
    <div>
      <HeaderConnected /> 
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/profile" element={<ProfileConnected />} />
        <Route exact path="/login" element={<LoginConnected />} />
        <Route exact path="/register" element={<RegistConnected />} />
        <Route exact path="/journal" element={<JournalConnected />} />
        <Route exact path="/clubs" element={<ClubsConnected />} />
        <Route exact path="/grades/:id?" element={<GradesConnected />} />
        <Route exact path="/task/:id" element={<TaskConnected />} />
        <Route exact path="/course" element={<CoursesConnected />} />
        <Route exact path="/rating" element={<Rating_Teacher />} />
        <Route exact path="/groups" element={<GroupConnected />} />
        <Route exact path="/join/:id" element={<JoinConnected />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
