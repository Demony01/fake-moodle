import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';

const TaskForm = (props) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesUploaded, setFilesUploaded] = useState(false);

  const initialValues = {
    text: '',
    file: null,
    date_start: '',
    title: '',
    content: '',
  };

  const validationSchema = Yup.object({
    text: Yup.string().required('Username is required'),
    file: Yup.mixed().required('File is required'),
    date_start: Yup.string().required('Date start is required'),
    content: Yup.string().required('Content is required'),
    title: Yup.string().required('Title is required'),
  });

  const onSubmit = async (values) => {
    console.log(values);

    const formData = new FormData();
    uploadedFiles.forEach((file, index) => {
      formData.append('file', file);
    });
    formData.append('title', values.title);
    formData.append('content', values.content);

    let data = {
      "text": values.text,
      "date_end": values.date_start
    };

    try {
      // Assuming AddLecture is an asynchronous action
      await props.AddLecture(formData, data, props.course.teacherCourse[0].id, [2,4]);
      // Add any additional logic you need after successful submission
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleFileInputChange = (e, form) => {
    const files = e.target.files;
    setUploadedFiles(Array.from(files));
    form.setFieldValue('file', files); // Set the value of 'file' field in Formik
    setFilesUploaded(true);
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <Field name="text" type="text" />
            <br />
            <Field name="content" as="textarea" rows="10" cols="30" />
            <br />
            <Field name="title" as="textarea" rows="10" cols="30" />
            <br />
            <Field name="date_start" type="text" />
            <br />
            <Field name="file">
              {({ field, form }) => (
                <>
                  <input
                    type="file"
                    onChange={(e) => handleFileInputChange(e, form)}
                    onBlur={field.onBlur}
                  />
                </>
              )}
            </Field>
            <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;
