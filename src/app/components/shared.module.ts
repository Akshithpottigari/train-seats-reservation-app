import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

const declarations = [
  NavbarComponent
]

@NgModule({
  declarations: [
    ...declarations
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports : [...declarations]
})
export class SharedModule { }
