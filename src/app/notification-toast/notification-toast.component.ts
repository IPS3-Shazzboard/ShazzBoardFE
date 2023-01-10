import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Song } from '../song';

@Component({
  selector: 'app-notification-toast',
  templateUrl: './notification-toast.component.html',
  styleUrls: ['./notification-toast.component.scss'],
})
export class NotificationToastComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

  showNotification(httpCode: number, song?: Song): void {
    switch (httpCode) {
      case 200:
        this.toastr.success(
          'Song with name \x22' +
            song!.name +
            '\x22 and artist \x22' +
            song!.artist +
            '\x22 has been successfully added. Please refresh the page.',
          'Success',
          { closeButton: true }
        );
        break;
      case 400:
        this.toastr.error(
          'Invalid song entry. Please check if all input fields are correctly filled in.',
          'Invalid input.',
          { closeButton: true }
        );
        break;
      case 409:
        this.toastr.error(
          'Song with name \x22' +
            song!.name +
            '\x22 and artist \x22' +
            song!.artist +
            '\x22 already exists.',
          'Duplicate entry.',
          { closeButton: true }
        );
        break;
      default:
        this.toastr.error(
          'An unexpected error has occured. Please contact support.',
          'Unexpected error',
          { closeButton: true }
        );
        break;
    }
  }
}
