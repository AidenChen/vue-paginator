<template>
  <div class="paginator-wrapper">
    <ul class="paginator" v-show="total > 0">
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
    <div class="paginator__comment" v-show="total > 0">
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
    <div class="paginator__comment--clear" v-show="total === 0">No data.</div>
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
      return Math.ceil(this.total / this.optionNow);
    },
    // 页码数组
    pageList() {
      const pageList = [];
      // 若总页数不超过分页器长度，则直接显示
      if (this.all <= this.length) {
        for (let i = 1; i <= this.all; i++) {
          pageList.push(i);
        }
      } else {
        // 若总页数超过分页器长度，则分为三种情况
        // 左右两边偏移显示页码的个数
        const offset = (this.length - 1) / 2;
        // 若页码值少于左侧偏移显示页码的个数代表的阈值，则表示左侧偏移，右侧显示省略号
        if (this.index <= offset) {
          for (let i = 1; i <= offset + 1; i++) {
            pageList.push(i);
          }
          pageList.push('...');
          pageList.push(this.all);
        } else if (this.index > this.all - offset) {
          // 若页码值大于右侧偏移显示页码的个数代表的阈值，则表示右侧偏移，左侧显示省略号
          pageList.push(1);
          pageList.push('...');
          for (let i = offset + 1; i >= 1; i--) {
            pageList.push(this.all - i);
          }
          pageList.push(this.all);
        } else {
          // 若页码值处于两侧偏移显示页码区域之间，则两侧均显示省略号
          pageList.push(1);
          pageList.push('...');
          for (let i = Math.ceil(offset / 2); i >= 1; i--) {
            pageList.push(this.index - i);
          }
          pageList.push(this.index);
          for (let i = 1; i <= offset / 2; i++) {
            pageList.push(this.index + i);
          }
          pageList.push('...');
          pageList.push(this.all);
        }
      }
      return pageList;
    }
  },
  watch: {
    optionNow() {
      this.init();
      this.$emit('change-page', this.index, parseInt(this.optionNow, 10));
    }
  },
  created() {
    this.targetIndex = this.index;
    this.optionNow = this.size;
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.fixLength();
      this.fixIndex();
      this.fixSelect();
    },
    // 点击页码跳转页面
    changePage(index) {
      if (index === '...') {
        return;
      }
      this.index = parseInt(index, 10);
      this.fixIndex();
      this.$emit('change-page', this.index, parseInt(this.optionNow, 10));
    },
    // 上一页
    prevPage() {
      if (this.index > 1) {
        this.index -= 1;
      }
      this.targetIndex = this.index;
      this.$emit('change-page', this.index, parseInt(this.optionNow, 10));
    },
    // 下一页
    nextPage() {
      if (this.index < this.all) {
        this.index += 1;
      }
      this.targetIndex = this.index;
      this.$emit('change-page', this.index, parseInt(this.optionNow, 10));
    },
    // 输入页码跳转页面
    jumpToPage() {
      this.targetIndex = this.targetIndex.replace(/[^0-9]/g, '');
      if (this.targetIndex !== '') {
        this.changePage(this.targetIndex);
      }
    },
    // 修正分页器显示的页码个数
    fixLength() {
      this.length = parseInt(this.length, 10) ? parseInt(this.length, 10) : 5;
      if (this.length % 2 === 0) {
        this.length += 1;
      }
    },
    // 修正分页索引
    fixIndex() {
      if (this.index < 1) {
        this.index = 1;
      }
      if (this.all > 0 && this.index > this.all) {
        this.index = this.all;
      }
      this.targetIndex = this.index;
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

.paginator__comment--clear {
  height: 30px;
  font-size: 12px;
  line-height: 30px;
}
</style>
