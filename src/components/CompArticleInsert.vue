<template>
  <div>
    <div>
      <div id="error" v-if="errorFlag">
        <pre>
          {{ nameErrorMsg }}
          </pre
        >
      </div>
      <div>投稿者名：</div>
      <input type="text" v-model="articleName" />
      <div id="error" v-if="errorFlag">
        <pre>
          {{ contentErrorMsg }}
          </pre
        >
      </div>
      <div>投稿内容：</div>
      <textarea
        name="content"
        id="content"
        cols="30"
        rows="10"
        v-model="articleContent"
      ></textarea>
      <div>
        <button type="button" @click="addArticle">記事投稿</button>
      </div>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Article } from "@/types/article";
@Component
export default class XXXComponent extends Vue {
  // 現在投稿されている記事一覧
  private currentArticleList = new Array<Article>();
  //   投稿者名
  private articleName = "";
  //   投稿内容
  private articleContent = "";
  // エラー
  private nameErrorMsg = "";
  private contentErrorMsg = "";
  // 投稿確認
  private insertedMsg = "";
  // errorflag
  private errorFlag = false;

  /**
   * 記事の投稿.
   */
  addArticle(): void {
    // エラー文の表示
    this.nameErrorMsg = "";
    this.contentErrorMsg = "";
    if (this.articleName === "" && this.articleContent === "") {
      this.errorFlag = true;
      this.nameErrorMsg = "投稿者名を入力してください";
      this.contentErrorMsg = "投稿内容を入力してください\n";
      return;
    }
    if (this.articleName === "") {
      this.errorFlag = true;
      this.nameErrorMsg = "投稿者名を入力してください\n";
      return;
    } else if (this.articleName.length > 50) {
      this.errorFlag = true;
      this.nameErrorMsg = "名前は50字以内で入力してください\n";
      return;
    }
    if (this.articleContent === "") {
      this.errorFlag = true;
      this.contentErrorMsg = "投稿内容を入力してください\n";
      return;
    }
    // 記事の投稿.
    let newId = 0;
    if (this.currentArticleList.length !== 0) {
      newId = this.currentArticleList[0].id + 1;
    }

    this.$store.commit("addArticle", {
      // key:value
      article: new Article(newId, this.articleName, this.articleContent, []),
    });
    this.articleName = "";
    this.articleContent = "";
    this.insertedMsg = "";
    this.insertedMsg = "新たな投稿です。";
  }
}
</script>

<style scoped>
#error {
  font-weight: bold;
  color: red;
}
</style>
