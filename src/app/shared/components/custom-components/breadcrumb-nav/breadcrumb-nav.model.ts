import { LinkStatusEnum } from "../../../enums/link-status.enum";

export class BreadcrumbNavClass{
    stepName: string;
    routerLink: string;
    linkStatus: LinkStatusEnum;

    constructor(_stepName: string, _routerLink: string, _linkStatus: LinkStatusEnum){
        this.stepName = _stepName;
        this.routerLink = _routerLink;
        this.linkStatus = _linkStatus;
    }

}