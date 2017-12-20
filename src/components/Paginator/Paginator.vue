<template>
  <div class="paginator">
    <ul class="paginator__pager">
      <li class="paginator__number" :class="{'paginator__number--disabled': pageIndex === 1}" @click="prevPage()">
        Previous
      </li>
      <li class="paginator__number" v-for="(number, index) in numbers" :key="index"
          :class="{'paginator__number--active': number === pageIndex, 'paginator__number--separated': number === '...'}" @click="changePage(number)">
        {{number}}
      </li>
      <li class="paginator__number" :class="{'paginator__number--disabled': pageIndex === pageCount}" @click="nextPage()">
        Next
      </li>
    </ul>
    <div class="paginator__comment">
      Page:
      <input class="paginator__jumper" type="text" v-model="currentIndex" @keyup="jumpToPage($event)"/>
      /
      {{pageCount}}
      ，
      <select class="paginator__sizer" v-model="currentSize">
        <option v-for="(size, index) in pageSizes" :key="index">{{size}}</option>
      </select>
      /
      {{total}}
      items
    </div>
  </div>
</template>

<script>
export default {
  name: 'Paginator',
  data() {
    return {
      // 跳转输入框中的当前页码
      currentIndex: 0,
      // 当前选中的每页显示条目个数
      currentSize: 0
    };
  },
  props: {
    // 当前页码
    pageIndex: {
      type: Number,
      default() {
        return 1;
      }
    },
    // 每页显示条目个数
    pageSize: {
      type: Number,
      default() {
        return 10;
      }
    },
    // 总条目数
    total: {
      type: Number,
      default() {
        return 0;
      }
    },
    // 分页器长度，即显示的页码个数
    pageLength: {
      type: Number,
      default() {
        return 5;
      }
    },
    // 每页显示条目个数选择器的选项设置
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50];
      }
    }
  },
  computed: {
    // 总页码数
    pageCount() {
      return this.total ? Math.ceil(this.total / this.currentSize) : 1;
    },
    // 页码内容
    numbers() {
      const numbers = [];
      if (this.pageCount <= this.pageLength) {
        for (let i = 1; i <= this.pageCount; i++) {
          numbers.push(i);
        }
        return numbers;
      }
      if (parseInt((this.pageIndex - 1) / this.pageLength, 10) === 0) {
        let i;
        for (i = 1; i <= this.pageLength; i++) {
          numbers.push(i);
        }
        if (i <= this.pageCount) {
          numbers.push('...');
          numbers.push(this.pageCount);
        }
      } else if (parseInt((this.pageIndex - 1) / this.pageLength, 10) === parseInt(this.pageCount / this.pageLength, 10)) {
        if (this.pageIndex > this.pageLength) {
          numbers.push(1);
          numbers.push('...');
        }
        for (let i = (this.pageCount - this.pageLength) + 1; i <= this.pageCount; i++) {
          numbers.push(i);
        }
      } else {
        if (this.pageIndex > this.pageLength) {
          numbers.push(1);
          numbers.push('...');
        }
        let i;
        for (i = (parseInt((this.pageIndex - 1) / this.pageLength, 10) * this.pageLength) + 1; i <= (parseInt((this.pageIndex - 1) / this.pageLength, 10) * this.pageLength) + this.pageLength; i++) {
          numbers.push(i);
        }
        if (i <= this.pageCount) {
          numbers.push('...');
          numbers.push(this.pageCount);
        }
      }
      return numbers;
    }
  },
  watch: {
    currentSize(newValue, oldValue) {
      if (!oldValue) {
        return;
      }
      this.changePage(this.pageIndex, parseInt(this.currentSize, 10));
    }
  },
  created() {
    this.fixPageSizes();
    this.currentIndex = this.pageIndex;
    this.currentSize = this.pageSize;
  },
  methods: {
    // 跳转页面
    changePage(index, size) {
      if (index === '...' || (index === this.pageIndex && !size)) {
        return;
      }
      const newIndex = this.fixPageIndex(index ? parseInt(index, 10) : 1);
      this.currentIndex = newIndex;
      const newSize = size || parseInt(this.currentSize, 10);
      this.$emit('page-changed', newIndex, newSize);
    },
    // 上一页
    prevPage() {
      let newIndex = this.pageIndex;
      if (newIndex > 1) {
        newIndex -= 1;
      }
      this.changePage(newIndex);
    },
    // 下一页
    nextPage() {
      let newIndex = this.pageIndex;
      if (newIndex < this.pageCount) {
        newIndex += 1;
      }
      this.changePage(newIndex);
    },
    // 输入页码跳转页面
    jumpToPage() {
      const newIndex = this.currentIndex.toString().replace(/[^0-9]/g, '');
      this.changePage(newIndex);
    },
    // 调整页码
    fixPageIndex(index) {
      let newIndex = index;
      if (newIndex <= 1) {
        newIndex = 1;
      }
      if (this.pageCount > 0 && newIndex >= this.pageCount) {
        newIndex = this.pageCount;
      }
      return newIndex;
    },
    // 调整每页显示条目个数选择器的选项
    fixPageSizes() {
      const pageSizesLength = this.pageSizes.length;
      let pageSizesStatus;
      for (let i = 0; i < pageSizesLength; i++) {
        if (parseInt(this.pageSizes[i], 10) === parseInt(this.pageSize, 10)) {
          pageSizesStatus = true;
          break;
        }
      }
      if (!pageSizesStatus) {
        this.pageSizes.push(this.pageSize);
      }
      this.pageSizes.sort((x, y) => x - y);
    }
  }
};
</script>

<style lang="scss">
.paginator:after {
  content: ' ';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.paginator__pager {
  float: left;
  margin-top: 0;
  font-size: 0;
}

.paginator__number {
  display: inline-block;
  position: relative;
  float: left;
  box-sizing: border-box;
  padding: 6px 12px;
  margin-left: -1px;
  cursor: pointer;
  border: 1px solid #ddd;
  color: #4f99c6;
  font-size: 12px;
  line-height: 16px;
}

.paginator__number:first-child {
  margin-left: 0;
}

.paginator__number:hover {
  color: #4f99c6;
}

.paginator__number--separated {
  cursor: default;
  padding-left: 8px;
  padding-right: 8px;
}

.paginator__number--separated:hover {
  background: none;
}

.paginator__number--active {
  background-color: #4f99c6;
  border-color: #4f99c6;
  color: #fff;
}

.paginator__number--active:hover {
  color: #fff;
}

.paginator__number--disabled {
  cursor: not-allowed;
  color: #777;
}

.paginator__number--disabled:hover {
  color: #777;
}

.paginator__comment {
  float: left;
  margin-left: 20px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
}

.paginator__jumper,
.paginator__sizer {
  margin: 0;
  width: 40px;
  height: 30px;
  box-sizing: border-box;
  vertical-align: top;
  border: 1px solid #ddd;
  outline: none;
}

.paginator__jumper {
  padding-left: 3px;
}
</style>
