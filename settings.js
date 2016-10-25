/**
 * Created by pa kod on 07-Oct-16.
 */
var frame={
    background: '#44CCFF',
    height: 200,
    FrameID: {
        color: "#000"
    },
    FrameName:{
        color: '#000'
    },
    centerx: {
        color: '#820900'
    },
    centery: {
        color: '#ad0c00'
    },
    mouse:{
        click: function (e,o) {

        },
        doubleClick: function (e,o){
            o.findObject('framedata').visible=!o.findObject('framedata').visible
        }
    }

}