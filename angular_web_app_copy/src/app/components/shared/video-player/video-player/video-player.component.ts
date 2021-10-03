import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { BitrateOptions } from '@videogular/ngx-videogular/core';
import {
  VgHlsDirective,
  VgDashDirective,
} from '@videogular/ngx-videogular/streaming';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoSource: any;
  @Input() fileExtensionAvailable: boolean;
  @ViewChild(VgHlsDirective) vgHls: VgHlsDirective;
  @ViewChild(VgDashDirective) vgDash: VgDashDirective;
  currentStream: any;
  currentFormat: any;
  isPlayerReady: boolean = false;
  stream: any = {
    type: '',
    label: '',
    source: '',
  };
  bitrates: BitrateOptions[];
  count: number = 0;
  constructor() {}

  ngOnInit(): void {
    this.count = this.videoSource ? this.count + 1: 0;
    this.checkVideoFormat();
  }
 
  ngDoCheck(){
    if(this.videoSource && this.count === 0){
      this.checkVideoFormat();
      this.count++;
    }
  }
  checkVideoFormat() {
    let formatIndex=0
    if (this.fileExtensionAvailable) {
      formatIndex = this.videoSource.lastIndexOf('.');
    }
    this.currentFormat = this.videoSource.slice(formatIndex);
    switch (this.currentFormat) {
      case '.m3u8':
        this.stream.type = 'hls';
        this.stream.source = this.videoSource;
        this.stream.label = 'hls';
        this.currentStream = this.stream;
        break;
      case '.mpd':
        this.stream.type = 'dash';
        this.stream.source = this.videoSource;
        this.stream.label = 'dash';
        this.currentStream = this.stream;
        break;
      default:
        this.stream.type = 'VOD';
        this.stream.source = this.videoSource;
        this.stream.label = 'vod';
        this.currentStream = this.stream;
        break;
    }
  }

  onPlayerReady(event) {
    console.log(event);
    this.isPlayerReady = event.isPlayerReady;
  }

  setBitrates(event) {
    console.log(event);
    switch (this.currentFormat) {
      case '.m3u8':
        this.vgHls.setBitrate(event);
        break;
      case '.mpd':
        this.vgDash.setBitrate(event);
    }
  }
}
