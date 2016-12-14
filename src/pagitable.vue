<template>
  <div class="pagitable-wrapper">
    <ul class="pagitable" v-show="total > 0">
      <li class="pagitable__item" :class="{'pagitable__item--disabled': index === 1}" @click="prevPage()">
        <span class="pagitable__page-no">Previous</span>
      </li>
      <li class="pagitable__item" v-for="item in pageList" track-by="$index"
          :class="{'pagitable__item--active': item === index, 'pagitable__item--separated': item === '...'}" @click="changePage(item)">
        <span class="pagitable__page-no">{{item}}</span>
      </li>
      <li class="pagitable__item" :class="{'pagitable__item--disabled': index === all}" @click="nextPage()">
        <span class="pagitable__page-no">Next</span>
      </li>
    </ul>
    <div class="pagitable__comment" v-show="total > 0">
      Page:
      <input class="pagitable__page-jumper" type="text" v-model="targetIndex" @keyup="jumpToPage($event)"/>
      /
      {{all}}
      ，
      <select class="pagitable__page-sizer" v-model="optionNow">
        <option v-for="option in options" track-by="$index">{{option}}</option>
      </select>
      /
      {{total}}
      items
    </div>
    <div class="pagitable__comment--clear" v-show="total === 0">No data.</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        // 当前输入的跳转目标页码
        targetIndex: this.index,
        // 当前选中的每页显示的项目个数
        optionNow: this.size
      }
    },
    props: {
      // 每页显示的项目个数
      size: {
        type: Number,
        default() {
          return 10
        }
      },
      // 总项目个数
      total: {
        type: Number,
        default() {
          return 0
        }
      },
      // 每页显示项目个数select的内容数组
      options: {
        type: Array,
        default() {
          return [10, 20, 30, 40, 50]
        }
      },
      // 分页器长度，即显示的页码个数
      length: {
        type: Number,
        default() {
          return 5
        }
      },
      // 当前页码
      index: {
        type: Number,
        default() {
          return 1
        }
      }
    },
    computed: {
      // 总页码数
      all() {
        return Math.ceil(this.total / this.optionNow)
      },
      // 页码数组
      pageList() {
        let pageList = []
        // 若总页数不超过分页器长度，则直接显示
        if (this.all <= this.length) {
          for (let i = 1; i <= this.all; i++) {
            pageList.push(i)
          }
        }
        // 若总页数超过分页器长度，则分为三种情况
        else {
          // 左右两边偏移显示页码的个数
          let offset = (this.length - 1) / 2
          // 若页码值少于左侧偏移显示页码的个数代表的阈值，则表示左侧偏移，右侧显示省略号
          if (this.index <= offset) {
            for (let i = 1; i <= offset + 1; i++) {
              pageList.push(i)
            }
            pageList.push('...')
            pageList.push(this.all)
          }
          // 若页码值大于右侧偏移显示页码的个数代表的阈值，则表示右侧偏移，左侧显示省略号
          else if (this.index > this.all - offset) {
            pageList.push(1)
            pageList.push('...')
            for (let i = offset + 1; i >= 1; i--) {
              pageList.push(this.all - i)
            }
            pageList.push(this.all)
          }
          // 若页码值处于两侧偏移显示页码区域之间，则两侧均显示省略号
          else {
            pageList.push(1)
            pageList.push('...')
            for (let i = Math.ceil(offset / 2); i >= 1; i--) {
              pageList.push(this.index - i)
            }
            pageList.push(this.index)
            for (let i = 1; i <= offset / 2; i++) {
              pageList.push(this.index + i)
            }
            pageList.push('...')
            pageList.push(this.all)
          }
        }
        return pageList
      }
    },
    watch: {
      optionNow() {
        this.init()
        this.$emit('change-page', this.index)
      }
    },
    created() {
      this.init()
    },
    methods: {
      // 初始化
      init() {
        this.fixLength()
        this.fixIndex()
        this.fixSelect()
      },
      // 点击页码跳转页面
      changePage(index) {
        if (index === '...') {
          return
        }
        else {
          this.index = parseInt(index)
        }
        this.fixIndex()
      },
      // 上一页
      prevPage() {
        if (this.index > 1) {
          this.index -= 1
        }
        this.targetIndex = this.index
      },
      // 下一页
      nextPage() {
        if (this.index < this.all) {
          this.index += 1
        }
        this.targetIndex = this.index
      },
      // 输入页码跳转页面
      jumpToPage() {
        this.targetIndex = this.targetIndex.replace(/[^0-9]/g, '')
        if (this.targetIndex !== '') {
          this.changePage(this.targetIndex)
        }
      },
      // 修正分页器显示的页码个数
      fixLength() {
        this.length = parseInt(this.length) ? parseInt(this.length) : 5
        if (this.length % 2 === 0) {
          this.length = this.length - 1
        }
      },
      // 修正分页索引
      fixIndex() {
        if (this.index < 1) {
          this.index = 1
        }
        if (this.all > 0 && this.index > this.all) {
          this.index = this.all
        }
        this.targetIndex = this.index
      },
      // 修正select框项目
      fixSelect() {
        let optionsLength = this.options.length
        let optionsStatus
        for (let i = 0; i < optionsLength; i++) {
          if (parseInt(this.options[i]) === parseInt(this.size)) {
            optionsStatus = true
            break
          }
        }
        if (!optionsStatus) {
          this.options.push(this.size)
        }
        this.options.sort((x, y) => {
          return x - y
        })
      }
    }
  }
</script>

<style>
  .pagitable-wrapper:after {
    content: ' ';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .pagitable {
    float: left;
    margin-top: 0;
    font-size: 0;
  }

  .pagitable__item {
    display: inline-block;
  }

  .pagitable__page-no {
    position: relative;
    float: left;
    box-sizing: border-box;
    padding: 6px 12px;
    margin-left: -1px;
    cursor: pointer;
    border: 1px solid #ddd;
    color: #4F99C6;
    font-size: 12px;
    line-height: 16px;
  }

  .pagitable__item:first-child .pagitable__page-no {
    margin-left: 0;
  }

  .pagitable__item .pagitable__page-no:hover {
    color: #4F99C6;
  }

  .pagitable__item--separated .pagitable__page-no {
    cursor: default;
    padding-left: 8px;
    padding-right: 8px;
  }

  .pagitable__item--separated .pagitable__page-no:hover {
    background: none;
  }

  .pagitable__item--active .pagitable__page-no {
    background-color: #4F99C6;
    border-color: #4F99C6;
    color: #fff;
  }

  .pagitable__item--active .pagitable__page-no:hover {
    color: #fff;
  }

  .pagitable__item--disabled .pagitable__page-no {
    cursor: not-allowed;
    color: #777;
  }

  .pagitable__item--disabled .pagitable__page-no:hover {
    color: #777;
  }

  .pagitable__comment {
    float: left;
    margin-left: 20px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
  }

  .pagitable__page-jumper, .pagitable__page-sizer {
    margin: 0;
    width: 40px;
    height: 30px;
    box-sizing: border-box;
    vertical-align: top;
    border: 1px solid #ddd;
    outline: none;
  }

  .pagitable__page-jumper {
    padding-left: 3px;
  }

  .pagitable__comment--clear {
    height: 30px;
    font-size: 12px;
    line-height: 30px;
  }
</style>
