import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Subscribable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  @ViewChild('form') form: NgForm;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (id: number) => {
        this.editMode = true;
        this.editedItemIndex = id;
        this.editedItem = this.slService.getIngredientByIndex(id);
        this.form.setValue(
          {
            'name': this.editedItem.name,
            'amount': this.editedItem.amount
          }
        )
      }
    )
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredients(this.editedItemIndex, newIngredient);
    }
    else {
      this.slService.addIngredients(newIngredient);
    }
    this.editMode = false;
    this.form.reset();
  }


  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  // //@Output() onAddIngredient = new EventEmitter<Ingredient>()
  // @ViewChild('amountInput') amountTxt: ElementRef

  // onAddClicked(nameInput: HTMLInputElement) {
  //   //this.onAddIngredient.emit({ name: nameInput.value, amount: this.amountTxt.nativeElement.value })
  //   this.slService.addIngredients(new Ingredient(nameInput.value, this.amountTxt.nativeElement.value));
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
