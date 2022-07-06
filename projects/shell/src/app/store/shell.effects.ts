import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as ShellActions from './shell.actions';


@Injectable()
export class ShellEffect {
    constructor(
        private action$: Actions,
    ) { }
}
