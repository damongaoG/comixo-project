import {NgModule} from "@angular/core";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./home.component";
import {HeaderComponent} from "../../shared/components/header/header.component";

@NgModule({
  imports: [HomeRoutingModule, HeaderComponent],
  declarations: [HomeComponent],
  providers: []
})
export class HomeModule {

}
