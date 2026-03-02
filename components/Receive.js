const mongoose = require('mongoose');
const Counter = require('./Counter');

const ReceiveSchema = new mongoose.Schema({
    id: { type: String, unique: true, immutable: true },
    email: String,
    date: String,
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'supplierFarm', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: Number,
    year: String,
}, {
    timestamps: true
});

ReceiveSchema.pre('save', async function (next) {
    try {
        if (!this.isNew) return next();

        const year = this.year || new Date().getFullYear();
        this.year = year;

        const counter = await Counter.findByIdAndUpdate(
            `receiveEntry-${year}`,
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

module.exports = mongoose.model('ReceiveEntry', ReceiveSchema);