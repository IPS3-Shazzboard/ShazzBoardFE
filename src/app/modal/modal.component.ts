import { Component, Injectable, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  name: string | null = null;
  artist: string | null = null;
  duration: string | null = null;
  constructor(public modalRef: MdbModalRef<ModalComponent>) {}
}
