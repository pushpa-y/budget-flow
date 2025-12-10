import mongoose, { Schema, Document } from "mongoose";

export interface IEntry extends Document {
  value?: number;
  entryType: string;
  dueDate?: Date;
  notes?: string;
  category?: string;
  account: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const EntrySchema = new Schema<IEntry>(
  {
    value: { type: Number, default: 0 },

    entryType:{type: String, default: "expense"},

    dueDate: { type: Date, default: Date.now },

    notes: { type: String, default: "" },

    category: { type: String, default: "" },

    account: { type: Schema.Types.ObjectId, ref: "Account", required: true },

    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IEntry>("Entry", EntrySchema);
