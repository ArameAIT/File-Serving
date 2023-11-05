import fs from "node:fs/promises"

export const isFileExists = async (path) => {
    try {
        return await fs.stat(path)
    }
    catch (err) {
        return false
    }
}

export const mimeTypes = (type) => {
    switch (type) {
        case "html":
            return "text/html"; // Added return statement
        case "css":
            return "text/css"; // Added return statement
        case "js":
            return "text/javascript"; // Corrected MIME type
        case "avif":
            return "image/avif"
        default:
            return "text/plain"; // Added return statement
    }
}
