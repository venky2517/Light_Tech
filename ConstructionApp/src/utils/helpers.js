export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  
  export const calculateHours = (inTime, outTime) => {
    const start = new Date(`1970-01-01T${inTime}`);
    const end = new Date(`1970-01-01T${outTime}`);
    return (end - start) / (1000 * 60 * 60);
  };
  
  export const validateTimeCard = (data) => {
    const errors = {};
    if (!data.date) errors.date = 'Date is required';
    if (!data.in_time) errors.in_time = 'In time is required';
    if (!data.out_time) errors.out_time = 'Out time is required';
    if (!data.project_photo) errors.project_photo = 'Project photo is required';
    return errors;
  };
  