import React, { useState } from "react";
import "./task.css";
import { NavLink } from "react-router-dom";
import grad_cap from "./grad-cap.svg";
import white_cap from "./white-cap.svg";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import CourseSidebar from "../courses/courseSidebar";


export default function Taskk(props) {
  let data = props.course.un_courseData[0]
  const courseData = data.lectures;

  const [selectedItem, setSelectedItem] = useState(1);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState(courseData[0].title);
  const [draggedOver, setDraggedOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [dropzoneVisible, setDropzoneVisible] = useState(true);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const [filesUploaded, setFilesUploaded] = useState(false);

  const handleFiles = (files) => {
    // Convert files to an array if it's not already
    const filesArray = Array.from(files);
  
    console.log(`Получено файлов: ${filesArray.length}`);
    setUploadedFiles(filesArray);
    setFilesUploaded(true);
  
    // Create FormData and append each file
    const formData = new FormData();
    filesArray.forEach((file, index) => {
      formData.append(`file`, file);
    });
  
    // Append other data to formData as needed (e.g., student ID, assignment type, etc.)
    formData.append('student', props.userId);
    formData.append('assignment_type', 2);
    formData.append('hometask', data.lectures[0].task.id);
    formData.append('course', props.course.un_courseData[0].id);
  
    // Call the sendAnswer function with formData
    props.sendAnswer(formData);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = () => {
    setDraggedOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggedOver(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleConfirmation = () => {
    setConfirmationVisible(true);
    setDropzoneVisible(false);
  };

  const handleResetFiles = () => {
    setUploadedFiles([]);
    setConfirmationVisible(false);
    setDropzoneVisible(true);
  };

  const handleDownloadAll = () => {
    const zip = new JSZip();

    uploadedFiles.forEach((file, index) => {
      const fileName = `file${index + 1}`;
      zip.file(fileName, file);
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "files.zip");
    });
  };


  return (
    <div className="task-main">
      <div className="container">
        <div className="main">
          <div className="task-text">
            <div className="textnav">
              <NavLink to="/" className="text1">
                Главная →
              </NavLink>
              <NavLink to="/course" className="text1-journal">
                Курс →
              </NavLink>
              <div className="text-vkladka">{data.title}</div>
            </div>
            <div className="text2" style={{'textTransform': 'uppercase'}}>{data.title}</div>
          </div>
          <div className="main-task-menu">
            <CourseSidebar courseData={courseData} selectedItem={selectedItem} handleItemClick={handleItemClick} />
            <div className="task-menu">
              <div className="text2" id="otvet2">
                {data.lectures[0].title}
              </div>
              <div className="text2" id="otvet">
                СОСТОЯНИЕ ОТВЕТА
              </div>
              <table className="task-table">
                <tbody>
                <tr>
                    <td className="table-label">Дата назначения задания:</td>
                    <td>{data.lectures[0].task.date_start}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Дата завершения задания:</td>
                    <td>{data.lectures[0].task.date_end}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Статус ответа:</td>
                    <td>В процессе</td>
                  </tr>
                  <tr>
                    <td className="table-label">Оценка:</td>
                    <td>Без оценки</td>
                  </tr>
                  <tr>
                    <td className="table-label">Оставшееся время:</td>
                    <td>3 дня</td>
                  </tr>
                  <tr>
                    <td className="table-label">Прикрепленный файл:</td>
                    <td>file</td>
                  </tr>
                </tbody>
              </table>
              <div className={`text2 ${draggedOver ? 'dragged-over' : ''}`} id="otvet">
                ВАШ ОТВЕТ
                <div
                  id="dropZone"
                  className={`drop-zone ${draggedOver ? 'dragged-over' : ''} ${confirmationVisible ? 'hidden' : ''} ${dropzoneVisible ? '' : 'hidden'}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {filesUploaded ? null : (
                    <div className="drop-zone-icons">
                      <svg className="upload-icon" viewBox="0 0 24 24" fill="#FF5A5F">
                        <path d="M12 6l-4 4h3v4h2v-4h3m-10 6v2h12v-2h-12z"></path>
                      </svg>
                    </div>
                  )}
                  {uploadedFiles.length > 0 ? (
                    <div>
                      <ul>
                        {uploadedFiles.map((file, index) => (
                          <li className="text2" id="otvet-text" key={index}>{file.name}</li>
                        ))}
                      </ul>
                      <button className="btn-task" onClick={handleConfirmation}>Подтвердить</button>
                    </div>
                  ) : (
                    <span className="drop-zone-text">
                      Перетащите файлы сюда или нажмите, чтобы загрузить
                    </span>
                  )}
                </div>
                <input
                  type="file"
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                />
              </div>
              {confirmationVisible && (
                <table className="task-table">
                  <tbody>
                    <tr>
                      <td className="table-label">Статус:</td>
                      <td>Проверено</td>
                    </tr>
                    <tr>
                      <td className="table-label">Ваши файлы:</td>
                      <td>
                        <ul>
                          {uploadedFiles.map((file, index) => (
                            <li key={index}>
                              <a href={URL.createObjectURL(file)} download={file.name}>
                                {file.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                        {uploadedFiles.length > 0 && (
                          <button className="btn-task" onClick={handleDownloadAll}>Скачать все файлы</button>
                        )}
                      </td>


                    </tr>
                    <tr>
                      <td className="table-label">Комментарий преподавателя:</td>
                      <td>...</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <button className="btn-task" onClick={handleResetFiles}>Загрузить другие файлы</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
