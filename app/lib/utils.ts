
import imageCompression from "browser-image-compression";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function sanitizeLink(link?: string) {
	if (!link) return "";

	return link
		.replace(/\s/g, "")
		.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,ˆ.<>\/?]+/, "")
		.toLocaleLowerCase();
}

export async function compressedFiles(files: File[]) {
	const compressPromisses = files.map(async (file) => {
		try {
			return await compressedImage(file)
		} catch (error) {
			console.error
			return null
		}
	})
	return (await Promise.all(compressPromisses)).filter((file) => file !== null)
}

export const compressedImage = (file: File): Promise<File> => {
	return new Promise((resolve, reject) => {
		const options = {
			maxSizeMB: 0.2, //200 kb
			maxWidthOrHeight: 900,
			useWebWorker: true,
			fileType: "image/png"
		}

		imageCompression(file, options).then((compressedFile) => {
			resolve(compressedFile)
		})
	})
}

export function formatUrl(url: string): string {
	return url.startsWith("http") ? url : `https://${url}`
}

export function triggerImageInput(id: string) {
	document.getElementById(id)?.click()
}

export function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
	const file = e.target.files?.[0] ?? null
	if (file) {
		const imageURL = URL.createObjectURL(file)
		return imageURL
	}

	return null
}