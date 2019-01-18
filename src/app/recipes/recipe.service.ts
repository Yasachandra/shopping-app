import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class RecipeService {
	recipesChanged = new Subject<Recipe[]>();

	private recipes: Recipe[] = [
    	new Recipe(
    		'Cucumber Sandwich', 
    		'A delicious sandwich for snacks', 
    		'http://ksmartstatic.sify.com/cmf-1.0.0/appflow/bawarchi.com/Image/oetushaajcddc_bigger.jpg',
    		[
    			new Ingredient('Bread slice',2),
    			new Ingredient('Cucumber slice',6)
    		]),
    	new Recipe(
    		'Bread Butter Sandwich', 
    		'A light breakfast item', 
    		'https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/fc/3061458-poster-p-1-butter-is-better-for-you-than-the-bread-you-spread-it-on.jpg',
    		[
    			new Ingredient('Bread slice',2),
    			new Ingredient('Butter slice',4)
    		])
  	];

	  constructor(){}
	  
	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipesChanged.next(this.recipes.slice());
	}

  	getRecipes() {
  		return this.recipes.slice();
  	}

	getRecipe(index: number) {
		return this.recipes[index];
	}
	
	addRecipe(recipe:Recipe) {
		this.recipes.push(recipe);
		this.recipesChanged.next(this.recipes.slice());
	}

	updateRecipe(index:number, recipe: Recipe) {
		this.recipes[index] = recipe;
		this.recipesChanged.next(this.recipes.slice());
	}

	deleteRecipe(index: number) {
		this.recipes.splice(index,1);
		this.recipesChanged.next(this.recipes.slice());
	}
}