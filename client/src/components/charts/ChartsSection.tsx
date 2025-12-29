import { useState, useMemo } from "react";
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
  ResponsiveContainer,
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
type Props = { entries: Entry[] };
type PieData = { category: string; value: number };
type TrendData = { date: string; value: number };

const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4"];
const formatAmount = (value: number) =>
  value >= 100000
    ? `${(value / 100000).toFixed(1)}L`
    : value >= 1000
    ? `${(value / 1000).toFixed(0)}k`
    : value.toString();
const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

function useAnimatedNumber(value: number, duration = 600) {
  const [animated, setAnimated] = useState(0);
  useMemo(() => {
    let start = 0;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setAnimated(value);
        clearInterval(timer);
      } else setAnimated(Math.round(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return animated;
}

export default function ChartsSection({ entries }: Props) {
  const now = new Date();

  /* ---------- LAST 24 MONTHS ---------- */
  const monthsList = useMemo(() => {
    const months = [];
    for (let i = 0; i < 24; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        month: d.getMonth(),
        year: d.getFullYear(),
        label: d.toLocaleString("en-IN", { month: "short", year: "numeric" }),
      });
    }
    return months;
  }, [now]);

  const [selectedMonth, setSelectedMonth] = useState(monthsList[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  /* ---------- FILTERED ENTRIES ---------- */
  const filteredEntries = useMemo(
    () =>
      entries.filter(
        (e) =>
          e.entryType === "expense" &&
          e.dueDate &&
          new Date(e.dueDate).getMonth() === selectedMonth.month &&
          new Date(e.dueDate).getFullYear() === selectedMonth.year
      ),
    [entries, selectedMonth]
  );

  /* ---------- DOUGHNUT DATA ---------- */
  const expenseData = useMemo<PieData[]>(
    () =>
      filteredEntries.reduce((acc, entry) => {
        const mainCategory =
          CATEGORY_MAP[entry.category as keyof typeof CATEGORY_MAP]?.parent ??
          "Other";
        const found = acc.find((a) => a.category === mainCategory);
        if (found) found.value += Number(entry.value);
        else acc.push({ category: mainCategory, value: Number(entry.value) });
        return acc;
      }, [] as PieData[]),
    [filteredEntries]
  );

  const totalExpense = expenseData.reduce((s, c) => s + c.value, 0);
  const animatedTotal = useAnimatedNumber(totalExpense);

  const lastMonth = new Date(selectedMonth.year, selectedMonth.month - 1, 1);
  const lastMonthTotal = useMemo(
    () =>
      entries
        .filter((e) => e.entryType === "expense" && e.dueDate)
        .reduce((sum, e) => {
          const d = new Date(e.dueDate!);
          if (
            d.getMonth() === lastMonth.getMonth() &&
            d.getFullYear() === lastMonth.getFullYear()
          )
            return sum + Number(e.value);
          return sum;
        }, 0),
    [entries, lastMonth]
  );

  const percentageChange =
    lastMonthTotal > 0
      ? ((totalExpense - lastMonthTotal) / lastMonthTotal) * 100
      : 0;

  /* ---------- TREND DATA ---------- */
  const trendData = useMemo(
    () =>
      filteredEntries
        .reduce<TrendData[]>((acc, entry) => {
          const date = entry.dueDate!.split("T")[0];
          const found = acc.find((a) => a.date === date);
          if (found) found.value += Number(entry.value);
          else acc.push({ date, value: Number(entry.value) });
          return acc;
        }, [])
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
    [filteredEntries]
  );

  /* ---------- BAR DATA ---------- */
  const barData = useMemo(() => {
    const { month, year } = selectedMonth;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const map = new Map(
      filteredEntries.map((e) => [e.dueDate!.split("T")[0], Number(e.value)])
    );
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month, i + 1);
      const key = date.toISOString().split("T")[0];
      return { date: key, value: map.get(key) ?? 0 };
    });
  }, [filteredEntries, selectedMonth]);

  /* ---------- EMPTY STATE ---------- */
  if (filteredEntries.length === 0) {
    return (
      <>
        <MonthSelector
          style={{ display: "flex", gap: "8px", position: "relative" }}
        >
          {/* This Month & Last Month */}
          {monthsList.slice(0, 2).map((m) => (
            <MonthButton
              key={m.label}
              $active={m.label === selectedMonth.label}
              onClick={() => setSelectedMonth(m)}
            >
              {m.label}
            </MonthButton>
          ))}

          {/* Dropdown container */}
          <div style={{ position: "relative" }}>
            <MonthButton $active={false} onClick={() => setDropdownOpen(!dropdownOpen)}>⋯</MonthButton>

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  background: "#fff",
                  border: "1px solid #ccc",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  zIndex: 100,
                  minWidth: 120,
                }}
              >
                {monthsList.slice(2).map((m) => (
                  <div
                    key={m.label}
                    style={{
                      padding: 6,
                      cursor: "pointer",
                      background:
                        m.label === selectedMonth.label ? "#eee" : "#fff",
                    }}
                    onClick={() => {
                      setSelectedMonth(m);
                      setDropdownOpen(false);
                    }}
                  >
                    {m.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </MonthSelector>

        <EmptyState>📭 No entries yet</EmptyState>
      </>
    );
  }

  return (
    <>
      <MonthSelector>
        {monthsList.slice(0, 2).map((m) => (
          <MonthButton
            key={m.label}
            $active={m.label === selectedMonth.label}
            onClick={() => setSelectedMonth(m)}
          >
            {m.label}
          </MonthButton>
        ))}
        <MonthButton
          $active={false}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          ⋯
        </MonthButton>
        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              background: "#fff",
              border: "1px solid #ccc",
              marginTop: 4,
            }}
          >
            {monthsList.slice(2).map((m) => (
              <div
                key={m.label}
                style={{
                  padding: 6,
                  cursor: "pointer",
                  background: m.label === selectedMonth.label ? "#eee" : "#fff",
                }}
                onClick={() => {
                  setSelectedMonth(m);
                  setDropdownOpen(false);
                }}
              >
                {m.label}
              </div>
            ))}
          </div>
        )}
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
            <text
              x={150}
              y={110}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={20}
              fontWeight={600}
              fill="#111827"
            >
              ₹{formatAmount(animatedTotal)}
            </text>
            <text
              x={150}
              y={130}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={12}
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
        <ChartCard className="md:col-span-2">
          <ChartTitle>Daily Expenses</ChartTitle>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} barCategoryGap={12}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis
                dataKey="date"
                interval={0}
                tickFormatter={formatDate}
                tick={{ fontSize: 9, fill: "#6B7280" }}
              />
              <YAxis />
              <Tooltip formatter={(v: number) => `₹${v}`} />
              <Bar
                dataKey="value"
                fill="#22C55E"
                barSize={22}
                background={{ fill: "#E5E7EB" }}
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartsGrid>
    </>
  );
}
