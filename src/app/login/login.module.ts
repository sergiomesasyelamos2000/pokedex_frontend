import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ComponentsModule } from "../shared/components/components.module";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login.component";
import { LoginService } from "./login.service";

@NgModule({
  providers: [LoginService],
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, ComponentsModule],
  exports: [LoginComponent],
})
export class LoginModule {}
