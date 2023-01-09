import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { Song } from '../song';

import { NotificationToastComponent } from './notification-toast.component';

describe('NotificationToastComponent', () => {
  let component: NotificationToastComponent;
  let fixture: ComponentFixture<NotificationToastComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    // toastrService = jasmine.createSpyObj<ToastrService>('ToastrService', [
    //   'error',
    //   'success',
    // ]);
    await TestBed.configureTestingModule({
      declarations: [NotificationToastComponent],
      providers: [{ provide: toastrService, useValue: ToastrService }],
      imports: [
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-bottom-right',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('returns success notification', () => {
    spyOn(toastrService, 'success');
    let song: Song = new Song('song1', 'artist1', 'duration', 'coverArt', 1);
    component.showNotification(200, song);
    expect(toastrService.success).toHaveBeenCalled();
  });
});
