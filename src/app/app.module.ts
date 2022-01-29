import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoggedGuard } from './auth/guards/logged.guard';
import { AuthInterceptor } from './auth/interceptor/auth.interceptor';
import { AuthService } from './auth/service/auth.service';
import { LoginModule } from './login/login.module';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ComponentsModule } from './shared/components/components.module';
import { GlobalExceptionHandler } from './shared/error/handler/GlobalExceptionHandler';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { UserModule } from './user/user.module';

@NgModule({
  providers: [
    AuthService,
    AuthGuard,
    LoggedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    GlobalExceptionHandler,
    { provide: ErrorHandler, useClass: GlobalExceptionHandler },
  ],
  declarations: [AppComponent, NotFoundComponent, LogoutComponent],
  imports: [
    LoginModule,
    UserModule,
    SignUpModule,

    AppRoutingModule,
    ComponentsModule,
    SharedModule,
    MaterialModule,

    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
