import { DemandType } from "./DemandType";


export class GreedPizza {
    private _knapSack(pizza_capacity: number, qtd_pizza: Array<number>, tempo: Array<number>, pedidos: number): number {
        if (pedidos == 0 || pizza_capacity == 0) {
            return 0
        }
        if (qtd_pizza[pedidos - 1] > pizza_capacity) {
            return this._knapSack(pizza_capacity, qtd_pizza, tempo, pedidos - 1)
        } else {
            return Math.max(tempo[pedidos - 1] + this._knapSack(pizza_capacity - qtd_pizza[pedidos - 1], qtd_pizza, tempo, pedidos - 1),
                this._knapSack(pizza_capacity, qtd_pizza, tempo, pedidos - 1))
        }
    }
    
    calculateTime(demands: DemandType, pizza_capacity: number): number {
        const total_time = this._knapSack(pizza_capacity, demands.pizza_quantity, demands.time, demands.pizza_quantity.length)
        return total_time;
    }
    
    generate_demand() {
        let demands: DemandType;
        const qtt_demands = Math.floor(Math.random() * 100+1);
        let pizza_quantity = [];
        let time = [];
        for (let i = 0; i < qtt_demands; i++) {
            pizza_quantity.push(Math.floor(100 * Math.random()+1));
            time.push(Math.floor(100 * Math.random()+1));
        }
        demands = {
            pizza_quantity: pizza_quantity, 
            time: time
        };
    
        return demands;
    }
}
