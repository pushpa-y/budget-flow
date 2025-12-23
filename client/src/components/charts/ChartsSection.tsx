import { useState, useEffect } from "react";
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
  BarChart,
  Bar,
} from "recharts";
import type { Entry } from "../../services/Entry";
import {
  ChartsGrid,
  ChartCard,
  MonthSelector,
  MonthButton,
  EmptyState,
  ChartTitle,
} from "../../styles/ChartsSection";
import { CATEGORY_MAP } from "../../constants/categories";

/* TYPES */
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

/* CONSTANTS */
const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4"];

/* HELPERS */
const formatAmount = (value: number) => {
  if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
  return value.toString();
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

/* SIMPLE ANIMATED NUMBER HOOK */
function useAnimatedNumber(value: number, duration = 600) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setAnimated(value);
        clearInterval(timer);
      } else {
        setAnimated(Math.round(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return animated;
}

export default function ChartsSection({ entries }: Props) {
  const [monthFilter, setMonthFilter] = useState<"this" | "last">("this");

  /* MONTH FILTER */
  const isInSelectedMonth = (dateStr?: string) => {
    if (!dateStr) return false;

    const date = new Date(dateStr);
    const now = new Date();

    const targetMonth =
      monthFilter === "this" ? now.getMonth() : now.getMonth() - 1;

    return (
      date.getMonth() === targetMonth &&
      date.getFullYear() === now.getFullYear()
    );
  };

  const filteredEntries = entries.filter(
    (e) => e.entryType === "expense" && isInSelectedMonth(e.dueDate)
  );

  /* ---------- DOUGHNUT DATA (SAFE) ---------- */
  const expenseData: PieData[] = filteredEntries.reduce((acc, entry) => {
    const catKey = entry.category || "other";
    const mainCategory =
      CATEGORY_MAP[catKey as keyof typeof CATEGORY_MAP]?.parent ?? "Other";
    const found = acc.find((a) => a.category === mainCategory);
    if (found) found.value += Number(entry.value);
    else acc.push({ category: mainCategory, value: Number(entry.value) });

    return acc;
  }, [] as PieData[]);

  const totalExpense = expenseData.reduce((s, c) => s + c.value, 0);
  /* HOOK MUST ALWAYS RUN */
  const animatedTotal = useAnimatedNumber(totalExpense);

  /* ---------- LAST MONTH TOTAL ---------- */
  const lastMonthTotal = entries
    .filter((e) => e.entryType === "expense")
    .filter((e) => {
      if (!e.dueDate) return false;
      const d = new Date(e.dueDate);
      const now = new Date();
      return (
        d.getMonth() === now.getMonth() - 1 &&
        d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((s, e) => s + Number(e.value), 0);

  const percentageChange =
    lastMonthTotal > 0
      ? ((totalExpense - lastMonthTotal) / lastMonthTotal) * 100
      : 0;

  /* ---------- TREND DATA ---------- */
  const trendData = filteredEntries
    .reduce<TrendData[]>((acc, entry) => {
      const date = entry.dueDate?.split("T")[0] || "Unknown";
      const found = acc.find((a) => a.date === date);

      if (found) found.value += Number(entry.value);
      else acc.push({ date, value: Number(entry.value) });

      return acc;
    }, [])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  /* ---------- EMPTY STATE ---------- */
  if (filteredEntries.length === 0) {
    return (
      <>
        <MonthSelector>
          <MonthButton
            $active={monthFilter === "this"}
            onClick={() => setMonthFilter("this")}
          >
            This Month
          </MonthButton>
          <MonthButton
            $active={monthFilter === "last"}
            onClick={() => setMonthFilter("last")}
          >
            Last Month
          </MonthButton>
        </MonthSelector>

        <EmptyState>📭 No expenses yet</EmptyState>
      </>
    );
  }

  return (
    <>
      <MonthSelector>
        <MonthButton
          $active={monthFilter === "this"}
          onClick={() => setMonthFilter("this")}
        >
          This Month
        </MonthButton>
        <MonthButton
          $active={monthFilter === "last"}
          onClick={() => setMonthFilter("last")}
        >
          Last Month
        </MonthButton>
      </MonthSelector>

      <ChartsGrid>
        {/* DOUGHNUT */}
        <ChartCard>
          <ChartTitle>Expenses by Category</ChartTitle>

          <PieChart width={300} height={320}>
            <Pie
              data={expenseData}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={110}
              innerRadius={70}
            >
              {expenseData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>

            {/* CENTER TEXT */}
            <text
              x={150}
              y={110}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="20"
              fontWeight="600"
              fill="#111827"
            >
              ₹{formatAmount(animatedTotal)}
            </text>

            <text
              x={150}
              y={130}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fill={percentageChange >= 0 ? "#16a34a" : "#dc2626"}
            >
              {percentageChange >= 0 ? "▲" : "▼"}{" "}
              {Math.abs(percentageChange).toFixed(1)}% vs last month
            </text>

            <Tooltip formatter={(v: number) => formatAmount(v)} />
            <Legend iconType="circle" />
          </PieChart>
        </ChartCard>

        {/* LINE */}
        <ChartCard>
          <ChartTitle>Spending Trend</ChartTitle>

          <LineChart width={420} height={280} data={trendData}>
            <XAxis dataKey="date" tickFormatter={formatDate} />
            <YAxis tickFormatter={formatAmount} />
            <Tooltip formatter={(v: number) => formatAmount(v)} />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366F1"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartCard>

        {/* BAR */}
        <ChartCard>
          <ChartTitle>Daily Expenses</ChartTitle>

          <BarChart width={420} height={280} data={trendData}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="date" tickFormatter={formatDate} />
            <YAxis tickFormatter={formatAmount} />
            <Tooltip formatter={(v: number) => formatAmount(v)} />
            <Bar dataKey="value" fill="#22C55E" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartCard>
      </ChartsGrid>
    </>
  );
}
