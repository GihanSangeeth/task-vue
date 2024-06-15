<script>
import { mapGetters, mapActions } from "vuex";
import { ref } from "vue";
export default {
  setup() {
    const currentPage = ref(1);
    return {
      currentPage,
    };
  },
  computed: {
    ...mapGetters(["totalCount"]),
    paginationCount() {
      return Math.ceil(this.totalCount / 10);
    },
  },
  methods: {
    setCurrentPage(page) {
      this.currentPage = page;
      this.getComments({
        currentPage: page,
      });
    },
    ...mapActions(["getComments"]),
  },
};
</script>
<template>
  <div class="pagination">
    <!-- <a href="#">&laquo;</a> -->
    <a
      v-for="page in paginationCount"
      :key="page"
      @click="setCurrentPage(page)"
      :class="page === currentPage ? 'active' : ''"
      >{{ page }}</a
    >
    <!-- <a href="#">&raquo;</a> -->
  </div>
</template>

<style scoped>
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  cursor: pointer;
}
.active {
  color: red !important;
}
</style>
