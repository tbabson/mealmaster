import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Comment content is required'],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Comment must belong to a user'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    content: {
        type: String,
        required: [true, 'Blog content is required'],
    },
    featuredImage: {
        type: String,
        required: [true, 'Featured image is required'],
    },
    cloudinaryId: {
        type: String,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Blog must have an author'],
    },
    category: {
        type: String,
        required: [true, 'Blog category is required'],
        enum: ['Recipes', 'Nutrition', 'Cooking Tips', 'Health', 'Other'],
    },
    tags: [{
        type: String,
    }],
    comments: [CommentSchema],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'published',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

export default mongoose.model('Blog', BlogSchema);