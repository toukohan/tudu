import { Schema, model, Document } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  owner: Schema.Types.ObjectId;
  members: Schema.Types.ObjectId[];
  tasks: Schema.Types.ObjectId[];
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const groupSchema: Schema<IGroup> = new Schema<IGroup>({
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    tasks: {
      type: [Schema.Types.ObjectId],
      ref: 'Task',
    },
  }, { timestamps: true });

export default model<IGroup>('Group', groupSchema);