<template>
  <div id="app" class="app">
    <div class="commodity">

      <a href="" class="shopping_a" style="width: 100%; margin-top: 50px; text-decoration: none; display: flex; flex-wrap: nowrap;justify-content: center;">
        <div class="shopping" v-for="(item, index) in shoplist" :key="item.id">
          <div class="images_pic" style="width: 100%; display: flex; justify-content: center; padding-top: 10px">
            <img :src="item.image" width="150" height="150">
          </div>
          <p class="shop_p"><a href="#" target="_blank" style="text-decoration: none; color: #222;">{{ item.shopname }}</a></p>
          <p class="shop_price">¥{{item.price}}</p>
        </div>
      </a>

      <div class="cart-list" v-for="(cartitem, index) in cartList" :key="cartitem.id">
        <div class="cart-item" :class="{'b-b': index!== cartList.length-1}">
          <div class="image-wrapper">
            <img :src="item.image" :class="[cartitem.loaded]" @load="onImageLoad('cartList',index)" @error="onImageError('cartList', index)" alt="">
            <div class="yticon icon-xuanzhong2 checkbox" :class="{checked:item.checked}" @click="check('item', index)"></div>
          </div>
          <div class="item-right">
            <span class="clamp title">{{cartitem.title}}</span>
            <span class="attr">{{cartitem.attr_val}}</span>
            <span class="price">¥{{cartitem.price}}</span>
            <number-box class="step" :min="1" :max="cartitem.stock" :value="cartitem.number>cartitem.stock?cartitem.stocl:cartitem.number" :is-max="cartitem.number>=cartitem.stock?true:false" :isMin="cartitem.number===1" :index="index" @eventChange="numberChange"></number-box>
          </div>
          <span class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></span>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
  import ListData from '../json.js'
  // import {test} from './api/api.js'
  import  NumberBox from 'components/number-box'
export default {
  name: 'app', 
  components: {
    NumberBox
  },
  data() {
    return {
      shoplist:ListData.shoplist,
      total:0,//总价格
      cartList:[],
      allChecked: false
    }
  },
  computed:{
    totalPrice: function () {
      var total =0;
      for(var i = 0;i<this.list.length;i++){
        var item = this.list[i];
        total +=item.price*item.count;
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g,',');
    }
  },
  mounted(){
    // this.loadData()
    // console.log(ListData.shoplist)?pid=0&apiver=2&plat=0
    test()
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log(error)
    })
  },
  methods:{
    async loadData(){
      let list = await this.$api.json('shoplist');
      console.log(list)
      let shoplist = list.map(item=>{
        item.checked = true;
        return item;
      });
      this.shoplist = shoplist;
    },
    handleReduce:function (index) {
      if(this.list[index].count ===1)return;
      this.list[index].count--;
    },
    handleAdd:function (index) {
      this.list[index].count++;
    },
    handleRemove:function (index) {
      this.list.splice(index,1);
    }
  }
}
</script>

<style>
  .app{
      width: 100%;
      height: 100%;
      background: #fff;
    }
  .commodity{
        display: flex;
    flex-wrap: nowrap;
    }
  .shopping{
    width: 170px;
    height: 256px;
    margin-left: 15px;
  }
  .shopping:hover{
    background: darkgray;
  }
  .shopping_a:hover{
    background: #fff;
  }
  .shop_p{
    font-size: 13px;
  }
  .shop_price{
    color: red;
  }
</style>