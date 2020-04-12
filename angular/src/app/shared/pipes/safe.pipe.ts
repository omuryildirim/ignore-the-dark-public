import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  /**
   * Initializer.
   * @param sanitizer
   */
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Parse url in safe way.
   * @param url: String of url.
   */
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
