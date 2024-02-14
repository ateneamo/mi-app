import { Routes,RouterModule } from '@angular/router';
import { TicComponent } from './tic/tic.component';
import { ModuleWithProviders } from '@angular/core';



export const routes: Routes = [
    {path: 'app-tic', component: TicComponent}
];
export const routing: ModuleWithProviders<any>  = RouterModule.forRoot(routes);
