<template>
  <div>
    <!-- 掲示板画面 -->
    <!-- 記事投稿画面開始 -->
    <div>
      <div>投稿者名：</div>
      <input type="text" v-model="articleName" />
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
    <!-- 記事投稿画面終了 -->
    <!-- 記事表示部分開始 -->
    <div v-for="article of currentArticleList" v-bind:key="article.id">
      <div>投稿者名：{{ article.name }}</div>
      <div>
        <pre>投稿内容：{{ article.content }}</pre>
      </div>
      <!-- コメント表示部分開始 -->
      <!-- コメントも配列であり複数あるため、別でfor文で1個1個取り出す必要がある -->
      <div v-for="comment of article.commentList" v-bind:key="comment.id">
        <div>コメント者名：{{ comment.name }}</div>
        <div>
          <pre>コメント内容：{{ comment.content }}</pre>
        </div>
      </div>
      <!-- コメント入力欄 -->
      <div>名前：<input type="text" v-model="commentName" /></div>
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
        <button type="button" @click="addComment(article.id)">
          コメント投稿
        </button>
      </div>
      <!-- コメント表示部分終了 -->
      <!-- 記事表示部分終了 -->
    </div>
    <!-- コメント入力欄終了 -->
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Comment } from "@/types/comment";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class BbsClass extends Vue {
  // 現在投稿されている記事一覧
  private currentArticleList = new Array<Article>();
  //   投稿者名
  private articleName = "";
  //   投稿内容
  private articleContent = "";
  //   コメントの投稿者名
  private commentName = "";
  //   コメントの投稿内容
  private commentContent = "";

  /**
   * 記事の取得.
   * 記事すべてを取得している.
   */
  created(): void {
    this.currentArticleList = this.$store.getters.getArticles;
  }

  /**
   * 記事の投稿.
   */
  addArticle(): void {
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
  }

  /**
   * コメントを投稿する.
   */
  addComment(articleId: number): void {
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

<style scoped></style>
