import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'
import { v2 as cloudinary } from 'cloudinary'

import { NextResponse } from "next/server";
import mv from 'mv'


export async function POST(req) {
    try {
       
       
        const formRequest = await req.formData();
  const file = formRequest.get('file');
  console.log(file)
 const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', `${process.env.CLOUDINARY_API_KEY}`);
    formData.append('upload_preset', 'uploadImage');
    formData.append('cloud_name', `${process.env.CLOUDINARY_NAME}`);
    formData.append('api_secret', `${process.env.CLOUDINARY_SECRET}`);
    const response = await fetch('https://api.cloudinary.com/v1_1/dx3xbo8tm/image/upload', {
        method: 'POST',
        body: formData


    })
    const data = await response.json();
    console.log(data.url)

            return NextResponse.json({ status: "success"})
        


        
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ status: "failure" })
    }


}