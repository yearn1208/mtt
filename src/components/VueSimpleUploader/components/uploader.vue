<template>
    <div class="uploader">
        <slot :files="files" :file-list="fileList" :started="started" />
    </div>
</template>

<script>
import Uploader from 'simple-uploader.js'
import { kebabCase } from '../common/utils'

const COMPONENT_NAME = 'uploader'
const FILE_ADDED_EVENT = 'fileAdded'
const FILES_ADDED_EVENT = 'filesAdded'
const UPLOAD_START_EVENT = 'uploadStart'

export default {
    name: COMPONENT_NAME,
    provide() {
        return {
            uploader: this
        }
    },
    props: {
        options: {
            type: Object,
            default() {
                return {}
            }
        },
        autoStart: {
            type: Boolean,
            default: true
        },
        fileStatusText: {
            type: [Object, Function],
            default() {
                return {
                    success: 'success',
                    error: 'error',
                    uploading: 'uploading',
                    paused: 'paused',
                    waiting: 'waiting',
                    mdCrypt: 'mdCrypt'
                }
            }
        },
        extraStatus: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            started: false,
            files: [],
            fileList: []
        }
    },
    watch: {
        extraStatus(nvl) {
            this.extraStatus = nvl
        }
    },
    methods: {
        uploadStart() {
            this.started = true
        },
        // 添加单个文件
        fileAdded(file) {
            this.$emit(kebabCase(FILE_ADDED_EVENT), file)
            if (file.ignored) {
                return false
            }
        },
        filesAdded(files, fileList) {
            this.$emit(kebabCase(FILES_ADDED_EVENT), files, fileList)
            if (files.ignored || fileList.ignored) {
                return false
            }
        },
        fileRemoved(file) {
            this.files = this.uploader.files
            this.fileList = this.uploader.fileList
        },
        filesSubmitted(files, fileList) {
            this.files = this.uploader.files
            this.fileList = this.uploader.fileList
            if (this.autoStart) {
                this.uploader.upload()
            }
        },
        allEvent(...args) {
            const name = args[0]
            const EVENTSMAP = {
                [FILE_ADDED_EVENT]: true,
                [FILES_ADDED_EVENT]: true,
                [UPLOAD_START_EVENT]: 'uploadStart'
            }
            const handler = EVENTSMAP[name]
            if (handler) {
                if (handler === true) {
                    return
                }
                this[handler].apply(this, args.slice(1))
            }
            args[0] = kebabCase(name)
            this.$emit.apply(this, args)
        }
    },
    created() {
        this.options.initialPaused = !this.autoStart
        const uploader = new Uploader(this.options)
        this.uploader = uploader
        this.uploader.fileStatusText = this.fileStatusText
        uploader.on('catchAll', this.allEvent)
        uploader.on(FILE_ADDED_EVENT, this.fileAdded)
        uploader.on(FILES_ADDED_EVENT, this.filesAdded)
        uploader.on('fileRemoved', this.fileRemoved)
        uploader.on('filesSubmitted', this.filesSubmitted)
    },
    destroyed() {
        const uploader = this.uploader
        uploader.off('catchAll', this.allEvent)
        uploader.off(FILE_ADDED_EVENT, this.fileAdded)
        uploader.off(FILES_ADDED_EVENT, this.filesAdded)
        uploader.off('fileRemoved', this.fileRemoved)
        uploader.off('filesSubmitted', this.filesSubmitted)
        this.uploader = null
    }
}
</script>

<style>
.uploader {
    position: relative;
}
</style>
