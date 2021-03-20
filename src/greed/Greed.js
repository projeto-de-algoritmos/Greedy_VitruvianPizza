
function knapSack(pizza_capacity, qtd_pizza, tempo, pedidos) {
    if (pedidos == 0 || pizza_capacity == 0) {
        return 0
    }
    if (qtd_pizza[pedidos - 1] > pizza_capacity) {
        return knapSack(pizza_capacity, qtd_pizza, tempo, pedidos - 1)
    } else {
        return Math.max(tempo[pedidos - 1] + knapSack(pizza_capacity - qtd_pizza[pedidos - 1], qtd_pizza, tempo, pedidos - 1),
            knapSack(pizza_capacity, qtd_pizza, tempo, pedidos - 1))
    }
}

function calculateTime(demands, pizza_capacity) {
    tempo_total = knapSack(pizza_capacity, demands.pizza_quantity, demands.time, demands.pizza_quantity.length)
    return tempo_total;
}

function generate_demand() {
    let demands = {};
    qtt_demands = Math.floor(Math.random() * 100+1);
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

function main() {
    const demands = generate_demand();
    const pizza_capacity = 10;
    console.log(calculateTime(demands, pizza_capacity) + " min.");
}

main()