import { i, li } from "motion/react-client";
import { NavLink } from "react-router";
import HistoryCell from "./HistoryCell.jsx";
export default function LatestLogs({ history }) {
  return (
    <div className="latest-logs p-4 mt-5 glass border-2 border-gray-200  bg-gray-50 dark:border-0 shadow-2xs rounded-2xl mb-40 md:mb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-bold">Latest Activity</h1>
        <NavLink to={"/history"}>See All</NavLink>
      </div>
      <ul>
        {history && history.length > 0 ? (
          history.slice(0, 3).map((log) => (
            <li
              key={log.id}
              className="flex justify-between items-center p-4 mb-2 rounded-lg"
            >
              <p className="text-sm w-1/8">{log.date}</p>
              <p>{log.object}</p>
              <span
                className={
                  log.type == "add" ? "text-blue-500 " : "text-red-500 "
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
