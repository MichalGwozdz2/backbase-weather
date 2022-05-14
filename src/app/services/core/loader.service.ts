import {Injectable} from "@angular/core";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoaderComponent} from '../../modals/loader/loader.component';

/**
 * Service allows to show simple loader, which blocks whole application
 */
@Injectable()
export class LoaderService {
  private loaderActive: boolean = false;
  private loaderRef!: MatDialogRef<LoaderComponent> | null;

  constructor(private readonly dialog: MatDialog) {
  }

  /**
   * Shows loader if is not visible
   */
  showLoader(): void {
    if (this.loaderRef) {
      return;
    }

    this.loaderRef = this.dialog.open(LoaderComponent, {disableClose: true, panelClass: 'transparent'});
    this.loaderRef.afterClosed().subscribe(() => this.loaderActive = false);
  }

  /**
   * Hides loader if is visible
   */
  hideLoader(): void {
    if (!this.loaderRef) {
      return;
    }

    this.loaderRef.close();
    this.loaderRef = null;
  }

  /**
   * Returns true if loader is visible
   */
  get isVisible(): boolean {
    return !!this.loaderRef;
  }
}
