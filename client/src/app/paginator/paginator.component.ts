import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Output() page_indexChange = new EventEmitter();
  page_index_val = 1;

  @Input()
  get page_index() {
    return this.page_index_val;
  }
  set page_index(val) {
    this.page_index_val = val;

    this.has_prev = (this.page_index > 1);

    this.page_indexChange.emit(this.page_index_val);
  }

  @Input() item_per_page = 10;
  @Input() item_name = "Items";
  @Input() has_next = false;
  has_prev = false;
  @Input() onChangeIndex: Function;

  constructor() { }

  ngOnInit() { }

  clickNext() {
    this.page_index++;
    this.has_next = false;

    if (this.onChangeIndex !== null && this.onChangeIndex !== undefined) {
      this.onChangeIndex(this.page_index_val);
    }
  }

  clickPrev() {
    this.page_index--;

    if (this.onChangeIndex !== null && this.onChangeIndex !== undefined) {
      this.onChangeIndex(this.page_index_val);
    }
  }
}
