import { CommonModule } from '@angular/common';
import { Component, inject, Injector, OnInit, Signal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  // 1. Create an observable called number$ that emits an integer value every second
  /*   number$ = interval(1000); */
  number!: Signal<number>;
  myName$!: Observable<string>;
  private injector = inject(Injector);
  // 2. Convert the observable to a signal called number from the number$ observable.
  // 3. Add an element in the UI that displays the value of the 'number' signal.


  readonly myName = signal('John Doe');
  // 4. Create an observable called myName$ from the "myName" signal
  // 5. Subscribe to myName$ and log the value to the console so that you log every name change from the UI.
  constructor() {
    this.myName$?.subscribe(n => {
      console.log(n);
    })
  }

  ngOnInit() {
    const number$ = interval(1000);
    this.number = toSignal(number$, {
      initialValue: 0,
      injector: this.injector
    });
    this.myName$ = toObservable(this.myName, {
      injector: this.injector
    });
    // 6. challenge - repeat steps 1 - 4 in this method
  }

}
