import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_RADIO_DEFAULT_OPTIONS,
  MatRadioModule,
} from '@angular/material/radio';
import {
  MAT_CHECKBOX_DEFAULT_OPTIONS,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    MatTableModule,
    MatIconModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
  ],
  exports: [
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
  ],
  providers: [
    {
      provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
})
export class MaterialModule {}
