import {Component} from '@angular/core';
import {RealRatesService} from "../services/real-rates/real-rates.service";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {
  amount: number = 0;
  currency: string = 'EUR';
  convertedCurrency: string = 'USD';
  rate: number = 1.1;
  convertedAmount: number = 0;

  history: string[] = [];
  usFlag = "https://flagcdn.com/48x36/us.png"
  frFlag = "https://flagcdn.com/48x36/fr.png"
  toFlag = this.usFlag
  fromFlag = this.frFlag
  fixRate = true;
  // @ts-ignore
  realEurRate;
  // @ts-ignore
  realUsdRate;

  constructor(private realRatesService: RealRatesService) {
  }

  ngOnInit() {
    this.timer()
  }

  timer(){
    this.getRealRatesExchange();
    let refreshId = setInterval(() => {

      const randomRateChange = Math.random() * 0.1 - 0.05;
      this.rate += +randomRateChange;
      this.rate = +this.rate.toFixed(2)
      this.compareRates()
      if (this.fixRate === false) {
        clearInterval(refreshId)
      }

    }, 3000);
  }

  convertAmount(amount: any) {
    this.amount = amount;
    this.convertedAmount = +(this.amount * this.rate).toFixed(2);
    this.keepLastFiveElements()
  }

  convertCurrency() {
    this.fromFlag = this.currency === 'EUR' ? this.usFlag : this.frFlag;
    this.toFlag = this.convertedCurrency === 'EUR' ? this.usFlag : this.frFlag;
    this.convertedCurrency = this.convertedCurrency === 'USD' ? 'EUR' : 'USD'
    this.currency = this.currency === 'EUR' ? 'USD' : 'EUR';
    this.amount = 0;
    this.convertedAmount = 0;
    this.rate = +(1 / this.rate).toFixed(2)
  }

  forceRate(newRate: any) {
    this.rate = +newRate
  }

  keepLastFiveElements() {
    this.history.push(`${this.amount} ${this.currency} = ${this.convertedAmount} ${this.convertedCurrency}`); // Ajoute le nouvel élément à la fin du tableau

    if (this.history.length > 5) {
      this.history = this.history.slice(this.history.length - 5); // Garde uniquement les 5 derniers éléments
    }

    return this.history;
  }

  getRealRatesExchange() {
    this.realRatesService.getRatesForUsd().subscribe(data => {
      this.realEurRate = data.rates.EUR;
      this.realUsdRate = +(1 / this.realEurRate).toFixed(2);
    })
  }

  compareRates() {
    if (this.currency === 'EUR') {
      this.fixRate = ((Math.abs(this.realUsdRate - this.rate)) / this.realUsdRate) >= 0.02 ? false : true;
    } else {
      this.fixRate = ((Math.abs(this.realEurRate - this.rate)) / this.realEurRate) >= 0.02 ? false : true;
    }
    
  }


}
