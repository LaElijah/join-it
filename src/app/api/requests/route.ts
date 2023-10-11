import { NextResponse, NextRequest } from 'next/server';

import dbConnection from '@/app/_utils/db/dbConnection';
import Request from '@/app/_utils/models/request';

type NextUrl = {
	page: string;
};

export async function GET(req: NextRequest) {
	console.log('GET');
	await dbConnection();

	try {
		const nextUrl: any = req.nextUrl;

		const page: number = parseInt(nextUrl.page) || 1;
		const limit: number = parseInt(nextUrl.limit) || 10;

		const requests: Request[] = await Request.find({})
			.skip(Math.ceil((page - 1) * limit))
			.limit(limit);

		return NextResponse.json({
			status: 'success',
			data: requests,
			payload: { newElements: requests },
		});
	} catch (error) {
		return NextResponse.json({ status: 'failure' });
	}
}

export async function POST(req: any) {
	try {
		await dbConnection();

		const formRequest = await req.formData();

		const file = formRequest.get('file');

		const bodyStringified = formRequest.get('body');
		const body = JSON.parse(bodyStringified);

		const formData = new FormData();

		formData.append('file', file);
		formData.append('api_key', `${process.env.CLOUDINARY_API_KEY}`);
		formData.append('upload_preset', 'uploadImage');
		formData.append('resource_type', 'image');
		formData.append('cloud_name', `${process.env.CLOUDINARY_NAME}`);
		formData.append('api_secret', `${process.env.CLOUDINARY_SECRET}`);

		const response = await fetch(
			'https://api.cloudinary.com/v1_1/dx3xbo8tm/image/upload',
			{
				method: 'POST',
				body: formData,
			}
		);

		const data = await response.json();
		console.log(data);

		const document = new Request({
			...body,
			date: new Date(),
			image: data.url,
		});

		console.log(document);
		await document.save();

		return NextResponse.json({ status: 'success' });
	} catch (error) {
		return NextResponse.json({ status: 'failure' });
	}
}
