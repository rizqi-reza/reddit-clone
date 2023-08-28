import { Button } from 'flowbite-react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Post = ({ data, variant, onClick }) => {
  const { post, creator, counts } = data || {};
  const isCard = variant === 'card';
  const isCompact = variant === 'compact';

  return (
    <div
      className={`bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 ${
        isCard ? 'rounded-lg' : ''
      } ${!!onClick && 'cursor-pointer'}`}
      onClick={onClick}
    >
      <div className="flex gap-4">
        <div
          className={`bg-slate-100 flex gap-1 text-center ${
            isCompact ? 'flex-row w-48 p-2 justify-between items-center' : 'flex-col p-5'
          } ${isCard ? 'rounded-l-lg' : ''}`}
        >
          <Button color="gray" size="sm">
            <FaChevronUp />
          </Button>
          <b>{counts.score}</b>
          <Button color="gray" size="sm">
            <FaChevronDown />
          </Button>
        </div>
        {variant === 'classic' && <img src={post.thumbnail_url} className="w-32 py-5" />}
        <div
          className={`flex gap-1 items-start ${
            isCompact ? 'flex-row justify-between items-center w-full p-2' : 'flex-col p-5'
          }`}
        >
          <div className="flex flex-col">
            {!isCard && <h2 className="font-semibold">{post.name}</h2>}
            <p className="text-xs">
              Posted by {creator.display_name || creator.name} {dayjs(post.published).fromNow()}
            </p>
            {isCard && <h2 className="font-semibold">{post.name}</h2>}
            {isCard && <img src={post.thumbnail_url} className="max-w-lg mb-4" />}
          </div>
          {onClick ? (
            <Button color="gray" readOnly>
              <BiCommentDetail className="mr-2" size={24} />
              {counts.comments} {!isCompact && 'Comments'}
            </Button>
          ) : (
            <div className="flex gap-2 items-center border border-gray-200 p-2 rounded-md">
              <BiCommentDetail size={24} />
              {counts.comments} {!isCompact && 'Comments'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
