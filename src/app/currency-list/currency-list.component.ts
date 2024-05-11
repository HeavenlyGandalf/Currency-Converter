import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { CurrencyData } from '../interfaces';
import { MatDialog } from '@angular/material/dialog';
import { AddCurrencyComponent } from '../add-currency/add-currency.component';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent implements OnInit {
  currencies: any[] = [];
  title = 'Currencies';
  baseCurrency: string = 'RUB';
  targetCurrencies: string[] = ['USD', 'EUR', 'GBP'];
  public data: CurrencyData = {
    success: true,
    timestamp: 1715452504,
    source: 'RUB',
    quotes: {
      RUBUSD: 0.010913,
      RUBEUR: 0.010117,
      RUBGBP: 0.008714,
    },
  };
  constructor(
    private currencyService: CurrencyService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchCurrencyRates();
    // setInterval(() => {
    //   this.fetchCurrencyRates();
    // }, 5000);
  }

  getFormattedDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString();
  }

  openAddCurrencyDialog(): void {
    const dialogRef = this.dialog.open(AddCurrencyComponent, {
      width: '300px',
      height: '350px',
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
    });
  }

  fetchCurrencyRates() {
    // this.currencyService
    //   .getCurrencyRates(this.baseCurrency, this.targetCurrencies)
    //   .subscribe(
    //     (data) => {
    //       console.log(data);
    //       this.currencies = this.targetCurrencies.map((currency) => {
    //         const currentValue = 1 / data.quotes[this.baseCurrency + currency];
    //         const previousValue =
    //           this.currencies.find((c) => c.name === currency)?.value ||
    //           currentValue;
    //         const difference = currentValue - previousValue;
    //         console.log(difference);
    //         return {
    //           name: currency,
    //           value: currentValue.toFixed(2),
    //           difference: difference.toFixed(2),
    //         };
    //       });
    //     },
    //     (error) => {
    //       console.error('Error fetching currency rates:', error);
    //     }
    //   );

    this.currencies = this.targetCurrencies.map((currency: string) => {
      const value = 1 / this.data.quotes[this.baseCurrency + currency];
      return { name: currency, value: value.toFixed(2), difference: 0.23 };
    });
  }
}
