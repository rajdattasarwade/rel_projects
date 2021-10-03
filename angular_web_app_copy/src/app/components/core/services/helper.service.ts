import { Injectable, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { Config } from '../config/config';
declare var google;
@Injectable()
export class HelperService {
  isScriptAvailable: boolean;
  constructor() // private http: HttpClient,
  // private loaderService: LoaderService,
  // private modalSrv: NgbModal
  {}

  getGoogleCalculatedDistance(origin, destination) {
    let distanceSubject = new Subject();
    let directionsService = new google.maps.DirectionsService();
    let request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    directionsService.route(request, (response, status: any) => {
      let distance;
      if (status == 'OK') {
        distance = Math.round(response.routes[0].legs[0].distance.value / 1000);
      } else {
        distance = 0;
      }
      distanceSubject.next(distance);
    });
    return distanceSubject;
  }
  public loadScript(renderer: Renderer2) {
    let loadScriptSubject = new Subject();
    this.isScriptAvailable = false;
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; ++i) {
      if (
        scripts[i].getAttribute('src') != null &&
        scripts[i].getAttribute('src').includes(Config.googleApiUrl)
      ) {
        this.isScriptAvailable = true;
        return;
      }
    }
    if (!this.isScriptAvailable) {
      let dynamicScript = Config.googleApiUrl;
      let node = renderer.createElement('script');
      node.src = dynamicScript;
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      node.onload = () => {
        this.isScriptAvailable = true;
        loadScriptSubject.next();
      };
      renderer.appendChild(document.getElementsByTagName('head')[0], node);
      return loadScriptSubject;
    }
  }
}
