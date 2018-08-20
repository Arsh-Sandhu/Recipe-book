import { Injectable } from "@angular/core";
// import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {

    }

    storeRecipes() {
        const tok = this.authService.getToken();
        //const header = new HttpHeaders().set('authorization': '');

        // return this.http.put('https://<firebaseurl>/recipes.json?auth=' + tok,
        //     this.recipeService.getRecipes());

        // //Passing query params and header with httpClient
        // return this.httpClient.put('https://<firebaseurl>/recipes.json',
        //     this.recipeService.getRecipes(),
        //     {
        //         observe: 'body',
        //         params: new HttpParams().set('auth', tok)
        //         //headers: header
        //     });

        //Request progress

        const req = new HttpRequest('PUT', 'https://<firebaseurl>/recipes.json',
            this.recipeService.getRecipes(), { reportProgress: true });
        return this.httpClient.request(req);
    }

    getRecipes() {
        const tok = this.authService.getToken();
        // this.httpClient.get<Recipe[]>('https://<firebaseurl>/recipes.json?auth=' + tok)
        this.httpClient.get<Recipe[]>('https://<firebaseurl>?auth=' + tok,
            { observe: 'body', responseType: 'json' })
            .map(
                (recipes) => {
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );

        // this.httpClient.get('https://<firebaseurl>/recipes.json?auth=' + tok)
        //     .map(
        //         (response: Response) => {
        //             const recipes: Recipe[] = response.json();
        //             for (let recipe of recipes) {
        //                 if (!recipe['ingredients']) {
        //                     recipe['ingredients'] = [];
        //                 }
        //             }
        //             return recipes;
        //         }
        //     )
        //     .subscribe(
        //         (recipes: Recipe[]) => {
        //             this.recipeService.setRecipes(recipes);
        //         }
        //     );
    }
}