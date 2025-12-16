import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import type { Entry } from "../../services/Entry";

type Props = {
  entries: Entry[];
};

type PieData = {
  category: string;
  value: number;
};

type TrendData = {
  date: string;
  value: number;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

// format numbers like 12k, 50k, 1.2L
const formatAmount = (value: number) => {
  if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
  return value.toString();
};

// format date like 12 Dec
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

export default function ChartsSection({ entries }: Props) {
  // Doughnut data
  const expenseData = entries
    .filter((e) => e.entryType === "expense")
    .reduce<PieData[]>((acc, entry) => {
      const cat = entry.category || "Other";
      const found = acc.find((a) => a.category === cat);

      if (found) found.value += Number(entry.value);
      else acc.push({ category: cat, value: Number(entry.value) });

      return acc;
    }, []);

  // Line graph data
  const trendData = entries
    .filter((e) => e.entryType === "expense")
    .reduce<TrendData[]>((acc, entry) => {
      const date = entry.dueDate?.split("T")[0] || "Unknown";
      const found = acc.find((a) => a.date === date);

      if (found) found.value += Number(entry.value);
      else acc.push({ date, value: Number(entry.value) });

      return acc;
    }, [])
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
      {/* Doughnut Chart */}
      <PieChart width={300} height={300}>
        <Pie
          data={expenseData}
          dataKey="value"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={60}   // 👈 makes it doughnut
          label={({ value }) => formatAmount(value)}
        >
          {expenseData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => formatAmount(value)} />
        <Legend />
      </PieChart>

      {/* Line Chart */}
      <LineChart width={500} height={300} data={trendData}>
        <XAxis
          dataKey="date"
          tickFormatter={formatDate}
        />
        <YAxis
          tickFormatter={formatAmount}
        />
        <Tooltip
          labelFormatter={formatDate}
          formatter={(value: number) => formatAmount(value)}
        />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="value" />
      </LineChart>
    </div>
  );
}
