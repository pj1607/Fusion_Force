import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['doctor', 'user'], required: true },
    name: {
      type: String,
      trim: true,
      required: [true, 'Username is required'],
      minlength: 4
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      index: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters']
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
