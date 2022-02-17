<template>
  <div>
    <div id="error" v-if="errorFlag">
      <pre>
          {{ commentNameError }}
          </pre
      >
    </div>
    <div>
      名前：
      <input type="text" v-model="commentName" />
    </div>
    <div>
      <div id="error" v-if="errorFlag">
        <pre>
          {{ commentContentError }}
          </pre
        >
      </div>
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
  private commentNameError = "";
  private commentContentError = "";
  //子コンポーネントからarticleIdを受け取る
  @Prop()
  private articleId!: number;
  // errorflag
  private errorFlag = false;

  /**
   * コメントを投稿する.
   */
  addComment(articleId: number): void {
    this.commentNameError = "";
    this.commentContentError = "";
    if (this.commentName === "" && this.commentContent === "") {
      this.errorFlag = true;
      this.commentNameError = "名前を入力してください";
      this.commentContentError = "コメントを入力してください";
      return;
    }
    if (this.commentName === "") {
      this.errorFlag = true;
      this.commentNameError = "名前を入力してください\n";
      return;
    } else if (this.commentName.length > 50) {
      this.errorFlag = true;
      this.commentNameError = "名前は50字以内で入力してください\n";
      return;
    }
    if (this.commentContent === "") {
      this.errorFlag = true;
      this.commentContentError += "コメントを入力してください\n";
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
