import {ChangeDetectionStrategy, Component} from '@angular/core';

/**
 * Displays mat spinner, should be used as a modal
 */
@Component({
  selector: 'app-loader',
  template: '<mat-spinner></mat-spinner>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
}
