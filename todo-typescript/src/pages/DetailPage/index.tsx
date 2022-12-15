import React from 'react';
import { Link } from 'react-router-dom';
import DetailTemplate from 'components/templates/DetailTemplate';

const DetailPage: React.FC<{}> = () => {
  console.log('DetailPage レンダリング');

  return (
    <div>
      <DetailTemplate />
    </div>
  );
};

export default DetailPage;
