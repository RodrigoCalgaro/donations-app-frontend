import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Collect } from 'src/app/modules/main/interfaces/collect';
import { CollectService } from 'src/app/modules/main/services/collect.service';

@Component({
  selector: 'app-collect-update',
  templateUrl: './collect-update.component.html',
  styleUrls: ['./collect-update.component.css']
})
export class CollectUpdateComponent implements OnInit {
  form!: FormGroup; 
  collect!: Collect;
  
  constructor(
    private fb: FormBuilder,
    private collectService: CollectService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.collectService.get().subscribe(res => {
      this.form = this.fb.group({
        startsDate: [res.startsDate, Validators.required],
        endsDate: [res.endsDate, Validators.required],
        targetAmount: [res.targetAmount, Validators.required],
        minDonationAllowed: [res.minDonationAllowed],
        suggestedDonation: [res.suggestedDonation],
      })
    })
  }

  onSubmit(): void {
    if (this.form.value.endsDate >= this.form.value.startsDate){
      this.collectService.update(this.form.value).subscribe(res => {
        this.toastr.success('Successfully Updated!');
      })
    } else {
      this.toastr.error('Start date cannot be higher than end date');
    }
  }
}
