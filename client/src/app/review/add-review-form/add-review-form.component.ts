import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ReviewService } from '../review.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-add-review-form',
  templateUrl: './add-review-form.component.html',
  styleUrls: ['./add-review-form.component.scss']
})
export class AddReviewFormComponent implements OnInit {
  reviewForm = new FormGroup({
    provider_id: new FormControl(''),
    rating: new FormControl(0),
    text: new FormControl('', Validators.required),
    date: new FormControl(''),
    reviewer: new FormControl('')
  });
  error = false;
  errorMessage: string;
  date: string = new Date().toLocaleDateString();

  constructor(
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reviewForm.patchValue({
      provider_id: this.data.provider_id
    });
  }

  ngOnInit() {}

  createReview() {
    if (this.reviewForm.invalid) {
      this.error = true;
      this.errorMessage = 'Please explain your rating';
      return;
    }
    if (this.reviewForm.get('rating').value === 0) {
      this.error = true;
      this.errorMessage = 'Rate the business to submit your review';
      return;
    }
    this.reviewForm.patchValue({date: this.date});
    this.reviewService.createReview(this.reviewForm);
  }

  updateRating(e) {
    this.reviewForm.patchValue({
      rating: e
    });
  }
}
