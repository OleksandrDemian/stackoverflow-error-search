const BASE_API_PATH = "https://api.stackexchange.com/2.2/search/advanced";
const _config = {
    _listen: true,

    custom: {
        pageSize: 5,
        order: "desc",
        accepted: "True",
        showEmpty: true
    }
};

const buildUrl = ({ message }) => {
    let url = BASE_API_PATH;
    
    url += "?page=1";
    url += "&pagesize=" + _config.custom.pageSize;
    url += "&order=" + _config.custom.order;
    url += "&sort=relevance";
    url += "&accepted=" + _config.custom.accepted;
    url += "&body=" + message;
    url += "&tagged=javascript";
    url += "&site=stackoverflow";

    return encodeURI(url);
}

const parseResult = res => res.json().then((json) => {
    const items = json.items;
    const ret = [];
    for(let i = 0; i < items.length; i++){
        const { link, title } = items[i];
        ret.push({ link, title });
    }

    return ret;
});

const onError = (msg, src, line, col, error) => {
    if(!_config._listen)
        return;

    (async (msg, src, line, col, error) => {
        const res = await fetch(buildUrl({ message: msg }));
        const parsed = await parseResult(res);

        if(parsed.length > 0){
            console.groupCollapsed("StackOverflow solutions for: " + msg);
            for(let i = 0; i < parsed.length; i++){
                console.log(parsed[i].title, parsed[i].link);
            }
            console.groupEnd();
        } else if(_config.custom.showEmpty) {
            console.log("StackOverflow: nothing was found for: " + msg);
        }
    })(msg, src, line, col, error);
}

const start = function(){
    _config._listen = true;
}

const stop = function(){
    _config._listen = false;
}

const config = function(customConfig){
    Object.assign(_config.custom, customConfig);
}

const enabled = function(){
    return _config._listen;
}

window.onerror = onError;

module.exports = {
    start,
    stop,
    config,
    enabled
}