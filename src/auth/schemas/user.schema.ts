import { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new Schema({
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
UserSchema.pre('save', async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, saltRounds);     
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