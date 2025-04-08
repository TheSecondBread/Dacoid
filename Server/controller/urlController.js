const Url = require("../models/url");
const { v4: uuidv4 } = require("uuid");

const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, customAlias, expiryDate, name } = req.body;
    const userId = req.user._id;

    const shortUrl = customAlias || uuidv4().slice(0, 6);

    const existing = await Url.findOne({ shortUrl });
    if (existing) {
      return res.status(400).json({ error: "Alias already in use" });
    }

    const newUrl = new Url({
      userId,
      originalUrl,
      shortUrl,
      expiryDate,
      name,
    });

    await newUrl.save();
    res.status(201).json({ message: "Short URL created", shortUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const redirectShortUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    if (url.expiryDate && new Date() > url.expiryDate) {
      return res.status(410).json({ error: "URL has expired" });
    }

    const userAgent = req.headers["user-agent"] || "";
    const deviceType = /mobile/i.test(userAgent) ? "Mobile" : "Desktop";
    const browser =
      userAgent.match(/(Firefox|Chrome|Safari|Edge)/i)?.[0] || "Other";
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    url.clickCount += 1;
    url.clicks.push({
      deviceType,
      browser,
      ipAddress: ip,
    });

    await url.save();
    res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserUrls = async (req, res) => {
  try {
    const userId = req.user._id;
    const urls = await Url.find({ userId }).sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getSingleUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const userId = req.user._id;

    const url = await Url.findOne({ shortUrl, userId });
    if (!url) {
      return res.status(404).json({ error: "URL not found or access denied" });
    }

    res.json(url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createShortUrl,
  redirectShortUrl,
  getUserUrls,
  getSingleUrl,
};
