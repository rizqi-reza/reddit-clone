import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card } from 'flowbite-react';
import { FaBurn, FaBolt, FaThumbsUp, FaRegFileArchive, FaArrowLeft } from 'react-icons/fa';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Post from '../components/post';
import Comment from '../components/comment';
import useThread from '../api/thread';

const Threads = () => {
  const { name, postId } = useParams();

  useEffect(() => {
    ClassicEditor.create(document.querySelector('#editor')).catch((error) => {
      console.error(error);
    });
  }, []);

  const sortOptions = [
    {
      name: 'New',
      title: 'New',
      icon: FaBolt,
    },
    {
      name: 'Hot',
      title: 'Hot',
      icon: FaBurn,
    },
    {
      name: 'Top',
      title: 'Top',
      icon: FaThumbsUp,
    },
    {
      name: 'Old',
      title: 'Old',
      icon: FaRegFileArchive,
    },
  ];
  const [sort, setSort] = useState(sortOptions[0]);
  const { post, comments, isFetchingComments } = useThread(postId, sort.name);

  return (
    <div className="bg-slate-200 min-h-screen">
      <div className="container max-w-screen-lg mx-auto py-6 flex flex-col gap-4">
        <Link to={`/r/${name}`}>
          <Button color="gray">
            <FaArrowLeft className="mr-2 h-5 w-5" />
            Back To List
          </Button>
        </Link>
        {post && <Post data={post} variant="card" />}
        <Card>
          <div id="editor"></div>
          <Button>Comment</Button>
        </Card>
        <Card>
          <Button.Group>
            {sortOptions.map((option, index) => (
              <Button
                key={`item-${index}`}
                color="gray"
                className={option.name === sort.name ? 'bg-blue-500 text-white' : 'bg-white'}
                onClick={() => setSort(option)}
              >
                <option.icon className="mr-3" size={20} />
                <p>{option.title}</p>
              </Button>
            ))}
          </Button.Group>

          {comments &&
            comments?.map((comment, index) => <Comment key={`comment-${index}`} data={comment} />)}

          {isFetchingComments && (
            <div className="w-full">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Threads;
