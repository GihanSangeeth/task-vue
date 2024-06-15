<script>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import ThePagination from "./ThePagination.vue";
export default {
  setup() {
    const store = useStore();

    const order = ref("asc");

    const comments = computed(() => store.getters.comments);
    const getPageData = computed(() => store.getters.pageData);

    function onSearch(e) {
      store.dispatch("setFilterText", e.target.value);
    }

    function sort(type) {
      order.value = order.value == "asc" ? "desc" : "asc";

      store.dispatch("setSortTable", { type: type, order: order.value });
    }

    return {
      getComments: () => store.dispatch("getComments", { currentPage: 1 }),

      onSearch,

      comments,
      getPageData,
      sort,
    };
  },
  components: { ThePagination },

  created() {
    this.getComments();
  },
};
</script>

<template>
  <form>
    <input type="text" placeholder="Search..." @input="onSearch" />
  </form>
  <table style="width: 100%">
    <tr>
      <th @click="sort('id')">Id</th>
      <th>Name</th>
      <th @click="sort('email')">Email</th>
      <th>Description</th>
    </tr>

    <tr v-for="comment of getPageData" :key="comment.id">
      <td>{{ comment.id }}</td>
      <td>{{ comment.name }}</td>
      <td>{{ comment.email }}</td>
      <td>{{ comment.body }}</td>
    </tr>
  </table>

  <the-pagination></the-pagination>
</template>

<style scoped>
table,
th,
td {
  border: 1px solid black;
}
</style>
