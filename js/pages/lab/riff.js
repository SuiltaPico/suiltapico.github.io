const _App = {
    data() {
        return {
            lastModified: "",
            analyticalResultsShow: false,
            readProgressShow: false,
            fileSize: 1,
            fileReadSize: 0,
            RIFFHeader: "",
            chunkSize: 0,
            formType: "",
            fmtHeader: "",
        }
    },
    methods: {
        loadfile() {
            let appthis = this
            let fileReader = new FileReader()

            /**
             * @type File
             */
            let file = this.$refs.input_file.files[0]

            let lastModifiedDate = new Date(file.lastModified)
            this.lastModified = `${lastModifiedDate.toLocaleDateString()} ${lastModifiedDate.toLocaleTimeString()}`
            this.fileSize = file.size


            fileReader.onprogress = function (evt) {
                appthis.fileReadSize = evt.loaded
                appthis.readProgressShow = true
            }
            
            fileReader.onload = function (evt) {
                let fileData = evt.target.result
                let RIFF = new DataView(fileData, 0, 4)
                if (RIFF.getUint32(0, false) == 0x52494646) { // 如果是 RIFF 头
                    appthis.RIFFHeader = "正确"
                    let chunkSize = new DataView(fileData, 4, 4).getInt32(0, true)
                    appthis.chunkSize = chunkSize

                    let formType = new DataView(fileData, 8, 4)
                    appthis.formType = `"`
                    for (let index = 0; index < 4; index++) {
                        appthis.formType += String.fromCharCode(formType.getUint8(index))
                    }
                    appthis.formType += `"`

                    let fmtHeader = new DataView(fileData, 12, 4)
                    appthis.fmtHeader = `"`
                    for (let index = 0; index < 4; index++) {
                        appthis.fmtHeader += String.fromCharCode(fmtHeader.getUint8(index))
                    }
                    appthis.fmtHeader += `"`


                } else {
                    appthis.RIFFHeader = `非 RIFF 文件头，"`
                    for (let index = 0; index < 4; index++) {
                        appthis.RIFFHeader += String.fromCharCode(RIFF.getUint8(index))
                    }
                    appthis.RIFFHeader += "\""
                }




                appthis.analyticalResultsShow = true
                appthis.readProgressShow = false
            }
            fileReader.readAsArrayBuffer(file)
        }
    }
}

let App;

window.addEventListener("load", function () {
    App = Vue.createApp(_App).mount('#app');
})
