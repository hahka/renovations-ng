import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { tap } from 'rxjs';
import { AuthService } from '../../core/services/api/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { REDIRECT_TO_PARAM_NAME } from '../../core/auth.guard';

@Component({
  selector: 'app-signin',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent {
  hide = signal(true);

  clickEvent(event: MouseEvent) {
    event.stopPropagation();
    this.hide.set(!this.hide());
  }

  redirectTo: string | null;
  readonly signinForm = new FormGroup({
    emailOrUsername: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    public authService: AuthService,
    public router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    this.redirectTo = activatedRoute.snapshot.queryParamMap.get(
      REDIRECT_TO_PARAM_NAME,
    );
  }

  signIn(e: Event) {
    e.stopPropagation();
    //______
    this.authService
      .signin('user1', 'password')
      .pipe(
        tap(() => {
          this.router.navigate([this.redirectTo || '']);
        }),
      )
      .subscribe();
    return;
    //______
    /*if (this.signinForm.valid) {
      const signin = this.signinForm.value;
      // TODO: hash paswword before send?
      if (signin.emailOrUsername && signin.password) {
        this.authService.signin(signin.emailOrUsername, signin.password).pipe(
          tap(() => {
            this.router.navigate([this.redirectTo || ""]);
          })
        ).subscribe();
      }
    }*/
  }
}
