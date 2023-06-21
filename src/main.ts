import {importProvidersFrom} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {VERSION as CDK_VERSION} from '@angular/cdk';
import {VERSION as MAT_VERSION, MatNativeDateModule} from '@angular/material/core';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
