import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name?: string;
  password: string;
  email: string;
  groups: Schema.Types.ObjectId[];
  invitations: Schema.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  groups: {
    type: [Schema.Types.ObjectId],
    ref: 'Group',
    default: [],
  },
  invitations: {
    type: [Schema.Types.ObjectId],
    ref: 'Group',
    default: [],
  },
}, { timestamps: true });

export default model<IUser>('User', userSchema);