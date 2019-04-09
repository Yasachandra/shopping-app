import { Effect, Actions } from "@ngrx/effects";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { switchMap, withLatestFrom, map } from 'rxjs/operators';

import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';

import { Recipe } from "../recipe.model";

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .pipe(switchMap((action: RecipeActions.FetchRecipes)=> {
        return this.httpClient.get<Recipe[]>('https://ng-recipe-book-4631e.firebaseio.com/recipe_list.json?',{
            observe:'body',
            responseType:'json',
        });
    }),map(
        (recipes) => {
            recipes.forEach(recipe => {
                if(!recipe.ingredients)
                    recipe["ingredients"] = [];
            });
            return {
                type: RecipeActions.SET_RECIPES,
                payload: recipes
            };
        }
    ))
    

    @Effect({dispatch:false})
    recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .pipe(withLatestFrom(this.store.select('recipes')),
            switchMap(([action,state])=>{
            const req = new HttpRequest('PUT','https://ng-recipe-book-4631e.firebaseio.com/recipe_list.json?',state.recipes,{
            reportProgress: true,
            });
            return this.httpClient.request(req)
        }));

    constructor (private actions$ : Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipe.featureState>) {}
}