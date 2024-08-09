import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'darmvwcrz',
      api_key: '215338669335689',
      api_secret: '8vbI49RLpRh4u6bF64NWatr5b9s',
    });
  }

  async uploadImage(imagePath: string) {
    return cloudinary.uploader.upload(imagePath);
  }
}
