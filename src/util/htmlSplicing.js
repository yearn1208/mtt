export const htmlUserSplicing =(title,content,backgroundColor) =>{
    return '<!DOCTYPE html>'+
    '<html lang="en">'+
    '<head>'+
        '<meta charset="UTF-8">' + 
        '<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0">' +
        '<title>'+title+'</title>' + 
        '<style>' + 
            'body {' +
            'margin: 0;' +
                'font-family: arial;' +
                '}' +
            'html, body {' +
            ' height: 100%;' +
                '}' +
            '*, *:before, *:after {' +
            'box-sizing: border-box;' +
                '-moz-box-sizing: border-box;' + 
                '-webkit-box-sizing: border-box;' +
            '}' +
            'div {' +
            'overflow-x: scroll;' +
                'word-break: break-all;' +
            '}' +
            'ul, ol, li {' +
            'list-style-type: none;' +
                'margin: 0;' +
                'padding: 0;' +
            '}' +
            'iframe {' +
            ' display: block;' +
            '}' +
            'textarea {' +
            'resize: none;' +
            '}' +
            'textarea, input, select {' +
            'outline: 0;' +
            '}' +
            'a:hover {' +
            'color: #0080ff;' +
            '}' +
            'table {' +
            'border-spacing: 0;' +
                'border-collapse: collapse;' +
            '}' +
            'td, th {' +
            'padding: 0;' +
            '}' +
            'article, aside, details, figcaption, figure, dialog, footer, header, hgroup, menu, nav, section {' +
            'display: block;' +
            '}' +
            '::-webkit-input-placeholder {' +
            'color: #999;' +
            '}' +
            '::-moz-placeholder {' +
            'color: #999;' +
            '}' +
            '::-moz-placeholder {' +
            'color: #999;' +
            '}' +
            ':-ms-input-placeholder {' +
            'color: #ccc;' +
            '}' +
            '::-webkit-scrollbar {' +
            'width: 7px;' +
                'height: 7px;' +
                'background-color: #F5F5F5;' +
            '}' +
            '::-webkit-scrollbar-thumb {' +
            'background-color: #999;' +
            '}' +
            '::-webkit-scrollbar-track {' +
            ' background-color: #F5F5F5;' +
            '}' +
            '.clearfix:after {' +
            'visibility: hidden;' +
                'display: block;' +
                ' font-size: 0;' +
                'content: " ";' +
                'clear: both;' +
                ' height: 0;' +
            ' }' +
            ' * html .clearfix {' +
            'zoom: 1;' +
            '}' +
            ' *:first-child + html .clearfix {' +
            ' zoom: 1;' +
            ' }' +
            '</style>' +
        ' <style>' +
            '.content {' +
                'padding: 0 .4rem;' +
                ' overflow-x: scroll;' +
                `background-color:${backgroundColor}` + 
                ' }' +
        '</style>' +
    '</head>' +
    '<body>' +
    '<div class="content">'+content+'</div>'+
    '<script>'+
    ';(function (designWidth) {'+
        'var resizeEvt = "orientationchange" in window ? "orientationchange" : "resize"'+
        'var recalc = function () {'+
            'var size = (window.innerWidth || document.documentElement.clientWidth) / designWidth * 100;'+
            'document.documentElement.style.fontSize = size + "px";'+
            'document.body.style.fontSize = "16px";'+
            '}'+
            'window.addEventListener(resizeEvt, recalc, false);'+
            'document.addEventListener("DOMContentLoaded", recalc, false) '+
            '})(750);'+
            '</script>'+
            '</body>'+
            '</html>'
}