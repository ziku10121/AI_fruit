<template>
    <q-card>
        <q-card-section>
            <div class="text-center">
                <video v-if="streaming" ref="webcam" autoplay playsinline muted width="800" height="600" />
                <img v-else id="image" class="hide" :src="imgSrc" width="800" height="600"/>
            </div>
        </q-card-section>
        <q-card-section>
            <q-btn @click="capture" label="Capture" />
            <q-btn @click="startWebcam" label="StartCam" />
            <q-btn @click="stopWebcam" label="StopCam" />
        </q-card-section>
    </q-card>
</template>
    
    <script>
import adapter from 'webrtc-adapter'
export default {
    data() {
        return {
            mediaStream: null,
            imageCapture: null,
            captured: null,
            streaming:false,
            imgSrc: '',
        }
    },
    async mounted() {
        await this.startWebcam()
    },
    async destroyed() {
        this.stopWebcam()
    },
    methods: {
        async startWebcam() {
            this.streaming = true;
            var constraints = {
                audio: false,
                video: {
                    facingMode: 'environment',
                    width: 800,
                    height: 600,
                    frameRate: 3
                }
            }

            try {
                this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
                var video = this.$refs.webcam;
                video.srcObject = this.mediaStream;
                video.onloadedmetadata = function (e) {
                    video.play();
                }
                const track = this.mediaStream.getVideoTracks()[0];
                this.imageCapture = new ImageCapture(track);
            } catch (err) {
                console.log(err.name + ': ' + err.message);
            }
        },
        async blobToBase64(blob) {
            let self = this;
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        },
        async capture() {
            const self = this;
            try {
                const blob = await self.imageCapture.takePhoto().then(blob => {
                    console.log('Took photo:', blob);
                    self.$emit('capture', blob);
                    
                    self.blobToBase64(blob).then((value)=>{
                        self.imgSrc = value;
                        self.stopWebcam();
                    })
                })
            } catch (error) {
                console.log('takePhoto() error: ', error)
            }
        },
        async stopWebcam() {
            this.streaming = false;
            this.mediaStream.getTracks().forEach(track => {
                track.stop();
            })
        }
    }
}
</script>
    
    <style lang="scss" scoped>
    // video {
    //     width: 75vmin;
    //     height: 75vmin;
    //     // border: 1px solid blue;
    // }
    </style>