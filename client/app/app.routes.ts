import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/secure/signup.component';
import { SignInComponent } from './pages/secure/signin.component';

const appRoutes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'signup',
		component: SignUpComponent
	},
	{
		path:'signin',
		component: SignInComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);