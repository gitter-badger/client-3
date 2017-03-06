import { Component, OnInit } from '@angular/core';
import { Res, AtApiService, IAuthToken } from 'anontown';
import { ActivatedRoute } from '@angular/router'
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './res.component.html',
  styleUrls: ['./res.component.scss']
})
export class ResPageComponent implements OnInit {
  res: Res;

  constructor(private api: AtApiService,
    private route: ActivatedRoute,
    private user: UserService) { }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.user.ud
        .take(1)
        .subscribe(async ud => {
          let token: IAuthToken;
          if (ud) {
            token = ud.auth;
          } else {
            token = null;
          }

          this.res = await this.api.findResOne(token, {
            id: params['id']
          });
        });

    });
  }

}