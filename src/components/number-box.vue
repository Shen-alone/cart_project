<template>
    <div class="numbox">
        <div class="numbox-minus" @click="_calcValue('subtract')">
            <span class="yticon icon--jianhao" :class="minDisabled?'numbox-disabled':''"></span>
        </div>
        <input type="number" class="numbox-value" :disabled="disabled" :value="inputValue" @blur="_onBlur">
        <div class="numbox-plus" @click="_calcValue('add')">
            <span class="yticon icon-jia2" :class="maxDisabled?'numbox-disabled':''"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "number-box",
        props:{
            isMax:{
                type:Boolean,
                default:false
            },
            isMin:{
                type:Boolean,
                default: false
            },
            index:{
                type: Number,
                default: 0
            },
            value:{
                type: Number,
                default: 0
            },
            min:{
                type: Number,
                default: -Infinity
            },
            max:{
                type: Number,
                default:Infinity
            },
            step: {
                type: Number,
                default:1
            },
            disable: {
                type:Boolean,
                default: false
            }
        },
        data(){
            return{
                inputValue: this.value,
                minDecibels:false,
                maxDecibels:false
            }
        },
        created() {
            this.maxDecibels = this.isMax
            this.minDecibels = this.isMin
        },
        computed:{

        },
        watch:{
            inputValue(number){
                const data = {
                    number: number,
                    index: this.index
                }
                this.$emit('eventChange',data)
            },
            methids:{
                _calcValue(type){
                    const  scale = this._getDecimalScale();
                    let value = this.inputValue * scale;
                    let  newValue = 0;
                    let step = this.step * scale;

                    if(type === 'subtract'){
                        newValue = value - step;
                        if(newValue <= this.min){
                            this.minDecibels = true
                        }
                        if(newValue < this.min){
                            newValue = this.min
                        }
                        if(newValue < this.max && this.maxDecibels === true){
                            this.maxDecibels = false
                        }
                    }else if(type === 'add'){
                        newValue = value + step
                        if(newValue >= this.max){
                            this.maxDecibels = true
                        }
                        if(newValue > this.max){
                            newValue = this.max
                        }
                        if(newValue > this.min && this.minDecibels === true){
                            this.minDecibels = false
                        }
                    }
                    if(newValue === value){
                        return
                    }
                    this.inputValue = newValue / scale
                },
                _getDecimalScale() {
                    let scale = 1;
                    if(~~this.step !== this.step){
                        scale = Math.pow(10,(this.step + '').split('' +
                            '.')[1].length)
                    }
                    return scale
                },
                _onBlur(event){
                    let value = event.datail.value;
                    if(!value){
                        this.inputValue = 0;
                        return
                    }
                    value = +value;
                    if(value > this.max){
                        value = this.max
                    }else if(value < this.min){
                        value = this.min
                    }

                    this.inputValue = value
                }
            }
        }
    }
</script>

<style scoped>
    .numbox{
        position: absolute;
        left: 30px;
        bottom: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 230px;
        height: 70px;
        background: #f5f5f5;
    }

    .numbox-plus,.numbox-minus{
        margin: 0;
        background-color: #f5f5f5;
        width: 70%;
        height: 100%;
        line-height: 70px;
        text-align: center;
        position: relative;
    }

    .numbox-minus .yticon,
    .numbox-plus .yticon{
        color: #555;
        font-size: 36px;
    }

    .numbox-minus{
        border-right: none;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
    }

    .numbox-plus{
        border-left: none;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
    }

    .numbox-value{
        position: relative;
        background-color: #f5f5f5;
        width: 90px;
        height: 50px;
        text-align: center;
        padding: 0;
        font-size: 30px;
    }

    .numbox-disabled.yticon{
        color: #d6d6d6;
    }
</style>