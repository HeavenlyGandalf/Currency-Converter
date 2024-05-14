import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Currency, CurrencyData } from '../interfaces/interfaces';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'https://api.apilayer.com/currency_data/live';
  private apiKey = environment.ANGULAR_APP_API_KEY;

  private timestamp: Date = new Date();
  private baseCurrency = 'RUB';

  public currencies: Currency[] = [
    { name: 'USD', currentValue: 0, difference: 0 },
    { name: 'EUR', currentValue: 0, difference: 0 },
    { name: 'GBP', currentValue: 0, difference: 0 },
  ];

  constructor(private http: HttpClient) {}

  getTime(): string {
    const hours = this.timestamp.getHours().toString().padStart(2, '0');
    const minutes = this.timestamp.getMinutes().toString().padStart(2, '0');
    const seconds = this.timestamp.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  getDate(): string {
    const day = this.timestamp.getDate().toString().padStart(2, '0');
    const month = (this.timestamp.getMonth() + 1).toString().padStart(2, '0');
    const year = this.timestamp.getFullYear();
    return `${day}.${month}.${year}`;
  }

  fetchCurrencyRates(): Observable<Currency[]> {
    const params = {
      source: this.baseCurrency,
      currencies: this.currencies.map((currency) => currency.name).join(','),
    };

    const headers = new HttpHeaders().set('apikey', `${this.apiKey}`);
    const options = { headers: headers, params: params };

    return this.http.get<CurrencyData>(this.apiUrl, options).pipe(
      map((data: CurrencyData) => {
        this.timestamp = new Date(data.timestamp * 1000);
        return this.currencies.map((currency) => {
          const newValue = 1 / data.quotes[this.baseCurrency + currency.name];

          const difference = currency.currentValue
            ? newValue - currency.currentValue
            : 0;

          const updatedCurrency = {
            ...currency,
            currentValue: +newValue.toFixed(2),
            difference: +difference.toFixed(2),
          };
          const index = this.currencies.findIndex(
            (c) => c.name === currency.name
          );
          if (index !== -1) {
            this.currencies[index] = updatedCurrency;
          }
          return updatedCurrency;
        });
      }),
      catchError((error: any) => {
        throw error;
      })
    );
  }

  updateCurrencies(currencies: string[]): void {
    let updatedCurrencies: Currency[] = [...this.currencies];
    currencies.forEach((newCurrency) => {
      const index = updatedCurrencies.findIndex(
        (currency) => currency.name === newCurrency
      );
      if (index === -1) {
        updatedCurrencies.push({
          name: newCurrency,
          difference: 0,
          currentValue: 0,
        });
      }
    });
    updatedCurrencies = updatedCurrencies.filter((currency) =>
      currencies.some((newCurrency) => newCurrency === currency.name)
    );
    this.currencies = updatedCurrencies;
  }
}
