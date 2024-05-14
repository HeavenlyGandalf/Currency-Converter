export interface CurrencyData {
  success: boolean;
  timestamp: number;
  source: string;
  quotes: {
    [key: string]: number;
  };
}

export interface Currency {
  name: string;
  currentValue: number;
  difference: number;
}
