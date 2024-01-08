import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { io } from "socket.io-client";
import { Notification } from 'src/app/interfaces/notification';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  form!: FormGroup;
  errorsMessages: Array<any> = [];
  success: boolean = false;
  error: boolean = false;
  title = 'anuglar';
  notifications: Notification[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });

    const socket = io("http://localhost:3000");

    socket.on('notification', (notification: any) => {
      this.notifications.push(notification);
    });
  }

  get name() {
    return this.form.get('name')!;
  }

  get email() {
    return this.form.get('email')!;
  }

  get subject() {
    return this.form.get('subject')!;
  }

  get message() {
    return this.form.get('message')!;
  }

  hideAlert() {
    this.error = false;
    this.success = false;
  }

  clearForm() {
    this.form.get('name')?.setValue('');
    this.form.get('name')?.setErrors(null);

    this.form.get('email')?.setValue('');
    this.form.get('email')?.setErrors(null);

    this.form.get('subject')?.setValue('');
    this.form.get('subject')?.setErrors(null);

    this.form.get('message')?.setValue('');
    this.form.get('message')?.setErrors(null);
  }

  sendMail() {
    if(this.form.invalid) {
      return;
    }

    this.contactService.send(this.form.value)
    .subscribe({
      next: () => {
        this.success = true;
        this.clearForm();
      },
      error: (responseError) => {
        this.error = true;

        if(Array.isArray(responseError.error.message)) {
          this.errorsMessages = responseError.error.message;
        }
        else {
          this.errorsMessages[0] = responseError.error.message;
        }
      }
    });
  }
}
