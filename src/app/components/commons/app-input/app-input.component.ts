import { Component, OnInit, Input} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss'],
  imports: [FormsModule,ReactiveFormsModule],
})
export class AppInputComponent  implements OnInit {

  @Input() label: string = '';
  @Input() controlName: any;
  @Input() type: string = '';

  constructor() { }

  ngOnInit() {}

}
