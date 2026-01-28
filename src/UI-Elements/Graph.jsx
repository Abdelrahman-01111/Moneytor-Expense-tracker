import {
  Line,
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
} from "recharts";
import { useContext } from "react";
import { ThemeContext } from "../Contexts";
export default function Graph({ data }) {
  const { theme } = useContext(ThemeContext);
  const strokeColor = theme === "dark" ? "white" : "#333";
  const gridColor = theme === "dark" ? "#ccc" : "#ddd";

  return (
    <div className="w-full glass border-2 border-gray-200 dark:border-0 shadow-2xs rounded-2xl mt-5 p-3 min-w-0">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid
            stroke={gridColor}
            strokeOpacity={0.2}
            horizontal
            vertical={false}
          />
          <XAxis dataKey="name" stroke={strokeColor} tick={{ fontSize: 12 }} />

          <Line
            type="monotone"
            dataKey="uv"
            stroke={strokeColor}
            strokeOpacity={1}
            strokeWidth={3}
            dot={{ r: 1 }}
            activeDot={{ r: 1 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
