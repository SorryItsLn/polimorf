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
import { PolymorpheusTemplate } from './polimorfs-example/number1/directives/template';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';

@NgModule({
  declarations: [
    AppComponent,
    Example1Component,
    TabsComponent,
    PolymorpheusTemplate,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    PolymorpheusModule,
    CommonModule,

    BrowserModule,
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
