import React from 'react';
import CreateTemplate from 'components/templates/CreateTemplate';

const CreatePage: React.FC<{}> = () => {
  console.log('CreatePage レンダリング');

  return (
    <div>
      <p>CreatePage</p>
      <CreateTemplate />
    </div>
  );
};

export default CreatePage;
