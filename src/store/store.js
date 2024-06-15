import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      comments: [],
      pageData: [],
      filteredData: [],
      rowsPerPage: 10,
      filterText: "",
      totalComments: 0,
      sortBy: {},
    };
  },
  mutations: {
    setPageData(state, listData) {
      state.pageData = listData;
    },
    setFilteredData(state, filteredData) {
      state.filteredData = filteredData;
      console.log(filteredData, "filteredData");
    },
    setFilterText(state, filterText) {
      state.filterText = filterText;
    },
    setTotalCount(state, count) {
      state.totalComments = count;
    },
    setSort(state, sort) {
      state.sortBy = sort;
    },
    fetchComments(state, comments) {
      state.comments = comments;
      console.log(comments);
    },
  },
  actions: {
    async getComments(context, payload) {
      const startIndex = (payload.currentPage - 1) * context.state.rowsPerPage;
      const endIndex = startIndex + context.state.rowsPerPage;
      4;

      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );

      context.commit("fetchComments", response.data);

      let filteredData = response.data;
      if (context.state.filterText.trim() !== "") {
        filteredData = filteredData.filter(
          (comment) =>
            comment.name
              .toLowerCase()
              .includes(context.state.filterText.toLowerCase()) ||
            comment.email
              .toLowerCase()
              .includes(context.state.filterText.toLowerCase()) ||
            comment.body
              .toLowerCase()
              .includes(context.state.filterText.toLowerCase())
        );
      }
      if (context.state.sortBy) {
        if (context.state.sortBy.order == "desc") {
          if (context.state.sortBy.type == "id") {
            filteredData.sort((a, b) => {
              return -1 * (a.id > b.id ? 1 : -1);
            });
          }
        } else if (context.state.sortBy.order == "asc") {
          if (context.state.sortBy.type == "id") {
            filteredData.sort((a, b) => {
              return 1 * (a.id > b.id ? 1 : -1);
            });
          }
        }
      }

      const listData = filteredData.slice(startIndex, endIndex);

      context.commit("setFilteredData", filteredData);
      context.commit("setTotalCount", filteredData.length);
      context.commit("setPageData", listData);
    },
    setFilterText(context, filterText) {
      context.commit("setFilterText", filterText);

      context.dispatch("getComments", { currentPage: 1 });
    },
    setSortTable(context, sortOrder) {
      context.commit("setSort", sortOrder);
      console.log(sortOrder);

      context.dispatch("getComments", { currentPage: 1 });
    },
  },
  getters: {
    pageData(state) {
      return state.pageData;
    },
    filteredData(state) {
      return state.filteredData;
    },
    totalCount(state) {
      return state.totalComments;
    },
    comments(state) {
      return state.comments;
    },
  },
});

export default store;
