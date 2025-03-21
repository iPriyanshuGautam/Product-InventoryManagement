import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { By } from '@angular/platform-browser';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product items', () => {
    component.products = [
      { id: 1, name: 'Laptop', price: 1000 },
      { id: 2, name: 'Phone', price: 800 },
    ];
    fixture.detectChanges();

    const productElements = fixture.debugElement.queryAll(By.css('.product-item'));
    expect(productElements.length).toBe(2);
    expect(productElements[0].nativeElement.textContent).toContain('Laptop');
    expect(productElements[1].nativeElement.textContent).toContain('Phone');
  });

  it('should display "No products available" when products list is empty', () => {
    component.products = [];
    fixture.detectChanges();

    const noProductsElement = fixture.debugElement.query(By.css('.no-products'));
    expect(noProductsElement).toBeTruthy();
    expect(noProductsElement.nativeElement.textContent).toContain('No products available');
  });
});
