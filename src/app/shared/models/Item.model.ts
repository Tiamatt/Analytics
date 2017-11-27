export class ItemClass{
    itemId: string; // NULL [uniqueidentifier]
    name: string; // NOT NULL [nvarchar](50)
    description: string; // NOT NULL [nvarchar](2000)
	genderId: number; // NOT NULL [int]
	genderName: string;
	categoryId: number; // NOT NULL [int]
	categoryName: string;
	brandId: number; // NOT NULL [int]	
	brandName: string;
	
    price: number; // NOT NULL [decimal](10, 2)
	createdByFullName: string; // NULL string (FirstName + ' ' + MiddleName + ' ' + LastName)
	createdDate: Date; // NULL Date
	lastUpdatedByFullName: string; // NULL string (FirstName + ' ' + MiddleName + ' ' + LastName)
	lastUpdatedDate: Date; // NULL Date
	isActive: boolean; // NULL
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
