import {AfterViewInit, Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {PhotographyService} from './photography.service';
import {PhotoData} from '../../../../../nodejs/src/interfaces/photo.interfaces';
import {PhotographyConstants} from './photography.model';

@Component({
  selector: 'app-photography',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.scss']
})

export class PhotographyComponent implements OnInit, AfterViewInit {
  @ViewChild('gallery') gallery;
  @ViewChild('viewer') viewer;

  public photoData: {[key: string]: PhotoData};
  public photoNames: string[];
  public selectedPhotography: string;
  public photographyConstants = PhotographyConstants;
  private selectedPhotographyData: any;
  private photoLoaded = false;

  /**
   * Initializer.
   * @param router
   * @param sanitizer
   * @param photographyService
   */
  constructor(private router: Router, private sanitizer: DomSanitizer,
              private photographyService: PhotographyService) {
  }

  /**
   * Fetch photography data on creation.
   */
  ngOnInit() {
    this.photographyService.getPhotoData()
      .subscribe((data: PhotoData[]) => {
        this.photoData = {};

        for (const photo of data) {
          this.photoData[photo.name] = photo;
        }

        this.photoNames = Object.keys(this.photoData);
      });
  }

  /**
   * Subscribe mousewheel action and change selected photo respectively.
   * @param event
   */
  @HostListener('mousewheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (this.gallery) {
      this.gallery.nativeElement.scrollLeft = this.gallery.nativeElement.scrollLeft + event.deltaY;
    }
    return false;
  }

  /**
   * Subscribe key down event and select previous picture.
   * @param event
   */
  @HostListener('window:keydown', ['$event'])
  public changePicture(event: KeyboardEvent) {
    if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39
      || event.keyCode === 40) {
      let selectedPhotoIndex = this.photoNames.indexOf(this.selectedPhotography);
      if (selectedPhotoIndex > -1) {
        if (event.keyCode === 37 || event.keyCode === 40) {
          if (selectedPhotoIndex) {
            selectedPhotoIndex -= 1;
          }
        } else if (selectedPhotoIndex < this.photoNames.length - 1) {
          selectedPhotoIndex += 1;
        }
      } else {
        selectedPhotoIndex = 0;
      }

      if (this.gallery) {
        this.gallery.nativeElement.scrollLeft = selectedPhotoIndex * 160;
      }
      this.selectPhoto(this.photoNames[selectedPhotoIndex]);
    }
  }

  /**
   * Displat desired photo.
   * @param photo: Name of photo.
   */
  private selectPhoto(photo: string) {
    this.selectedPhotography = photo;

    if (!this.photoLoaded) {
      this.selectedPhotographyData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAQAAACRI2S5AAAAEklEQVR4' +
        '2mNU+8+AFzCOKgADAJetClfoY2QoAAAAAElFTkSuQmCC';
      this.photoLoaded = true;
      this.photographyService.getPhoto(photo).subscribe((data) => {
        setTimeout(() => {
          const urlCreator = window.URL;
          this.selectedPhotographyData = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(data));
        }, 300);
      });

    } else {
      this.selectedPhotographyData = '/photography/' + photo;
    }
  }

  /**
   * Return to default path.
   */
  public goBack() {
    this.router.navigate(['/']);
  }

  /**
   * Initialize view style after html is rendered.
   */
  ngAfterViewInit() {
    let width = window.innerWidth;
    const height = window.innerHeight;
    const additionalArea = width % 320;
    width = width - additionalArea;
    this.gallery.nativeElement.style.width = width + 'px';
    this.gallery.nativeElement.style.marginLeft = (additionalArea / 2) + 'px';
    this.gallery.nativeElement.style.marginTop = (height - 180 - additionalArea / 2) + 'px';

    const additionalVerticalArea = (height - 90 - additionalArea / 2) % 90;
    const viewerHeight = height - 90 - additionalArea / 2 - additionalVerticalArea;
    this.viewer.nativeElement.style.height = viewerHeight + 'px';
    this.viewer.nativeElement.style.top = (additionalVerticalArea / 2) + 'px';
    this.viewer.nativeElement.style.left = (additionalArea / 2) + 'px';
    this.viewer.nativeElement.style.right = (additionalArea / 2) + 'px';
  }
}
