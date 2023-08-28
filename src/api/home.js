import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from './base';
import { handleOnScroll } from '../utils/scroll';

const useHome = () => {
  const [page, setPage] = useState(1);
  const [communities, setCommunities] = useState([]);

  const { isFetching } = useQuery(
    ['list', page],
    () => fetchData('/community/list', { limit: 15, page, show_nsfw: false, sort: 'TopMonth' }),
    {
      onSuccess: (data) => {
        setCommunities([...communities, ...data.communities]);
      },
    },
  );

  useEffect(() => {
    const scroll = () =>
      handleOnScroll(isFetching, () => {
        setPage(page + 1);
      });
    window.addEventListener('scroll', scroll);
    return () => window.removeEventListener('scroll', scroll);
  });

  return {
    communities,
    isFetching,
  };
};

export default useHome;
