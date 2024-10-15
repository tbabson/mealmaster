import mongoose from 'mongoose';

// Delivery Schema
const DeliverySchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    deliveryTime: {
        type: Date,
        required: [true, 'Delivery time is required'],
    },
    deliveryAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
    },
    deliveryStatus: {
        type: String,
        enum: ['Scheduled', 'Out for Delivery', 'Delivered', 'Failed'],
        default: 'Scheduled',
    },
    trackingNumber: {
        type: String,
        required: [true, 'Tracking number is required'],
    },
    trackingUpdates: [
        {
            status: { type: String },
            updatedAt: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });

export default mongoose.model('Delivery', DeliverySchema);
