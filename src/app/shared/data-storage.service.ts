import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService) {}

    storeRecipes(){
        // const headers = new HttpHeaders().set('Authorization','Bearer Rk330ST');
        // return this.httpClient.put('https://ng-recipe-book-4631e.firebaseio.com/recipe_list.json?',this.recipeService.getRecipes(),{
        //     observe:'body',
        //     params: new HttpParams().set('auth',token)
        // });
        // return this.httpClient.put('https://ng-recipe-book-4631e.firebaseio.com/recipe_list.json?auth='+token,this.recipeService.getRecipes(),{
        //     observe:'body',
        //     headers: headers
        // });
        const req = new HttpRequest('PUT','https://ng-recipe-book-4631e.firebaseio.com/recipe_list.json?',this.recipeService.getRecipes(),{
            reportProgress: true,
        });
        return this.httpClient.request(req)
    }

    getRecipes(){
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-4631e.firebaseio.com/recipe_list.json?',{
            observe:'body',
            responseType:'json',
        })
            .map(
                (recipes) => {
                    recipes.forEach(recipe => {
                        if(!recipe.ingredients)
                            recipe["ingredients"] = [];
                    });
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                    console.log("recipes",recipes);
                }
            );
    }
}