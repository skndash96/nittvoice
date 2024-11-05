import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const UPLOAD_PRESETS = {
    image: {
        folder: 'nittvoice/images',
        allowed_formats: ['jpg', 'png', 'webp'],
        transformation: [
            { width: 1000, crop: 'limit' },
            { quality: 'auto' }
        ]
    },
    video: {
        folder: 'nittvoice/videos',
        allowed_formats: ['mp4', 'webm'],
        resource_type: 'video',
        transformation: [
            { width: 720, crop: 'limit' },
            { quality: 'auto' }
        ],
        chunk_size: 6000000 // 6MB chunks for videos
    }
};

export { cloudinary, UPLOAD_PRESETS };