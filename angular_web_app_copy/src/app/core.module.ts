import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActionCardComponent } from './components/shared/common-cards/action-card/action-card.component';
import { HeaderCardComponent } from './components/shared/common-cards/header-card/header-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FeedComponent } from './components/shared/feed/feed.component';
import { ProfileCardComponent } from './components/shared/common-cards/profile-card/profile-card.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbCardComponent } from './components/shared/common-cards/breadcrumb-card/breadcrumb-card.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MessageModalComponent } from './components/shared/message-modal/message-modal.component';
import { ConfirmationModalComponent } from './components/shared/confirmation-modal/confirmation-modal.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { StarRatingModule } from 'angular-star-rating';
import { AttachDragDropComponent } from './components/shared/attach-drag-drop/attach-drag-drop.component';
import { EmailModalComponent } from './components/shared/email-modal/email-modal.component';
import { PdfViewerModalComponent } from './components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { PdfZoomComponent } from './components/shared/pdf-viewer-modal/pdf-zoom/pdf-zoom.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProfileCardVerticalComponent } from './components/shared/common-cards/profile-card-vertical/profile-card-vertical.component';
import { PeopleCardListComponent } from './components/shared/common-cards/people-card-list/people-card-list.component';
import { SearchPeopleDropdownComponent } from './components/shared/common-cards/search-people-dropdown/search-people-dropdown.component';
import { ProfileSearchPopupComponent } from './components/shared/profile-search-popup/profile-search-popup.component';
import { ExpandableCardComponent } from './components/shared/expandable-card/expandable-card.component';
import { MedibuddyCardComponent } from './components/shared/medibuddy-card/medibuddy-card.component';
import { IconCaptionCardComponent } from './components/shared/common-cards/icon-caption-card/icon-caption-card.component';
import { MultiAttachListComponent } from './components/shared/multi-attach-list/multi-attach-list.component';
import { MultiAttachPdfComponent } from './components/shared/multi-attach-pdf/multi-attach-pdf.component';
import { PeopleCardRectangularComponent } from './components/shared/common-cards/people-card-rectangular/people-card-rectangular.component';
import { ImagePopupComponent } from './components/shared/image-popup/image-popup.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SubHeaderCardComponent } from './components/shared/common-cards/sub-header-card/sub-header-card.component';
import { MarketplaceCardComponent } from './components/shared/common-cards/marketplace-card/marketplace-card.component';
import { RatingsStarComponent } from './components/shared/ratings-star/ratings-star.component';

@NgModule({
  declarations: [
    ActionCardComponent,
    HeaderCardComponent,
    FeedComponent,
    ProfileCardComponent,
    BreadcrumbCardComponent,
    MessageModalComponent,
    ConfirmationModalComponent,
    AttachDragDropComponent,
    EmailModalComponent,
    PdfViewerModalComponent,
    PdfZoomComponent,
    ProfileCardVerticalComponent,
    PeopleCardListComponent,
    SearchPeopleDropdownComponent,
    ProfileSearchPopupComponent,
    ExpandableCardComponent,
    MedibuddyCardComponent,
    IconCaptionCardComponent,
    MultiAttachListComponent,
    MultiAttachPdfComponent,
    PeopleCardRectangularComponent,
    ImagePopupComponent,
    SubHeaderCardComponent,
    MarketplaceCardComponent,
    RatingsStarComponent
  ],

  imports: [
    CommonModule,
    MatCardModule,
    FontAwesomeModule,
    MatGridListModule,
    MatListModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatIconModule,
    MatDatepickerModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatToolbarModule,
    MatMomentDateModule,
    MatButtonModule,
    MatChipsModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressBarModule,
    MatTabsModule,
    MatInputModule,
    MatBadgeModule,
    FormsModule,
    MatCheckboxModule,
    MatDividerModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    PdfViewerModule,
    MatSlideToggleModule,
    StarRatingModule.forRoot()
  ],
  exports: [
    CommonModule,
    MatCardModule,
    FontAwesomeModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatDatepickerModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatMomentDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatChipsModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBarModule,
    ActionCardComponent,
    HeaderCardComponent,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatRadioModule,
    ProfileCardComponent,
    MatInputModule,
    MatBadgeModule,
    FeedComponent,
    FormsModule,
    BreadcrumbCardComponent,
    MatCheckboxModule,
    MessageModalComponent,
    ConfirmationModalComponent,
    MatDividerModule,
    MatButtonToggleModule,
    AttachDragDropComponent,
    EmailModalComponent,
    ReactiveFormsModule,
    ProfileCardVerticalComponent,
    PeopleCardListComponent,
    SearchPeopleDropdownComponent,
    ProfileSearchPopupComponent,
    ExpandableCardComponent,
    MedibuddyCardComponent,
    IconCaptionCardComponent,
    MultiAttachListComponent,
    MultiAttachPdfComponent,
    PeopleCardRectangularComponent,
    ImagePopupComponent,
    MatSlideToggleModule,
    StarRatingModule,
    PdfZoomComponent,
    SubHeaderCardComponent,
    MarketplaceCardComponent,
    RatingsStarComponent
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class CoreModule {}
