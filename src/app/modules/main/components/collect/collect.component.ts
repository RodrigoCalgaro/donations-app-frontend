import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Donation } from 'src/app/modules/admin/interfaces/donation';
import { DonationService } from 'src/app/modules/admin/services/donation.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { User } from 'src/app/modules/auth/interfaces/user';
import { Collect } from '../../interfaces/collect';
import { CollectService } from '../../services/collect.service';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.css']
})
export class CollectComponent implements OnInit {
  collect!: Collect;
  user!: User;
  widthStyle = "width: 0%";
  form!: FormGroup;
  minDonationAllowed = 1;
  suggestedDonation = 1;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private collectService: CollectService,
    private donationService: DonationService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {

  }

  ngOnInit(): void {
    let undoneDonation = sessionStorage.getItem('UNDONE_DONATION');

    if (undoneDonation) {
      if(this.authService.currentUser){
        this.makeDonation(JSON.parse(undoneDonation))
      } else {
        sessionStorage.removeItem('UNDONE_DONATION')
      }
    }

    this.collectService.get().subscribe(collect => {
      this.collect = collect;
      this.widthStyle = "width: " + collect.percentageRaised + "%";
      if (this.collect.minDonationAllowed) {
        this.minDonationAllowed = this.collect.minDonationAllowed
      }
      if (this.collect.suggestedDonation) {
        this.suggestedDonation = this.collect.suggestedDonation
      }
      this.form = this.fb.group({
        amount: [this.suggestedDonation, [Validators.required, Validators.min(this.minDonationAllowed)]]
      })
      this.loading = false;
    })
  }

  onSubmit() {
    this.user = this.authService.currentUser

    if (this.user) {
      if (this.form.valid) {
        this.makeDonation(this.form.value)
      }
    } else {
      sessionStorage.setItem('UNDONE_DONATION', JSON.stringify(this.form.value));
      this.router.navigate(['/signin']);
    }
  }

  makeDonation(donation: Donation) {
    this.donationService.add(donation).subscribe(res => {
      sessionStorage.removeItem('UNDONE_DONATION')
      this.ngOnInit();
      this.toastr.success(`Your donation of $${ donation.amount.toFixed(2) } was succesfully made!`);
    })
  }
}
