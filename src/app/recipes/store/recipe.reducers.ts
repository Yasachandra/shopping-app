import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../app.reducers';

export interface featureState extends fromApp.AppState{
    recipes: State
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
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
  	]
}

export function recipeReducer(state=initialState, action: RecipeActions.RecipeActions) {
    switch(action.type) {
        case (RecipeActions.SET_RECIPES):
            return {
                ...state, 
                recipes: [...action.payload]
            }
        case (RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case (RecipeActions.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe, ...action.payload.recipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case (RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload,1)
            return {
                ...state,
                recipes: oldRecipes
            };
        default:
            return state;
    }
}