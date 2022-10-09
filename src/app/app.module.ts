import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportComponent } from './components/report/report.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { JwtInterceptor } from './auth/interceptor/jwt.interceptor';
import { HttpResponseErrorCatcherInterceptor } from './interceptor/http-response-error-catcher.interceptor';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { AuthModule } from './auth/auth.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CodesComponent } from './components/codes/codes.component';
import { ProductsComponent } from './components/products/products.component';
import { MatTableModule } from '@angular/material/table';
import { CodeFormDialogComponent } from './components/codes/code-form-dialog/code-form-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductFormDialogComponent } from './components/products/product-from-dialog/product-from-dialog.component';
import { ReportFormDialogComponent } from './components/report/report-form-dialog/report-form-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { ProductDeleteDialogComponent } from './components/products/product-delete-dialog/product-delete-dialog.component';
import { CodesDeleteDialogComponent } from './components/codes/codes-delete-dialog/codes-delete-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    CodesComponent,
    ProductsComponent,
    CodeFormDialogComponent,
    ProductFormDialogComponent,
    ReportFormDialogComponent,
    ProductDeleteDialogComponent,
    CodesDeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AuthModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseErrorCatcherInterceptor,
      multi: true,
    },

    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
