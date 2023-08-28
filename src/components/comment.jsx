import { Avatar, Button } from 'flowbite-react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Comment = ({ data }) => {
  const { comment, creator, counts, children } = data || {};

  return (
    <div className="flex gap-2 items-start">
      <Avatar alt="Avatar" img={creator.avatar} rounded className="flex-none w-14" />
      <div className="text-xs">
        <span className="font-semibold">{creator.display_name || creator.name}</span> ·{' '}
        {dayjs(comment.published).fromNow()}
        <br />
        <p className="text-sm mt-2">{comment.content}</p>
        <div className="flex gap-2 text-center flex-row mt-2 items-center">
          <Button color="gray" size="xs">
            <FaChevronUp />
          </Button>
          <b>{counts.score}</b>
          <Button color="gray" size="xs">
            <FaChevronDown />
          </Button>
        </div>
        <br />
        {children?.map((comment, index) => (
          <Comment key={`comment-${index}`} data={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
