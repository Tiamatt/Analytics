/*
Call from parent component like that:
  <app-modal-dialog [uniqueId]="0">
    <div #modalDialogBody>Test</div>
  </app-modal-dialog>
  <button id="openModalAlert" hidden data-toggle="modal" data-target="#ModalAlert0">Open Modal Alert (hidden)</button>
*/


import { Component, OnInit, Input, ElementRef, ContentChild, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit, AfterContentInit {
  @ContentChild('modalDialogBody') modalDialogBodyFromParent: ElementRef; 
  @Input() uniqueId:string;
  constructor() { }

  ngOnInit() {
  }
  ngAfterContentInit(){

  }

}
