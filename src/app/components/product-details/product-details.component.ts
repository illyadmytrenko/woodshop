// import { Component, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { map, Observable } from 'rxjs';
// import { ProductItemState } from '../../ngrx/Product-item-State/productItem.reducers';
// import { ProductService } from '../../services/productService/product.service';
// import {
//   DataStateEnum,
//   FetchMethode,
// } from '../../ngrx/productsState/products.reducer';
// import { EventType } from '../../models/common.model';
// import { SecurityService } from '../../security/security.service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-product-details',
//   templateUrl: './product-details.component.html',
//   styleUrls: ['./product-details.component.css'],
// })
// export class ProductDetailsComponent implements OnInit {
//   productItem$?: Observable<ProductItemState>;
//   constructor(
//     private store: Store<any>,
//     private productService: ProductService,
//     private secService: SecurityService,
//     private http: HttpClient
//   ) {}

// reviewText: string = '';
// rating: number = 0;
// reviews: { userId: string; reviewText: string; rating: number; date: string }[] = [];

// stars = new Array(5);

//   ngOnInit(): void {
//     this.productItem$ = this.store.pipe(map((state) => state.productItemState));
//     this.getReviews();

//     this.store.subscribe((s) => {
//       if (s.productItemState.dataState == DataStateEnum.LOADED) {
//         if (s.productItemState.product && this.secService.profile.id) {
//           this.productService.publishEvent(
//             s.productItemState.product.productId,
//             EventType.CLICK_PRODUCT,
//             this.secService.profile.id
//           );
//         }
//       }
//     });
//   }

// setRating(index: number) {
//   this.rating = index + 1;
// }

// getStarImage(index: number): string {
//   return index < this.rating
//     ? 'assets/img/yellow-star.svg'
//     : 'assets/img/white-star.svg';
// }

// submitReview() {
//   if (this.reviewText.trim() && this.rating > 0) {
//     const reviewData = {
//       // userId: this.secService.profile.id,
//       // productId: this.productItem.id,
//       rating: this.rating,
//       reviewText: this.reviewText,
//       date: new Date().toISOString(),
//     };

//     this.http
//       .post('http://localhost:8081/api/reviews', reviewData)
//       .subscribe({
//         next: (response) => {
//           console.log('Отзыв успешно отправлен:', response);
//           this.reviews.push({ text: this.reviewText, rating: this.rating });
//           this.reviewText = '';
//           this.rating = 0;
//         },
//         error: (error) => {
//           console.error('Ошибка при отправке отзыва:', error);
//           alert('Не удалось отправить отзыв. Попробуйте снова.');
//         },
//       });
//   } else {
//     alert('Please provide both a rating and a review.');
//   }
// }

// getReviews() {
//   this.http
//     .get<
//       { userId: string; reviewText: string; rating: number; date: string }[]
//     >(`http://localhost:8081/api/reviews?productId=${this.productId}`)
//     .subscribe({
//       next: (data) => {
//         this.reviews = data;
//       },
//       error: (error) => {
//         console.error('Ошибка при получении отзывов:', error);
//       },
//     });
// }
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  reviewText: string = '';
  rating: number = 0;
  reviews: {
    userId: string;
    reviewText: string;
    rating: number;
    date: string;
  }[] = [];

  stars = new Array(5);

  setRating(index: number) {
    this.rating = index + 1;
  }

  getStarImage(index: number, rating: number = this.rating): string {
    return index < rating
      ? 'assets/img/yellow-star.svg'
      : 'assets/img/white-star.svg';
  }

  submitReview() {
    if (this.reviewText.trim() && this.rating > 0) {
      this.reviews.push({
        userId: '1',
        reviewText: this.reviewText,
        rating: this.rating,
        date: new Date().toISOString(),
      });
      this.reviewText = '';
      this.rating = 0;
    } else {
      alert('Please provide both a rating and a review.');
    }
  }
}
