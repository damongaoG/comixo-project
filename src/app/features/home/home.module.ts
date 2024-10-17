import {NgModule} from "@angular/core";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./home.component";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {CopyRightComponent} from "../../shared/components/copy-right/copy-right.component";
import {BannerComponent} from "../../shared/components/banner/banner.component";
import {AboutComponent} from "../../shared/components/about/about.component";
import {BrandComponent} from "../../shared/components/brand/brand.component";

@NgModule({
  imports: [HomeRoutingModule, HeaderComponent, FooterComponent, CopyRightComponent, BannerComponent, AboutComponent, BrandComponent],
  declarations: [HomeComponent],
  providers: []
})
export class HomeModule {

}
