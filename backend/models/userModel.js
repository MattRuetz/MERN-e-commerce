import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// Make a schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Schema method to decrypt and compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// middleware applied before save to db
// NOTE: cannot use arrow function in order to user 'this'
userSchema.pre("save", async function (next) {
  // if no password was sent, skip encrypt (break)
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Make a model from the schema
const User = mongoose.model("User", userSchema);

// Export the model
export default User;
