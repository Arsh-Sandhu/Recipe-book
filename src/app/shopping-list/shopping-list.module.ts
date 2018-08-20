import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// const shoppingListRoutes: Routes = [
//     { path: 'shopping-list', component: ShoppingListComponent },
// ];

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        //RouterModule.forChild(shoppingListRoutes),
        CommonModule,
        FormsModule
    ],
    exports: [
        
    ]
})
export class ShoppingListModule {

}