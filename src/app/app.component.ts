import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PizzaOrder } from './models/PizzaOrder';
import { PizzaOrderService } from './pizza-order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options: FormGroup;
  orderControl = new FormControl(16, Validators.min(5));
  pizzaControl = new FormControl(10, Validators.required);
  resultForm: FormGroup;
  resultControl = new FormControl(0);
  title = 'Ajude o Peter Parker';
  orders?: [PizzaOrder];
  alreadyGetOrders = false;

  constructor(fb: FormBuilder, private pizzaOrderService: PizzaOrderService) {
    this.options = fb.group({
      orderValue: this.orderControl,
      minPizza: this.pizzaControl,
    });
    this.resultForm = fb.group({
      result: this.resultControl,
    });
  }

  generateOrders() {
    this.orders = this.pizzaOrderService.getOrders(this.options.value.orderValue);
    this.alreadyGetOrders = true;
  }

  getResponse() {
    var response = this.pizzaOrderService.getKnapSackValue(this.options.value.minPizza);

    if (response == this.resultForm.value.result) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Você acertou o tempo que o Peter vai precisar para entregar ' + this.options.value.minPizza + ' pizzas.',
        showConfirmButton: true,
      }).then(() => {
        this.alreadyGetOrders = false;
        this.orders = undefined;
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Você não acertou o tempo necessário que o Peter precisa para entregar. A resposta correta é: ' + response + ' minutos',
        showConfirmButton: true,
      }).then(() => {
        this.alreadyGetOrders = false;
        this.orders = undefined;
      })
    }

    console.log(response)
  }
}
