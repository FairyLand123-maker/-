Component({
  properties:{
    one2:{
      type:Array,
      value:[]
    },
    author:{
      type:Array,
      value:[]
    }
  },
  methods:{
    handleTap(e){
      let {index}=e.currentTarget.dataset;
      this.triggerEvent('myevent',{index})
    }
  }
})