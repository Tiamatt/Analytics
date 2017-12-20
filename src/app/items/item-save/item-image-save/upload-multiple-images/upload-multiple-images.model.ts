export class UploadMultipleImagesModel{
    file: File; // when newly uploaded image
    itemImageId: string; // when get image from db 
    src: string;
    size: number; //in bits
    sizeName: string; //examples: 111KB, 2MB
    isMain: boolean;
    width: number;
    height: number;
    isValid: boolean;
    imageType: string;
}