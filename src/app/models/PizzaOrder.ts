export class PizzaOrder {
    id: number;
    quantity: number;
    time: number;

    constructor(id: number, quantity: number, time: number) {
        this.id = id;
        this.quantity = quantity;
        this.time = time;
    }
}