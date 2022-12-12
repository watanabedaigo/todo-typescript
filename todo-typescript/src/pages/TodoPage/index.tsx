import React, { useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.scss';

const TodoPage: React.FC<{}> = () => {
  let url: string = 'http://localhost:3000/todos';

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <p className={styles.test}>todo page</p>;
};

export default TodoPage;
