import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Example1Component } from './polimorfs-example/number1/example1/example1.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { CommonModule } from '@angular/common';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { SelectComponent } from './components/select/select.component';
import { TuiPortalModule } from '@taiga-ui/cdk';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, Example1Component, TabsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiPortalModule,
    PolymorpheusModule,
    SelectComponent,
    HttpClientModule,
    CommonModule,
    TuiRootModule,
    BrowserModule,
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
