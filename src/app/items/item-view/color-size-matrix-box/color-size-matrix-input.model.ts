export class ColorSizeMatrixInputModel{
    itemId: string; // guid
    isShowViewDetailsLink: boolean;
    isShowAddDetailsLink: boolean;
    // in order to force component to refresh, change this value to opposite like that:
    // forceToRefresh = !forceToRefresh;
    forceToRefresh: boolean;
}