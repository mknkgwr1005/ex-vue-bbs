import Vue from "vue";
import Vuex from "vuex";
import { Article } from "@/types/article";
import { Comment } from "@/types/comment";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    // 記事一覧
    articles: [
      new Article(3, "佐藤", "佐藤さんの記事", []),
      new Article(2, "山田", "山田さんの記事", [
        new Comment(13, "山崎", "山崎さんのコメント", 2),
      ]),
      new Article(1, "伊藤", "伊藤さんの記事", [
        new Comment(12, "鈴木", "鈴木さんのコメント", 1),
        new Comment(11, "吉田", "吉田さんのコメント", 1),
      ]),
    ],
  },
  mutations: {
    /**
     * 投稿記事を追加する.
     * @param state -state
     * @param payload -payload
     * @returns 記事一覧を配列に追加する
     */
    addArticle(state, payload) {
      // 0コ目にいれる関数は？
      state.articles.unshift(payload);
    },

    /**
     *コメントの追加.
     * @param state -state
     * @param payload -payload
     * @returns コメントの追加
     */
    addComment(state, payload) {
      // 渡されたIDでの記事を検索する
      return (id: number) => {
        // newArticlesにはこの時点で記事一覧すべてはいる
        const newArticles = state.articles.filter(
          (articles) => articles.id === id
        );
        // 1件の記事全体を取得する
        const newArticle = newArticles[0];
        // 渡されたpayloadからコメントオブジェクト生成する
        payload = new Array<Comment>();
        // コメントリストにコメントを追加する
        return newArticle.commentList.unshift(payload);
      };
    },

    deleteArticle(state, payload) {
      const payloadIndex = indexOf(payload);
      const articleIndex = indexOf(state.articles);
      payload = new Array<Article>();
      const deleteArticle = payload[0];
      if (payloadIndex === articleIndex) {
        payload.shift(deleteArticle);
      }
    },
  },
  actions: {},
  modules: {},
  getters: {
    /**
     * 記事一覧を取得する.
     * @param state -state
     * @returns 記事一覧
     */
    getArticles(state): Array<Article> {
      console.log("イベント発生");

      return state.articles;
    },
  },
});
