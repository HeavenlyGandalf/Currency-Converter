import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrl: './add-currency.component.scss',
})
export class AddCurrencyComponent {
  selectedCurrency: string = '';
  currencies: string[] = ['CNY', 'JPY', 'TRY'];

  constructor(public dialogRef: MatDialogRef<AddCurrencyComponent>) {}

  onCurrencyChange() {
    console.log('Выбранная валюта:', this.selectedCurrency);
  }

  selectAllCurrencies() {
    console.log('Выбраны все валюты');
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
