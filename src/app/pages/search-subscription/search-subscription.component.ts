import { SubscriptionService } from '../../services/subscription.service';
import { RangoCinefiloService } from '../../services/rangoCinefilo.service';
import { Subscription } from '../../interface/subscription';
import { RangoCinefilo } from '../../interface/rangoCinefilo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-subscription',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-subscription.component.html',
  styleUrls: ['./search-subscription.component.css']
})
export class SearchSubscriptionComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  input = '';
  selected = 'rangoCinefilo';

  
  subscriptionService: SubscriptionService = inject(SubscriptionService);
  rangoCinefiloService: RangoCinefiloService = inject(RangoCinefiloService);

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.input = queryParams['query'] || ''; 
    });
  }

  selectSearchType(type: string) {
    this.selected = type; 
  }

  searchRangoCinefilo(): void {
    if (this.input) {
      console.log('searchRangoCinefilo called with input:', this.input);
      this.router.navigate(['/search/rangoCinefilo'], { queryParams: { query: this.input } });
    }
  }

  searchSubscription(): void {
    if (this.input) {
      console.log('searchSubscription called with input:', this.input);
      this.router.navigate(['/search/subscriptions'], { queryParams: { query: this.input } });
    }
  }
}

