import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
getText($event: Event): any {
  let ret = ($event.target as HTMLInputElement).innerText;
  console.log(ret);
  return ret;
}
editable: any;


updateEditable(event: { target: FocusEvent | any }, text: string='') {
  const key = event.target.getAttribute('ng-reflect-editable-key');
  const value = event.target.innerText;
  this.editable[key] = value;
}

}