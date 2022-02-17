<template>
  <div>
    <div id="error">
      <pre>
          {{ errorMsg2 }}
          </pre
      >
    </div>
    <div>
      名前：
      <input type="text" v-model="commentName" />
    </div>
    <div>
      コメント：<br />
      <textarea
        name="comment"
        id="comment"
        cols="30"
        rows="10"
        v-model="commentContent"
      ></textarea>
    </div>
    <div>
      <button type="button" @click="addComment(articleId)">コメント投稿</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Comment } from "@/types/comment";
@Component
export default class CompCommentInsert extends Vue {
  private commentName = "";
  //   コメントの投稿内容
  private commentContent = "";
  // エラー
  private errorMsg2 = "";
  //子コンポーネントからarticleIdを受け取る
  @Prop()
  private articleId!: number;

  /**
   * コメントを投稿する.
   */
  addComment(articleId: number): void {
    this.errorMsg2 = "";
    if (this.commentName === "" && this.commentContent === "") {
      this.errorMsg2 = "名前を入力してください\nコメントを入力してください";
      return;
    }
    if (this.commentName === "") {
      this.errorMsg2 = "名前を入力してください\n";
      return;
    } else if (this.commentName.length > 50) {
      this.errorMsg2 = "名前は50字以内で入力してください\n";
      return;
    }
    if (this.commentContent === "") {
      this.errorMsg2 += "コメントを入力してください\n";
      return;
    }
    // コメントの追加
    this.$store.commit("addComment", {
      comment: new Comment(
        -1,
        this.commentName,
        this.commentContent,
        articleId
      ),
    });
  }
}
</script>

<style scoped>
#error {
  padding-left: 0%;
  font-weight: bold;
  color: red;
}
</style>
