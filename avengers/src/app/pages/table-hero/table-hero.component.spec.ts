import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHeroComponent } from './table-hero.component';

describe('TableHeroComponent', () => {
  let component: TableHeroComponent;
  let fixture: ComponentFixture<TableHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
