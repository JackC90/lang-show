import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatExpansionModule,
  MatButtonModule, 
  MatCheckboxModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatFormFieldModule,
  MatListModule, 
  MatMenuModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule, 
  MatSidenavModule,
  MatSnackBarModule,
  MatOptionModule, 
  MatInputModule, 
  MatRippleModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: 
    [ 
      MatExpansionModule,
      MatButtonModule,
      MatCardModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatDialogModule,
      MatIconModule, 
      MatFormFieldModule,
      MatListModule, 
      MatMenuModule,
      MatNativeDateModule,
      MatProgressSpinnerModule,
      MatSelectModule, 
      MatSidenavModule,
      MatSnackBarModule,
      MatOptionModule, 
      MatInputModule, 
      MatRippleModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule 
    ],
  exports: 
    [ 
      MatExpansionModule,
      MatButtonModule,
      MatCardModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatDialogModule,
      MatIconModule,
      MatFormFieldModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatProgressSpinnerModule,
      MatSelectModule, 
      MatSidenavModule,
      MatSnackBarModule,
      MatOptionModule, 
      MatInputModule, 
      MatRippleModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule 
    ],
})
export class CustomMaterialModule { }
