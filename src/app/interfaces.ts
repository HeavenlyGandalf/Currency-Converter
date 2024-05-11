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
  value: number;
  difference: number;
}
