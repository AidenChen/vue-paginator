<template>
  <div class="paginator-wrapper">
    <ul class="paginator">
      <li class="paginator__item" :class="{'paginator__item--disabled': index === 1}" @click="prevPage()">
        <span class="paginator__page-no">Previous</span>
      </li>
      <li class="paginator__item" v-for="(item, i) in pageList" :key="i"
          :class="{'paginator__item--active': item === index, 'paginator__item--separated': item === '...'}" @click="changePage(item)">
        <span class="paginator__page-no">{{item}}</span>
      </li>
      <li class="paginator__item" :class="{'paginator__item--disabled': index === all}" @click="nextPage()">
        <span class="paginator__page-no">Next</span>
      </li>
    </ul>
    <div class="paginator__comment">
      Page:
      <input class="paginator__page-jumper" type="text" v-model="targetIndex" @keyup="jumpToPage($event)"/>
      /
      {{all}}
      ，
      <select class="paginator__page-sizer" v-model="optionNow">
        <option v-for="(option, index) in options" :key="index">{{option}}</option>
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
      // 当前输入的跳转目标页码
      targetIndex: 0,
      // 当前选中的每页显示的项目个数
      optionNow: 0
    };
  },
  props: {
    // 每页显示的项目个数
    size: {
      type: Number,
      default() {
        return 10;
      }
    },
    // 总项目个数
    total: {
      type: Number,
      default() {
        return 0;
      }
    },
    // 每页显示项目个数select的内容数组
    options: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50];
      }
    },
    // 分页器长度，即显示的页码个数
    length: {
      type: Number,
      default() {
        return 5;
      }
    },
    // 当前页码
    index: {
      type: Number,
      default() {
        return 1;
      }
    }
  },
  computed: {
    // 总页码数
    all() {
      return this.total ? Math.ceil(this.total / this.optionNow) : 1;
    },
    // 页码数组
    pageList() {
      const pageList = [];
      if (this.all <= this.length) {
        for (let i = 1; i <= this.all; i++) {
          pageList.push(i);
        }
        return pageList;
      }
      if (parseInt((this.index - 1) / this.length, 10) === 0) {
        let i;
        for (i = 1; i <= this.length; i++) {
          pageList.push(i);
        }
        if (i <= this.all) {
          pageList.push('...');
          pageList.push(this.all);
        }
      } else if (parseInt((this.index - 1) / this.length, 10) === parseInt(this.all / this.length, 10)) {
        if (this.index > this.length) {
          pageList.push(1);
          pageList.push('...');
        }
        for (let i = (this.all - this.length) + 1; i <= this.all; i++) {
          pageList.push(i);
        }
      } else {
        if (this.index > this.length) {
          pageList.push(1);
          pageList.push('...');
        }
        let i;
        for (i = (parseInt((this.index - 1) / this.length, 10) * this.length) + 1; i <= (parseInt((this.index - 1) / this.length, 10) * this.length) + this.length; i++) {
          pageList.push(i);
        }
        if (i <= this.all) {
          pageList.push('...');
          pageList.push(this.all);
        }
      }
      return pageList;
    }
  },
  watch: {
    optionNow() {
      const newIndex = this.init(this.index);
      this.$emit('change-page', newIndex, parseInt(this.optionNow, 10));
    }
  },
  created() {
    this.targetIndex = this.init(this.index);
    this.optionNow = this.size;
  },
  methods: {
    // 初始化
    init(index) {
      const newIndex = this.fixIndex(index);
      this.fixSelect();
      return newIndex;
    },
    // 点击页码跳转页面
    changePage(index) {
      if (index === '...' || index === this.index) {
        return;
      }
      const newIndex = this.fixIndex(parseInt(index, 10));
      this.$emit('change-page', newIndex, parseInt(this.optionNow, 10));
    },
    // 上一页
    prevPage() {
      let newIndex = this.index;
      if (newIndex === 1) {
        return;
      }
      if (newIndex > 1) {
        newIndex -= 1;
      }
      this.targetIndex = newIndex;
      this.$emit('change-page', newIndex, parseInt(this.optionNow, 10));
    },
    // 下一页
    nextPage() {
      let newIndex = this.index;
      if (newIndex === this.all) {
        return;
      }
      if (newIndex < this.all) {
        newIndex += 1;
      }
      this.targetIndex = newIndex;
      this.$emit('change-page', newIndex, parseInt(this.optionNow, 10));
    },
    // 输入页码跳转页面
    jumpToPage() {
      this.targetIndex = this.targetIndex.toString().replace(/[^0-9]/g, '');
      if (this.targetIndex !== '') {
        this.changePage(this.targetIndex);
      }
    },
    // 修正分页索引
    fixIndex(index) {
      let newIndex = index;
      if (newIndex < 1) {
        newIndex = 1;
      }
      if (this.all > 0 && newIndex > this.all) {
        newIndex = this.all;
      }
      this.targetIndex = newIndex;
      return newIndex;
    },
    // 修正select框项目
    fixSelect() {
      const optionsLength = this.options.length;
      let optionsStatus;
      for (let i = 0; i < optionsLength; i++) {
        if (parseInt(this.options[i], 10) === parseInt(this.size, 10)) {
          optionsStatus = true;
          break;
        }
      }
      if (!optionsStatus) {
        this.options.push(this.size);
      }
      this.options.sort((x, y) => x - y);
    }
  }
};
</script>

<style lang="scss">
.paginator-wrapper:after {
  content: ' ';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.paginator {
  float: left;
  margin-top: 0;
  font-size: 0;
}

.paginator__item {
  display: inline-block;
}

.paginator__page-no {
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

.paginator__item:first-child .paginator__page-no {
  margin-left: 0;
}

.paginator__item .paginator__page-no:hover {
  color: #4f99c6;
}

.paginator__item--separated .paginator__page-no {
  cursor: default;
  padding-left: 8px;
  padding-right: 8px;
}

.paginator__item--separated .paginator__page-no:hover {
  background: none;
}

.paginator__item--active .paginator__page-no {
  background-color: #4f99c6;
  border-color: #4f99c6;
  color: #fff;
}

.paginator__item--active .paginator__page-no:hover {
  color: #fff;
}

.paginator__item--disabled .paginator__page-no {
  cursor: not-allowed;
  color: #777;
}

.paginator__item--disabled .paginator__page-no:hover {
  color: #777;
}

.paginator__comment {
  float: left;
  margin-left: 20px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
}

.paginator__page-jumper,
.paginator__page-sizer {
  margin: 0;
  width: 40px;
  height: 30px;
  box-sizing: border-box;
  vertical-align: top;
  border: 1px solid #ddd;
  outline: none;
}

.paginator__page-jumper {
  padding-left: 3px;
}
</style>
