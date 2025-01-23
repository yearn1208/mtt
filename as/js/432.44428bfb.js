(self["webpackChunktest"]=self["webpackChunktest"]||[]).push([[432],{7432:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return d}});var o=function(){var t=this,e=t._self._c;return e("div",[e("div",{directives:[{name:"show",rawName:"v-show",value:"RECORD"==t.mode,expression:"mode == 'RECORD'"}]},[e("div",{staticClass:"chat-voice-tip"},[t._v(t._s(t.stateTip))]),e("div",[t._v("时长: "+t._s("STOP"==t.state?0:parseInt(t.rc.duration))+"s")])]),e("audio",{directives:[{name:"show",rawName:"v-show",value:"PLAY"==t.mode,expression:"mode == 'PLAY'"}],ref:"audio",attrs:{src:t.url,controls:""},on:{ended:function(e){return t.onStopAudio()}}}),e("el-divider",{attrs:{"content-position":"center"}}),e("el-row",{staticClass:"chat-voice-btn-group"},[e("el-button",{directives:[{name:"show",rawName:"v-show",value:"STOP"==t.state,expression:"state == 'STOP'"}],attrs:{round:"",type:"primary"},on:{click:function(e){return t.onStartRecord()}}},[t._v("开始录音")]),e("el-button",{directives:[{name:"show",rawName:"v-show",value:"RUNNING"==t.state,expression:"state == 'RUNNING'"}],attrs:{round:"",type:"warning"},on:{click:function(e){return t.onPauseRecord()}}},[t._v("暂停录音")]),e("el-button",{directives:[{name:"show",rawName:"v-show",value:"PAUSE"==t.state,expression:"state == 'PAUSE'"}],attrs:{round:"",type:"primary"},on:{click:function(e){return t.onResumeRecord()}}},[t._v("继续录音")]),e("el-button",{directives:[{name:"show",rawName:"v-show",value:"RUNNING"==t.state||"PAUSE"==t.state,expression:"state == 'RUNNING' || state == 'PAUSE'"}],attrs:{round:"",type:"danger"},on:{click:function(e){return t.onCompleteRecord()}}},[t._v(" 结束录音")]),e("el-button",{directives:[{name:"show",rawName:"v-show",value:"COMPLETE"==t.state&&"PLAY"!=t.mode,expression:"state == 'COMPLETE' && mode != 'PLAY'"}],attrs:{round:"",type:"success"},on:{click:function(e){return t.onPlayAudio()}}},[t._v("播放录音 ")]),e("el-button",{directives:[{name:"show",rawName:"v-show",value:"COMPLETE"==t.state&&"PLAY"==t.mode,expression:"state == 'COMPLETE' && mode == 'PLAY'"}],attrs:{round:"",type:"warning"},on:{click:function(e){return t.onStopAudio()}}},[t._v("停止播放 ")]),e("el-button",{directives:[{name:"show",rawName:"v-show",value:"COMPLETE"==t.state,expression:"state == 'COMPLETE'"}],attrs:{round:"",type:"primary"},on:{click:function(e){return t.onRestartRecord()}}},[t._v("重新录音")]),e("el-button",{directives:[{name:"show",rawName:"v-show",value:"COMPLETE"==t.state,expression:"state == 'COMPLETE'"}],attrs:{round:"",type:"primary"},on:{click:function(e){return t.onSendRecord()}}},[t._v("立即发送")])],1)],1)},i=[],r=n(7362),s=n.n(r),a={name:"chatVoice",props:{},data(){return{rc:new(s()),audio:new Audio,state:"STOP",stateTip:"未开始",mode:"RECORD",duration:0,url:""}},methods:{onClose(){this.rc.destroy(),this.rc=new(s()),this.audio.pause(),this.mode="RECORD",this.state="STOP",this.stateTip="未开始",this.$emit("close")},onStartRecord(){this.rc.start().then((t=>{this.state="RUNNING",this.stateTip="正在录音..."})).catch((t=>{this.$message.error(t)}))},onPauseRecord(){this.rc.pause(),this.state="PAUSE",this.stateTip="已暂停录音"},onResumeRecord(){this.rc.resume(),this.state="RUNNING",this.stateTip="正在录音..."},onCompleteRecord(){this.rc.pause(),this.state="COMPLETE",this.stateTip="已结束录音"},onPlayAudio(){let t=this.rc.getWAVBlob(),e=URL.createObjectURL(t);this.$refs.audio.src=e,this.$refs.audio.play(),this.mode="PLAY"},onStopAudio(){this.$refs.audio.pause(),this.mode="RECORD"},onRestartRecord(){this.rc.destroy(),this.rc=new(s()),this.rc.start(),this.state="RUNNING",this.mode="RECORD",this.stateTip="正在录音..."},onSendRecord(){let t=this.rc.getWAVBlob(),e=(new Date).getDate()+".wav";var n=new window.FormData;n.append("file",t,e),this.$http({url:"/file/upload",data:n,method:"post",headers:{"Content-Type":"multipart/form-data"}}).then((t=>{let e={duration:parseInt(this.rc.duration),url:t};this.$emit("send",e),this.onClose()}))}}},u=a,c=n(3736),l=(0,c.Z)(u,o,i,!1,null,null,null),d=l.exports},2121:function(t,e,n){n(3767),n(8585),n(8696),n(7658),function(e,n){t.exports=n()}(0,(function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){"use strict";function o(t,e,n){for(var o=0;o<n.length;o++)t.setUint8(e+o,n.charCodeAt(o))}Object.defineProperty(e,"__esModule",{value:!0}),e.compress=function(t,e,n){for(var o=e/n,i=Math.max(o,1),r=t.left,s=t.right,a=Math.floor((r.length+s.length)/o),u=new Float32Array(a),c=0,l=0;c<a;){var d=Math.floor(l);u[c]=r[d],c++,s.length&&(u[c]=s[d],c++),l+=i}return u},e.encodePCM=function(t,e,n){void 0===n&&(n=!0);var o=0,i=t.length*(e/8),r=new ArrayBuffer(i),s=new DataView(r);if(8===e)for(var a=0;a<t.length;a++,o++){var u=(c=Math.max(-1,Math.min(1,t[a])))<0?128*c:127*c;u=+u+128,s.setInt8(o,u)}else for(a=0;a<t.length;a++,o+=2){var c=Math.max(-1,Math.min(1,t[a]));s.setInt16(o,c<0?32768*c:32767*c,n)}return s},e.encodeWAV=function(t,e,n,i,r,s){void 0===s&&(s=!0);var a=n>e?e:n,u=r,c=new ArrayBuffer(44+t.byteLength),l=new DataView(c),d=i,p=0;o(l,p,"RIFF"),p+=4,l.setUint32(p,36+t.byteLength,s),o(l,p+=4,"WAVE"),o(l,p+=4,"fmt "),p+=4,l.setUint32(p,16,s),p+=4,l.setUint16(p,1,s),p+=2,l.setUint16(p,d,s),p+=2,l.setUint32(p,a,s),p+=4,l.setUint32(p,d*a*(u/8),s),p+=4,l.setUint16(p,d*(u/8),s),p+=2,l.setUint16(p,u,s),o(l,p+=2,"data"),p+=4,l.setUint32(p,t.byteLength,s),p+=4;for(var h=0;h<t.byteLength;)l.setUint8(p,t.getUint8(h)),p++,h++;return l}},function(t,e,n){"use strict";var o,i=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),s=n(0),a=n(3),u=function(t){function e(e){void 0===e&&(e={});var n=t.call(this,e)||this;return n.isrecording=!1,n.ispause=!1,n.isplaying=!1,n}return i(e,t),e.prototype.setOption=function(t){void 0===t&&(t={}),this.setNewOption(t)},e.prototype.start=function(){return this.isrecording?Promise.reject():(this.isrecording=!0,this.startRecord())},e.prototype.pause=function(){this.isrecording&&!this.ispause&&(this.ispause=!0,this.pauseRecord())},e.prototype.resume=function(){this.isrecording&&this.ispause&&(this.ispause=!1,this.resumeRecord())},e.prototype.stop=function(){this.isrecording&&(this.isrecording=!1,this.ispause=!1,this.stopRecord())},e.prototype.play=function(){this.stop(),this.isplaying=!0,this.onplay&&this.onplay(),a.default.addPlayEnd(this.onplayend);var t=this.getWAV();t.byteLength>44&&a.default.play(t.buffer)},e.prototype.getPlayTime=function(){return a.default.getPlayTime()},e.prototype.pausePlay=function(){!this.isrecording&&this.isplaying&&(this.isplaying=!1,this.onpauseplay&&this.onpauseplay(),a.default.pausePlay())},e.prototype.resumePlay=function(){this.isrecording||this.isplaying||(this.isplaying=!0,this.onresumeplay&&this.onresumeplay(),a.default.resumePlay())},e.prototype.stopPlay=function(){this.isrecording||(this.isplaying=!1,this.onstopplay&&this.onstopplay(),a.default.stopPlay())},e.prototype.destroy=function(){return a.default.destroyPlay(),this.destroyRecord()},e.prototype.getRecordAnalyseData=function(){return this.getAnalyseData()},e.prototype.getPlayAnalyseData=function(){return a.default.getAnalyseData()},e.prototype.getPCM=function(){this.stop();var t=this.getData();return t=s.compress(t,this.inputSampleRate,this.outputSampleRate),s.encodePCM(t,this.oututSampleBits,this.littleEdian)},e.prototype.getPCMBlob=function(){return new Blob([this.getPCM()])},e.prototype.downloadPCM=function(t){void 0===t&&(t="recorder");var e=this.getPCMBlob();r.downloadPCM(e,t)},e.prototype.getWAV=function(){var t=this.getPCM();return s.encodeWAV(t,this.inputSampleRate,this.outputSampleRate,this.config.numChannels,this.oututSampleBits,this.littleEdian)},e.prototype.getWAVBlob=function(){return new Blob([this.getWAV()],{type:"audio/wav"})},e.prototype.downloadWAV=function(t){void 0===t&&(t="recorder");var e=this.getWAVBlob();r.downloadWAV(e,t)},e.prototype.download=function(t,e,n){r.download(t,e,n)},e.prototype.getChannelData=function(){var t=this.getPCM(),e=t.byteLength,n=this.littleEdian,o={left:null,right:null};if(2===this.config.numChannels){var i=new DataView(new ArrayBuffer(e/2)),r=new DataView(new ArrayBuffer(e/2));if(16===this.config.sampleBits)for(var s=0;s<e/2;s+=2)i.setInt16(s,t.getInt16(2*s,n),n),r.setInt16(s,t.getInt16(2*s+2,n),n);else for(s=0;s<e/2;s+=2)i.setInt8(s,t.getInt8(2*s)),r.setInt8(s,t.getInt8(2*s+1));o.left=i,o.right=r}else o.left=t;return o},e}(n(5).default);e.default=u},function(t,e,n){"use strict";function o(t,e,n){var o=document.createElement("a");o.href=window.URL.createObjectURL(t),o.download=e+"."+n,o.click()}Object.defineProperty(e,"__esModule",{value:!0}),e.downloadWAV=function(t,e){void 0===e&&(e="recorder"),o(t,e,"wav")},e.downloadPCM=function(t,e){void 0===e&&(e="recorder"),o(t,e,"pcm")},e.download=function(t,e,n){return o(t,e,n)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(4),i=null,r=0,s=0,a=null,u=null,c=null,l=!1,d=0,p=function(){};function h(){return l=!1,a.decodeAudioData(c.slice(0),(function(t){(i=a.createBufferSource()).onended=function(){l||(d=a.currentTime-s+r,p())},i.buffer=t,i.connect(u),u.connect(a.destination),i.start(0,r),s=a.currentTime}),(function(t){o.throwError(t)}))}function f(){i&&(i.stop(),i=null)}var y=function(){function t(){}return t.play=function(t){return a||(a=new(window.AudioContext||window.webkitAudioContext),(u=a.createAnalyser()).fftSize=2048),this.stopPlay(),c=t,d=0,h()},t.pausePlay=function(){f(),r+=a.currentTime-s,l=!0},t.resumePlay=function(){return h()},t.stopPlay=function(){r=0,c=null,f()},t.destroyPlay=function(){this.stopPlay()},t.getAnalyseData=function(){var t=new Uint8Array(u.frequencyBinCount);return u.getByteTimeDomainData(t),t},t.addPlayEnd=function(t){void 0===t&&(t=function(){}),p=t},t.getPlayTime=function(){var t=l?r:a.currentTime-s+r;return d||t},t}();e.default=y},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.throwError=function(t){throw new Error(t)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=function(){function t(e){void 0===e&&(e={}),this.size=0,this.lBuffer=[],this.rBuffer=[],this.tempPCM=[],this.inputSampleBits=16,this.fileSize=0,this.duration=0,this.needRecord=!0;var n,o=new(window.AudioContext||window.webkitAudioContext);this.inputSampleRate=o.sampleRate,this.setNewOption(e),this.littleEdian=(n=new ArrayBuffer(2),new DataView(n).setInt16(0,256,!0),256===new Int16Array(n)[0]),t.initUserMedia()}return t.prototype.setNewOption=function(t){void 0===t&&(t={}),this.config={sampleBits:~[8,16].indexOf(t.sampleBits)?t.sampleBits:16,sampleRate:~[8e3,11025,16e3,22050,24e3,44100,48e3].indexOf(t.sampleRate)?t.sampleRate:this.inputSampleRate,numChannels:~[1,2].indexOf(t.numChannels)?t.numChannels:1},this.outputSampleRate=this.config.sampleRate,this.oututSampleBits=this.config.sampleBits},t.prototype.startRecord=function(){var t=this;return this.context&&this.destroyRecord(),this.initRecorder(),navigator.mediaDevices.getUserMedia({audio:!0}).then((function(e){t.audioInput=t.context.createMediaStreamSource(e),t.stream=e})).then((function(){t.audioInput.connect(t.analyser),t.analyser.connect(t.recorder),t.recorder.connect(t.context.destination)}))},t.prototype.pauseRecord=function(){this.needRecord=!1},t.prototype.resumeRecord=function(){this.needRecord=!0},t.prototype.stopRecord=function(){this.audioInput&&this.audioInput.disconnect(),this.source&&this.source.stop(),this.recorder.disconnect(),this.analyser.disconnect(),this.needRecord=!0},t.prototype.destroyRecord=function(){return this.clearRecordStatus(),this.stopStream(),this.closeAudioContext()},t.prototype.getAnalyseData=function(){var t=new Uint8Array(this.analyser.frequencyBinCount);return this.analyser.getByteTimeDomainData(t),t},t.prototype.getData=function(){return this.flat()},t.prototype.clearRecordStatus=function(){this.lBuffer.length=0,this.rBuffer.length=0,this.size=0,this.fileSize=0,this.PCM=null,this.audioInput=null,this.duration=0},t.prototype.flat=function(){var t=null,e=new Float32Array(0);1===this.config.numChannels?t=new Float32Array(this.size):(t=new Float32Array(this.size/2),e=new Float32Array(this.size/2));for(var n=0,o=0;o<this.lBuffer.length;o++)t.set(this.lBuffer[o],n),n+=this.lBuffer[o].length;for(n=0,o=0;o<this.rBuffer.length;o++)e.set(this.rBuffer[o],n),n+=this.rBuffer[o].length;return{left:t,right:e}},t.prototype.initRecorder=function(){var t=this;this.clearRecordStatus(),this.context=new(window.AudioContext||window.webkitAudioContext),this.analyser=this.context.createAnalyser(),this.analyser.fftSize=2048;var e=this.context.createScriptProcessor||this.context.createJavaScriptNode;this.recorder=e.apply(this.context,[4096,this.config.numChannels,this.config.numChannels]),this.recorder.onaudioprocess=function(e){if(t.needRecord){var n,o=e.inputBuffer.getChannelData(0),i=null;t.lBuffer.push(new Float32Array(o)),t.size+=o.length,2===t.config.numChannels&&(i=e.inputBuffer.getChannelData(1),t.rBuffer.push(new Float32Array(i)),t.size+=i.length),t.fileSize=Math.floor(t.size/Math.max(t.inputSampleRate/t.outputSampleRate,1))*(t.oututSampleBits/8),n=100*Math.max.apply(Math,o),t.duration+=4096/t.inputSampleRate,t.onprocess&&t.onprocess(t.duration),t.onprogress&&t.onprogress({duration:t.duration,fileSize:t.fileSize,vol:n})}}},t.prototype.stopStream=function(){this.stream&&this.stream.getTracks&&(this.stream.getTracks().forEach((function(t){return t.stop()})),this.stream=null)},t.prototype.closeAudioContext=function(){return this.context&&this.context.close&&"closed"!==this.context.state?this.context.close():new Promise((function(t){t()}))},t.initUserMedia=function(){void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=function(t){var e=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia;return e?new Promise((function(n,o){e.call(navigator,t,n,o)})):Promise.reject(new Error("浏览器不支持 getUserMedia !"))})},t.prototype.transformIntoPCM=function(t,e){var n=new Float32Array(t),i=new Float32Array(e),r=o.compress({left:n,right:i},this.inputSampleRate,this.outputSampleRate);return o.encodePCM(r,this.oututSampleBits,this.littleEdian)},t.getPermission=function(){return this.initUserMedia(),navigator.mediaDevices.getUserMedia({audio:!0}).then((function(t){t&&t.getTracks().forEach((function(t){return t.stop()}))}))},t}();e.default=i}]).default}))},7362:function(t,e,n){t.exports=n(2121)}}]);
//# sourceMappingURL=432.44428bfb.js.map