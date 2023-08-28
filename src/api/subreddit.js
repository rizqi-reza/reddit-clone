import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from './base';
import { handleOnScroll } from '../utils/scroll';

const useSubreddit = (name, sort) => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

  const { data: dataCommunity, isFetching: isFetchingCommunity } = useQuery(['community'], () =>
    fetchData('/community', { name }),
  );

  const { isFetching: isFetchingPost } = useQuery(
    ['community-posts', page, sort],
    () => fetchData('/post/list', { limit: 10, community_name: name, page, sort }),
    {
      onSuccess: (data) => {
        setPosts([...posts, ...data.posts]);
      },
    },
  );

  useEffect(() => {
    setPosts([]);
    setPage(1);
  }, [sort]);

  useEffect(() => {
    const scroll = () =>
      handleOnScroll(isFetchingPost, () => {
        setPage(page + 1);
      });
    window.addEventListener('scroll', scroll);
    return () => window.removeEventListener('scroll', scroll);
  });

  return {
    community: dataCommunity?.community_view.community,
    posts,
    isFetchingCommunity,
    isFetchingPost,
  };
};

export default useSubreddit;
