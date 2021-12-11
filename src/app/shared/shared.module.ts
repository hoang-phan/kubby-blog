import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    EditorModule,
    NavbarComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    EditorModule,
    RouterModule
  ]
})
export class SharedModule { }
