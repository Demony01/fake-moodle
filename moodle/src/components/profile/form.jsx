import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const UpdateProfileForm = props => {
  const initialValues = {
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    phoneNumber: Yup.string(),
    email: Yup.string().email('Invalid email address'),
    password: Yup.string(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const handleSubmit = (values) => {
    props.change(props.token, values.email);
    window.location.reload();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className="update-menu">
        <div className="update-text">Profile update</div>
        <div className="edit-input">
          <div className="edit-text">Phone Number</div>
          <div className="input">
            <Field type="text" name="phoneNumber" placeholder="Enter phone number" />
          </div>
        </div>
        <div className="edit-input">
          <div className="edit-text">Email</div>
          <div className="input">
            <Field type="text" name="email" placeholder="Enter email" />
          </div>
        </div>
        <div className="update-text">Change Password</div>
        <div className="edit-input">
          <div className="edit-text">Password</div>
          <div className="input">
            <Field type="text" name="password" placeholder="Enter password" />
          </div>
        </div>
        <div className="edit-input">
          <div className="edit-text">Confirm password</div>
          <div className="input">
            <Field type="text" name="confirmPassword" placeholder="Reenter password" />
          </div>
        </div>
        <div className="button-update">
          <button type="submit" className="button-update-text">
            Update
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default UpdateProfileForm;
