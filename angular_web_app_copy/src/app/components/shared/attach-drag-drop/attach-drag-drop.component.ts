import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ViewChild,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageModalService } from '../services/message-modal-service';

@Component({
  selector: 'app-attach-drag-drop',
  templateUrl: './attach-drag-drop.component.html',
  styleUrls: ['./attach-drag-drop.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AttachDragDropComponent implements OnInit {
  @Input() attachmentText: any;
  @Input() maxSize: any;
  @Input() multiple: boolean;
  @Input() maxUploadLimit: any;
  @Input() acceptedFormats: any;
  @Input() fileSizeLimit: number;
  @Input() existingFilesArray: any[] = [];
  @Input() viewOnly: boolean;
  @ViewChild('fileDropRef') fileDropRef;
  acceptedFileSize: any = 0;
  fileOver: boolean;
  formatErrorString: any = '';
  choosenFiles: any = [];
  imageUrls: any = [];
  @Output() filesDropped = new EventEmitter();
  @Output() filesDeleted = new EventEmitter();
  @Output() viewClicked = new EventEmitter();
  @Output() errorEvent = new EventEmitter();
  formatRegex: RegExp;

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event']) onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.checkFormats(evt, true);
  }

  constructor(
    public modalService: MessageModalService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.acceptedFormats =
      this.acceptedFormats != undefined ? this.acceptedFormats : [];
    this.createFormatRegex();
    this.maxSize != undefined ? this.maxSize : '';
    if (this.maxSize) {
      this.createMaxSize();
    }
    if (this.multiple == undefined) {
      this.multiple = false;
    }
    if (this.multiple && this.maxUploadLimit == undefined) {
      this.maxUploadLimit = 2;
    } else if (!this.multiple && this.maxUploadLimit == undefined) {
      this.maxUploadLimit = 1;
    } else if (!this.multiple && this.maxUploadLimit > 1) {
      this.maxUploadLimit = 1;
    }
    if (this.existingFilesArray) {
      this.existingFilesArray.length > 0
        ? this.uploadExistingFiles(this.existingFilesArray)
        : '';
    }
  }

  createMaxSize() {
    let fileSizeSuffix = this.maxSize.slice(-2).toLowerCase();
    let fileSizePrefix = this.maxSize.slice(0, -2);
    fileSizePrefix = <Number>fileSizePrefix;
    let fileSizeInto;
    if (fileSizeSuffix == 'kb') {
      fileSizeInto = 1;
    } else if (fileSizeSuffix == 'mb') {
      fileSizeInto = 2;
    }
    this.acceptedFileSize = fileSizePrefix * Math.pow(1024, fileSizeInto);
    this.maxSize = fileSizePrefix + fileSizeSuffix.toUpperCase();
  }

  createFormatRegex() {
    let regexString = '';
    for (let i = 0; i < this.acceptedFormats.length; i++) {
      regexString = regexString + this.acceptedFormats[i];
      regexString = regexString + '|';
      if (
        i == this.acceptedFormats.length - 1 &&
        this.acceptedFormats.length != 1
      ) {
        this.formatErrorString =
          this.formatErrorString + ' or ' + this.acceptedFormats[i];
      } else if (this.acceptedFormats.length == 1) {
        this.formatErrorString = this.acceptedFormats[i];
      } else {
        this.formatErrorString =
          this.formatErrorString + this.acceptedFormats[i] + ', ';
      }
    }
    regexString = regexString.slice(0, -1);
    this.formatRegex = new RegExp(regexString, 'i');
  }

  checkFormats(evt, fromDrop) {
    let files = fromDrop ? evt.dataTransfer.files : evt.target.files;
    let formatValid = true;
    if (this.acceptedFormats.length > 0) {
      for (let i = 0; i < files.length; i++) {
        if (!this.formatRegex.test(files[i].name)) {
          this.modalService.showMessage(
            `Please upload a file with ${this.formatErrorString} format(s)`,
            'Error',
            'warning-icon',
            'CLOSE'
          );
          formatValid = false;
        } else if (this.fileSizeLimit && files[i].size > this.fileSizeLimit) {
          this.modalService.showMessage(
            `Please upload a file with size less than ${
              this.fileSizeLimit !== 0
                ? this.fileSizeLimit / 1000000
                : this.fileSizeLimit
            } MB.`,
            'Error',
            'warning-icon',
            'CLOSE'
          );
          formatValid = false;
        }
      }
    }
    if (this.maxSize) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > this.acceptedFileSize) {
          this.modalService.showMessage(
            `Please upload a file with size less than ${this.maxSize}`,
            'Error',
            'warning-icon',
            'CLOSE'
          );
          formatValid = false;
        }
      }
    }
    if (formatValid) {
      this.uploadFiles(evt, fromDrop);
    }
  }

  uploadFiles(evt, fromDrop) {
    this.fileOver = false;
    const files = fromDrop ? evt.dataTransfer.files : evt.target.files;
    if (files.length > 0) {
      let fileLength =
        this.choosenFiles.length == 0 ? files.length : this.choosenFiles.length;
      if (this.multiple) {
        if (
          fileLength >= this.maxUploadLimit &&
          this.choosenFiles.length != 0
        ) {
          this.modalService.showMessage(
            `Cannot upload more than ${this.maxUploadLimit} file(s)`,
            'Error',
            'warning-icon',
            'CLOSE'
          );
          return;
        } else {
          this.uploadMultipleFiles(files);
        }
      } else {
        if (fileLength >= 1 && this.choosenFiles.length != 0) {
          this.modalService.showMessage(
            'Cannot upload more than 1 file',
            'Error',
            'warning-icon',
            'CLOSE'
          );
          return;
        } else {
          this.uploadMultipleFiles(files);
        }
      }
    }
  }

  uploadMultipleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      this.choosenFiles.push(files[i]);

      let reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = (e) => {
        let file = this.sanitizer.bypassSecurityTrustUrl(
          e.target.result.toString()
        );
        this.imageUrls.push(file);
      };
    }
    let emittedResult = {
      files: this.choosenFiles,
      imageUrls: this.imageUrls,
    };
    this.filesDropped.emit(emittedResult);
  }

  emitViewEvent(index) {
    let emittedResult = {
      fileClicked: this.choosenFiles[index],
      imageUrlClicked: this.imageUrls[index],
      index: index,
    };
    this.viewClicked.emit(emittedResult);
  }

  deleteFile(file) {
    this.modalService.showConfirmation(
      'Are you sure you want to delete the selected file?.',
      'Confirmation',
      'confirmation-icon',
      (reason) => {
        if (reason === 'YES') {
          let fileIndex = this.choosenFiles.indexOf(file);
          this.choosenFiles.splice(fileIndex, 1);
          this.imageUrls.splice(fileIndex, 1);
          let emittedResult = {
            files: this.choosenFiles,
            imageUrls: this.imageUrls,
          };
          this.filesDeleted.emit(emittedResult);
        }
      }
    );
  }
  uploadExistingFiles(files) {
    for (let i = 0; i < files.length; i++) {
      this.choosenFiles.push(files[i]);
    }
  }
}
