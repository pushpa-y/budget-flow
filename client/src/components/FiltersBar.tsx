
type Props = {
  sortBy: string;
  setSortBy: (s: string) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  categories?: string[];
};

export default function FiltersBar({sortBy, setSortBy, categoryFilter, setCategoryFilter, categories }: Props) {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-4">
      <div className="flex gap-3 w-full sm:w-auto">
        <select className="border p-2 rounded" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="due-asc">Due (old→new)</option>
          <option value="due-desc">Due (new→old)</option>
        </select>

        <select className="border p-2 rounded" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All categories</option>
          {(categories || ["work","personal","shopping","finance","health"]).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
