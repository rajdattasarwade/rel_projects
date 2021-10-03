import { OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponent } from "../message-modal/message-modal.component";
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";
@Injectable({providedIn: 'root'})
export class MessageModalService {

  constructor(public modalService : MatDialog ) { }

  ngOnInit(): void {
  }
  showMessage(
    message: string = "",
    title: string = "Error",
    imageClass: string = "",
    btnTitle: string = "CLOSE",
    dismissCallback?: Function
  ) {
     const modalRef =  this.modalService.open(MessageModalComponent, {
      width: '450px'
    });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.messageIcon = imageClass;
    modalRef.componentInstance.btnTitle = btnTitle;
    modalRef.componentInstance.dismissCallback = dismissCallback;
  }

  showConfirmation(
    message: string = "",
    title: string = "Error",
    imageClass: string = "",
    dismissCallback: any,
    yesBtn = "Yes",
    noBtn = "No"
  ) {
    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      width: '450px',
      height: '350px',
    });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.messageIcon = imageClass;
    modalRef.componentInstance.dismissCallback = dismissCallback;
    modalRef.componentInstance.yesBtn = yesBtn;
    modalRef.componentInstance.noBtn = noBtn;
  }
}
