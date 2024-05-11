import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'https://api.apilayer.com/currency_data/live';
  private apiKey = 'mEEF9MSErN4CdaU5HbhePMG84kw7A58B';

  constructor(private http: HttpClient) {}

  getCurrencyRates(
    baseCurrency: string,
    currencies: string[]
  ): Observable<any> {
    const params = {
      source: baseCurrency,
      currencies: currencies.join(','),
    };
    const headers = new HttpHeaders().set('apikey', `${this.apiKey}`);
    const options = { headers: headers, params: params };
    console.log(this.http.get(this.apiUrl, options));
    return this.http.get(this.apiUrl, options);
  }
}
