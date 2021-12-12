import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const name = this.form.value.name
    const surname = this.form.value.surname
    const email = this.form.value.email
    const password = this.form.value.password
    const passwordConfirm = this.form.value.passwordConfirm

    if (password == passwordConfirm){
      this.authService.signUp({ name, surname, email, password })
        .subscribe(res => {
          this.router.navigate(['/signin']);
          this.toastr.success(res.message)
        })
      } else {
        this.toastr.error(`Password and confirmation aren't equal`)
    }
  }
}
