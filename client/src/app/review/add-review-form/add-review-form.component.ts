import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ReviewService } from '../review.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-review-form',
  templateUrl: './add-review-form.component.html',
  styleUrls: ['./add-review-form.component.scss']
})
export class AddReviewFormComponent implements OnInit {
  reviewForm = new FormGroup({
    provider_id: new FormControl(''),
    rating: new FormControl(0),
    text: new FormControl('')
  });
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

  updateRating(e) {
    this.reviewForm.patchValue({
      rating: e
    });
  }
}
