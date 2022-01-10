function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;
        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}

String.prototype.renderTip = function (context) {
    return renderTip(this, context);
};

var re = /x/;
console.log(re);
re.toString = function() {
    showMessage('喵！！', 5000);
    return '';
};

$(document).on('copy', function (){
    showMessage('想要複製帶走的話，罐罐先拿來', 5000);
});

async function initTips(){
    const todoDocs =await cat.get();
    const {can,talk} = todoDocs.data();
    $.ajax({
        cache: true,
        url: `${message_Path}message.json`,
        dataType: "json",
        success: function (result){
            $.each(result.mouseover, function (index, tips){
                $(tips.selector).mouseover(function (){
                    var text = talk;
                    console.log(text);
                    if(Array.isArray(talk)) text = talk[Math.floor(Math.random() * talk.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
            $.each(result.click,function (index, tips){
                $(tips.selector).click(function (){
                    var text = talk;
                    console.log(text);
                    if(Array.isArray(talk)) text = talk[Math.floor(Math.random() * talk.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
        }
    });
}
initTips();

(function (){
    var text;
    if(document.referrer !== ''){
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text = '不要再看了！！罐罐呢！！';
            } else if (now > 5 && now <= 7) {
                text = '給我罐罐好嗎？';
            } else if (now > 7 && now <= 11) {
                text = '你還有'+String(12-now)+'個小時決定午餐要吃甚麼';
            } else if (now > 11 && now <= 14) {
                text = '所以...午餐要吃啥！';
            } else if (now > 14 && now <= 17) {
                text = '罐罐呢？？？';
            } else if (now > 17 && now <= 19) {
                text = '晚餐就決定是高級罐罐了';
            } else if (now > 19 && now <= 21) {
                text = '整天只知道工作，回家後還不給我罐罐！！';
            } else if (now > 21 && now <= 23) {
                text = '罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐罐';
            } else {
                text = '還沒睡的話，給個罐罐吧';
            }
    }
    showMessage(text, 12000);
})();

function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    //console.log('showMessage', text);
    $('.message').stop();
    $('.message').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout){
    $('.message').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.message').delay(timeout).fadeTo(200, 0);
}

