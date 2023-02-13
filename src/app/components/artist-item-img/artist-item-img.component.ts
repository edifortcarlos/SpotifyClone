import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-artist-item-img',
  templateUrl: './artist-item-img.component.html',
  styleUrls: ['./artist-item-img.component.scss']
})
export class ArtistItemImgComponent implements OnInit {

  @Input()
  imageSrc = ''


  @Output()
  click = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {

  }

  onClick() {
    this.click.emit();
  }

}
