import { Request, Response } from "express";
import Entry from "../models/Entry";
import Account from "../models/Account";

interface AuthRequest extends Request {
  userId?: string;
}

// CREATE ENTRY
export const createEntry = async (req: AuthRequest, res: Response) => {
  try {
    const { value = 0, entryType = "expense", dueDate, notes, category, accountId } = req.body;

    if (!accountId) return res.status(400).json({ message: "Account is required" });

    const entry = await Entry.create({
      value,
      entryType,
      dueDate,
      notes,
      category,
      account: accountId,
      user: req.userId,
    });

    // Update account balance correctly
    const delta = entryType === "income" ? value : -value;
    await Account.findByIdAndUpdate(accountId, { $inc: { balance: delta } });

    res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ENTRIES
export const getEntries = async (req: AuthRequest, res: Response) => {
  try {
    const page = Math.max(1, parseInt((req.query.page as string) || "1", 10));
    const limit = Math.max(1, parseInt((req.query.limit as string) || "10", 10));

    const filterQuery: any = { user: req.userId };

    const category = req.query.category as string;
    if (category) filterQuery.category = category;

    const accountId = req.query.account as string;
    if (accountId) filterQuery.account = accountId;

    let query = Entry.find(filterQuery);

    const sortBy = req.query.sortBy as string;
    const sortOptions: any = {
      "due-asc": { dueDate: 1 },
      "due-desc": { dueDate: -1 },
    };
    query = query.sort(sortOptions[sortBy] || { createdAt: -1 });

    const skip = (page - 1) * limit;

    const [total, entries] = await Promise.all([
      Entry.countDocuments(filterQuery),
      query.skip(skip).limit(limit),
    ]);

    res.json({
      entries,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE ENTRY
export const updateEntry = async (req: AuthRequest, res: Response) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });

    const oldValue = entry.value ?? 0;
    const oldType = entry.entryType;
    const oldAccountId = entry.account.toString();

    const newValue = req.body.value ?? oldValue;
    const newType = req.body.entryType ?? oldType;
    const newAccountId = req.body.accountId ?? oldAccountId;

    // Update entry
    entry.value = newValue;
    entry.entryType = newType;
    entry.dueDate = req.body.dueDate ?? entry.dueDate;
    entry.notes = req.body.notes ?? entry.notes;
    entry.category = req.body.category ?? entry.category;
    entry.account = newAccountId;
    await entry.save();

    // Adjust balances
    if (oldAccountId === newAccountId) {
      const diff = (newType === "income" ? newValue : -newValue) - (oldType === "income" ? oldValue : -oldValue);
      await Account.findByIdAndUpdate(newAccountId, { $inc: { balance: diff } });
    } else {
      // refund old account
      const refund = oldType === "income" ? -oldValue : oldValue;
      await Account.findByIdAndUpdate(oldAccountId, { $inc: { balance: refund } });

      // apply to new account
      const apply = newType === "income" ? newValue : -newValue;
      await Account.findByIdAndUpdate(newAccountId, { $inc: { balance: apply } });
    }

    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE ENTRY
export const deleteEntry = async (req: AuthRequest, res: Response) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });

    // Use ?? 0 to avoid undefined
    const delta = entry.entryType === "income" ? -(entry.value ?? 0) : entry.value ?? 0;

    await Account.findByIdAndUpdate(entry.account, { $inc: { balance: delta } });

    await entry.deleteOne();
    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

