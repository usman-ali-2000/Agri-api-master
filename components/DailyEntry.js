const mongoose = require('mongoose');
const Counter = require('./Counter');

const dailyEntrySchema = new mongoose.Schema({
  id: { type: String, unique: true, immutable: true },

  farm: String,
  plot: String,
  season: String,
  area: String,
  stage: String,
  type: String,
  deal: String,
  time: String,
  mean: String,
  fuel: String,
  person: String,
  quantity: String,
  moga: String,
  units: String,
  email: String,
  date: String,
  year: String,
}, {
  timestamps: true
});

dailyEntrySchema.pre('save', async function (next) {
  try {
    if (!this.isNew) return next();

    const year = this.year || new Date().getFullYear();
    this.year = year;

    const counter = await Counter.findByIdAndUpdate(
      `dailyEntry-${year}`,     
      { $inc: { seq: 1 } },    
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Pad seq and set the id
    const padded = String(counter.seq).padStart(4, '0');
    this.id = `${year}-${padded}`;

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('DailyEntry', dailyEntrySchema);