const mongoose = require("mongoose");

const ClickSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  deviceType: {
    type: String,
  },
  browser: {
    type: String,
  },
  ipAddress: {
    type: String,
  },
});

const UrlSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  clicks: [ClickSchema],
});

UrlSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });

const Url = mongoose.model("Url", UrlSchema);

module.exports = Url;
