import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistItemImgComponent } from './artist-item-img.component';

describe('ArtistItemImgComponent', () => {
  let component: ArtistItemImgComponent;
  let fixture: ComponentFixture<ArtistItemImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistItemImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistItemImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
