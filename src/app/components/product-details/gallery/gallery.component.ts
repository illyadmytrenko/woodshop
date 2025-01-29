import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  // @Input() product: Product|null =null;
  // selectedImage: product.productImagesBas64[0];

  selectedImage: string = '/assets/img/product_sample.png';

  changeImage(image: string) {
    this.selectedImage = image;
  }
}
