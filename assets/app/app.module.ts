import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes,RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { NoteComponent } from "./note/note.component";

const appRoutes: Routes = [
    { path: 'user', component: AuthComponent },
    { path: 'notes', component: NoteComponent },
];


@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        NoteComponent
    ],
    imports: [
        FormsModule,
        HttpModule,
        BrowserModule,
        RouterModule.forRoot(appRoutes)
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}