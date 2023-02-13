import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.scss']
})
export class RecentSearchComponent implements OnInit {

  recentSearchs = [
    'Top Angola', 'Top Global', 'Kuduro', 'Kizomba', 'Top Semba', 'Funk Hits'
  ]

  searchFiled = '';

  constructor() { }

  ngOnInit(): void {
  }

  setSearch(searchText: string) {
    this.searchFiled = searchText;
  }

  goSearch() {
    console.log('Pesquisando')
  }

}
