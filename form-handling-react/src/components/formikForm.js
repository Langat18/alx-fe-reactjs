
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const FormikForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form submitted:', values);
    
 
    setTimeout(() => {
      setSubmittedData(values);
      setIsSubmitted(true);
      setSubmitting(false);
      
   
      resetForm();
      
 
      setTimeout(() => {
        setIsSubmitted(false);
        setSubmittedData(null);
      }, 3000);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
        <div className="text-center">
          <div className="text-green-600 text-3xl mb-2">🎉</div>
          <h2 className="text-green-800 text-lg font-semibold">Registration Successful!</h2>
          <p className="text-green-600 mt-2">Welcome, {submittedData?.username}!</p>
          <p className="text-gray-600 text-sm mt-1">Registered with: {submittedData?.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Register with Formik
      </h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.username && touched.username ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <ErrorMessage name="username" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Enhanced validation with Formik & Yup</p>
      </div>
    </div>
  );
};

export default FormikForm;