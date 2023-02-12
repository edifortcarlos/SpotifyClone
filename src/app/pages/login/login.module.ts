import { CommonModule } from '@angular/common';
import { NgModule, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';

const loginRouter: Routes = [
    {
        path: '',
        component: LoginComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(loginRouter)
    ],
    exports: [],
    declarations: [LoginComponent],
    providers: [],
})
export class LoginModule { }
