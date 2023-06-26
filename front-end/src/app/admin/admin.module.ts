import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';

@NgModule({
  declarations: [AdminComponent, AdminPageComponent, AdminFooterComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
