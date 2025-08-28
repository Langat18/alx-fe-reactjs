import { useState } from 'react';


const Formik = ({ initialValues, validate, onSubmit, children }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = () => {
    const formErrors = validate(values);
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setErrors({});
    onSubmit(values);
  };

  return children({
    values,
    errors,
    handleChange,
    handleSubmit
  });
};

const FormikForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedUsername, setSubmittedUsername] = useState('');

  const initialValues = {
    username: '',
    email: '',
    password: ''
  };
  const validateForm = (formData) => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (formData) => {
    setSubmittedUsername(formData.username);
    setIsSubmitted(true);
    
    console.log('Form submitted:', formData);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setSubmittedUsername('');
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
        <div className="text-center">
          <div className="text-green-600 text-2xl mb-2">✓</div>
          <h2 className="text-green-800 text-lg font-semibold">Registration Successful!</h2>
          <p className="text-green-600 mt-2">Welcome, {submittedUsername}!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h2>
      
      {/* Using Formik wrapper */}
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Register
            </button>
          </div>
        )}
      </Formik>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>All fields are required</p>
      </div>
    </div>
  );
};

export default FormikForm;