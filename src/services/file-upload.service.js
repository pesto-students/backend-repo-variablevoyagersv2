import ImageKit from 'imagekit';
import { config } from '@/config';
import fs from 'fs';
import sizeOf from 'image-size';
const imagekit = new ImageKit({
	publicKey: config.IMAGEKIT.IMAGEKIT_PUBLIC_KEY,
	privateKey: config.IMAGEKIT.IMAGEKIT_PRIVATE_KEY,
	urlEndpoint: config.IMAGEKIT.IMAGEKIT_URL,
});

export const fileUpload = async (localFile, folder) => {
	let file = fs.readFileSync(localFile.path);
	let imageWidth;
	const dimensions = sizeOf(file);

	if (folder.toLowerCase() === 'avatar') {
		imageWidth = dimensions.width <= 300 ? dimensions.width : 300;
	} else {
		imageWidth = dimensions.width <= 800 ? dimensions.width : 800;
	}

	return await imagekit
		.upload({
			file,
			fileName: localFile.filename,
			folder,
			transformation: {
				pre: `w-${imageWidth},q-80,f-webp`,
			},
		})
		.then((response) => {
			console.log(response);
			fs.unlinkSync(`./uploads/${localFile.filename}`);
			return response;
		})
		.catch((error) => {
			console.log(error);
			fs.unlinkSync(`./uploads/${localFile.filename}`);
			return null;
		});
};
