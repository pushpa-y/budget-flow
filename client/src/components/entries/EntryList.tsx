import EntryCard from "../entries/EntryCard";
import type { Entry } from "../../services/Entry";
import type { Account } from "../../services/accounts";

type Props = {
  entries: Entry[];
  accounts: Account[]; 
  onEdit: (t: Entry) => void;
  onDelete: (id: string) => void;
};

export default function EntryList({ entries, accounts, onEdit, onDelete }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {entries.map((entry) => (
        <EntryCard
          key={entry._id}
          entry={entry}
          accounts={accounts}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
