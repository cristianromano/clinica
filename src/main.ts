import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from './app/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BlockUIModule } from 'ng-block-ui';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
  RecaptchaV3Module,
  RECAPTCHA_V3_SITE_KEY,
} from 'ng-recaptcha';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),

    appConfig.providers,
    importProvidersFrom(
      RecaptchaV3Module,
      BrowserAnimationsModule,
      BlockUIModule.forRoot(),
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage())
    ),
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6Lc3UAIqAAAAAIM_lf_FWM2I9xAVbky-2gezCZaw',
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Lc3UAIqAAAAAIM_lf_FWM2I9xAVbky-2gezCZaw',
      } as RecaptchaSettings,
    },
  ],
});
