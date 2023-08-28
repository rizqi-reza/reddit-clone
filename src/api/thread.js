import { useQuery } from '@tanstack/react-query';
import { fetchData } from './base';

const useThread = (postId, sort) => {
  const { data: dataPost, isFetching: isFetchingPost } = useQuery(['post'], () =>
    fetchData('/post', { id: postId }),
  );

  const { data: dataComments, isFetching: isFetchingComments } = useQuery(
    ['post-comments', sort],
    () => fetchData('/comment/list', { max_depth: 9, post_id: postId, sort }),
  );

  const normalizeComments = () => {
    if (!dataComments) return [];

    return dataComments?.comments.reduce(
      (acc, curr) => {
        let currDepth = 0;
        const targetDepth = Math.floor((curr.comment.path.split('.').length - 1) / 2);
        let obj = acc;
        while (currDepth <= targetDepth) {
          if (currDepth == targetDepth)
            obj?.children.push({ ...curr, path: curr.comment.path, children: [] });
          else obj = obj?.children.at(-1);
          currDepth++;
        }

        return acc;
      },
      { children: [] },
    ).children;
  };

  return {
    post: dataPost?.post_view,
    comments: normalizeComments(),
    isFetchingPost,
    isFetchingComments,
  };
};

export default useThread;
