import { Component, Output, EventEmitter } from '@angular/core'
import { DataStorageService } from '../../shared/data.storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    // @Output() featureSelected = new EventEmitter<string>();

    // onSelect(feature: string) {
    //     this.featureSelected.emit(feature);
    // }

    constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) { }

    onSaveData() {
        this.dataStorageService.storeRecipes().subscribe(
            (response) => {
                console.log(response);
            }
        );
    }

    getRecipes() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/signin']);
    }
}