import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  group: Schema.Types.ObjectId;
  creator: Schema.Types.ObjectId;
  description: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  imageUrl?: string;
}

const taskSchema: Schema<ITask> = new Schema<ITask>({
    title: {
      type: String,
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
    },
  }, { timestamps: true });

export default model<ITask>('Task', taskSchema);
