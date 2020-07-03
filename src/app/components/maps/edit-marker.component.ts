import { Component, Inject, Output, EventEmitter, } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@Component({
  selector: 'app-edit-marker',
  templateUrl: './edit-marker.component.html',
  styleUrls: ['./edit-marker.component.css']
})
export class EditMarkerComponent {

title: string;
description: string;
@Output() submitClicked = new EventEmitter<any>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EditMarkerComponent>,
              public form: FormsModule
              ) {

  }



  saveChanges(){
    this.submitClicked.emit();
    console.log(this.title, this.description)
    this.dialogRef.close({
       title: this.title,
       description: this.description
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
