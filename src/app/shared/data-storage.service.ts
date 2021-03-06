import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService) {}

    storeRecipes(){
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
                }
            );
    }
}