import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    endpoint: {
        type: String,
        required: true
    },
    p256dh: {
        type: String,
        required: true
    },
    auth: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;