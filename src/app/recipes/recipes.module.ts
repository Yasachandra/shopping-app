import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "../auth/auth-guard.service";
import { recipeReducer } from "./store/recipe.reducers";
import { EffectsModule } from "@ngrx/effects";
import { RecipeEffects } from "./store/recipe.effects";

@NgModule({
    declarations:[
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeItemComponent,
        RecipeListComponent,
        RecipesComponent,
        RecipeStartComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule,
        StoreModule.forFeature('recipes',recipeReducer),
        EffectsModule.forFeature([RecipeEffects])
    ],
    providers: [AuthGuard]
})

export class RecipesModule {}