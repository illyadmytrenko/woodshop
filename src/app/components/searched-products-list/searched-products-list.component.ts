// import { Component, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { map, Observable } from 'rxjs';
// import {
//   DataStateEnum,
//   FetchMethode,
//   ProductState,
// } from '../../ngrx/productsState/products.reducer';
// import { ProductService } from '../../services/productService/product.service';
// import { EventType } from '../../models/common.model';
// import { SecurityService } from '../../security/security.service';
// import { forkJoin } from 'rxjs';
// import { HttpClient } from '@angular/common/http'

// @Component({
//   selector: 'app-searched-products-list',
//   templateUrl: './searched-products-list.component.html',
//   styleUrls: ['./searched-products-list.component.css'],
// })
// export class SearchedProductsListComponent implements OnInit {
//   productState$?: Observable<ProductState>;
//   public readonly ProductStateEnum = DataStateEnum;
//   public readonly fetchMethode = FetchMethode;
//   reviews: { userId: string; reviewText: string; rating: number; date: string }[] = [];
//  productReviewsCount: { [productId: string]: number } = {};

//   minAvailablePrice: number = 0;
//   maxAvailablePrice: number = 1000;
//   selectedMaxPrice: number = 0;
//   selectedSortType: string = '';

//   allProducts: any[] = [];
//   filteredProducts: any[] = [];
//   sortedProducts: any[] = [];

//   constructor(
//     private store: Store<any>,
//     private productService: ProductService,
//     private secSecurity: SecurityService,
//     private http: HttpClient
//   ) {}

//   ngOnInit(): void {
//     this.productState$ = this.store.pipe(map((state) => state.productState));

// this.store.select('searchState').subscribe(({ keyword, category }) => {
//   if (keyword !== '') {
//     this.store.dispatch(
//       new GetProductsPageByKeyWordAction({
//         pageSize: { page: this.currentPage, size: 6 },
//         data: keyword,
//       })
//     );
//   } else if (category !== 'ALL') {
//     this.store.dispatch(
//       new GetProductsPageByCategoryAction({
//         pageSize: { page: this.currentPage, size: 6 },
//         data: category,
//       })
//     );
//   } else {
//     this.store.dispatch(new GetProductsPageAction({ page: this.currentPage, size: 6 }));
//   }
// });

//     this.store.subscribe((s) => {
//       if (s.productState.dataState == this.ProductStateEnum.LOADED) {
//        const products = s.productState.products;
//        this.allProducts = products;

// if (products?.length) {
//   const prices = products.map(p => p.productPrice);
//   this.minAvailablePrice = Math.min(...prices);
//   this.maxAvailablePrice = Math.max(...prices);
//   this.selectedMaxPrice = this.maxAvailablePrice;

//   const ids = products.map(p => p.productId);
//   this.getReviews(ids);

//   this.applyFilterAndSort();
// }

//         if (s.productState.products[0] && this.secSecurity.profile) {
//           if (this.secSecurity.profile.id) {
//             if (s.productState.fetchMethode == FetchMethode.SEARCH_BY_CATEGORY)
//               this.productService.publishEvent(
//                 s.productState.products[0].productId,
//                 EventType.SEARCH_BY_CATEGORY,
//                 this.secSecurity.profile.id
//               );
//             if (s.productState.fetchMethode == FetchMethode.SEARCH_BY_KEYWORD)
//               this.productService.publishEvent(
//                 s.productState.products[0].productId,
//                 EventType.SEARCH_BY_KEYWORD,
//                 this.secSecurity.profile.id
//               );
//           }
//         }
//       }
//     });
//   }

// onPriceFilterChanged(maxPrice: number): void {
//   this.selectedMaxPrice = maxPrice;
//   this.applyFilterAndSort();
// }

// onSortChanged(sortType: string): void {
//   this.selectedSortType = sortType;
//   this.applyFilterAndSort();
// }

// applyFilterAndSort(): void {
//   this.filteredProducts = this.allProducts.filter(
//     product => product.productPrice <= this.selectedMaxPrice
//   );

//   this.sortedProducts = [...this.filteredProducts];

//   switch (this.selectedSortType) {
//     case 'price-asc':
//       this.sortedProducts.sort((a, b) => a.productPrice - b.productPrice);
//       break;
//     case 'price-desc':
//       this.sortedProducts.sort((a, b) => b.productPrice - a.productPrice);
//       break;
//     case 'date-newest':
//       this.sortedProducts.sort((a, b) =>
//         new Date(b.addingDate).getTime() - new Date(a.addingDate).getTime()
//       );
//       break;
//     case 'date-oldest':
//       this.sortedProducts.sort((a, b) =>
//         new Date(a.addingDate).getTime() - new Date(b.addingDate).getTime()
//       );
//       break;
//     case 'popular':
//       this.sortedProducts.sort((a, b) =>
//         (this.productReviewsCount[b.productId] || 0) - (this.productReviewsCount[a.productId] || 0)
//       );
//       break;
//   }
// }

// getReviews(productIds: string[]) {
//   const requests = productIds.map(productId =>
//     this.http.get<
//       { userId: string; reviewText: string; rating: number; date: string }[]
//     >(`http://localhost:8081/api/reviews?productId=${productId}`)
//   );

//   forkJoin(requests).subscribe({
//     next: (allReviews) => {
//       productIds.forEach((id, index) => {
//         this.productReviewsCount[id] = allReviews[index].length;
//       });
//     },
//     error: (error) => {
//       console.error('Ошибка при получении отзывов:', error);
//     },
//   });
// }
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-searched-products-list',
  templateUrl: './searched-products-list.component.html',
  styleUrls: ['./searched-products-list.component.css'],
})
export class SearchedProductsListComponent {}
