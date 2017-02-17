import { Component, OnInit } from '@angular/core';
import { AtApiService } from 'anontown';
import { MdSnackBar } from '@angular/material';

@Component({
  templateUrl: './tags.page.component.html',
  styleUrls: ['./tags.page.component.scss']
})
export class TagsPageComponent implements OnInit {

  constructor(private api: AtApiService,
    public snackBar: MdSnackBar) { }

  tags: { name: string, count: number }[];

  async ngOnInit() {
    document.title = "タグ一覧";
    try {
      this.tags = await this.api.findTopicTags({ limit: 100 });
    } catch (_e) {
      this.snackBar.open("タグ一覧取得に失敗")
    }
  }

}