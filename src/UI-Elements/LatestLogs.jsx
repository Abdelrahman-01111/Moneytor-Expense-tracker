import { NavLink } from "react-router";
export default function LatestLogs({ history }) {
  return (
    <div className="latest-logs p-2 mt-10 border-gray-200 shadow-2xs rounded-2xl mb-60 md:mb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold" aria-label="Latest activity">
          Latest Activity
        </h1>
        <NavLink
          to={"/history"}
          aria-label="See all activities"
          className="text-md text-gray-400 hover:text-gray-600 "
        >
          See All
        </NavLink>
      </div>
      <ul>
        {history && history.length > 0 ? (
          history.slice(0, 4).map((log) => (
            <li
              key={log.id}
              className="flex justify-between items-center p-4 mb-2 rounded-lg  bg-white border-2 border-gray-200 dark:border-0 dark:bg-[#212121]"
            >
              <p className="text-lg">{log.object}</p>
              <span
                className={
                  (log.type == "add" ? "text-add " : "text-remove ") +
                  "text-xl font-semibold"
                }
              >
                {log.type === "add" ? "+" : "-"}
                {log.money}$
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No recent activity</p>
        )}
      </ul>
    </div>
  );
}
