import multer from "multer";

export const SIZE_LIMITS = {
    image: 5 * 1024 * 1024,     // 5MB
    video: 100 * 1024 * 1024    // 100MB
};

export const fileFilters = {
    image: (mimetype: string) => mimetype.startsWith('image/'),
    video: (mimetype: string) => mimetype.startsWith('video/')
};

const storage = multer.memoryStorage();

export const uploadMiddleware = multer({
    storage
});