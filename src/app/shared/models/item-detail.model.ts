export class ItemDetailModel{
    itemDetailId: string; // guid, PK
    itemId: string; // guid, FK
    itemName: string;
    siteId: number;
    sizeName: string;
    colorId: number;
    colorName: string;
    quantity: number;
    itemActionId: number;
    itemActionName: string;
}

// CREATE TABLE [dbo].[ItemDetail](
//     [ItemDetailId] [uniqueidentifier] NOT NULL,
//     [ItemId] [uniqueidentifier] NOT NULL,
//     [SizeId] [int] NOT NULL,
//     [ColorId] [int] NOT NULL,
//     [Quantity] [int] NOT NULL,
//     [ItemActionId] [int] NOT NULL