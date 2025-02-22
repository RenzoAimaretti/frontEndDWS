import { Component } from '@angular/core';
import { SubscriptionItemComponent } from '../../shared/subscription-item/subscription-item.component.js';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../services/subscription.service.js';
import { Subscription } from '../../interface/subscription.js';

@Component({
  selector: 'app-upgrade-subscription',
  standalone: true,
  imports: [SubscriptionItemComponent, CommonModule],
  templateUrl: './upgrade-subscription.component.html',
  styleUrl: './upgrade-subscription.component.css',
})
export class UpgradeSubscriptionComponent {
  subscriptions: Subscription[] = [];
  constructor(private subscriptionService: SubscriptionService) {}
  ngOnInit(): void {
    this.subscriptionService
      .getSubscriptions()
      .toPromise()
      .then((subscriptions) => {
        this.subscriptions = subscriptions!;
      });
  }
}
