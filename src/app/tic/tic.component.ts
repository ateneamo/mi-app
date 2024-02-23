import { Component, Output,EventEmitter, NgModule} from '@angular/core';
import { MapComponent } from '../map/map.component';


@Component({
  selector: 'app-tic',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './tic.component.html',
  styleUrl: './tic.component.css'
})
export class TicComponent {
  
}
