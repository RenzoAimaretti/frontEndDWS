import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionService } from '../../services/subscription.service'; 
import { Subscription } from '../../interface/subscription'; 
import { CommonModule } from '@angular/common'
@Component({
  selector: 'app-show-subscriptions',
  standalone:true,
  templateUrl: './show-subscriptions.component.html',
  styleUrls: ['./show-subscriptions.component.css'],
  imports: [CommonModule]

})
export class ShowSubscriptionsComponent implements OnInit {
  searchTerm: string = '';
  results: Subscription[] = []; 

  constructor(private route: ActivatedRoute, private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['query'];
      this.fetchResults();
    });
  }

  fetchResults() {
    if (this.searchTerm) {
      this.subscriptionService.searchSubscription(this.searchTerm).subscribe(result => {
        this.results = result;
      });
    }
  }
}
