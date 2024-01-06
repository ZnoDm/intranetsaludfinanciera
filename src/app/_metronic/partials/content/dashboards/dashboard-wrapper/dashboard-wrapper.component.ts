import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
})
export class DashboardWrapperComponent implements OnInit {
  demo: string;
  constructor(private layout: LayoutService) {}
  private subscriptions: Subscription[] = [];
  ngOnInit(): void {
    this.demo = this.layout.getProp('demo');
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }


}
