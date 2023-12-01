const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accountNumber: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  accountType: {
    type: String,
    enum: ["Tiền mặt", "Tiền tài khoản"],
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
