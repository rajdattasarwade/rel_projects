import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../product';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productDtl;
  constructor(private route:ActivatedRoute, private cart: CartService) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute:number = +routeParams.get('productId');
    
    this.productDtl = products.find(product => product.id === productIdFromRoute);
  }

  addToCart(){
    this.cart.addItemToCart(this.productDtl);
    window.alert("Product is added to cart");
  }

}
