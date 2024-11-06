import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide your full name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  shoppingLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShoppingList',
    },
  ],
  reminders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reminder',
    },
  ],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, { timestamps: true });

UserSchema.methods.toJSON = function () {
  let obj = this.toObject()
  delete obj.password
  return obj
}


// // Password hash middleware
// UserSchema.pre('save', async function () {
//   if (!this.isModified('password')) return;
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// // Method to compare passwords
// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

export default mongoose.model('User', UserSchema);
