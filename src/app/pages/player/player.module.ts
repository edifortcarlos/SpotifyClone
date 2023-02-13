import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LeftPanelComponent } from 'src/app/components/left-panel/left-panel.component';
import { MenuButtonComponent } from 'src/app/components/menu-button/menu-button.component';
import { PlayerComponent } from './player.component';
import { UserFooterComponent } from '../../components/user-footer/user-footer.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistComponent } from '../../components/top-artist/top-artist.component';
import { RightPanelComponent } from '../../components/right-panel/right-panel.component';
import { RecentSearchComponent } from '../../components/recent-search/recent-search.component';
import { FormsModule } from '@angular/forms';
import { TopArtistsComponent } from '../../components/top-artists/top-artists.component';
import { ArtistItemImgComponent } from '../../components/artist-item-img/artist-item-img.component';
import { PlayerCardComponent } from '../../components/player-card/player-card.component';


const playerRoutes: Routes = [
    {
        path: '',
        component: PlayerComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        RouterModule.forChild(playerRoutes)
    ],
    declarations: [
        PlayerComponent,
        LeftPanelComponent,
        MenuButtonComponent,
        UserFooterComponent,
        HomeComponent,
        TopArtistComponent,
        RightPanelComponent,
        RecentSearchComponent,
        TopArtistsComponent,
        ArtistItemImgComponent,
        PlayerCardComponent
    ],
    providers: [],
})
export class PlayerModule { }
