import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrl: './add-currency.component.scss',
})
export class AddCurrencyComponent {
  selectedCurrencies: string[] = [];
  allCurrencies: string[] = ['USD', 'EUR', 'GBP', 'CNY', 'JPY', 'TRY'];
  selectAllChecked: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddCurrencyComponent>
  ) {
    this.selectedCurrencies = data.currencies;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveChange(): void {
    this.dialogRef.close(this.selectedCurrencies);
  }

  isSomeSelected() {
    return (
      this.selectedCurrencies &&
      this.selectedCurrencies.length > 0 &&
      this.selectedCurrencies.length < this.allCurrencies.length
    );
  }

  isSelected(currency: string) {
    return (
      this.selectedCurrencies && this.selectedCurrencies.includes(currency)
    );
  }

  selectAll(checked: boolean) {
    if (checked) {
      this.selectedCurrencies = [...this.allCurrencies];
    } else {
      this.selectedCurrencies = [];
    }
  }

  toggleSelection(checked: boolean, currency: string) {
    if (this.selectedCurrencies) {
      if (checked) {
        this.selectedCurrencies.push(currency);
      } else {
        const index = this.selectedCurrencies.indexOf(currency);
        if (index !== -1) {
          this.selectedCurrencies.splice(index, 1);
        }
      }
    } else {
      this.selectedCurrencies = [currency];
    }
  }
}
