import {Component} from '@angular/core';

interface CalcGroup {
  first: CalcVar;
  second: CalcVar;
  operation: CalcOperations;
}

interface CalcVar {
  value: number;
  modificator: CalcModifiers
}

enum CalcOperations {
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '*',
  DIVIDE = '/'
}

enum CalcModifiers {
  SIN = 'SIN',
  COS = 'COS',
  SQUARE = 'SQUARE',
  NONE = 'NONE'
}

@Component({
  selector: 'my-calculator',
  templateUrl: './my-calculator.component.html',
  styleUrl: './my-calculator.component.scss'
})
export class MyCalculatorComponent {
  public calcOperations = CalcOperations;
  public calcModifiers = CalcModifiers;
  public calcGroups: CalcGroup[] = [
    {
      first: {
        value: 5,
        modificator: CalcModifiers.NONE
      },
      second: {
        value: 10,
        modificator: CalcModifiers.NONE,
      },
      operation: CalcOperations.PLUS
    }
  ]

  public history: string[] = []

  public operationsBetweenGroups: CalcOperations[] = [];

  public result?: number;

  public addGroup(): void {
    this.calcGroups.push({
      first: {
        value: 0,
        modificator: CalcModifiers.NONE
      },
      second: {
        value: 0,
        modificator: CalcModifiers.NONE
      },
      operation: CalcOperations.PLUS
    })
  }

  public removeGroup(index: number): void {
    this.calcGroups.splice(index, 1)
  }

  // public first: number = 1;
  // public second: number = 1
  //
  // public operation: string = '+'
  //
  // public operations: string[] = ['+', '-', '*', '/']
  //
  // public result?: number = undefined
  // public calc(){
  //   console.log(this.result)
  //   console.log(this.operation);
  //
  //   switch (this.operation){
  //     case '+':
  //       this.result = this.first + this.second
  //       break
  //     case '-':
  //       this.result = this.first - this.second
  //       break
  //     case '*':
  //       this.result = this.first * this.second
  //       break
  //     case '/':
  //       this.result = this.first / this.second
  //   }
  // }
}
