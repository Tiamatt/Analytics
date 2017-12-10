export class MainNavModel{
    titleName: string;
    titleFaIcon: string;
    titleFaCaret: string;
    isShowSubtitles: boolean;
    subtitles: {
        routerLink: string,
        name: string
    }[];

    constructor(){
        this.subtitles = [];
    }
}