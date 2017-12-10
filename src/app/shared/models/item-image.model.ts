export class ItemImageModel{
    itemImageId:string; // [uniqueidentifier] NOT NULL,
    itemId:string; //[uniqueidentifier] NOT NULL,
    itemName: string;
	src:string; // [int] NOT NULL,
    isMain: boolean; // [bit] NOT NULL,
    size: number;
    imageType: string;
}

/* 
    CREATE TABLE [dbo].[ItemImage](
	[ItemImageId] [uniqueidentifier] NOT NULL,
	[ItemId] [uniqueidentifier] NOT NULL,
	[Src] [int] NOT NULL,
    [IsMain] [bit] NOT NULL,
*/