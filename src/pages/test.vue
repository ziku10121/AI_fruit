<template>
    <q-page>
        <div class="wrap">
            <div class="container">       
                <div class="row">
                    <div class="col-12">
                        <!-- logo / debug -->
                        <div style="padding: 24px 0 12px;">
                        </div>
                    </div>
                    <!-- left -->
                    <div class="col-auto left-area">
                        <div class="column" style="height:100%">
                             <!-- Calcu -->
                             <div class="col-auto">
                                <div class="row calcu">
                                    <div class="col">
                                        <q-card class="my-card">
                                            <q-card-section class="bg-grey-8 text-white">
                                                <div class="text-h6">
                                                    <div class="row justify-between">
                                                        <div class="col-auto" v-if="buy_list.length<=0 && !operateText"><label>Please put products on detect area.</label></div>
                                                        <div class="col-auto" v-if="buy_list.length>0  && operateText"><label>{{temporder.item}} detected.</label></div>
                                                        <div class="col-auto" v-if="buy_list.length>0  && !operateText"><label >Pay or clear checkout list</label></div>
                                                        <div class="col-auto" v-if="operateText"><label >{{operateText}}</label></div>
                                                    </div>
                                                </div>
                                            </q-card-section>
                                            <q-card-actions class="card-body" vertical>
                                                <table v-if="temporder.item" class="text-center text-grey-10" style="height:100%">
                                                    <tr style="border-bottom:1px solid #000">
                                                        <th>Item</th>
                                                        <th>Price</th>
                                                        <th>Weight</th>
                                                        <th>Qty</th>
                                                        <th>$$$</th>
                                                    </tr>
                                                    <tr>
                                                        <td>{{temporder.item}}</td>
                                                        <td>{{temporder.unit_price}}</td>
                                                        <td>{{temporder.weight_kg}}</td>
                                                        <td>{{temporder.qty}}</td>
                                                        <td>{{temporder.price}}</td>
                                                    </tr>
                                                </table>
                                            </q-card-actions>
                                        </q-card>
                                    </div>
                                </div>
                            </div>
                            <!-- Live Camera -->
                            <div class="col-auto">
                                <div class="livecam">
                                    <!-- <div class="video" v-if="streaming" >
                                        <video class="video" ref="webcam" autoplay playsinline muted width="800" height="600" />
                                        <div class="live"><strong>LIVE</strong></div>
                                    </div>
                                    <img v-else id="image" :src="imgSrc" width="800" height="600"/> -->

                                    <div class="video"  >
                                        <video class="video" ref="webcam" autoplay playsinline muted width="800" height="600"/>
                                        <div class="live"><strong>LIVE</strong></div>
                                    </div>
                                </div>
                            </div>
                            <!-- Weight -->
                            <div class="col">
                                <div class="row justify-between">
                                    <div id="reboot" class="weight-rect col-4 bg-grey-8 text-grey-1">
                                        <div class="row items-center">
                                            <div class="col-auto">
                                                <q-icon name="scale" class="q-pa-sm"/>
                                            </div>
                                            <div class="col text-right">
                                                <label>{{weight}}<small>kg</small></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-auto imgRect">
                                        <!-- <button> -->
                                        <img id="image" v-if="isImg" :src="imgSrc" @click="showPreview">
                                        <!-- </button> -->
                                        <img v-if="isPreview" class="preview" :src="imgSrc"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- right -->
                    <div class="col right-area">
                        <div class="column justify-end" style="height:100%">
                            <!-- Order List -->
                            <div class="col order-list">
                                <q-card class="my-card" style="height:100%">
                                    <div class="column" style="height:100%"> 
                                        <!-- Header -->
                                        <div class="col-auto">
                                            <q-card-section class="bg-grey-8 text-white">
                                                <div class="row items-center justify-between">
                                                    <div class="col-auto">
                                                        <div class="text-h6">Checkout List</div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <img class="logo" src="../../public/logo.svg" alt="logo"/>
                                                    </div>
                                                </div>
                                            </q-card-section>
                                        </div>
                                        <!-- Body -->
                                        <div class="col">
                                            <div class="column justify-between" style="height:100%;">
                                                <div class="col">
                                                    <q-card-section class="card-body text-grey-10" style="height:100%;">
                                                        <q-scroll-area style="height: 100%; max-width: 100%;">
                                                            <q-card v-for="(order,key) in buy_list" :key="order.item+key">
                                                                <q-card-section horizontal class="row items-center">
                                                                    <q-card-section class="col text-center">
                                                                        {{order.item}}
                                                                    </q-card-section>
                                                                    <q-card-section class="col text-center">
                                                                        ${{order.unit_price}}<small>/kg</small>
                                                                    </q-card-section>
                                                                    <q-card-section class="col text-center">
                                                                        {{order.weight_kg}}<small>kg</small>
                                                                    </q-card-section>
                                                                    <q-card-section class="col text-center">
                                                                        {{order.qty}}<small>pcs</small>
                                                                    </q-card-section>
                                                                    <q-card-section class="col text-center vertical-middle">
                                                                        ${{order.price}}
                                                                    </q-card-section>
                                                                    <q-card-section class="col-auto text-center q-mr-lg">
                                                                        <q-btn flat icon="close" class="text-red close" style="" @click="deleteCheckout(key)"/>
                                                                    </q-card-section>
                                                                </q-card-section>
                                                            </q-card>
                                                        </q-scroll-area>
                                                    </q-card-section>
                                                </div>
                                                <div v-if="buy_list.length>0" class="col-auto text-red-14 text-right q-pr-lg q-pb-sm" >
                                                    <div class="row">
                                                        <div class="col">
                                                            <label negative style="font-size: 48px;"><strong>{{total_weight}}kg</strong></label>
                                                        </div>
                                                        <div class="col">
                                                            <label negative style="font-size: 48px;"><strong>${{total_price}}</strong></label>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </q-card>
                            </div>
                            <!-- Btn Group-->
                            <div class="col-auto btn-group">
                                <div class="row" style="height:100%">
                                    <div class="col text-left">
                                        <!-- <q-btn color="primary" icon="calculate"/> -->
                                        <q-btn style="background-color:rgb(36, 167, 100);color:white" @click="cmdProccess('cart');" :disabled="!isDelay">
                                        <!-- color="green-7" -->
                                            <div v-if="buy_list.length>0" class="bedge bg-red">{{buy_list.length}}</div>
                                            <div class="column">
                                                <div class="col">
                                                    <q-icon name="add_shopping_cart"></q-icon>
                                                </div>
                                                <div class="col q-pa-none">
                                                    Buy
                                                </div>
                                            </div>
                                        </q-btn>
                                    </div>
                                    <div class="col text-center">
                                        <q-btn  style="background-color:rgb(0, 92, 185);color:white" @click="cmdProccess('pay')" :disabled="buy_list.length==0||!isDelay">
                                            <div class="column">
                                                <div class="col">
                                                    <q-icon name="local_atm"></q-icon>
                                                </div>
                                                <div class="col q-pa-none">
                                                    Pay
                                                </div>
                                            </div>
                                        </q-btn>
                                        <!-- color="blue-13" -->
                                    </div>
                                    <div class="col text-right">
                                        <q-btn style="background-color:rgba(215, 64, 66);color:white" @click="cmdProccess('cancel')" :disabled="buy_list.length==0||!isDelay">
                                        <!-- color="red-12" -->
                                        <div class="column">
                                                <div class="col">
                                                    <q-icon name="delete"></q-icon>
                                                </div>
                                                <div class="col q-pa-none">
                                                    clear
                                                </div>
                                            </div>
                                        </q-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <q-dialog v-model="isError">
            <q-card style="width:600px">
                <q-card-section class="row items-center bg-red-8 text-grey-3">
                    <div class="text-h6">Error</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-card-section class="text-grey-9 text-center">
                    <q-icon class="q-pt-lg" name="error_outline" style="font-size: 100px;" />
                    <div id="errorMessage" style="font-size:32px;line-height: 100px;">
                        {{errorText}}
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-dialog v-model="isPrompt">
            <q-card style="width:600px">
                <q-card-section class="row items-center bg-green-8 text-grey-3">
                    <div class="text-h6">Bill</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <!-- Bill -->
                <Bill :bill="temp_bill"></Bill>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { resolve } from 'path';
import {Loading,QSpinnerFacebook} from 'quasar';
import Bill from '../components/bill.vue';
export default {
    name: "PageIndex",
    components:{Bill},
    data() {
        return {
            mediaStream: null,
            imageCapture: null,
            // streaming:false,
            isPreview: false,
            isImg: false,
            imgSrc: "",
            delay: 0.8,
            loadingdelay: 15,
            loadtimer: null,
            isDelay: false,
            isPrompt: false,
            isError: false,
            errorText: "",
            operateText: "",
            weight: 0,
            temporder: {},  //當前單價
            buy_list: [],
            temp_bill: {},  //總菜單
            total_weight: 0,
            total_price: 0,
            mqttUrl: "ai_obj/from_server/weight",
            apiUrl: "http://127.0.0.1:1880/checkout",
            isFull:false,
            retimer:null,
        };
    },
    watch: {
        buy_list() {
            let self = this;
            self.total_price = 0;
            self.total_weight = 0;
            self.buy_list.forEach((_order) => {
                self.total_price += parseInt(_order.price);
                self.total_weight += parseFloat(_order.weight_kg);
                console.log("orderList:", _order, "\n totalprice:", self.total_price, "\n totalweight", self.total_weight);
            });
            self.total_weight = self.total_weight.toFixed(2);
        }
    },
    created() {
        this.init();
        // Subscribe mqtt
        // this.subscribe_topic = "ai_obj/#";
        // 訂閱
        // this.$mqtt.subscribe(this.subscribe_topic);
        // 發部
        // this.$mqtt.publish('menu/from_page/get_menu', "msg")
    },
    // mqtt: {
    //     "ai_obj/#"(data, topic) {
    //         if (topic === this.mqttUrl) {
    //             this.weight = JSON.parse(data);
    //             // console.log("msg", this.weight);
    //         }
    //     }
    // },
    async mounted() {
        let self = this;
        
        document.addEventListener("mouseup", function (e) {
            //#image 有使用 @click,所以限制重複觸發動作
            if (self.isPreview && !e.target.id) {
                self.showPreview();
            }
        }, false);

        document.addEventListener("dblclick",function(){
            if(self.isFull) return;
            document.documentElement.requestFullscreen()
            .then((e)=>{
                self.isFull=true;
            })   
        })

        document.getElementById('reboot').addEventListener('touchstart',function() {
            self.retimer = setTimeout(function(){
                console.log('reboot');
                self.cmdProccess('reboot');
                window.clearTimeout(self.retimer);
                self.retimer=null;
            },3000)
        },window);
        document.getElementById('reboot').addEventListener('touchend',function() {
            window.clearTimeout(self.retimer);
            self.retimer=null;
        },window);
        document.getElementById('reboot').addEventListener('touchmove',function() {
            window.clearTimeout(self.retimer);
            self.retimer=null;
        },window);

        await this.startWebcam();
    },
    methods: {
        init() {
            this.eqptInit();
            this.isPrompt = false;
            this.isError = false;
        },
        eqptInit() {
            // this.startWebcam();
            // this.temporder = {};
            this.isDelay = true;
            this.operateText = "";
        },
        async startWebcam() {
            // this.streaming = true;
            var constraints = {
                audio: false,
                video: {
                    facingMode: "environment",
                    width: 400,
                    height: 300,
                    frameRate: 1
                }
            };
            try {
                // console.log("frameRate:", constraints.video.frameRate);
                this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
                var video = this.$refs.webcam;
                video.srcObject = this.mediaStream;
                video.onloadedmetadata = function (e) {
                    video.play();
                };
                const track = this.mediaStream.getVideoTracks()[0];
                this.imageCapture = new ImageCapture(track);
            }
            catch (err) {
                this.errorMethod(3);
                console.log(err.name + ": " + err.message);
            }
        },
        
        async stopWebcam() {
            this.streaming = false;
            this.mediaStream.getTracks().forEach(track => {
                track.stop();
            })
        },
        
        async capture() {
            try {
                const blob = await this.imageCapture.takePhoto().then(blob => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result.split(",")[1]);
                        reader.readAsDataURL(blob);
                    });
                });
                //截圖暫停Camera ＆ 開啟Loading
                // this.stopWebcam();
                // this.showLoading();
                return blob;
            }
            catch (error) {
                console.log("takePhoto() error: ", error);
                this.isDelay = true;
            }
        },
        async cmdProccess(_command) {
            // await this.startWebcam();
            //指令處理過程
            let msg = { "command": "", "map": "" };
            msg.command = _command.toString();
            this.temporder = {};
            if (_command == "cart") {
                this.operateText = "Detecting...";
                this.imgShow = false,
                this.isDelay = false;
                msg.map = await this.capture();
            }
            if (_command == "pay") {
                this.operateText = "Checkout processing, printing...";
                this.temp_bill = {};
                this.temp_bill.buy_list = this.buy_list;
                this.temp_bill.total_price = this.total_price;
                msg.buy_list = this.buy_list;
            }
            if (_command == "cancel")
                this.operateText = "Cancel checkout list...";
            // await this.stopWebcam();
            this.postCommand(msg);
        },
        postCommand(_msg) {
            //串接API
            // console.log("postCommand:\n", _msg);

            let self = this;
            fetch(self.apiUrl, {
                method: "POST",
                body: JSON.stringify(_msg)
            })
            .then(res => {
                if (res.status == 200)
                    return res.json();
                else {
                    self.errorMethod(2);
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
            })
            .then(data => {
                console.log("data:\n", data);
                if (data == "undefined" || data == null)
                    return;
                if (data.status == "ok") {
                    if (data.command == "cart")
                        self.orderCalcu(data.cart);
                    if (data.command == "pay")
                        self.checkBuyList();
                    if (data.command == "cancel")
                        self.cancelOrder();
                }
                else {
                    //error modal
                    self.errorMethod(99, data.error_msg);
                    this.showImg("http://127.0.0.1:4000/img/noImg.jpg");
                    this.hideLoading();
                    this.eqptInit();
                }
            }, window)
            .catch(err => {
                console.error("Error:", err);
                self.errorMethod(4);
                // this.hideLoading();
                this.weight = 0;
                this.eqptInit();
            });
        },
        orderCalcu(_result) {
            this.weight = _result.weight_kg;
            this.temporder = _result;
            this.temporder.price = parseInt(this.temporder.price);
            this.buy_list.push(this.temporder);
            this.showImg(this.temporder.img_url);
            this.hideLoading();
            this.delayTimer();
        },
        checkBuyList() {
            let self = this;
            // 結帳
            self.isPrompt = true;
            self.cancelOrder();
        },
        cancelOrder() {
            this.buy_list = [];
            this.eqptInit();
        },
        showImg(_url) {
            this.isImg = true;
            this.imgSrc = _url;
        },
        showPreview() {
            this.isPreview = !this.isPreview;
        },
        showLoading() {
            this.show({
                spinner: QSpinnerFacebook,
                spinnerSize: 140,
                message: "wait...",
            });
        },
        show(options) {
            let self = this;
            Loading.show(options);
            self.loadtimer = setTimeout(() => {
                //modal time over
                self.errorMethod(1);
                Loading.hide();
                self.loadtimer = null;
                self.eqptInit();
            }, self.loadingdelay * 1000);
        },
        hideLoading() {
            //清除Loading
            Loading.hide();
            clearTimeout(this.loadtimer);
        },
        delayTimer() {
            let self = this;
            // setTimeout(() => {
                self.init();
            // }, self.delay * 1000);

            // setTimeout(() => {
            //     self.imgSrc="";
            // },(self.delay*1000)+1000);
        },
        errorMethod(_errorNum, _msg) {
            switch (_errorNum) {
                case 1:
                    this.errorText = "timeout(1)";
                    break;
                case 2:
                    this.errorText = "system error(2)";
                    break;
                case 3:
                    this.errorText = "can't find camera(3)";
                    break;
                case 4:
                    this.errorText = "web api error(4)";
                    break;
                case 99:
                    this.errorText = _msg+'(99)';
                    break;
                default:
                    this.errorText = "operation error(0)";
                    break;
            }
            this.isError = true;
        },
        timeo(_command){
            let unix_timestamp = Math.floor(Date.now()/1000);
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var date = new Date(unix_timestamp * 1000);
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = "0" + date.getSeconds();

            // Will display time in 10:30:23 format
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            console.log(_command.toString(),formattedTime);
        },
        deleteCheckout(_index){
            this.buy_list.splice(_index,1);
        },
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap');
    .wrap{
        width: 1920px;
        height:1080px;
        margin: auto;
    }
    .container{
        width: 1860px;
        height:100%;
        margin: auto;
    }
    .logo{
        background-color: white;
    }
    .livecam{
        margin-bottom:20px;
        border:1px solid #000;
        box-sizing: border-box;
    }
    .video{
        vertical-align: middle;
        position: relative;
    }
    .live{
        background-color: #f00;
        color:#fff;
        font-size: 20px;
        width: 60px;
        text-align: center;
        border-radius: 50px;
        position:absolute;
        top:20px;
        left:25px;
    }
    img#image{
        vertical-align: middle;
        width: 140px;
        height: 100px;
    }
    .imgRect{
        position:relative;
    }
    .preview{
        width: 480px;
        height:360px;
        position:absolute;
        bottom:100px;
        left:100px;
        z-index:1;
        box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);
    }
    .calcu{
        margin-bottom: 30px;
    }
    .text-h6{
        font-size: 28px;
        letter-spacing: 5px;
    }
    .my-card .text-h6 label{
        background-color: #e53935;
        padding:5px 10px;
        border-radius: 20px;
        letter-spacing: 3px;
    }
    .my-card .card-body{
        height: 186px;
        padding-left:30px;
        padding-right:30px;
    }
    .my-card table{
        border-collapse:collapse;
    }
    .my-card table th{
        font-size: 28px;
        padding: 10px 0;
    }
    .my-card table td{
        font-size: 30px;
        padding: 10px 0;
    }
    .weight-rect{
        line-height: 98px;
        padding: 0 15px 0;
        font-size: 40px;
        border-radius: 10px ;
        letter-spacing: 2.5px;
        font-family: 'Roboto Mono', monospace;
    }
    .weight-rect .q-icon{
        padding-top: 0;
    }
    .weight-rect small{
        letter-spacing: 5px;
        margin-right: 5px;
    }
    .right-area{
        padding-left: 25px;
    }
    .btn-group{
        padding-top: 35px;
    }
    .btn-group button{
        height: 100%;
        width: 80%;
        border-radius: 10px;
        font-size: 40px;
        position: relative;
        padding-top: 10px;
    }
    .btn-group .bedge{
        width: 55px;
        height: 55px;
        font-size: 24px;
        border-radius: 50%;
        position: absolute;
        top: -20px;
        right: -20px;
        display: flex;
        justify-content: center;
        align-items: center; 
    }
    .order-list .card-body{
        font-size: 30px;
        padding:0 15px;
    }
    .order-list .card-body .q-card{
        margin: 20px 15px;
        padding: 8px 0;
    }
    .order-list .q-card__section{
        padding:0;
    }
    .order-list .q-card__section .close{
        font-weight: 500;
        height:100%;
        font-size: 26px;
    }
    .order-list .row .text-h6{
        padding: 16px;
    }
    .order-list .row .logo{
        padding: 16px;
        vertical-align: middle;
    }
    .bill{
        margin: 0;
        padding: 0;
    }
</style>
