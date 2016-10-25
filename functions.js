/**
 * Created by pa kod on 07-Oct-16.
 */
function fileSupport() {// Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        console.log('sucess')
    } else {
        alert('The File APIs are not fully supported in this browser.');
        console.log('The File APIs are not fully supported in this browser')
    }
}

function openFile() {
    file = document.getElementById("fileInput").files[0];
    var fileName = escape(file.name);
    var fileType = (file.type ? file.type : 'n/a');
    var fileSize = file.size;
    var lastModified = file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a';

    if(file.name.substring(file.name.lastIndexOf(".")) != ".dat" ) {
        alert('LF2 data file only.');
        return false;
    }
    else {
        fileType = "LF2/data";
    }
    document.getElementById('details').innerHTML =
        '<strong>' + fileName + '</strong> (' + fileType + ') - ' +
        fileSize + ' bytes, last modified: ' + lastModified;
    return true;
}


function ExtractTag() {
    var ExtractingRegex = /\w/;
}

function FrameNameColor(FrameName) {
    var color;
    console.log(FrameName);
    switch (FrameName.toString()){
        case 'standing': color='#DDD'; break;
        case  'walking': color='#456234'; break;
        default: color='red';
    }

    return color;
}

/*Go diagram functions*/

/*Function that makes a text binding TextBlockName is name to be binded,
 label, if it require a label default true*/
function BindText(TextBlockName,label,color) {
    if(color===undefined){
        if(frame[TextBlockName]==undefined) color="white";
        else color=frame[TextBlockName].color;
    }
    return  go1(go.Panel, "Horizontal",
        go1(go.TextBlock,label==false? "": TextBlockName+":", {name: 'label-'+TextBlockName, margin: 2, stroke: color, font: "12px sans-serif" }),
        go1(go.TextBlock,
            {name: TextBlockName, margin: 2, stroke: "white", font: "bold 12px sans-serif", editable: true,
            click: function (e,o,u) {
                ev=e; nod=o; console.log(u);
            }
                
            },
            new go.Binding("text", TextBlockName).makeTwoWay())
    );
}


// Upon a drop onto a Group, we try to add the selection as members of the Group.
// Upon a drop onto the background, or onto a top-level Node, make selection top-level.
// If this is OK, we're done; otherwise we cancel the operation to rollback everything.

function finishDrop(e, grp) {
    var ok = (grp !== null
        ? grp.addMembers(grp.diagram.selection, true)
        : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
    if (!ok) e.diagram.currentTool.doCancel();
}

// this function is used to highlight a Group that the selection may be dropped into
function highlightGroup(e, grp, show) {
    if (!grp) return;
    e.handled = true;
    if (show) {
        // cannot depend on the grp.diagram.selection in the case of external drag-and-drops;
        // instead depend on the DraggingTool.draggedParts or .copiedParts
        var tool = grp.diagram.toolManager.draggingTool;
        var map = tool.draggedParts || tool.copiedParts;  // this is a Map
        // now we can check to see if the Group will accept membership of the dragged Parts
        if (grp.canAddMembers(map.toKeySet())) {
            grp.isHighlighted = true;
            return;
        }
    }
    grp.isHighlighted = false;
}
