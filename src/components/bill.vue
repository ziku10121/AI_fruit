<template>
     <q-card-section class="text-grey-9">
        <!-- Bill -->
        <q-card class="bill" style="width:280px; margin:auto;">
            <q-card-section class="text-left">
                <div class="col-auto text-h4 text-center">MAINCON</div>
                <div class="col-auto text-h4 text-center">電子發票證明聯</div>
                <div class="col-auto text-h5 text-center">111年09-10月</div>
                <div class="col-auto text-h6 text-center">AB-123456789</div>
                <div class="col-auto body">2022-09-05 14:29:30</div>
                <div class="col-auto body">
                    <div class="row">
                        <div class="col">隨機碼:1126</div>
                        <div class="col">總計:{{bill.total_price}}</div>
                    </div>
                </div>
                <div class="col-auto body">賣方:12345678</div>
                <div class="col-auto">
                    <img src="../../public/QRCode.png" />
                </div>
                <div class="col-auto body">退貨憑發票證明聯集交易明細辦理</div>
                <br/>
                <div class="col body text-center">鴻翊國際股份有限公司</div>
                <div class="col body text-center">NO : 12345678</div>
                <div class="col body text-center">新北市中和區xxxxxx</div>
                <div class="col body text-center">TEL:02-22XXXXXX</div>
                <div class="col text-h4 text-center" style="letter-spacing: 8px;">交易明細</div>
                <div v-for="(order,key) in bill.buy_list" :key="'bill'+order.item+key" class="col-auto body">
                    <div class="row">
                        <div class="col">{{order.item}} {{order.weight_kg}}kg</div>
                        <div class="col-2">{{order.price}}$</div>
                    </div>
                </div>
                <div class="col-auto body">
                    <div class="row">
                        <div class="col">小計</div>
                        <div class="col-2">{{bill.total_price}}$</div>
                    </div>
                </div>
                <div class="col-auto body">=================================</div>
                <div class="col-auto body">退換貨請帶發票及購物清單</div>
            </q-card-section>
        </q-card>
    </q-card-section>
</template>
<script>
export default {
    name:"Bill",
    props:['bill']
}
</script>
<style lang="">
    
</style>