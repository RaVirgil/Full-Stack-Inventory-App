import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
})
export class ScanComponent implements OnInit {
  torchEnable = true;
  tryHarder = false;
  currentDevice: MediaDeviceInfo = null;
  formats = [BarcodeFormat.QR_CODE];
  availableDevices: MediaDeviceInfo[];
  hasPermission: boolean=true;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onHasPermission(permission: boolean) {
    this.hasPermission = permission;
    console.log("Permission "+ permission);
  }

  onCamerasFound(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices;
    devices.forEach((e) => console.log(e));
  }
  onScanSucces(data: string) {
    alert('Data from QR+' + data);
    this.router.navigate(['/item/' + data]);
  }
}
