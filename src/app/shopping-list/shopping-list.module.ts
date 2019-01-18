import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports:[
        ShoppingListRoutingModule,
        CommonModule,
        FormsModule
    ]
})

export class ShoppingListModule {}