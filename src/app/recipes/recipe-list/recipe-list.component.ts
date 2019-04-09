import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import * as fromRecipe from '../store/recipe.reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;

  constructor(private store: Store<fromRecipe.featureState>) { }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }
}
