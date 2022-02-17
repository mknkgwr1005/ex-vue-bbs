<template>
  <div>
    <!-- 掲示板画面 -->
    <!-- 記事投稿画面開始 -->
    <div>
      <CompArticleInsert></CompArticleInsert>
    </div>
    <!-- 記事投稿画面終了 -->
    <!-- 記事表示部分開始 -->
    <!-- 配列、ループ変数（INDEXを取得） -->
    <div
      v-for="(article, articleIndex) of currentArticleList"
      v-bind:key="article.id"
    >
      <div>投稿者名：{{ article.name }}</div>
      <div>
        <pre>投稿内容：{{ article.content }}</pre>
      </div>
      <div>{{ insertedMsg }}</div>
      <div>
        <button type="button" @click="deleteArticle(articleIndex)">
          記事削除
        </button>
      </div>
      <!-- コメント表示部分開始 -->
      <!-- コメントも配列であり複数あるため、別でfor文で1個1個取り出す必要がある -->
      <div v-for="comment of article.commentList" v-bind:key="comment.id">
        <div>コメント者名：{{ comment.name }}</div>
        <div>
          <pre>コメント内容：{{ comment.content }}</pre>
        </div>
      </div>
      <div id="error">
        <pre>
          {{ errorMsg2 }}
          </pre
        >
      </div>
      <!-- コメント入力欄 -->
      <div>
        <CompCommentInsert v-bind:article-id="article.id"></CompCommentInsert>
      </div>
    </div>
    <!-- コメント表示部分終了 -->
    <!-- 記事表示部分終了 -->
    <!-- コメント入力欄終了 -->
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Component, Vue } from "vue-property-decorator";
import CompCommentInsert from "@/components/CompCommentInsert.vue";
import CompArticleInsert from "@/components/CompArticleInsert.vue";
@Component({
  components: {
    CompCommentInsert,
    CompArticleInsert,
  },
})
export default class BbsClass extends Vue {
  // 現在投稿されている記事一覧
  private currentArticleList = new Array<Article>();

  /**
   * 記事の取得.
   * 記事すべてを取得している.
   */
  created(): void {
    this.currentArticleList = this.$store.getters.getArticles;
  }

  /**
   * 記事を削除する.
   */
  deleteArticle(articleIndex: number): void {
    this.$store.commit("deleteArticle", { articleIndex: articleIndex });
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
