<template>
  <div>
    <!-- 掲示板画面 -->
    <!-- 記事投稿画面開始 -->
    <div>
      <div>投稿者名：</div>
      <input type="text" v-model="articleName" />
      <div id="error">
        <pre>
          {{ errorMsg }}
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
    </div>
    <!-- コメント表示部分終了 -->
    <!-- 記事表示部分終了 -->
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
  // エラー
  private errorMsg = "";
  private errorMsg2 = "";

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
    // エラー文の表示
    if (this.articleName === "" && this.articleContent === "") {
      this.errorMsg = "";
      this.errorMsg = "投稿者名を入力してください\n投稿内容を入力してください";
      return;
    }
    if (this.articleName === "") {
      this.errorMsg = "";
      this.errorMsg = "投稿者名を入力してください";
      return;
    }
    if (this.articleContent === "") {
      this.errorMsg = "";
      this.errorMsg += "\n投稿内容を入力してください";
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
  }

  /**
   * コメントを投稿する.
   */
  addComment(articleId: number): void {
    if (this.commentName === "" && this.commentContent === "") {
      this.errorMsg2 = "";
      this.errorMsg2 = "名前を入力してください\nコメントを入力してください";
      return;
    }
    if (this.commentName === "") {
      this.errorMsg2 = "";
      this.errorMsg2 = "名前を入力してください";
      return;
    }
    if (this.commentContent === "") {
      this.errorMsg2 = "";
      this.errorMsg2 += "\nコメントを入力してください";
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
