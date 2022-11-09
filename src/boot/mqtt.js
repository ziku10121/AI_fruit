import VueMqtt from 'vue-mqtt'

export default ({ Vue }) => {
  Vue.use(VueMqtt, 'ws://mqtt.frrut.net:9000/mqtt', 
  { clientId: ('WebClient-' + parseInt(Math.random() * 100000)) })
}
