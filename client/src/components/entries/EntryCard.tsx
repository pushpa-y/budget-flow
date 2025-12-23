import { useState, useEffect } from "react";
import type { Entry as T } from "../../services/Entry";
import type { Account } from "../../services/accounts";
import {
  Card,
  Info,
  Row,
  LeftColumn,
  RightColumn,
  AmountDate,
  CategoryRow,
  MenuButtonWrapper,
} from "../../styles/EntryCard";
import { CATEGORY_MAP } from "../../constants/categories";

type Props = {
  entry: T;
  accounts: Account[];
  onEdit: (t: T) => void;
  onDelete: (id: string) => void;
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

export default function EntryCard({
  entry,
  accounts,
  onEdit,
  onDelete,
}: Props) {
  const [openMenu, setOpenMenu] = useState(false);

  // --- Determine account name ---
  const accountName = accounts.find((acc) => acc._id === entry.account)?.name;

  // --- Category info ---
  const category = entry.category
    ? CATEGORY_MAP[entry.category as keyof typeof CATEGORY_MAP]
    : undefined;
  const categoryLabel = category?.label ?? "Other";
  const categoryEmoji = category?.emoji ?? "📦";

  useEffect(() => {
    const close = () => setOpenMenu(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <Card
      className="glass"
      initial={{ y: 6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
    >
      <Info>
        <Row>
          {/* LEFT SIDE */}
          <LeftColumn>
            <CategoryRow>
              <span>{categoryEmoji}</span>
              <span className="bold">{categoryLabel}</span>
            </CategoryRow>
            {accountName && <div className="muted">Account: {accountName}</div>}
            {entry.notes && <div className="muted">{entry.notes}</div>}
          </LeftColumn>

          {/* RIGHT SIDE */}
          <RightColumn>
            <AmountDate>
              <div
                className={`amount ${
                  entry.entryType === "income"
                    ? "income"
                    : entry.entryType === "expense"
                    ? "expense"
                    : "other"
                }`}
              >
                ₹{entry.value}
              </div>
              <div className="muted">{formatDate(entry.dueDate)}</div>
            </AmountDate>

            <MenuButtonWrapper>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(!openMenu);
                }}
              >
                ⋮
              </button>

              {openMenu && (
                <div className="menu">
                  <div onClick={() => onEdit(entry)}>Edit</div>
                  <div
                    className="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(false);
                      onDelete(entry._id);
                    }}
                  >
                    Delete
                  </div>
                </div>
              )}
            </MenuButtonWrapper>
          </RightColumn>
        </Row>
      </Info>
    </Card>
  );
}
