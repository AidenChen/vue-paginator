<template>
  <div class="paginator">
    <ul class="paginator__pager">
      <li class="paginator__number" :class="{'paginator__number--disabled': index === 1}" @click="prevPage()">
        Previous
      </li>
      <li class="paginator__number" v-for="(item, i) in pageList" :key="i"
          :class="{'paginator__number--active': item === index, 'paginator__number--separated': item === '...'}" @click="changePage(item)">
        {{item}}
      </li>
      <li class="paginator__number" :class="{'paginator__number--disabled': index === all}" @click="nextPage()">
        Next
      </li>
    </ul>
    <div class="paginator__comment">
      Page:
      <input class="paginator__jumper" type="text" v-model="targetIndex" @keyup="jumpToPage($event)"/>
      /
      {{all}}
      ，
      <select class="paginator__sizer" v-model="currentOption">
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
      currentOption: 0
    };
  },
  props: {
    // 当前页码
    index: {
      type: Number,
      default() {
        return 1;
      }
    },
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
    // 分页器长度，即显示的页码个数
    length: {
      type: Number,
      default() {
        return 5;
      }
    },
    // 每页显示项目个数选择框的内容数组
    options: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50];
      }
    }
  },
  computed: {
    // 总页码数
    all() {
      return this.total ? Math.ceil(this.total / this.currentOption) : 1;
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
    currentOption() {
      this.changePage(this.index, parseInt(this.currentOption, 10));
    }
  },
  created() {
    this.fixSelect();
    this.targetIndex = this.index;
    this.currentOption = this.size;
  },
  methods: {
    // 点击页码跳转页面
    changePage(index, size) {
      if (index === '...' || (index === this.index && !size)) {
        return;
      }
      const newIndex = this.fixIndex(parseInt(index, 10));
      this.targetIndex = newIndex;
      const newSize = size || parseInt(this.currentOption, 10);
      this.$emit('change-page', newIndex, newSize);
    },
    // 上一页
    prevPage() {
      let newIndex = this.index;
      if (newIndex > 1) {
        newIndex -= 1;
      }
      this.changePage(newIndex);
    },
    // 下一页
    nextPage() {
      let newIndex = this.index;
      if (newIndex < this.all) {
        newIndex += 1;
      }
      this.changePage(newIndex);
    },
    // 输入页码跳转页面
    jumpToPage() {
      const newIndex = this.targetIndex.toString().replace(/[^0-9]/g, '');
      if (newIndex !== '') {
        this.changePage(newIndex);
      }
    },
    // 修正分页索引
    fixIndex(index) {
      let newIndex = index;
      if (newIndex <= 1) {
        newIndex = 1;
      }
      if (this.all > 0 && newIndex >= this.all) {
        newIndex = this.all;
      }
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
