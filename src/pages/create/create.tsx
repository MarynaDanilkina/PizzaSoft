import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div>
      <button onClick={goBack}>Назад</button>
    </div>
  );
};

export default CreatePage;
