import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.selctedRecipe = this.recipeService.getRecipeById(this.id);
      }
    )
  }
  //@Input() selctedRecipe: Recipe;
  selctedRecipe: Recipe;
  id: number;

  addToShoppinglist() {
    this.recipeService.addIngredientsToShoppingList(this.selctedRecipe.Ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    //this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
