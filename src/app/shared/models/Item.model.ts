export class ItemClass{
    itemId: string; // [uniqueidentifier] NOT NULL
    name: string; // [nvarchar](50) NOT NULL
    description: string; // [nvarchar](2000) NOT NULL
    brandId: number; // [int] NOT NULL,
	categoryId: number; // [int] NOT NULL,
	genderId: number; // [int] NOT NULL,
    price: number; // [decimal](10, 2) NOT NULL,
    employeeId: string; // [uniqueidentifier] NOT NULL
}

/*
[dbo].[Item](
	[ItemId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](2000) NOT NULL,
	[BrandId] [int] NOT NULL,
	[CategoryId] [int] NOT NULL,
	[GenderId] [int] NOT NULL,
    [Price] [decimal](10, 2) NOT NULL
*/
