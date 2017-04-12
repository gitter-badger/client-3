import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    UserService,
    AtApiService,
    ITokenAPI,
    IAuthUser,
    IClientAPI
} from '../../services';

@Component({
    templateUrl: './auth.component.html'
})
export class AuthPageComponent implements OnInit, OnDestroy {
    client: IClientAPI = null;

    constructor(private api: AtApiService,
        private route: ActivatedRoute,
        private user: UserService) {

    }

    async ok() {
        let ud=this.user.ud.getValue();
        let token=await this.api.createTokenGeneral(ud.auth,{client:this.client.id});
        let req = await this.api.createTokenReq({ id: token.id, key: token.key });
        //リダイレクト
        location.href = this.client.url + "?" + "id=" + req.token + "&key=" + encodeURI(req.key);
    }

    ngOnDestroy() {
    }

    async ngOnInit() {
        let ud = await this.user.ud.toPromise();
        if (ud) {
            let clientID = "";
            this.route.queryParams.forEach((params) => {
                clientID = params["client"];
            });

            this.client = await this.api.findClientOne(ud.auth, { id: clientID });
        }
    }
}