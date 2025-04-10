import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { SecurityService } from '../../security/security.service';
// import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShoppingCartState } from '../../ngrx/ShoppingCartState/cart.reducer';
// import { ShoppingCartService } from 'src/app/services/shoppingCartService/shopping-cart.service';

interface InvoiceResponse {
  pageUrl: string;
  invoiceId: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  // shoppingCart$: Observable<ShoppingCartState>;

  constructor(
    private fb: FormBuilder,
    // private shoppingCartService: ShoppingCartService
    private http: HttpClient //, private secService: SecurityService, // private store: Store<{ shoppingCartState: ShoppingCartState }>
  ) {
    this.checkoutForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яёЁ]+$/)],
      ],
      surname: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яёЁ]+$/)],
      ],
      city: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яёЁ]+$/)],
      ],
      telephoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      postOfficeNumber: [
        '',
        [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)],
      ],
    });
  }


  ngOnInit(): void {
    // if (this.secService.profile.id) {
    // this.shoppingCart$ = this.store.pipe(
    //   map((state) => state.shoppingCartState)
    // );
    // }
  }

  payOnline() {
    if (this.checkoutForm.valid) {
      console.log('Delivery Data:', this.checkoutForm.value);
      this.createMonopayInvoice();
      this.checkoutForm.reset();
    }
  }

  payByCash() {
    if (this.checkoutForm.valid) {
      console.log('Delivery Data:', this.checkoutForm.value);
      alert('Order placed successfully! Please pay by cash on delivery.');
      this.checkoutForm.reset();
      // this.placeOrder(false);
    }
  }

  createMonopayInvoice() {
    const url = 'https://api.monobank.ua/api/merchant/invoice/create';

    // const body = {
    // amount: shoppingCartService.calcTotalPrice(shoppingCart) * 100,
    //   ccy: 980, // 980 - uah, 840 - usd.
    //   merchantPaymInfo: {
    //     reference: Date.now(),
    //     destination: 'Your order in the WoodShop',
    //     comment: 'Your order',
    //   basketOrder: shoppingCart.items.map((item) => ({
    //   name: item.product.name,
    //   qty: item.quantity,
    //   sum: item.product.productPrice.price * 100,
    //   total: item.product.productPrice.price * item.quantity * 100,
    //   icon: item.product.productImagesBas64,
    //   unit: 'шт.',
    //   code: item.product.name,
    // }))
    //   },
    //   redirectUrl: 'http://localhost:4200/home',
    //   validity: 3600,
    //   paymentType: null,
    // };

    const body = {
      amount: 4200,
      ccy: 980,
      merchantPaymInfo: {
        reference: '84d0070ee4e44667b31371d8f8813947',
        destination: 'Your order in the WoodShop',
        comment: 'Your order',
        basketOrder: [
          {
            name: 'Табуретка',
            qty: 2,
            sum: 2100,
            total: 4200,
            icon: null,
            unit: 'шт.',
            code: 'd21da1c47f3c45fca10a10c32518bdeb',
          },
        ],
      },
      redirectUrl: 'http://localhost:4200/home',
      validity: 3600,
      paymentType: null,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Token': 'uY_fQBssMsn_k0uI6_AfgnbcLIDg2c_duoGRT_1WLiJI',
    });

    this.http.post<InvoiceResponse>(url, body, { headers }).subscribe(
      (response) => {
        console.log('Invoice created successfully:', response);
        // this.placeOrder(true);
        window.location.href = response.pageUrl;
      },
      (error) => {
        console.error('Error creating invoice:', error);
      }
    );
  }

  // placeOrder(byCreditCard: boolean): void {
  //   this.shoppingCart$.subscribe((cart) => {
  //     const orderData = {
  //       customerId: this.secService.profile.id,
  //       items: cart.items,
  //       totalAmount: shoppingCartService.calcTotalPrice(shoppingCart);
  //       deliveryData: this.checkoutForm.value,
  //       payment: {
  //         amount: shoppingCartService.calcTotalPrice(shoppingCart),
  //         currency: 'UAH',
  //         byCreditCard: byCreditCard,
  //       },
  //     };

  //     this.http
  //       .post('http://localhost:8081/api/orders', orderData, {
  //         headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //       })
  //       .subscribe(
  //         (response) => console.log('Order placed:', response),
  //         (error) => console.error('Order failed:', error)
  //       );
  //   });
  // }

  getControlError(controlName: string): string {
    const control = this.checkoutForm.get(controlName);

    if (control?.touched || control?.dirty) {
      const formattedControlName = controlName
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/^([a-z])/, (match) => match.toUpperCase());

      if (control?.hasError('required')) {
        return `${formattedControlName} is required`;
      }
      if (control?.hasError('pattern')) {
        return `${formattedControlName} has an invalid format`;
      }
      if (control?.hasError('min')) {
        return `${formattedControlName} must be greater than 0`;
      }
    }
    return '';
  }
}
