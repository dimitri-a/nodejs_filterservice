var _ = require('underscore');

module.exports = function (app) {
    app.post('/*', function (req, res) {
        var template = require('./template')
        var isvalid = require('isvalid');
        var validJson=true;
        isvalid(req.body,template
            , function(err, validObj) {
                if (!validObj) {
                    validJson = false;
                }
                handleRequest(validJson,res,err,req);
            });
    })

    function handleRequest(validJson,res,err,req){
        var errorResponse=require('./errorResponse.json');
        if (!validJson) {
            res.setHeader('content-type', 'application/json');
            res.status(400);
            res.json(errorResponse);
        }
        else
        {
            var resp = _.filter(_.where(req.body.payload, {drm: true}), function (item) {
                return item.episodeCount > 0
            });

            var newArray = [];
            resp.forEach(function (item) {
                var newItem = _.pick(item, 'image', 'slug', 'title');
                newItem.image = _.propertyOf(newItem.image)('showImage');
                newArray.push(newItem);
            })

            res.setHeader('content-type', 'application/json');
            res.status(200);
            res.json({response: newArray});
        }
    }

}