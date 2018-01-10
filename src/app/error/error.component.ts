import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css', '../shared/styles/general.css']
})
export class ErrorComponent implements OnInit {
  httpStatus: string = "Wooops! Error ";
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        let status = params['httpStatus'];
        switch(status)
        {
          case "204":
            this.httpStatus += status + " - No Content";
            break;
          case "400":
            this.httpStatus += status + " - Bad Request";
            break;
          case "403":
            this.httpStatus += status + " - Forbidden";
            break;
          case "404":
            this.httpStatus += status + " - Not Found";
            break;
          case "405":
            this.httpStatus += status + " - Method Not Allowed";
            break;
          default:
            if(status != null)
              this.httpStatus += status;
            break;  
        }
      }
    );
  }

}
