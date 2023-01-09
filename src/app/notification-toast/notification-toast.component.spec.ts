import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { Song } from '../song';

import { NotificationToastComponent } from './notification-toast.component';

describe('NotificationToastComponent', () => {
  let component: NotificationToastComponent;
  let fixture: ComponentFixture<NotificationToastComponent>;
  let toastrService: ToastrService;

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
    toastrService = TestBed.inject(ToastrService);
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
    expect(toastrService.success).toHaveBeenCalledWith(
      'Song with name \x22' +
        song!.name +
        '\x22 and artist \x22' +
        song!.artist +
        '\x22 has been successfully added. Please refresh the page.',
      'Success',
      Object({ closeButton: true })
    );
  });

  it('returns invalid error', () => {
    spyOn(toastrService, 'error');
    component.showNotification(400);
    expect(toastrService.error).toHaveBeenCalledWith(
      'Invalid song entry. Please check if all input fields are correctly filled in.',
      'Invalid input.',
      Object({ closeButton: true })
    );
  });

  it('returns duplicate error', () => {
    spyOn(toastrService, 'error');
    let song: Song = new Song('song1', 'artist1', 'duration', '');
    component.showNotification(409, song);
    expect(toastrService.error).toHaveBeenCalledWith(
      'Song with name \x22' +
        song!.name +
        '\x22 and artist \x22' +
        song!.artist +
        '\x22 already exists.',
      'Duplicate entry.',
      Object({ closeButton: true })
    );
  });
});
