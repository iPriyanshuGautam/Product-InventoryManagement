import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details when product data is available', () => {
    component.product = { id: 1, name: 'Headphones', price: 200 };
    fixture.detectChanges();

    const productNameElement = fixture.debugElement.query(By.css('.product-name'));
    expect(productNameElement.nativeElement.textContent).toContain('Headphones');
  });

  it('should display "Product not found" when no product data is available', () => {
    component.product = null;
    fixture.detectChanges();

    const notFoundElement = fixture.debugElement.query(By.css('.not-found'));
    expect(notFoundElement.nativeElement.textContent).toContain('Product not found');
  });
});
