import { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new Schema({
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password,process.env.SALT_ROUNDS);       
  }
  next();
});

export interface User extends Document {
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}