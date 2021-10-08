import { Component } from '@angular/core';

@Component({
    selector: "app-post-create",
    templateUrl: "./post-create.component.html",
    styleUrls: ['./post-create.component.css']
})

export class PostCreate{
    enteredString = "Heelooo";

    onAddClick(inputVariable: HTMLTextAreaElement){
        console.dir(inputVariable);
        this.enteredString = inputVariable.value;
    }
}