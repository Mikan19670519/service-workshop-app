import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss']
})
export class FieldErrorComponent implements OnInit {

  @Input() errorMessage: string;
  @Input() labelFor: string;
  @Input() hideIcon: boolean;

  constructor() { }

  ngOnInit() {
  }

}
