import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'recipes', loadChildren: '../recipes/recipes.module#RecipesModule'}
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes, {preloadingStrategy:PreloadAllModules})],
    exports:[RouterModule]
})

export class AppRoutingModule {}