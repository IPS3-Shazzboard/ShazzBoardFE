import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ManualAddSongModalComponent } from './manual-add-song-modal.component';
import { AppComponent } from '../app.component';
import { ManualAddSongModalService } from '../manual-add-song-modal.service';

describe('ManualAddSongModalComponent', () => {
  let component: ManualAddSongModalComponent;
  let fixture: ComponentFixture<ManualAddSongModalComponent>;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManualAddSongModalComponent],
      providers: [
        HttpClient,
        HttpHandler,
        AppComponent,
        ManualAddSongModalComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManualAddSongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addSongEntry method', () => {
    let service = TestBed.inject(ManualAddSongModalComponent);
    spy = spyOn(service, 'addSongEntry');
    service.addSongEntry();
    expect(spy).toHaveBeenCalled();
  });

  it('should call close method', () => {
    let service = TestBed.inject(ManualAddSongModalComponent);
    spy = spyOn(service, 'close');
    service.close();
    expect(spy).toHaveBeenCalled();
  });
});
