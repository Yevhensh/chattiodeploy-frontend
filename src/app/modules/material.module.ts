import {
  MdButtonModule, MdCheckboxModule, MdToolbarModule, MdInputModule, MdCardModule,
  MdListModule, MdDialogModule, MdTableModule
} from '@angular/material';
import {NgModule} from "@angular/core";

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdInputModule,
    MdCardModule,
    MdListModule,
    MdInputModule,
    MdDialogModule,
    MdTableModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdInputModule,
    MdCardModule,
    MdListModule,
    MdDialogModule,
    MdTableModule
  ],
})
export class MaterialModule {
}
