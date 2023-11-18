import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`

  <app-title [title]="currentFramework()"></app-title>

  <pre>{{frameworkAsSignal() | json}}</pre>
  <pre>{{frameworkAsProperty | json}}</pre>

  `,

})
export default class ChangeDetectionComponent {

  public currentFramework= computed(
    ()=> `Change Decetion - ${this.frameworkAsSignal().name}`
  );

  public frameworkAsSignal= signal({
    name:'Angular',
    relaseaDate: 2016
  })
  public frameworkAsProperty= {
    name:'Angular',
    relaseaDate: 2016
  }

  constructor(){
    setTimeout(()=>{
      // this.frameworkAsProperty.name='React';

      this.frameworkAsSignal.update(value => {
        value.name = 'React';
        return {...value}

      })


       console.log('Hecho')
    }, 3000);
  }

}
