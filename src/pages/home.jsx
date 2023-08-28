import { useNavigate } from 'react-router-dom';

import useHome from '../api/home';
import { roundThousand } from '../utils/number';

const Home = () => {
  const navigate = useNavigate();
  const { communities, isFetching } = useHome();
  const classTh =
    'w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left';
  const classTd =
    'border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400';

  return (
    <div className="container mx-auto p-12">
      <h1 className="font-bold text-lg">List of Subreddit</h1>
      <table className="border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
        <thead className="bg-slate-50 dark:bg-slate-700">
          <tr>
            <th className={classTh}>Name</th>
            <th className={classTh}>Subscribers</th>
            <th className={classTh}>User/month</th>
            <th className={classTh}>Posts</th>
            <th className={classTh}>Comments</th>
          </tr>
        </thead>
        <tbody>
          {communities?.map(({ community, counts }, index) => (
            <tr
              key={`subreddit-${index}`}
              className="hover:bg-slate-200 cursor-pointer"
              onClick={() => navigate(`r/${community.name}`)}
            >
              <td className={`${classTd} flex gap-2`}>
                <img src={community.icon} width={24} height={24} />
                {community.title}
              </td>
              <td className={classTd}>{roundThousand(counts.subscribers)}</td>
              <td className={classTd}>{roundThousand(counts.users_active_month)}</td>
              <td className={classTd}>{roundThousand(counts.posts)}</td>
              <td className={classTd}>{roundThousand(counts.comments)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isFetching && <p className={classTd}>Loading...</p>}
    </div>
  );
};

export default Home;
