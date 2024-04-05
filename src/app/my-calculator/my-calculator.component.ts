import { Component } from '@angular/core';

interface CalcGroup {
  first: CalcVar;
  second: CalcVar;
  operation: CalcOperations;
}

interface CalcVar {
  value: number;
  modificator: CalcModifiers;
}

enum CalcOperations {
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
}

enum CalcModifiers {
  SIN = 'SIN',
  COS = 'COS',
  SQUARE = 'SQUARE',
  NONE = 'NONE',
}

@Component({
  selector: 'my-calculator',
  templateUrl: './my-calculator.component.html',
  styleUrl: './my-calculator.component.scss',
})
export class MyCalculatorComponent {
  public calcOperations = CalcOperations;
  public calcModifiers = CalcModifiers;
  public calcGroups: CalcGroup[] = [
    {
      first: {
        value: 5,
        modificator: CalcModifiers.NONE,
      },
      second: {
        value: 10,
        modificator: CalcModifiers.NONE,
      },
      operation: CalcOperations.PLUS,
    },
  ];

  public history: string[] = [];

  public operationsBetweenGroups: CalcOperations[] = [];

  public result?: number;

  public addGroup(): void {
    this.calcGroups.push({
      first: {
        value: 0,
        modificator: CalcModifiers.NONE,
      },
      second: {
        value: 0,
        modificator: CalcModifiers.NONE,
      },
      operation: CalcOperations.PLUS,
    });

    this.operationsBetweenGroups.push(CalcOperations.PLUS);
  }

  public removeGroup(index: number): void {
    this.calcGroups.splice(index, 1);
  }

  public calcGroup() {
    let result = 0;

    let tempHistory: string[] = [];

    this.calcGroups.forEach((group, i) => {
      if (i === 0) {
        result = this.calc(
          this.calcValueWithModif(group.first),
          this.calcValueWithModif(group.second),
          group.operation
        );
      } else {
        let tempResult = this.calc(
          this.calcValueWithModif(group.first),
          this.calcValueWithModif(group.second),
          group.operation
        );
        result = this.calc(result, tempResult, this.operationsBetweenGroups[i - 1]);
      }
      tempHistory.push(
        `
        (
          ${group.first.modificator !== CalcModifiers.NONE ? group.first.modificator : ''} ${group.first.value}
          ${group.operation}
          ${group.second.modificator !== CalcModifiers.NONE ? group.second.modificator : ''} ${group.second.value}
          )
        `
      );

      console.log(tempHistory);
    });

    tempHistory.push(`= ${result}`);
    this.history.push(tempHistory.join(' '));

    this.result = result;
  }

  public calcValueWithModif(value: CalcVar): number {
    switch (value.modificator) {
      case CalcModifiers.NONE:
        return value.value;
      case CalcModifiers.COS:
        return Math.cos(value.value);
      case CalcModifiers.SIN:
        return Math.sin(value.value);
      case CalcModifiers.SQUARE:
        return Math.sqrt(value.value);
    }
  }

  public calc(first: number, second: number, operation: CalcOperations): number {
    switch (operation) {
      case CalcOperations.PLUS:
        return first + second;
      case CalcOperations.MINUS:
        return first - second;
      case CalcOperations.MULTIPLY:
        return first * second;
      case CalcOperations.DIVIDE:
        return first / second;
    }
  }
}
