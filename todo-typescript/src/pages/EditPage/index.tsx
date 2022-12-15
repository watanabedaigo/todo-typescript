import React from 'react';
import { Link } from 'react-router-dom';
import EditTemplate from 'components/templates/EditTemplate';

const EditPage: React.FC<{}> = () => {
  console.log('EditPage レンダリング');

  return (
    <div>
      <EditTemplate />
    </div>
  );
};

export default EditPage;
