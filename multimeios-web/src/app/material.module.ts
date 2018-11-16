import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatFormFieldModule,
         MatInputModule, MatSidenavModule, MatToolbarModule,
         MatListModule, MatCardModule, MatSelectModule,
         MatTableModule, MatGridListModule, MatStepperModule,
         MatSortModule, MatPaginatorModule, MatSnackBarModule,
         MatProgressSpinnerModule, MatMenuModule, MatDialogModule,
         MatTabsModule, MatRippleModule
        } from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatIconModule, MatFormFieldModule,
              MatInputModule, MatSidenavModule, MatToolbarModule,
              MatListModule, MatCardModule, MatSelectModule,
              MatTableModule, MatGridListModule, MatStepperModule,
              MatSortModule, MatPaginatorModule, MatSnackBarModule,
              MatProgressSpinnerModule, MatMenuModule, MatDialogModule,
              MatTabsModule, MatRippleModule],
    exports: [MatButtonModule, MatIconModule, MatFormFieldModule,
              MatInputModule, MatSidenavModule, MatToolbarModule,
              MatListModule, MatCardModule, MatSelectModule,
              MatTableModule, MatGridListModule, MatStepperModule,
              MatSortModule, MatPaginatorModule, MatSnackBarModule,
              MatProgressSpinnerModule, MatMenuModule, MatDialogModule,
              MatTabsModule, MatRippleModule], 
})

export class MaterialModule {}