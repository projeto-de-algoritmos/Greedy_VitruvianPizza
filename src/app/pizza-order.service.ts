import { Injectable } from '@angular/core';
import { DemandType } from 'src/greed/DemandType';
import { GreedPizza } from 'src/greed/GreedPizza';
import { PizzaOrder } from './models/PizzaOrder';

@Injectable({
  providedIn: 'root'
})
export class PizzaOrderService {
  demands!: DemandType
  constructor() { }

  getOrders(quantity: number) : [PizzaOrder] {
    this.demands = new GreedPizza().generateDemand(quantity);
    var orders: [PizzaOrder] = [new PizzaOrder(1, this.demands.pizza_quantity[0], this.demands.time[0])];

    for (var i = 1; i < quantity; i++) {
      orders.push(new PizzaOrder(i+1, this.demands.pizza_quantity[i], this.demands.time[i]));
    }

    return orders;
  }

  getKnapSackValue(pizzaCapacity: number): number {
    return new GreedPizza().calculateTime(this.demands, pizzaCapacity);
  }
}
