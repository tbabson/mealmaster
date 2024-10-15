import Delivery from '../models/DeliveryModel';
import { StatusCodes } from 'http-status-codes';

// @desc    Update delivery tracking status
// @route   PUT /api/delivery/:id/tracking
export const updateTrackingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const delivery = await Delivery.findById(id);
        if (!delivery) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Delivery not found' });
        }

        // Update the tracking status
        delivery.trackingUpdates.push({ status });
        delivery.deliveryStatus = status;
        await delivery.save();

        res.status(StatusCodes.OK).json({ delivery });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// @desc    Get real-time delivery tracking updates
// @route   GET /api/delivery/:id/tracking
export const getTrackingUpdates = async (req, res) => {
    const { id } = req.params;

    try {
        const delivery = await Delivery.findById(id);
        if (!delivery) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Delivery not found' });
        }

        res.status(StatusCodes.OK).json({ trackingUpdates: delivery.trackingUpdates });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
