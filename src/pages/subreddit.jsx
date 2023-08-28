import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'flowbite-react';
import { FaBurn, FaBolt, FaThumbsUp, FaArrowLeft } from 'react-icons/fa';
import { MdOutlineViewAgenda, MdOutlineViewStream, MdOutlineViewHeadline } from 'react-icons/md';
import EmptyImage from '../components/emptyImage';
import Post from '../components/post';
import useSubreddit from '../api/subreddit';

const Subreddit = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  const sortOptions = [
    {
      name: 'Hot',
      title: 'Hot',
      icon: FaBurn,
    },
    {
      name: 'New',
      title: 'New',
      icon: FaBolt,
    },
    {
      name: 'TopAll',
      title: 'Top',
      icon: FaThumbsUp,
    },
  ];
  const [sort, setSort] = useState(sortOptions[0]);

  const viewOptions = [
    {
      name: 'card',
      title: 'Card',
      icon: MdOutlineViewAgenda,
    },
    {
      name: 'classic',
      title: 'Classic',
      icon: MdOutlineViewStream,
    },
    {
      name: 'compact',
      title: 'Compact',
      icon: MdOutlineViewHeadline,
    },
  ];
  const [view, setView] = useState(viewOptions[0]);
  const { community, posts, isFetchingCommunity, isFetchingPost } = useSubreddit(name, sort.name);

  return (
    <div className="bg-slate-200 min-h-screen">
      <div className="container max-w-screen-lg mx-auto py-6 flex flex-col gap-4">
        <Link to="/">
          <Button color="gray">
            <FaArrowLeft className="mr-2 h-5 w-5" />
            Back To List
          </Button>
        </Link>
        {isFetchingCommunity ? (
          <Card>
            <EmptyImage />
            <div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </Card>
        ) : (
          <Card>
            <a href="#">
              {community.banner ? (
                <img
                  className="rounded-t-lg w-full overflow-hidden max-h-60 object-cover"
                  src={community.banner}
                  alt={community.name}
                />
              ) : (
                <EmptyImage />
              )}
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {community.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {community.description}
              </p>
            </div>
          </Card>
        )}
        <Card>
          <div className="flex justify-between">
            <div className="flex items-center gap-2 ">
              <b>Sort</b>
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
            </div>
            <div className="flex items-center gap-2 ">
              <b>View</b>
              <Dropdown label={<view.icon size={20} />} color="gray">
                {viewOptions.map((option, index) => (
                  <Dropdown.Item
                    key={`item-${index}`}
                    icon={option.icon}
                    className={option.name === view.name ? 'bg-blue-500 text-white' : 'bg-white'}
                    onClick={() => setView(option)}
                  >
                    {option.title}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
          </div>
        </Card>

        <div className={`flex flex-col ${view.name === 'card' ? 'gap-3' : ''}`}>
          {posts?.map((post, index) => (
            <Post
              key={`post-${index}`}
              data={post}
              variant={view.name}
              onClick={() => navigate(`comments/${post.post.id}`)}
            />
          ))}
        </div>
        {isFetchingPost && (
          <Card>
            <div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Subreddit;
