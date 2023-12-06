import { Component } from '@angular/core';
import {
  DeviceMotion,
  DeviceMotionAccelerationData,
} from '@ionic-native/device-motion/ngx';
import {
  DeviceOrientation,
  DeviceOrientationCompassHeading,
} from '@ionic-native/device-orientation/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';
// import { SensorType } from '@danyalwe/capacitor-sensors';
// import { Plugins } from '@capacitor/core';
// const { SensorsPlugin } = Plugins;
// import * as SensorsPlugin from '@danyalwe/capacitor-sensors';
// import SensorsPlugin from '@danyalwe/capacitor-sensors';
// import { SensorType, Sensors } from '@danyalwe/capacitor-sensors';
import { Example } from 'my-light-sensor-plugin';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
   providers: [Sensors]
})
export class Tab1Page {
  lightData: unknown;
  lightLevel: unknown;

  device: any = 0;
  CurrentLocation: number | null = 0;
  lightValue: any ;
  androidPlatform?: boolean;
  SensorslightValue: any=0;
  AccelerationX: any;
  AccelerationY: any;
  AccelerationZ: any;
  AccelerationCounter: any;
  Azimuth: any;
  Pitch: any;
  Roll: any;

  constructor(
    private platform: Platform,
    private deviceMotion: DeviceMotion,
    private deviceOrientation: DeviceOrientation,
    private sensors: Sensors,

  ) {}
  ngOnInit() {
    this.getLightSensor();
    this.getAcceleration();
    this.getOrientation();
    // Example.addListener('acceleration', (acceleration:any) => {
    //   this.AccelerationX=acceleration.x
    //   this.AccelerationY=acceleration.y;
    //   this.AccelerationZ=acceleration.z;
    //   this.AccelerationCounter=acceleration.i;
    //   console.log('Acceleration X:', acceleration.x);
    //   console.log('Acceleration Y:', acceleration.y);
    //   console.log('Acceleration Z:', acceleration.z);
    // });
    
    // Example.enableAcceleration();

  //   this.androidPlatform=this.platform.is('android');
  //   if (this.platform.is('android')) {
  //   Example.addListener('light', (info: any) => {
  //     this.lightValue=info.value;
  //     console.log('Light level:', info.value);
  //   });
  
  //   Example.enable();
  // }

  }
  
  // ngOnDestroy() {
   
  //   Example.disable();
  //   Example.disableAcceleration();
    
  // }
  
  // ngOnInit() {
    // Sensors.addListener('AMBIENT_LIGHT', (event: any) => {
    //   console.log('Light sensor data:', event);
    //   this.lightValue=event;
    //   // Handle the light sensor data here
    // });
  // }

  // async startLightSensor() {
  //   await Sensors.start({ type: SensorType.AMBIENT_LIGHT });
  // }

  // async stopLightSensor() {
  //   await Sensors.stop({ type: SensorType.AMBIENT_LIGHT });;
  // }

  async testPluginMethod(msg: string) {
    await Example.testPluginMethod({ msg: msg }).then((res: any) => {
      alert('return value is' + JSON.stringify(res.value));
    });
  }

  startDeviceMotion() {
    if (this.platform.is('cordova')) {
      this.deviceMotion.getCurrentAcceleration().then(
        (acceleration: DeviceMotionAccelerationData) => {
          this.lightLevel = acceleration;
          console.log('Acceleration:', acceleration);
        },
        (error: any) => {
          console.log('Device motion error:', error);
        }
      );
    } else {
      this.lightLevel = 'Device motion is not available in the web browser.';
      console.log('Device motion is not available in the web browser.');
    }
  }

  startDeviceOrientation() {
    this.deviceOrientation.getCurrentHeading().then(
      (heading: DeviceOrientationCompassHeading) => {
        this.device = heading;
        console.log('Heading:', heading);
      },
      (error: any) => {
        console.log('Device orientation error:', error);
      }
    );
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.CurrentLocation = coordinates.coords.altitude;
      console.log('Current position:', coordinates);
    } catch (e) {
      console.error('Error getting location', e);
    }
  }
getLightSensor()
{
  // this.androidPlatform=this.platform.is('android');
  // setInterval(() => {
  // if (this.platform.is('android')) {
  Example.addListener('light', (info: any) => {
    this.lightValue=info.value;
    console.log('Light level:', info.value);
  });

  Example.enable();
// }
// }, 1000);
}
getAcceleration()
{
  Example.addListener('acceleration', (acceleration:any) => {
    this.AccelerationX=acceleration.x
    this.AccelerationY=acceleration.y;
    this.AccelerationZ=acceleration.z;
    // this.AccelerationCounter=acceleration.i;
    console.log('Acceleration X:', acceleration.x);
    console.log('Acceleration Y:', acceleration.y);
    console.log('Acceleration Z:', acceleration.z);
  });
  
  Example.enableAcceleration();

}
getOrientation()
{
  Example.addListener('orientation', (orientation:any) => {
    this.Azimuth=orientation.azimuth;
    this.Pitch=orientation.pitch;
    this.Roll=orientation.roll;
    console.log('Azimuth:', orientation.azimuth);
    console.log('Pitch:', orientation.pitch);
    console.log('Roll:', orientation.roll);
  });
  
  Example.enableOrientation();
}
  // getLightData() {
  //   this.sensors.enableSensor(TYPE_SENSOR.LIGHT);
  //   setInterval(() => {
  //     this.sensors.getState().then((values) => {
  //       this.SensorslightValue=values[0];
  //       console.log(values);
  //     });
  //   }, 1000); // Adjust interval as needed
  //  }
}
