import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatFormFieldModule,
         MatInputModule, MatSidenavModule, MatToolbarModule,
         MatListModule, MatCardModule, MatSelectModule,
         MatTableModule,MatSortModule, MatPaginatorModule, 
         MatSnackBarModule, MatProgressSpinnerModule, MatMenuModule, 
         MatDialogModule,MatTabsModule, MatRippleModule, 
         MatExpansionModule, MatChipsModule
        } from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatIconModule, MatFormFieldModule,
              MatInputModule, MatSidenavModule, MatToolbarModule,
              MatListModule, MatCardModule, MatSelectModule,
              MatTableModule,MatSortModule, MatPaginatorModule, 
              MatSnackBarModule, MatProgressSpinnerModule, MatMenuModule, 
              MatDialogModule,MatTabsModule, MatRippleModule, 
              MatExpansionModule, MatChipsModule],
    exports: [MatButtonModule, MatIconModule, MatFormFieldModule,
              MatInputModule, MatSidenavModule, MatToolbarModule,
              MatListModule, MatCardModule, MatSelectModule,
              MatTableModule,MatSortModule, MatPaginatorModule, 
              MatSnackBarModule, MatProgressSpinnerModule, MatMenuModule, 
              MatDialogModule,MatTabsModule, MatRippleModule, 
              MatExpansionModule, MatChipsModule], 
})

export class MaterialModule {}