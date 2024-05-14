import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCurrencyComponent } from '../add-currency/add-currency.component';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent implements OnInit {
  selectedInterval: number = 30;
  intervals = [
    { name: '5 секунд', value: 5 },
    { name: '10 секунд', value: 10 },
    { name: '15 секунд', value: 15 },
    { name: '30 секунд', value: 30 },
    { name: '45 секунд', value: 45 },
    { name: '1 минута', value: 60 },
  ];
  intervalRef: any;
  isIntervalRunning: boolean = false;
  loading: boolean = true;
  time: string = '';
  date: string = '';

  constructor(
    public currencyService: CurrencyService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fetchCurrencyRates();
  }

  openAddCurrencyDialog(): void {
    const currencyNames = this.currencyService.currencies.map(
      (currency) => currency.name
    );
    const dialogRef = this.dialog.open(AddCurrencyComponent, {
      width: '300px',
      data: {
        currencies: currencyNames,
      },
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.currencyService.updateCurrencies(data);
      }
    });
  }

  selectInterval(intervalValue: number) {
    this.selectedInterval = intervalValue;
    if (this.isIntervalRunning) {
      this.stopInterval();
      this.startInterval();
    }
  }

  startInterval() {
    this.isIntervalRunning = true;
    this.fetchCurrencyRatesWithInterval();
  }

  stopInterval() {
    clearInterval(this.intervalRef);
    this.isIntervalRunning = false;
  }

  fetchCurrencyRatesWithInterval() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
    this.intervalRef = setInterval(() => {
      this.fetchCurrencyRates();
    }, this.selectedInterval * 1000);
  }

  fetchCurrencyRates() {
    this.currencyService.fetchCurrencyRates().subscribe(() => {
      this.loading = false;
      this.time = this.currencyService.getTime();
      this.date = this.currencyService.getDate();
      this.changeDetectorRef.detectChanges();
    });
  }
}
