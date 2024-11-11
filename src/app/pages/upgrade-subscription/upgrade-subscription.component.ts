import { Component } from '@angular/core';
import { SubscriptionItemComponent } from '../../shared/subscription-item/subscription-item.component';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../services/subscription.service';
import { Subscription } from '../../interface/subscription';

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
