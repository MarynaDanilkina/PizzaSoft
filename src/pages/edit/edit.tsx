import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div>
      <button onClick={goBack}>Назад</button>
      <p>{id}</p>
    </div>
  );
};

export default EditPage;
