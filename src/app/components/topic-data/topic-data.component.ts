import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  Topic,
  History,
  AtApiService
} from 'anontown';
import {
  UserService
} from '../../services';
import * as Immutable from 'immutable';

import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-topic-data',
  templateUrl: './topic-data.component.html',
  styleUrls: ['./topic-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TopicDataComponent implements OnInit, OnDestroy {
  @Input()
  topic: Topic;

  @Output()
  update = new EventEmitter<Topic>();

  histories: Immutable.List<History>;
  constructor(public user: UserService,
    private api: AtApiService,
    public snackBar: MdSnackBar) {
  }

  async ngOnInit() {
    try{
      this.histories = Immutable.List(await this.api.findHistoryAll({ topic: this.topic.id }));
    }catch(_e){
      this.snackBar.open("編集履歴取得に失敗");
    }
  }

  ngOnDestroy() {
  }

  private isEdit = false;
  edit() {
    this.isEdit = !this.isEdit;
  }

  isDetail = false;
  detail() {
    this.isDetail = !this.isDetail;
  }
}